import { Reveal } from "./shared.jsx";
import DemoVideo from "./DemoVideo.jsx";

export default function Value({ content }) {
  const v = content.value;
  return (
    <section id={v.id} className="py-20 md:py-36">
      <div className="container-s">
        <Reveal as="h2" className="font-display font-medium leading-[1.1] tracking-[-0.025em] text-ink max-w-[30ch] md:max-w-[34ch] [text-wrap:balance]" style={{ fontSize: "clamp(2.1rem, 5vw, 3.75rem)" }}>
          {v.title}
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-16">
          {/* moldura em degradê azul, para o vídeo (de fundo creme) não se misturar com a página */}
          <div className="-mx-2 rounded-[28px] bg-[linear-gradient(135deg,#2F6DB5_0%,#4890D6_45%,#CFE0F5_100%)] px-4 py-8 md:mx-0 md:rounded-[48px] md:p-16 lg:px-24 lg:py-24">
            <DemoVideo video={v.video} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
