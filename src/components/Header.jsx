import { useEffect, useState } from "react";
import { CtaButton } from "./shared.jsx";

export function Announcement({ content }) {
  const a = content.announcement;
  return (
    <div className="bg-deep px-4 py-2 text-center text-[14px] text-white on-dark">
      <span>{a.text}</span>{" "}
      <a href={a.link} className="ml-1 whitespace-nowrap font-medium text-[#BBD7F3] underline underline-offset-4 hover:text-white">
        {a.linkLabel}
      </a>
    </div>
  );
}

// Aparência do menu conforme o que está atrás dele
const ESTILOS = {
  topo: "bg-transparent text-white on-dark", // sobre o vídeo do topo
  claro: "bg-bg text-ink",
  fadeClaro: "bg-transparent text-ink", // parte clara do degradê final
  fadeMeio: "bg-transparent text-ink", // azul claro do degradê: a logo escurece para não sumir
  fadeAzul: "bg-transparent text-white on-dark", // parte azul do degradê
  azul: "bg-action text-white on-dark", // depois do degradê, para o texto da página não passar por trás
};

function fundoDoMenu() {
  if (window.scrollY <= 40) return "topo";
  const passagem = document.getElementById("passagem-final");
  const topo = passagem ? passagem.getBoundingClientRect().top : Infinity;
  if (topo > 48) return "claro";
  const altura = 36 - topo; // ponto do degradê que está atrás do meio do menu
  if (altura < 70) return "fadeClaro";
  if (altura < 175) return "fadeMeio";
  return topo >= -168 ? "fadeAzul" : "azul"; // a 168px o menu (72px) alcança o título, que começa em 240px
}

export function Nav({ content }) {
  const [open, setOpen] = useState(false);
  const [fundo, setFundo] = useState("topo");
  useEffect(() => {
    const f = () => setFundo(fundoDoMenu());
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => {
      window.removeEventListener("scroll", f);
      window.removeEventListener("resize", f);
    };
  }, []);
  const estilo = ESTILOS[open ? "claro" : fundo];
  // sobre o azul a logo azul sumiria: usa a versão na cor do fundo
  const sobreAzul = !open && (fundo === "fadeAzul" || fundo === "azul");
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${estilo}`}>
      <div className="container-s flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${content.site.name}, início`}>
          <img src={sobreAzul ? content.site.logoClaro : content.site.logo} alt={content.site.logoAlt} className={`h-9 w-9 ${!open && fundo === "fadeMeio" ? "brightness-50" : ""}`} />
          <span className={`font-display text-[26px] font-semibold tracking-tight ${sobreAzul ? "text-bg" : ""}`}>{content.site.name}</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {content.nav.map((l) => (
            <a key={l.href} href={l.href} className="text-[16px] hover:opacity-70">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden lg:block"><CtaButton className={`${estilo.includes("text-ink") ? "btn-primary" : "btn-light"} px-4 py-2 font-normal`} content={content} /></div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-current/50 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-0 z-50 flex flex-col bg-bg text-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="container-s flex h-[72px] items-center justify-between">
            <span className="flex items-center gap-2.5">
              <img src={content.site.logo} alt="" className="h-9 w-9" />
              <span className="font-display text-[26px] font-semibold">{content.site.name}</span>
            </span>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-ink/30" aria-label="Fechar menu" onClick={() => setOpen(false)} autoFocus>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav className="container-s flex flex-1 flex-col justify-center gap-5" aria-label="Menu móvel">
            {content.nav.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display text-[40px] leading-tight text-ink">{l.label}</a>
            ))}
            <div className="pt-6" onClick={() => setOpen(false)}><CtaButton content={content} /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
