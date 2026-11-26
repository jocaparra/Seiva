export default function Logos({ content }) {
  const l = content.logos;
  return (
    <div>
      <h2 className="mb-5 text-[17px] font-medium text-white">{l.title}</h2>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-5 md:gap-x-14">
        {l.items.map((it) => (
          <li key={it.name}>
            <img src={it.src} alt={it.name} className={`w-auto ${it.size}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
