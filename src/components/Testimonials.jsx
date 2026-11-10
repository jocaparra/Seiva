import { useState } from "react";
import { Reveal, Img, Video, Arrow } from "./shared.jsx";

export default function Testimonials({ content }) {
  const t = content.testimonials;
  const n = t.items.length;
  const [i, setI] = useState(0);
  const go = (k) => setI((k + n) % n);
  const cur = t.items[i];
  const onKey = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
  };
  return (
    <section className="py-20 md:py-32" aria-labelledby="dep-t">
      <div className="container-s" onKeyDown={onKey}>
        <Reveal as="h2" id="dep-t" className="h-section max-w-[28ch]">{t.title}</Reveal>
        <div className="mt-12 md:mt-16" role="group" aria-roledescription="carrossel" aria-label={t.title}>
          <div className="overflow-hidden rounded-3xl bg-deep">
            {cur.video ? (
              <Video key={i} src={cur.video} poster={cur.thumb} controls alt={cur.caption} className="aspect-video w-full" />
            ) : (
              <Img key={i} src={cur.thumb} alt={cur.alt} label="[TROCAR] vídeo do depoimento" className="aspect-video w-full" />
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[18px] text-ink" aria-live="polite">{cur.caption}</p>
            <div className="flex items-center gap-3">
              <span className="mr-2 text-[15px] text-mute">{t.counter(i + 1, n)}</span>
              <button type="button" className="arrow-btn" aria-label={t.prev} onClick={() => go(i - 1)}><Arrow dir="left" /></button>
              <button type="button" className="arrow-btn" aria-label={t.next} onClick={() => go(i + 1)}><Arrow /></button>
            </div>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-3 md:gap-5">
            {t.items.map((it, k) => (
              <li key={k}>
                <button type="button" onClick={() => go(k)} aria-current={k === i} aria-label={`${t.counter(k + 1, n)}: ${it.caption}`} className={`block w-full overflow-hidden rounded-xl transition ${k === i ? "outline outline-4 outline-action" : "opacity-70 hover:opacity-100"}`}>
                  <Img src={it.thumb} alt="" label="[TROCAR] miniatura" className="aspect-video w-full" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
