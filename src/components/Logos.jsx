export default function Logos({ content }) {
  const l = content.logos;
  return (
    <section aria-labelledby="logos-t" className="py-14 md:py-20">
      <div className="container-s">
        <h2 id="logos-t" className="mb-8 text-center text-[17px] font-medium text-mute">{l.title}</h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20">
          {l.items.map((it) => (
            <li key={it.name} className="grid h-12 w-32 place-items-center md:h-14 md:w-40">
              {it.src ? (
                <img src={it.src} alt={it.name} loading="lazy" className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="grid h-full w-full place-items-center rounded-xl bg-line/70 text-sm text-mute">{it.name}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
