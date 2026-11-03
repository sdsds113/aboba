import json, base64, requests, sys, os
VOICE="5HWgwFhUQle0MFIsALsf"; MODEL="eleven_v4"
d=os.path.dirname(os.path.abspath(__file__))
sc=json.load(open(f"{d}/script.json"))
only=sys.argv[1:]
for i,s in enumerate(sc):
    if only and s["id"] not in only: continue
    body={"text":s["text"],"model_id":MODEL,
          "voice_settings":{"stability":0.5,"similarity_boost":0.8,"style":0.3,"use_speaker_boost":True},
          "previous_text":sc[i-1]["text"] if i else None,
          "next_text":sc[i+1]["text"] if i+1<len(sc) else None}
    r=requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}/with-timestamps?output_format=mp3_44100_192",
                    headers={"xi-api-key":"dummy"},json=body,timeout=300)
    if r.status_code!=200: print(s["id"],r.status_code,r.text[:400]); continue
    j=r.json()
    open(f"{d}/audio/{s['id']}.mp3","wb").write(base64.b64decode(j["audio_base64"]))
    json.dump(j.get("normalized_alignment") or j.get("alignment"),open(f"{d}/audio/{s['id']}.align.json","w"),ensure_ascii=False)
    print(s["id"],"ok")
