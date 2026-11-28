import { useEffect, useRef, useState } from "react";

const menosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Vídeo sem botão de play: enquanto está na tela, roda mudo e em repetição.
 * Um clique (no vídeo ou no ícone de som) recomeça do início com som; outro clique tira o som.
 */
/** Alto-falante riscado quando está mudo; com ondas quando o som está ligado. */
function IconeSom({ ligado }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="relative h-3 w-3 md:h-4 md:w-4">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" />
      {ligado ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : <path d="m16 9 6 6m0-6-6 6" />}
    </svg>
  );
}

export default function DemoVideo({ video }) {
  const ref = useRef(null);
  const [comSom, setComSom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observador = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // quem pede menos movimento no aparelho vê a capa até clicar
          if (!menosMovimento()) el.play().catch(() => {});
        } else {
          // saiu da tela: para e volta a ficar mudo
          el.pause();
          el.muted = true;
          setComSom(false);
        }
      },
      { threshold: 0.4 },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  const silenciar = () => {
    const el = ref.current;
    el.muted = true;
    setComSom(false);
    if (menosMovimento()) el.pause();
    else el.play().catch(() => {});
  };

  const alternar = () => {
    if (comSom) return silenciar();
    const el = ref.current;
    el.muted = false;
    el.currentTime = 0;
    setComSom(true);
    el.play().catch(() => {});
  };

  // ao terminar com som, volta a rodar mudo desde o começo
  const aoTerminar = () => {
    ref.current.currentTime = 0;
    silenciar();
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-bg shadow-[0_24px_60px_rgba(15,42,46,0.28)] md:rounded-3xl">
      <video ref={ref} className="h-full w-full" src={video.src} poster={video.poster} preload="none" playsInline muted={!comSom} loop={!comSom} onEnded={aoTerminar} aria-label={video.descricao} />
      {/* área de clique invisível sobre o vídeo inteiro; teclado e leitor de tela usam o botão do ícone */}
      <div onClick={alternar} aria-hidden="true" className="absolute inset-0 cursor-pointer" />
      <button type="button" onClick={alternar} aria-label={comSom ? video.desligarSom : video.ligarSom} className="group absolute bottom-2.5 right-2.5 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-black/80 hover:shadow-[0_6px_16px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-action motion-safe:hover:scale-[1.14] motion-safe:active:scale-95 md:bottom-4 md:right-4 md:h-8 md:w-8">
        {/* anel que pulsa só enquanto o mouse está sobre o ícone */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border-2 border-black/60 opacity-0 motion-safe:group-hover:animate-halo" />
        <IconeSom ligado={comSom} />
      </button>
    </div>
  );
}
