import { Reveal } from "./shared.jsx";

export default function Security({ content }) {
  const s = content.security;
  return (
    <section id={s.id} className="bg-soft py-20 md:py-32">
      <div className="container-s">
        <Reveal as="h2" className="h-section max-w-[26ch]">{s.title}</Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 md:mt-16">
          {s.items.map((it, i) => (
            <Reveal key={it.title} delay={i * 90} className="rounded-3xl bg-bg p-7 md:p-9">
              <h3 className="font-serif text-[26px] font-medium leading-tight text-ink">{it.title}</h3>
              <p className="mt-3 text-ink">{it.text}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-[44rem] text-ink">
          {s.lgpd} <span className="text-mute">{s.legalNote}</span>
        </p>
      </div>
    </section>
  );
}
