import { useEffect, useRef, useState } from "react";

export default function Modal({ content, onClose }) {
  const f = content.form;
  const ref = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    const el = ref.current;
    el.querySelector("input,button")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const f = [...el.querySelectorAll("a,button,input,select,textarea")].filter((x) => !x.disabled);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; prev?.focus?.(); };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      if (f.endpoint) {
        const r = await fetch(f.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error("falha");
      } else {
        console.info("[Seiva] Formulário (simulado, configure form.endpoint em content.js):", data);
        await new Promise((r) => setTimeout(r, 500));
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const L = f.fields;
  const input = "mt-1.5 w-full rounded-xl border border-ink/30 bg-white px-4 py-3 text-[16px] text-ink focus:border-action";
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-deep/70 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="modal-t" className="relative my-6 w-full max-w-[560px] rounded-3xl bg-bg p-6 md:p-9">
        <button type="button" onClick={onClose} aria-label={f.close} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-ink/30 hover:bg-ink hover:text-white">
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
        {status === "done" ? (
          <div className="py-8 text-center" role="status">
            <img src={content.site.logo} alt="" className="mx-auto h-14 w-14" />
            <h2 id="modal-t" className="mt-5 font-serif text-[34px] font-medium leading-tight text-ink">{f.successTitle}</h2>
            <p className="mx-auto mt-3 max-w-[26rem] text-ink">{f.successText}</p>
            <button type="button" onClick={onClose} className="btn-primary mt-8">{f.close}</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate={false}>
            <h2 id="modal-t" className="pr-10 font-serif text-[32px] font-medium leading-tight text-ink">{f.title}</h2>
            <p className="mt-2 text-[16px] text-ink">{f.intro}</p>
            <div className="mt-6 space-y-4">
              <label className="block text-[15px] font-medium text-ink">{L.name}<input name="nome" required autoComplete="name" className={input} /></label>
              <label className="block text-[15px] font-medium text-ink">{L.org}<input name="organizacao" required autoComplete="organization" className={input} /></label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-[15px] font-medium text-ink">{L.email}<input type="email" name="email" required autoComplete="email" className={input} /></label>
                <label className="block text-[15px] font-medium text-ink">{L.whatsapp}<input type="tel" name="whatsapp" required autoComplete="tel" inputMode="tel" className={input} /></label>
              </div>
              <label className="block text-[15px] font-medium text-ink">{L.revenue}
                <select name="faturamento" required defaultValue="" className={input}>
                  {f.revenueOptions.map((o, i) => <option key={o} value={i === 0 ? "" : o} disabled={i === 0}>{o}</option>)}
                </select>
              </label>
              <label className="block text-[15px] font-medium text-ink">{L.question}<textarea name="pergunta" rows="3" className={input} /></label>
            </div>
            {status === "error" && <p role="alert" className="mt-4 text-[15px] font-medium text-[#B3261E]">{f.error}</p>}
            <button type="submit" disabled={status === "sending"} className="btn-primary mt-6 w-full disabled:opacity-60">{status === "sending" ? f.sending : f.submit}</button>
          </form>
        )}
      </div>
    </div>
  );
}
