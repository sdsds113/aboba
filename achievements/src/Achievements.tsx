import { Audio, Video } from "@remotion/media";
import { getStaticFiles } from "@remotion/studio";
import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { ConditionsScreen } from "./components/ConditionsScreen";
import { Page79Patch } from "./components/Page79Patch";
import { Subtitles } from "./components/Subtitles";
import voice from "./data/voice.json";
import "./fonts";
import { CONDITIONS, FPS, PAGE79, VOICE_VOLUME } from "./timeline";

// Монтаж исходника не меняется: тот же видеоряд, та же длительность.
// 1. Видео — public/source_clean.mp4: исходник со стёртыми вшитыми субтитрами диктора
//    (делает prepare.mjs через ffmpeg delogo по src/data/cleanup.json). Плашка мема не тронута.
// 2. Экран условий 21,90–32,77 с заменён целиком, на 79–80 с — накладка на блок условий.
// 3. Звук: generated/bed.mp3 — музыка, SFX и реплики мемов из исходника (голос диктора
//    вырезан нейросетью MDX-Net), поверх — новая озвучка Nikolay по репликам.
// 4. Новые субтитры Styrene A.

const pickVideo = () => {
  const names = new Set(getStaticFiles().map((f) => f.name));
  if (names.has("source_clean.mp4")) return "source_clean.mp4";
  // Без очищенного видео старые субтитры просвечивали бы под новыми — это только для черновика.
  console.warn("public/source_clean.mp4 не найден: запусти `node prepare.mjs`. Беру исходник со старыми субтитрами.");
  return "source.mp4";
};

export const Achievements: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      <Video src={staticFile(pickVideo())} muted />

      <Sequence name="Экран условий (замена)" from={CONDITIONS.from} durationInFrames={CONDITIONS.to - CONDITIONS.from}>
        <ConditionsScreen />
      </Sequence>

      <Sequence name="Страница 79 с: новые условия" from={PAGE79.loadingFrom} durationInFrames={PAGE79.to - PAGE79.loadingFrom}>
        <Page79Patch />
      </Sequence>

      <Subtitles />

      <Audio src={staticFile("generated/bed.mp3")} />
      {voice.map((v) => (
        <Sequence key={v.id} name={`Голос ${v.id}`} from={Math.round(v.start * FPS)} layout="none">
          <Audio src={staticFile(v.src)} volume={VOICE_VOLUME} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
