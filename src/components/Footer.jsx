import { useModal } from "./shared.jsx";

export default function Footer({ content }) {
  const f = content.footer;
  const { open } = useModal();
  return (
    <footer className="on-dark pb-10 pt-4 baixa:pb-6 baixa:pt-0">
      <div className="container-s">
        <div className="grid gap-12 border-t border-white/25 pt-12 lg:grid-cols-[1.2fr_2fr] baixa:pt-8">
          <a href="#top" className="flex items-center gap-3 self-start" aria-label={`${content.site.name}, início`}>
            <img src={content.site.logoClaro} alt={content.site.logoAlt} loading="lazy" className="h-12 w-12" />
            <span className="font-display text-[34px] font-semibold tracking-tight text-bg">{content.site.name}</span>
          </a>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {f.groups.map((g) => (
              <div key={g.title}>
                <h2 className="text-[16px] font-semibold text-white">{g.title}</h2>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} onClick={l.modal ? (e) => { e.preventDefault(); open(); } : undefined} className="text-[16px] text-white/90 hover:text-white hover:underline">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 baixa:mt-6 flex flex-col gap-4 text-[15px] text-white/80 md:flex-row md:items-center md:justify-between">
          <p>© {content.site.year} {content.site.name}. {f.rights}</p>
          <p className="flex gap-6">
            {[f.terms, f.privacy].filter((l) => l.visivel).map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white hover:underline">{l.label}</a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
