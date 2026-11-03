"""Generate each narrator line with ElevenLabs (Nikolay) + char timestamps.
Usage: python3 tts.py lines.json outdir [speed] [ids...]"""
import base64, json, os, subprocess, sys, urllib.request

VOICE = '3EuKHIEZbSzrHGNmdYsx'  # Nikolay - Confident, Clear and Engaging
MODEL = 'eleven_multilingual_v2'
lines = json.load(open(sys.argv[1]))
out = sys.argv[2]
speed = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
only = set(sys.argv[4:])
os.makedirs(out, exist_ok=True)
for i, ln in enumerate(lines):
    if only and ln['id'] not in only:
        continue
    sp = ln.get('speed', speed)
    body = {
        'text': ln['tts'],
        'model_id': MODEL,
        'voice_settings': {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.15, 'use_speaker_boost': True, 'speed': sp},
        'previous_text': lines[i - 1]['tts'] if i > 0 else None,
        'next_text': lines[i + 1]['tts'] if i + 1 < len(lines) else None,
        'seed': 7,
    }
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_192',
        data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'})
    if os.environ.get('ELEVENLABS_API_KEY'):
        req.add_header('xi-api-key', os.environ['ELEVENLABS_API_KEY'])
    d = json.load(urllib.request.urlopen(req, timeout=120))
    mp3 = os.path.join(out, f"{ln['id']}.mp3")
    open(mp3, 'wb').write(base64.b64decode(d['audio_base64']))
    json.dump(d['alignment'], open(os.path.join(out, f"{ln['id']}.align.json"), 'w'), ensure_ascii=False)
    dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3]))
    slot = ln['slot'][1] - ln['slot'][0]
    print(f"{ln['id']} speed {sp:.2f} dur {dur:5.2f}  slot {slot:5.2f}  {'OK' if dur <= slot else 'LONG +%.2f' % (dur - slot)}")
