# Музыка под ролик (ElevenLabs Music), секции под сцены
import json, requests, os
D=os.path.dirname(os.path.abspath(__file__))
G=["warm whimsical orchestral animated feature film score","instrumental","celesta, pizzicato strings, soft piano, woodwinds, warm strings","heartfelt, magical, family"]
N=["vocals","singing","electronic drums","EDM","dubstep","heavy guitar"]
S=[("Intro - wonder",14100,["soft music box and celesta","gentle sustained strings","sense of a story beginning","slow tempo"]),
   ("Gathering - playful",10000,["bouncy pizzicato strings","playful clarinet","light percussion","tempo picks up"]),
   ("Struggles - night",10400,["quiet reflective piano","soft minor feeling","then a hopeful lift at the end"]),
   ("Moving - growth",7200,["building orchestra","rising strings","uplifting crescendo"]),
   ("Family - warmth",25700,["warm mid-tempo theme","playful woodwinds","light humor","cozy and friendly"]),
   ("Mentor - emotional",26700,["emotional main theme","sweeping strings","french horn","heartfelt swell","gentle sparkle at the end"]),
   ("Childhood - nostalgia",26600,["playful music box","glockenspiel","nostalgic and tender","soft strings in the second half"]),
   ("Finale - celebration",15900,["joyful full orchestra","celebratory brass","bright cymbals","big final chord with a soft ending"])]
plan={"positive_global_styles":G,"negative_global_styles":N,
      "sections":[{"section_name":n,"positive_local_styles":p,"negative_local_styles":[],"duration_ms":d,"lines":[]} for n,d,p in S]}
r=requests.post("https://api.elevenlabs.io/v1/music?output_format=mp3_44100_192",headers={"xi-api-key":"dummy"},
                json={"composition_plan":plan,"model_id":"music_v1"},timeout=600)
print(r.status_code, r.headers.get("content-type"))
if r.status_code==200: open(f"{D}/audio/music.mp3","wb").write(r.content)
else: print(r.text[:800])
