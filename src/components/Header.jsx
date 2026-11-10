import { useEffect, useState } from "react";
import { CtaButton } from "./shared.jsx";

export function Announcement({ content }) {
  const a = content.announcement;
  return (
    <div className="bg-deep px-4 py-2 text-center text-[14px] text-white on-dark">
      <span>{a.text}</span>{" "}
      <a href={a.link} className="ml-1 whitespace-nowrap font-medium text-[#BBD7F3] underline underline-offset-4 hover:text-white">
        {a.linkLabel}
      </a>
    </div>
  );
}

export function Nav({ content }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const solid = scrolled || open;
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? "bg-bg text-ink" : "bg-transparent text-white on-dark"}`}>
      <div className="container-s flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${content.site.name}, início`}>
          <img src={content.site.logo} alt={content.site.logoAlt} className="h-9 w-9" />
          <span className="font-serif text-[26px] font-semibold tracking-tight">{content.site.name}</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {content.nav.map((l) => (
            <a key={l.href} href={l.href} className="text-[16px] hover:opacity-70">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden lg:block"><CtaButton className={solid ? "btn-primary" : "btn-light"} content={content} /></div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-current/50 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              {open ? <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="menu-mobile" className="fixed inset-0 z-50 flex flex-col bg-bg text-ink lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="container-s flex h-[72px] items-center justify-between">
            <span className="flex items-center gap-2.5">
              <img src={content.site.logo} alt="" className="h-9 w-9" />
              <span className="font-serif text-[26px] font-semibold">{content.site.name}</span>
            </span>
            <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-ink/30" aria-label="Fechar menu" onClick={() => setOpen(false)} autoFocus>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </div>
          <nav className="container-s flex flex-1 flex-col justify-center gap-5" aria-label="Menu móvel">
            {content.nav.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-serif text-[40px] leading-tight text-ink">{l.label}</a>
            ))}
            <div className="pt-6" onClick={() => setOpen(false)}><CtaButton content={content} /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
