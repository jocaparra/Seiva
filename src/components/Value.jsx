import { Reveal } from "./shared.jsx";
import DemoVideo from "./DemoVideo.jsx";

export default function Value({ content }) {
  const v = content.value;
  return (
    <section id={v.id} className="secao">
      <div className="container-s">
        <Reveal as="h2" className="font-display font-medium leading-[1.1] tracking-[-0.025em] text-ink max-w-[30ch] md:max-w-[34ch] [text-wrap:balance]" style={{ fontSize: "clamp(2.1rem, min(5vw, 6.6svh), 3.75rem)" }}>
          {v.title}
        </Reveal>
        <Reveal delay={120} className="mt-12 lg:mt-[4svh]">
          {/* moldura em degradê azul, para o vídeo (de fundo creme) não se misturar com a página */}
          <div className="-mx-2 rounded-[28px] bg-[linear-gradient(135deg,#2F6DB5_0%,#4890D6_45%,#CFE0F5_100%)] px-4 py-8 md:mx-0 md:rounded-[48px] md:p-16 lg:px-16 lg:py-[4svh]">
            {/* a largura acompanha a altura da tela, para título e vídeo caberem juntos */}
            <div className="mx-auto lg:max-w-[max(560px,calc(130svh_-_280px))]">
              <DemoVideo video={v.video} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
