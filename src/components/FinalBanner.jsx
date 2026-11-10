import { Reveal, CtaButton } from "./shared.jsx";

export default function FinalBanner({ content }) {
  const b = content.finalBanner;
  return (
    <section id={b.id} className="bg-deep py-24 md:py-40 on-dark">
      <div className="container-s">
        <Reveal as="h2" className="max-w-[22ch] font-serif font-medium leading-[1.05] tracking-[-0.02em] text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 5.25rem)" }}>
          {b.title}
        </Reveal>
        <Reveal delay={120} className="mt-10"><CtaButton className="btn-light" content={content} /></Reveal>
      </div>
    </section>
  );
}
