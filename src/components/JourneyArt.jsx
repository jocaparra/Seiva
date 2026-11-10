// Ilustrações em código das etapas. Sem números inventados: só formas e rótulos.
const C = { brand: "#4890D6", action: "#2F6DB5", soft: "#E8F0FA", ink: "#1B2A33", mute: "#5A6B75", line: "#D5DCE2", bg: "#F6F4EE", deep: "#0F2A2E" };
const T = { fontFamily: "Inter, system-ui, sans-serif" };

const Frame = ({ title, children }) => (
  <>
    <rect x="40" y="36" width="560" height="408" rx="22" fill="#fff" />
    <circle cx="68" cy="64" r="5" fill={C.line} /><circle cx="86" cy="64" r="5" fill={C.line} /><circle cx="104" cy="64" r="5" fill={C.line} />
    <text x="130" y="69" fontSize="15" fill={C.mute} style={T}>{title}</text>
    {children}
  </>
);

const Check = ({ x, y, fill = C.action }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r="12" fill={fill} />
    <path d="M-5 0.5 -1.5 4 5.5-3.5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

function Diagnostico() {
  const bars = [["Documentação", 250], ["Codificação", 190], ["Prazo", 140], ["Autorização", 90]];
  return (
    <Frame title="Diagnóstico gratuito">
      <rect x="68" y="96" width="504" height="96" rx="16" fill={C.action} />
      <text x="92" y="130" fontSize="16" fill="#fff" style={T}>Dinheiro para recuperar</text>
      <rect x="92" y="146" width="190" height="22" rx="11" fill="#fff" opacity=".95" />
      <g transform="translate(520 144)">
        <circle r="26" fill="#fff" opacity=".18" />
        <circle cx="-3" cy="-3" r="10" stroke="#fff" strokeWidth="3.5" fill="none" />
        <path d="M5 5 12 12" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <text x="68" y="232" fontSize="16" fontWeight="600" fill={C.ink} style={T}>Onde estão os motivos de recusa</text>
      {bars.map(([l, w], i) => (
        <g key={l} transform={`translate(68 ${252 + i * 46})`}>
          <text y="20" fontSize="14" fill={C.mute} style={T}>{l}</text>
          <rect x="132" y="4" width="380" height="24" rx="12" fill={C.soft} />
          <rect x="132" y="4" width={w} height="24" rx="12" fill={i === 0 ? C.action : C.brand} className="art-grow" style={{ animationDelay: `${i * 120}ms`, "--w": w }} />
        </g>
      ))}
    </Frame>
  );
}

function Recuperacao() {
  const rows = [["Recurso enviado", C.soft, C.ink, false], ["Em análise pelo plano", C.soft, C.ink, false], ["Pago", C.action, "#fff", true]];
  return (
    <Frame title="Glosas passadas">
      {rows.map(([label, bg, fg, done], i) => (
        <g key={label} transform={`translate(68 ${100 + i * 92})`}><g className="art-rise" style={{ animationDelay: `${i * 140}ms` }}>
          <rect width="504" height="76" rx="16" fill={C.bg} />
          <rect x="18" y="18" width="40" height="40" rx="10" fill={C.soft} />
          <path d="M30 28h12l6 6v16H30z" fill="#fff" stroke={C.brand} strokeWidth="2" strokeLinejoin="round" />
          <rect x="74" y="24" width="150" height="10" rx="5" fill={C.line} />
          <rect x="74" y="44" width="100" height="10" rx="5" fill={C.line} opacity=".7" />
          <rect x="316" y="20" width="170" height="36" rx="18" fill={bg} />
          <text x="401" y="43" fontSize="14" fontWeight="500" textAnchor="middle" fill={fg} style={T}>{label}</text>
          {done && <Check x={298} y={38} fill={C.brand} />}
        </g></g>
      ))}
      <g transform="translate(68 388)">
        <rect width="504" height="40" rx="12" fill={C.soft} />
        <rect x="16" y="15" width="220" height="10" rx="5" fill={C.brand} />
        <text x="488" y="26" fontSize="14" textAnchor="end" fill={C.ink} style={T}>Defesa assinada por especialista</text>
      </g>
    </Frame>
  );
}

function Operacao() {
  const nodes = [["Glosa chega", 0], ["IA analisa", 1], ["Especialista assina", 2], ["Dinheiro volta", 3]];
  return (
    <Frame title="Operação contínua">
      <path d="M130 190H510" stroke={C.line} strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      {nodes.map(([l, i]) => {
        const x = 130 + i * (380 / 3);
        return (
          <g key={l} transform={`translate(${x} 190)`}>
            <circle r="34" fill={C.soft} />
            <circle r="34" fill={C.action} className="art-pulse" style={{ animationDelay: `${i * 0.9}s` }} />
            {i === 0 && <path d="M-12-10h24v20h-24zM-12-3h24" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinejoin="round" />}
            {i === 1 && <g stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round"><circle r="5" /><path d="M0-14v6M0 8v6M-14 0h6M8 0h6M-10-10l4 4M6 6l4 4M10-10l-4 4M-6 6l-4 4" /></g>}
            {i === 2 && <path d="M-13 8c4-12 8-14 10-4 2 8 6 2 8-6 2-4 6-4 8 2" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />}
            {i === 3 && <g><circle r="13" stroke="#fff" strokeWidth="2.6" fill="none" /><path d="M0-7v14M-4-3h6a3 3 0 0 1 0 6h-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" /></g>}
            <text y="64" fontSize="14" fontWeight="500" textAnchor="middle" fill={C.ink} style={T}>{l}</text>
          </g>
        );
      })}
      <path d="M500 290C500 350 140 350 140 296" stroke={C.brand} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="8 10" />
      <path d="M130 304l10-14 10 14" stroke={C.brand} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="170" y="372" width="300" height="48" rx="24" fill={C.soft} />
      <image href="/logo.svg" x="188" y="380" width="32" height="32" />
      <text x="232" y="402" fontSize="15" fill={C.ink} style={T}>A Seiva cuida de tudo, sem parar</text>
    </Frame>
  );
}

function Prevencao() {
  const pts = [[90, 150], [140, 168], [190, 160], [240, 200], [290, 214], [340, 250], [364, 262]];
  const d = pts.map((p, i) => (i ? "L" : "M") + p.join(" ")).join(" ");
  return (
    <Frame title="Prevenção e relatórios">
      <text x="68" y="112" fontSize="16" fontWeight="600" fill={C.ink} style={T}>Glosas ao longo do tempo</text>
      <rect x="68" y="124" width="318" height="190" rx="14" fill={C.bg} />
      {[1, 2, 3].map((k) => <path key={k} d={`M82 ${124 + k * 48}H372`} stroke={C.line} strokeWidth="1" opacity=".6" />)}
      <path d={`${d} L364 300 L90 300Z`} fill={C.soft} />
      <path d={d} stroke={C.action} strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="art-draw" pathLength="1" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="5.5" fill="#fff" stroke={C.action} strokeWidth="3.5" />)}
      <g transform="translate(402 124)">
        <rect width="170" height="190" rx="14" fill={C.soft} />
        <text x="16" y="30" fontSize="15" fontWeight="600" fill={C.ink} style={T}>Relatório</text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(16 ${50 + i * 44})`}>
            <Check x={12} y={12} fill={C.action} />
            <rect x="34" y="2" width="100" height="9" rx="4.5" fill={C.brand} opacity=".8" />
            <rect x="34" y="18" width="70" height="9" rx="4.5" fill={C.line} />
          </g>
        ))}
      </g>
      <g transform="translate(68 338)">
        <rect width="504" height="84" rx="16" fill={C.deep} />
        <image href="/logo.svg" x="20" y="22" width="40" height="40" />
        <text x="76" y="40" fontSize="16" fontWeight="600" fill="#fff" style={T}>Ajuste no faturamento</text>
        <text x="76" y="62" fontSize="14" fill="#BBD7F3" style={T}>Menos glosas na origem, mais receita no caixa</text>
      </g>
    </Frame>
  );
}

const ART = { diagnostico: Diagnostico, recuperacao: Recuperacao, operacao: Operacao, prevencao: Prevencao };

export default function JourneyArt({ id, label }) {
  const Comp = ART[id];
  if (!Comp) return null;
  return (
    <svg viewBox="0 0 640 480" role="img" aria-label={label} className="aspect-[4/3] w-full animate-[fadeIn_.5s_ease]">
      <rect width="640" height="480" fill={C.soft} />
      <Comp />
    </svg>
  );
}
