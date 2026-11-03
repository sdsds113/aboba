#!/bin/bash
# Скачивает все 25 клипов напрямую с серверов Kling в pride-cartoon/clips/ (без водяного знака).
# Ссылки живут около суток после генерации (клипы сгенерированы 2026-11-03).
# Если ссылка уже не работает, клип нужно взять из истории генераций в аккаунте Kling или попросить перегенерировать.
# Запуск: bash pride-cartoon/download_clips.sh   (уже скачанные файлы пропускаются; --force перекачивает всё)
cd "$(dirname "$0")" && mkdir -p clips
B=https://v15-kling.klingai.com/bs2/upload-ylab-stunt-sgp
declare -A U=(
 [G01]=0a6d5a0b-8f3a-486f-be35-8e3c89dc6546-I-GkUmq5q5IimhbgfEvZ9w
 [G02]=19f810bc-c240-461a-bd2c-00012dde7d04-I-GkUmq5q5Jcf94zpS4dpA
 [G03]=b2ec9e1e-8107-47ef-9e0a-2426e19cf35d-I-GkUmq5q5LYp2TC8BC8_Q
 [G04]=bc9fcbd0-531f-431a-a9b6-79b6a6389358-l5kt1Xl_7Vdf6zGw2f80BA
 [G05]=20b8db82-cc92-4dfb-9d09-60cec6784451-I-GkUmq5q5KuGonNJeuhIA
 [G06]=c753b140-23c5-40e4-aab3-8860cf490966-I-GkUmq5q5IVu5T_AVqbzA
 [G07]=cf00aed1-1308-496a-90ee-37aabf30d4b0-Gi-ToyYu4lAY5wPV3I7JCA
 [G08]=c646dba7-c828-4bc6-bd14-f0cd4180ac29-U5aPcZVj8pM1wzZLLk4grg
 [G09]=b909ae20-7cb4-4d6e-8f47-7c3dcc4eb836-I-GkUmq5q5InG_mqtgmdVA
 [G10]=63bd618f-cf95-4938-93cc-29864f36a016-y-kH8Y4sYk54xB3PQxig2A
 [G11]=0bad1d74-3adc-49da-b179-a2a7b495b3ab-I-GkUmq5q5JIxb339WMo0Q
 [G12]=8d86909a-c5e0-4be4-ae75-d091f9d59ed1-Ok58Sri453tXPNsDc8FxUg
 [G13]=ebc7b59a-edfc-46c4-8c22-19252172142a-I-GkUmq5q5LAijPc3iYpCQ
 [G14]=4afc534e-b90b-4f94-9878-402ea15c49e1-I-GkUmq5q5L5fOT704vP7A
 [G15]=92df3541-9a3e-4e5c-97c3-3d6dd333ac1b-aSO31jG2I3pXPNsDc8FxUg
 [G16]=57319a70-4465-446c-addd-acd1d3532da3-I-GkUmq5q5Ksew5PZUfOLw
 [G17]=23b8fecc-daf3-44a3-8e38-978bc500a4f8-7GSt2QOVW6m9aMU5fuSTUw
 [G18]=adbd191c-479e-4eb3-8d71-c3dfb3027f2b-ux-WiDS82dWuvlwytW_fJQ
 [G19]=500154d4-dfb8-4119-9159-aa4814c6afec-xp2PQkd-Qr0iHdRhf3uZ5g
 [G20]=3dadf35e-91ce-460d-b9c0-09fddc6ff18e-whyLz5f0NIL0B53XunL_DQ
 [G21]=daaa733a-1c22-4c6e-b8a4-9c32930bdcda-FJM0NZcvCfmNDQty0fZFzA
 [G22]=617f56f8-19bf-4779-8cf5-7b604d959cd2-WEcXkg7MvHCm5qR45mypgw
 [G23]=0a761e21-043c-4a99-a3ba-3daf70162e29-I-GkUmq5q5KoHQDP7sLVxg
 [G24]=e93dbf34-42d0-412a-aaab-323dbc9fb1bc-sgO1o5Ifl0IPZhyQbkcLqA
 [G25]=975051f9-f04e-448a-b5ef-1ad5ee328774-dX5qQ1LESWA9EriOmSyOrQ
)
ok=0; bad=0
for g in $(printf "%s\n" "${!U[@]}" | sort); do
  if [ -s "clips/$g.mp4" ] && [ "${1:-}" != "--force" ]; then echo "есть $g"; ok=$((ok+1)); continue; fi
  if curl -fsSL --retry 3 --max-time 300 -o "clips/$g.mp4" "$B/${U[$g]}-output.mp4?x-kcdn-pid=112372"; then
    echo "скачан $g"; ok=$((ok+1))
  else
    echo "ОШИБКА $g"; rm -f "clips/$g.mp4"; bad=$((bad+1))
  fi
done
echo "готово: $ok из 25, ошибок: $bad"
