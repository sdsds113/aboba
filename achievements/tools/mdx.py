"""MDX-Net (UVR Inst HQ3) separation: mix.wav -> instrumental.wav + vocals.wav (vocals = mix - inst)."""
import sys
import numpy as np
import soundfile as sf
import onnxruntime as ort

MODEL, SRC, OUT_INST, OUT_VOC = sys.argv[1:5]
N_FFT, HOP, DIM_F, DIM_T = 6144, 1024, 3072, 256
COMPENSATE = 1.022
CHUNK = HOP * (DIM_T - 1)
TRIM = N_FFT // 2
GEN = CHUNK - 2 * TRIM
WIN = (0.5 - 0.5 * np.cos(2 * np.pi * np.arange(N_FFT) / N_FFT)).astype(np.float32)  # periodic hann
NB = N_FFT // 2 + 1


def stft(x):  # x: [2, CHUNK] -> [4, DIM_F, DIM_T]  (torch.stft center=True, reflect)
    out = []
    for ch in x:
        p = np.pad(ch, (N_FFT // 2, N_FFT // 2), mode='reflect')
        frames = np.lib.stride_tricks.sliding_window_view(p, N_FFT)[::HOP][:DIM_T]
        S = np.fft.rfft(frames * WIN, axis=1).T  # [NB, T]
        out += [S.real, S.imag]
    return np.stack(out)[:, :DIM_F, :].astype(np.float32)


def istft(spec, length):  # spec: [4, DIM_F, T] -> [2, length]
    T = spec.shape[-1]
    spec = np.concatenate([spec, np.zeros((4, NB - DIM_F, T), np.float32)], axis=1)
    res = []
    for c in range(2):
        S = spec[2 * c] + 1j * spec[2 * c + 1]
        frames = np.fft.irfft(S.T, n=N_FFT, axis=1) * WIN
        n = N_FFT + HOP * (T - 1)
        y = np.zeros(n); wsum = np.zeros(n)
        for i in range(T):
            y[i * HOP:i * HOP + N_FFT] += frames[i]
            wsum[i * HOP:i * HOP + N_FFT] += WIN ** 2
        y = y / np.maximum(wsum, 1e-8)
        res.append(y[N_FFT // 2:N_FFT // 2 + length])
    return np.stack(res)


mix, sr = sf.read(SRC, always_2d=True)
assert sr == 44100, sr
mix = mix.T.astype(np.float32)  # [2, n]
n = mix.shape[1]
pad = GEN - n % GEN
padded = np.concatenate([np.zeros((2, TRIM), np.float32), mix, np.zeros((2, pad + TRIM), np.float32)], 1)
sess = ort.InferenceSession(MODEL, providers=['CPUExecutionProvider'])
inst = []
for i in range(0, n + pad, GEN):
    seg = padded[:, i:i + CHUNK]
    spec = stft(seg)[None]
    out = sess.run(None, {'input': spec})[0][0]
    wav = istft(out, CHUNK)
    inst.append(wav[:, TRIM:-TRIM])
    print(f'\r{min(i + GEN, n) / sr:6.1f}/{n / sr:.1f}s', end='', flush=True)
inst = np.concatenate(inst, 1)[:, :n] * COMPENSATE
voc = mix - inst
sf.write(OUT_INST, inst.T, sr, subtype='FLOAT')
sf.write(OUT_VOC, voc.T, sr, subtype='FLOAT')
print('\ndone')
