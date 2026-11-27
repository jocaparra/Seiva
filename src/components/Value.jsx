import { CtaButton, Reveal } from "./shared.jsx";
import DemoVideo from "./DemoVideo.jsx";

export default function Value({ content }) {
  const v = content.value;
  return (
    <section id={v.id} className="py-20 md:py-36">
      <div className="container-s">
        <Reveal as="h2" className="font-display font-medium leading-[1.1] tracking-[-0.025em] text-ink max-w-[30ch] md:max-w-[34ch] [text-wrap:balance]" style={{ fontSize: "clamp(2.1rem, 5vw, 3.75rem)" }}>
          {v.title}
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-12 max-w-[960px] md:mt-16">
          <DemoVideo video={v.video} />
          <div className="mt-8 flex justify-center">
            <CtaButton className="btn-primary" content={content} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
