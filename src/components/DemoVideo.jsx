import { useEffect, useRef, useState } from "react";

const menosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Vídeo sem botões: enquanto está na tela, roda mudo e em repetição.
 * Um clique recomeça do início com som; outro clique tira o som.
 */
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
      {/* área de clique invisível sobre o vídeo inteiro; o contorno só aparece para quem navega pelo teclado */}
      <button type="button" onClick={alternar} aria-label={comSom ? video.desligarSom : video.ligarSom} className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-action" />
    </div>
  );
}
