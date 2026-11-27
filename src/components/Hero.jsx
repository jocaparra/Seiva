import { CtaButton, Video, Reveal } from "./shared.jsx";
import Logos from "./Logos.jsx";

export default function Hero({ content }) {
  const h = content.hero;
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-deep on-dark">
      <div className="absolute inset-0 -z-10">
        {h.video || h.poster ? (
          <Video src={h.video} srcMobile={h.videoMobile} poster={h.poster} alt={h.posterAlt} background className="h-full w-full -scale-x-100" />
        ) : null}
        {/* véu preto chapado: o vídeo clínico é muito claro, então ele mantém o hero escuro e o texto legível */}
        <div className="absolute inset-0 bg-black/70" />
      </div>
      {/* um único Reveal: texto, botão e logos entram juntos ao abrir a página */}
      <Reveal className={`container-s pt-32 ${content.logos.visivel ? "pb-8 md:pb-10" : "pb-20 md:pb-24"}`}>
        <h1 className="max-w-[22ch] whitespace-pre-line font-display font-medium leading-[1.02] tracking-[-0.025em] text-white" style={{ fontSize: "clamp(2.75rem, 8vw, 5.25rem)" }}>
          {h.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-[18px] text-white md:text-[20px]">{h.subtitle}</p>
        <div className="mt-9"><CtaButton className="btn-light" content={content} /></div>
        {content.logos.visivel ? (
          <div className="mt-14 md:mt-16"><Logos content={content} /></div>
        ) : null}
      </Reveal>
    </section>
  );
}
