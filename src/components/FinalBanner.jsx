import { Reveal, CtaButton } from "./shared.jsx";

export default function FinalBanner({ content }) {
  const b = content.finalBanner;
  return (
    <section id={b.id} className="on-dark flex flex-1 flex-col justify-center pb-20 pt-64 md:pb-24 lg:pb-12 lg:pt-60 baixa:pb-6">
      <div className="container-s">
        <Reveal as="h2" className="max-w-[22ch] font-display font-medium leading-[1.05] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(2.5rem, min(7vw, 9svh), 5.25rem)" }}>
          {b.title}
        </Reveal>
        <Reveal delay={120} className="mt-10 baixa:mt-7"><CtaButton className="btn-light" content={content} /></Reveal>
      </div>
    </section>
  );
}
