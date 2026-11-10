import { createContext, useContext, useEffect, useRef, useState } from "react";

export const ModalContext = createContext({ open: () => {} });
export const useModal = () => useContext(ModalContext);

export const usePrefersReducedMotion = () => {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(m.matches);
    const f = () => setR(m.matches);
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return r;
};

// Retorna [ref, visivel]; dispara uma vez (ou sempre, com once=false)
export function useInView(once = true, margin = "0px 0px -12% 0px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setSeen(true); if (once) io.disconnect(); }
        else if (!once) setSeen(false);
      },
      { rootMargin: margin, threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin]);
  return [ref, seen];
}

// Entrada suave ao rolar. delay em ms.
export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const [ref, seen] = useInView();
  return (
    <Tag ref={ref} style={{ "--d": `${delay}ms`, ...style }} className={`reveal ${seen ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function CtaButton({ className = "btn-primary", children, content }) {
  const { open } = useModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children ?? content.cta}
    </button>
  );
}

// Imagem com carregamento sob demanda; sem src mostra espaço reservado
export function Img({ src, alt = "", className = "", label = "[TROCAR] imagem", ...rest }) {
  if (src) return <img src={src} alt={alt} loading="lazy" decoding="async" className={`object-cover ${className}`} {...rest} />;
  return (
    <div role="img" aria-label={alt || label} className={`grid place-items-center bg-line/60 text-center text-sm text-mute ${className}`}>
      <span className="px-4">{label}</span>
    </div>
  );
}

// Vídeo simples: aceita URL e imagem de capa. Hero usa autoplay mudo em loop.
export function Video({ src, srcMobile, poster, alt = "", background = false, controls = false, className = "", playing, ...rest }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const v = ref.current;
    if (!v || !background) return;
    if (reduced) v.pause(); else v.play().catch(() => {});
  }, [reduced, background]);
  if (!src) return poster ? <img src={poster} alt={alt} className={`object-cover ${className}`} /> : null;
  return (
    <video
      ref={ref}
      poster={poster || undefined}
      className={`object-cover ${className}`}
      preload={background ? "metadata" : "none"}
      aria-label={alt || undefined}
      aria-hidden={background ? true : undefined}
      {...(background ? { autoPlay: !reduced, muted: true, loop: true, playsInline: true } : { controls, playsInline: true })}
      {...rest}
    >
      {srcMobile && <source src={srcMobile} media="(max-width: 767px)" type="video/mp4" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}

export const Arrow = ({ dir = "right" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className={dir === "left" ? "rotate-180" : ""}>
    <path d="M4 10h12m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
