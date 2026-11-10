import { Img } from "./shared.jsx";

export default function Logos({ content }) {
  const l = content.logos;
  // repete a lista até a faixa ficar longa o bastante para rolar sem buracos
  const base = l.items.length ? Array.from({ length: Math.ceil(8 / l.items.length) }, () => l.items).flat() : [];
  const Item = ({ it, dup }) => (
    <li className={`mx-10 shrink-0 md:mx-14 ${dup ? "marquee-dup" : ""}`} aria-hidden={dup ? true : undefined}>
      {it.src ? (
        <div className="grid h-14 w-40 md:h-16 md:w-44 place-items-center"><img src={it.src} alt={dup ? "" : it.name} loading="lazy" className="max-h-full max-w-full object-contain" /></div>
      ) : (
        <div className="grid h-14 w-44 place-items-center rounded-xl bg-line/70 text-sm text-mute">{it.name}</div>
      )}
    </li>
  );
  return (
    <section aria-labelledby="logos-t" className="py-14 md:py-20">
      <h2 id="logos-t" className="container-s mb-8 text-center text-[17px] font-medium text-mute">{l.title}</h2>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track">
          {base.map((it, i) => <Item key={i} it={it} dup={i >= l.items.length} />)}
          {base.map((it, i) => <Item key={`d${i}`} it={it} dup />)}
        </ul>
      </div>
    </section>
  );
}
