import { useEffect, useState } from "react";
import { Reveal, useInView, usePrefersReducedMotion, Video } from "./shared.jsx";

// Contador que avança em loop só enquanto a seção está visível
function useLoop(active, period, total, reduced) {
  const [t, setT] = useState(reduced ? total - 1 : 0);
  useEffect(() => {
    if (reduced) { setT(total - 1); return; }
    if (!active) return;
    const id = setInterval(() => setT((x) => (x + 1) % total), period);
    return () => clearInterval(id);
  }, [active, period, total, reduced]);
  return t;
}

const ROW_H = 56;
const chanceStyle = { Alta: "bg-action text-white", Média: "bg-soft text-ink", Baixa: "bg-line text-ink" };

function AiDemo({ d }) {
  const reduced = usePrefersReducedMotion();
  const [ref, seen] = useInView(false, "0px");
  const t = useLoop(seen, 650, 16, reduced);
  const shown = Math.min(t, d.rows.length);
  const sorted = t >= 8 || reduced;
  return (
    <div ref={ref} className="rounded-2xl bg-white p-4 md:p-6" role="img" aria-label={`${d.title}: ${d.text}`}>
      <div className="grid grid-cols-[1.1fr_1fr_.9fr_1fr] gap-2 px-3 pb-3 text-[14px] font-medium text-mute">
        <span>{d.headers.item}</span><span>{d.headers.value}</span><span>{d.headers.chance}</span><span>{d.headers.deadline}</span>
      </div>
      <div className="relative" style={{ height: ROW_H * d.rows.length }} aria-hidden="true">
        {d.rows.map((r, i) => {
          const y = (sorted ? r.rank : i) * ROW_H;
          const visible = reduced || i < shown;
          return (
            <div
              key={r.item}
              className="glosa-row absolute inset-x-0 grid grid-cols-[1.1fr_1fr_.9fr_1fr] items-center gap-2 rounded-xl bg-bg px-3 text-[13px] whitespace-nowrap text-ink md:text-[15px]"
                           style={{ height: ROW_H - 8, transform: `translateY(${y}px)`, opacity: visible ? 1 : 0 }}
            >
              <span className="font-medium">{r.item}</span>
              <span>{r.value}</span>
              <span><span className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${chanceStyle[r.chance]}`}>{r.chance}</span></span>
              <span>{r.deadline}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 px-3 text-[14px] text-mute" aria-hidden="true">{sorted ? d.sortedLabel : d.readingLabel}</p>
    </div>
  );
}

function ExpertDemo({ d }) {
  const reduced = usePrefersReducedMotion();
  const [ref, seen] = useInView(false, "0px");
  const t = useLoop(seen, 800, 13, reduced);
  const all = reduced;
  const on = (n) => (all || t >= n ? { opacity: 1, transform: "none" } : { opacity: 0, transform: "translateY(8px)" });
  return (
    <div ref={ref} className="relative rounded-2xl bg-white p-5 md:p-7" role="img" aria-label={`${d.title}: ${d.text}`}>
      <div aria-hidden="true">
        <p className="font-serif text-[22px] font-medium text-ink">{d.docTitle}</p>
        <ul className="mt-4 space-y-3 text-[16px] text-ink">
          {d.docLines.map((l, i) => (
            <li key={l} className="fade-step rounded-lg bg-bg px-3 py-2.5" style={on(i + 1)}>{l}</li>
          ))}
        </ul>
        <ul className="mt-5 space-y-2 text-[15px] text-ink">
          {d.checks.map((c, i) => {
            const ok = all || t >= i + 4;
            return (
              <li key={c} className="flex items-center gap-3">
                <span className={`grid h-6 w-6 place-items-center rounded-full border transition-colors duration-300 ${ok ? "border-action bg-action text-white" : "border-mute/50 text-transparent"}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5 5 9l5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {c}
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-[14px] text-mute">{all || t >= 8 ? "" : d.reviewing}</span>
          <span className="fade-step rounded-full bg-deep px-4 py-2 text-[14px] font-medium text-white" style={all || t >= 8 ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(.9)" }}>
            {d.approved}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Demo({ content }) {
  const d = content.demo;
  const blocks = [
    { data: d.ai, node: <AiDemo d={d.ai} /> },
    { data: d.experts, node: <ExpertDemo d={d.experts} /> },
  ];
  return (
    <section id="para-quem" className="py-20 md:py-32" aria-labelledby="demo-t">
      <div className="container-s">
        <Reveal as="h2" id="demo-t" className="h-section max-w-[26ch]">{d.title}</Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2 md:mt-16">
          {blocks.map(({ data, node }, i) => (
            <Reveal key={data.title} delay={i * 100} className="rounded-3xl bg-soft p-6 md:p-10">
              <h3 className="font-serif text-[30px] font-medium leading-tight text-ink md:text-[36px]">{data.title}</h3>
              <p className="mt-3 max-w-[30rem] text-ink">{data.text}</p>
              <div className="mt-8">
                {data.video ? <Video src={data.video} background className="aspect-[4/3] w-full rounded-2xl" /> : node}
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-[14px] text-mute">{d.note}</p>
      </div>
    </section>
  );
}
