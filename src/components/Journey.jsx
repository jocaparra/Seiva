import { useRef, useState } from "react";
import { Reveal, Img, Arrow } from "./shared.jsx";
import JourneyArt from "./JourneyArt.jsx";

export default function Journey({ content }) {
  const j = content.journey;
  const [i, setI] = useState(0);
  const n = j.steps.length;
  const tabs = useRef([]);
  const go = (k, focus = false) => {
    const x = (k + n) % n;
    setI(x);
    if (focus) tabs.current[x]?.focus();
  };
  const onKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); go(i + 1, true); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); go(i - 1, true); }
    if (e.key === "Home") { e.preventDefault(); go(0, true); }
    if (e.key === "End") { e.preventDefault(); go(n - 1, true); }
  };
  const s = j.steps[i];
  return (
    <section id={j.id} className="py-20 md:py-32">
      <div className="container-s">
        <Reveal as="h2" className="h-section max-w-[16ch]">{j.title}</Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 md:mt-16">
          <div>
            <div role="tablist" aria-orientation="vertical" aria-label={j.title} onKeyDown={onKey} className="flex flex-col">
              {j.steps.map((st, k) => {
                const active = k === i;
                return (
                  <div key={st.title} className={`rounded-2xl px-5 py-4 transition-colors ${active ? "bg-soft" : ""}`}>
                    <button
                      ref={(el) => (tabs.current[k] = el)}
                      role="tab"
                      id={`tab-${k}`}
                      aria-selected={active}
                      aria-controls="journey-panel"
                      tabIndex={active ? 0 : -1}
                      onClick={() => go(k)}
                      className={`w-full text-left font-serif text-[26px] font-medium leading-tight md:text-[32px] ${active ? "text-ink" : "text-mute hover:text-ink"}`}
                    >
                      {st.title}
                    </button>
                    {active && <p className="mt-3 max-w-[30rem] text-ink">{st.text}</p>}
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center gap-3 px-5">
              <button type="button" className="arrow-btn" aria-label={j.prev} onClick={() => go(i - 1)}><Arrow dir="left" /></button>
              <button type="button" className="arrow-btn" aria-label={j.next} onClick={() => go(i + 1)}><Arrow /></button>
              <span className="ml-2 text-[15px] text-mute" aria-live="polite">{i + 1} de {n}</span>
            </div>
          </div>
          <div id="journey-panel" role="tabpanel" aria-labelledby={`tab-${i}`} className="overflow-hidden rounded-3xl bg-soft">
            {s.image ? (
              <Img key={i} src={s.image} alt={s.alt} className="aspect-[4/3] w-full animate-[fadeIn_.5s_ease]" />
            ) : (
              <JourneyArt key={i} id={s.art} label={s.alt} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
