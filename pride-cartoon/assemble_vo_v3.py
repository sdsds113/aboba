# Сборка дорожки v3 (новая хронология + «Прайд»): те же настройки, что в assemble_vo.py, без timewarp.
import json, os, re, subprocess
D=os.path.dirname(os.path.abspath(__file__)); A=f"{D}/audio/v3"
SPEED=1.07; MAX_PAUSE=0.20; EDGE=0.04; GAP=0.45; GAP_BEFORE={"s06":0.8,"s085":0.7,"s09":0.7}; START=1.5; TAIL=6.0
ids=[s["id"] for s in json.load(open(f"{D}/script_v3.json"))]
def dur(f): return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f]))
def silences(f):
    o=subprocess.run(["ffmpeg","-hide_banner","-i",f,"-af","silencedetect=noise=-40dB:d=0.1","-f","null","-"],capture_output=True,text=True).stderr
    return list(zip([float(x) for x in re.findall(r"silence_start: ([\d.]+)",o)],[float(x) for x in re.findall(r"silence_end: ([\d.]+)",o)]))
parts=[];offsets={};t=START;tmp=f"{A}/_tmp";os.makedirs(tmp,exist_ok=True)
for k in ids:
    f=f"{A}/{k}.mp3"; L=dur(f); sil=silences(f)
    if k!=ids[0]: t+=GAP_BEFORE.get(k,GAP)
    keep=[];cur=0.0
    for a,b in sil:
        if a<=0.01: cur=max(cur,b-EDGE); continue
        if b>=L-0.01: keep.append((cur,min(L,a+EDGE))); cur=None; break
        if b-a>MAX_PAUSE: keep.append((cur,a+MAX_PAUSE/2)); cur=b-MAX_PAUSE/2
    if cur is not None: keep.append((cur,L))
    offsets[k]=round(t,3); seg=f"{tmp}/{k}.wav"
    flt="".join(f"[0:a]atrim={a}:{b},asetpts=PTS-STARTPTS[p{i}];" for i,(a,b) in enumerate(keep))
    flt+="".join(f"[p{i}]" for i in range(len(keep)))+f"concat=n={len(keep)}:v=0:a=1,atempo={SPEED}[o]"
    subprocess.run(["ffmpeg","-loglevel","error","-y","-i",f,"-filter_complex",flt,"-map","[o]","-ar","48000","-ac","2",seg],check=True)
    parts.append((k,t,seg)); t+=dur(seg); print(f"{k}: {L:.2f}s -> {dur(seg):.2f}s, start {offsets[k]:.2f}")
TOTAL=round(t+TAIL,2); ins=[];flt=[]
for i,(k,st,seg) in enumerate(parts):
    ins+=["-i",seg]; ms=int(round(st*1000)); flt.append(f"[{i}:a]adelay={ms}|{ms}[a{i}]")
flt.append("".join(f"[a{i}]" for i in range(len(parts)))+f"amix=inputs={len(parts)}:normalize=0,apad=whole_dur={TOTAL}[o]")
subprocess.run(["ffmpeg","-loglevel","error","-y",*ins,"-filter_complex",";".join(flt),"-map","[o]","-t",str(TOTAL),"-b:a","192k",f"{A}/voiceover_full_v3.mp3"],check=True)
json.dump(dict(total=TOTAL,speed=SPEED,offsets=offsets,scene_durations={k:round(dur(s),3) for k,_,s in parts}),open(f"{A}/offsets.json","w"),indent=1)
for _,_,s in parts: os.remove(s)
os.rmdir(tmp); print("TOTAL",TOTAL)
