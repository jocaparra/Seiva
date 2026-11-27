import { useRef, useState } from "react";

/** Vídeo que só carrega e toca, com som, quando a pessoa clica. */
export default function DemoVideo({ video }) {
  const ref = useRef(null);
  const [iniciado, setIniciado] = useState(false);
  const tocar = () => {
    setIniciado(true);
    ref.current.play().catch(() => {});
    ref.current.focus();
  };
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-line bg-bg shadow-[0_24px_60px_rgba(27,42,51,0.10)]">
      <video ref={ref} className="h-full w-full" src={video.src} poster={video.poster} preload="none" playsInline controls={iniciado} onPlay={() => setIniciado(true)} aria-label={video.descricao} />
      {!iniciado && (
        <button type="button" onClick={tocar} aria-label={video.assistir} className="group absolute inset-0 flex items-end justify-start p-3 md:p-6">
          {/* no canto, para não cobrir os documentos; no celular, só o ícone */}
          <span className="inline-flex items-center gap-3 rounded-full bg-action p-1.5 text-[16px] font-medium text-white shadow-lg transition group-hover:bg-actionDark md:py-2.5 md:pl-2.5 md:pr-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-action">
              <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden="true"><path d="M1 1.5v13l12-6.5z" fill="currentColor" /></svg>
            </span>
            <span className="hidden md:inline">{video.assistir}</span>
          </span>
        </button>
      )}
    </div>
  );
}
