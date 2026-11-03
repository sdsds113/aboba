# Сборка общей дорожки голоса: режем длинные паузы, слегка ускоряем, считаем карту времени v1 -> v2.
import json, os, re, subprocess
D = os.path.dirname(os.path.abspath(__file__)); A = f"{D}/audio"
SPEED = 1.07          # ускорение (atempo, тембр не меняется)
MAX_PAUSE = 0.20      # пауза внутри сцены, не длиннее
EDGE = 0.04           # тишина в начале/конце сцены
GAP = 0.45            # пауза между сценами
GAP_BEFORE = {"s06": 0.8, "s09": 0.7}   # чуть больше воздуха перед ключевыми сценами
START = 1.5           # голос начинается с этой секунды
TAIL = 6.0            # финал после последней фразы (стоп-кадр, финальная плашка)
V1_OFF = {"s01":2.0,"s02":6.0,"s03":17.2,"s04":29.2,"s05":41.5,"s06":50.5,"s07":81.0,"s08":112.0,"s09":143.0}
V1_TOTAL = 163.0

def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
def silences(f):
    o = subprocess.run(["ffmpeg","-hide_banner","-i",f,"-af","silencedetect=noise=-40dB:d=0.1","-f","null","-"],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r"silence_start: ([\d.]+)",o)]; en=[float(x) for x in re.findall(r"silence_end: ([\d.]+)",o)]
    return list(zip(st,en))

anchors=[(0.0,0.0)]; parts=[]; offsets={}; t=START; tmp=f"{A}/_tmp"; os.makedirs(tmp,exist_ok=True)
anchors.append((V1_OFF["s01"],START))
for k,v1 in V1_OFF.items():
    f=f"{A}/{k}.mp3"; L=dur(f); sil=silences(f)
    if k!="s01": t+=GAP_BEFORE.get(k,GAP)
    # сегменты речи (local), между ними паузы
    keep=[]; cur=0.0
    for (a,b) in sil:
        if a<=0.01: cur=max(cur,b-EDGE); continue          # ведущая тишина
        if b>=L-0.01: keep.append((cur,min(L,a+EDGE))); cur=None; break  # хвостовая
        if b-a>MAX_PAUSE:
            pad=(b-a-MAX_PAUSE)/2
            keep.append((cur,a+MAX_PAUSE/2)); cur=b-MAX_PAUSE/2
    if cur is not None: keep.append((cur,L))
    offsets[k]=round(t,3); local_new=0.0
    for (a,b) in keep:
        anchors.append((v1+a, t+local_new/SPEED)); local_new+=b-a
        anchors.append((v1+b, t+local_new/SPEED))
    seg=f"{tmp}/{k}.wav"
    flt="".join(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[p{i}];" for i,(a,b) in enumerate(keep))
    flt+="".join(f"[p{i}]" for i in range(len(keep)))+f"concat=n={len(keep)}:v=0:a=1,atempo={SPEED}[o]"
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f,"-filter_complex",flt,"-map","[o]","-ar","48000","-ac","2",seg],check=True)
    parts.append((k,t,seg)); t+=dur(seg)
    print(f"{k}: {L:.2f}s -> {dur(seg):.2f}s, start {offsets[k]:.2f}")
TOTAL=round(t+TAIL,2)
anchors.append((V1_TOTAL,TOTAL))
# заполнители между сценами: конец сцены v1 -> конец сцены v2 уже есть; интерполяция линейная
anchors=sorted(set(anchors))
ins=[];flt=[]
for i,(k,st,seg) in enumerate(parts):
    ins+=["-i",seg]; ms=int(round(st*1000)); flt.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
flt.append("".join(f"[a{i}]" for i in range(len(parts)))+f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={TOTAL}[o]")
subprocess.run(["ffmpeg","-loglevel","error","-y",*ins,"-filter_complex",";".join(flt),"-map","[o]","-t",str(TOTAL),"-b:a","192k",f"{A}/voiceover_full.mp3"],check=True)
json.dump(dict(total=TOTAL,speed=SPEED,offsets=offsets,scene_durations={k:round(dur(s),3) for k,_,s in parts}),open(f"{A}/offsets.json","w"),indent=1)
json.dump(dict(note="piecewise-linear map from v1 timeline seconds to final seconds",anchors=anchors),open(f"{A}/timewarp.json","w"))
for _,_,s in parts: os.remove(s)
os.rmdir(tmp)
print("TOTAL",TOTAL)
