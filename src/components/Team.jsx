import { Reveal, Img } from "./shared.jsx";

export default function Team({ content }) {
  const t = content.team;
  return (
    <section id={t.id} className="bg-soft py-20 md:py-32">
      <div className="container-s">
        <Reveal as="h2" className="h-section max-w-[28ch]">{t.title}</Reveal>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {t.people.map((p, i) => (
            <Reveal as="li" key={p.role} delay={i * 80}>
              <Img src={p.photo} alt={p.alt} label="[TROCAR] retrato" loading="lazy" className="aspect-[4/5] w-full rounded-2xl" />
              <h3 className="mt-5 font-serif text-[24px] font-medium leading-tight text-ink">{p.role}</h3>
              <p className="mt-2 text-[17px] text-ink">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
