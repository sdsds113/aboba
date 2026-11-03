# Черновой микс: голос + музыка с приглушением под голосом + SFX. Уровни — в audio/mix.json (их же берёт Remotion).
import json, subprocess, os
D=os.path.dirname(os.path.abspath(__file__)); os.chdir(D)
M=json.load(open("audio/mix.json")); T=json.load(open("timeline.json")); off=json.load(open("audio/offsets.json"))
cues=json.load(open("audio/sfx_cues.json"))
iv=[(off["offsets"][k],off["offsets"][k]+off["scene_durations"][k]) for k in off["offsets"]]
cond="+".join(f"between(t,{a-M['duck_ramp_s']:.2f},{b+M['duck_ramp_s']:.2f})" for a,b in iv)
ins=["-i","audio/voiceover_full.mp3","-i","audio/music.mp3"]
flt=[f"[0:a]volume={M['vo_gain']}[v]",
     f"[1:a]volume='if(gt({cond},0),{M['music_under_voice']},{M['music_no_voice']})':eval=frame,lowpass=f=12000,afade=t=out:st={T['duration']-M['music_fade_out_s']}:d={M['music_fade_out_s']}[m]"]
for i,c in enumerate(cues):
    ins+=["-i",f"audio/sfx/{c['sfx']}.mp3"]; ms=int(c["t"]*1000)
    flt.append(f"[{i+2}:a]volume={c['vol']},adelay={ms}|{ms}[s{i}]")
flt.append("[v][m]"+"".join(f"[s{i}]" for i in range(len(cues)))+f"amix=inputs={len(cues)+2}:normalize=0,alimiter=limit=0.95[o]")
subprocess.run(["ffmpeg","-loglevel","error","-y",*ins,"-filter_complex",";".join(flt),"-map","[o]","-t",str(T["duration"]),"-b:a","192k","audio/mix_preview.mp3"],check=True)
print("ok")
