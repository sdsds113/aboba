# Звуковые эффекты (ElevenLabs Sound Effects)
import requests, os, json
D=os.path.dirname(os.path.abspath(__file__))
FX={
 "whoosh_hit":("Short cinematic whoosh ending in a soft punchy impact, cartoon style, clean",1.2),
 "page_tear":("A single paper calendar page being torn off quickly, crisp paper rip",1.0),
 "paper_flutter":("Paper sheet fluttering through the air briefly",1.2),
 "door_open":("Old wooden front door opening with a gentle creak, cozy cartoon",1.5),
 "rain_night":("Soft rain on a window at night, cozy indoor ambience, seamless",8.0),
 "magic_sparkle":("Magical sparkle shimmer transformation, chimes and twinkles, whimsical animation",2.5),
 "star_twinkle":("Single gentle magical star twinkle, glassy chime",1.5),
 "frame_hang":("Small wooden picture frame being hung on a nail, light knock and rattle",0.8),
 "camera_flash":("Vintage camera shutter click with flash pop",0.8),
 "confetti_pop":("Party popper pop followed by falling confetti rustle",2.0),
 "crowd_cheer":("Small group of friends cheering and clapping happily indoors, celebration",3.5),
 "group_laugh":("Small group of friends laughing warmly together indoors",2.5),
 "candles_blow":("Someone blowing out birthday candles, soft breath",1.2),
 "swoosh_soft":("Soft airy swoosh transition, gentle",0.8),
}
os.makedirs(f"{D}/audio/sfx",exist_ok=True)
for k,(t,d) in FX.items():
    r=requests.post("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_192",headers={"xi-api-key":"dummy"},
        json={"text":t,"duration_seconds":d,"prompt_influence":0.5},timeout=300)
    if r.status_code==200: open(f"{D}/audio/sfx/{k}.mp3","wb").write(r.content); print(k,"ok")
    else: print(k,r.status_code,r.text[:300])
