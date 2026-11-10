import { CtaButton, Video, Reveal } from "./shared.jsx";

export default function Hero({ content }) {
  const h = content.hero;
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-deep on-dark">
      <div className="absolute inset-0 -z-10">
        {h.video || h.poster ? (
          <Video src={h.video} srcMobile={h.videoMobile} poster={h.poster} alt={h.posterAlt} background className="h-full w-full" />
        ) : null}
        {/* sobreposição escura leve para dar leitura ao texto (cor chapada, sem gradiente) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container-s pb-14 pt-32 md:pb-24">
        <Reveal as="h1" className="max-w-[22ch] font-serif font-medium leading-[1.02] tracking-[-0.025em] text-white" style={{ fontSize: "clamp(2.75rem, 8vw, 5.25rem)" }}>
          {h.title}
        </Reveal>
        <Reveal as="p" delay={100} className="mt-6 max-w-[34rem] text-[18px] text-white md:text-[20px]">{h.subtitle}</Reveal>
        <Reveal delay={200} className="mt-9"><CtaButton className="btn-light" content={content} /></Reveal>
      </div>
    </section>
  );
}
