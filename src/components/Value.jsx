import { Reveal, Arrow } from "./shared.jsx";

export default function Value({ content }) {
  const v = content.value;
  return (
    <section id={v.id} className="py-20 md:py-36">
      <div className="container-s">
        <Reveal as="h2" className="font-serif font-medium leading-[1.08] tracking-[-0.02em] text-ink max-w-[30ch] md:max-w-[34ch]" style={{ fontSize: "clamp(2.1rem, 5.6vw, 4.5rem)" }}>
          {v.title}
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <a href="#para-quem" className="inline-flex items-center gap-2 text-[17px] font-medium text-action underline underline-offset-[6px] hover:text-actionDark">
            {v.link} <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
