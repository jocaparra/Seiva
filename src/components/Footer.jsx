import { useModal } from "./shared.jsx";

export default function Footer({ content }) {
  const f = content.footer;
  const { open } = useModal();
  return (
    <footer className="bg-bg py-16 md:py-20">
      <div className="container-s">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <a href="#top" className="flex items-center gap-3 self-start" aria-label={`${content.site.name}, início`}>
            <img src={content.site.logo} alt={content.site.logoAlt} loading="lazy" className="h-12 w-12" />
            <span className="font-serif text-[34px] font-semibold tracking-tight text-ink">{content.site.name}</span>
          </a>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {f.groups.map((g) => (
              <div key={g.title}>
                <h2 className="text-[16px] font-semibold text-ink">{g.title}</h2>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} onClick={l.modal ? (e) => { e.preventDefault(); open(); } : undefined} className="text-[16px] text-mute hover:text-action hover:underline">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-16 flex flex-col gap-4 bg-soft/0 text-[15px] text-mute md:flex-row md:items-center md:justify-between">
          <p>© {content.site.year} {content.site.name}. {f.rights}</p>
          <p className="flex gap-6">
            <a href={f.terms.href} className="hover:text-action hover:underline">{f.terms.label}</a>
            <a href={f.privacy.href} className="hover:text-action hover:underline">{f.privacy.label}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
