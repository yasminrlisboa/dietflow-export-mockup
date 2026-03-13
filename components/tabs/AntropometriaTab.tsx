"use client";
import { Card, CardBody, CardHeader, Chip, Progress } from "@heroui/react";
import { ExportSection } from "../ExportSection";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar, ReferenceLine,
} from "recharts";

const AVALIACOES = ["Jun/25", "Set/25", "Dez/25", "Mar/26"];

// ─── DADOS DE EVOLUÇÃO ───────────────────────────────────────────────────────

const EVOLUCAO_INDICES = [
  {
    label: "Peso (kg)",
    valores: [82.0, 80.5, 79.2, 78.0],
    meta: 68.0,
    cor: "#6366f1",
  },
  {
    label: "IMC (kg/m²)",
    valores: [29.1, 28.5, 28.0, 27.6],
    meta: 22.0,
    cor: "#f59e0b",
  },
  {
    label: "% Gordura",
    valores: [35.2, 34.5, 33.6, 32.8],
    meta: 25.0,
    cor: "#ef4444",
  },
  {
    label: "Massa Magra (kg)",
    valores: [53.1, 52.7, 52.5, 52.4],
    meta: 52.0,
    cor: "#10b981",
  },
];

const EVOLUCAO_CIRCUNFERENCIAS = [
  { label: "Cintura",   valores: [82.0, 80.5, 79.5, 78.5], ref: 80 },
  { label: "Quadril",   valores: [106.0, 104.5, 103.2, 102.0], ref: null },
  { label: "Abdominal", valores: [88.0, 86.0, 84.5, 83.0], ref: 88 },
  { label: "Coxa D",    valores: [59.0, 58.2, 57.5, 57.0], ref: null },
];

const EVOLUCAO_DOBRAS = [
  { label: "Σ7 Dobras (mm)", valores: [172, 168, 163, 158] },
  { label: "% Gordura Siri", valores: [35.2, 34.5, 33.6, 32.8] },
];

// ─── DADOS ACTUAIS (última avaliação) ────────────────────────────────────────

const INDICES_ATUAIS = [
  { label: "IMC",             value: "27,6 kg/m²", classif: "Sobrepeso",  cor: "warning" as const, pct: 64 },
  { label: "RCQ",             value: "0,76",        classif: "Risco Baixo", cor: "success" as const, pct: 38 },
  { label: "RCE",             value: "0,46",        classif: "Adequado",   cor: "success" as const, pct: 46 },
  { label: "IAC",             value: "31,8%",       classif: "Obeso I",    cor: "danger" as const,  pct: 72 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function delta(valores: number[]) {
  if (valores.length < 2) return null;
  const d = valores[valores.length - 1] - valores[0];
  return { valor: d, pct: ((d / valores[0]) * 100).toFixed(1) };
}

function TendenciaBadge({ valores }: { valores: number[] }) {
  const d = delta(valores);
  if (!d) return null;
  const cor = d.valor < 0 ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50";
  const sinal = d.valor < 0 ? "▼" : "▲";
  return (
    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${cor}`}>
      {sinal} {Math.abs(d.valor).toFixed(1)} ({d.valor < 0 ? "" : "+"}{d.pct}%)
    </span>
  );
}

// Gráfico de linha para um indicador individual
function MiniLineChart({ item, cor }: { item: typeof EVOLUCAO_INDICES[0]; cor: string }) {
  const data = AVALIACOES.map((d, i) => ({ data: d, valor: item.valores[i] }));
  return (
    <div className="h-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="data" tick={{ fontSize: 9, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} width={32} domain={["auto", "auto"]} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
          {item.meta && (
            <ReferenceLine y={item.meta} stroke="#94a3b8" strokeDasharray="4 2"
              label={{ value: "meta", fontSize: 9, fill: "#94a3b8", position: "insideTopRight" }} />
          )}
          <Line type="monotone" dataKey="valor" stroke={cor} strokeWidth={2.5}
            dot={{ r: 3, fill: cor }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico multi-linha para circunferências
function CircunferenciasChart() {
  const data = AVALIACOES.map((d, i) => {
    const p: Record<string, any> = { data: d };
    EVOLUCAO_CIRCUNFERENCIAS.forEach((c) => { p[c.label] = c.valores[i]; });
    return p;
  });
  const cores = ["#6366f1", "#f59e0b", "#ef4444", "#10b981"];
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="data" tick={{ fontSize: 10, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={36} domain={["auto", "auto"]} unit=" cm" />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v} cm`]} />
          <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} />
          {EVOLUCAO_CIRCUNFERENCIAS.map((c, i) => (
            <Line key={c.label} type="monotone" dataKey={c.label}
              stroke={cores[i]} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Gráfico de barras para composição corporal
function ComposicaoBarChart() {
  const data = AVALIACOES.map((d, i) => ({
    data: d,
    "Massa Gorda": parseFloat((82.0 - [53.1, 52.7, 52.5, 52.4][i]).toFixed(1)),
    "Massa Magra": [53.1, 52.7, 52.5, 52.4][i],
  }));
  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="data" tick={{ fontSize: 10, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={36} unit=" kg" />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v} kg`]} />
          <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} />
          <Bar dataKey="Massa Gorda" fill="#ef4444" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Massa Magra" fill="#10b981" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export function AntropometriaTab() {
  return (
    <div>
      {/* Identificação */}
      <ExportSection title="Identificação e Dados da Avaliação">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {[
                { label: "Data da Avaliação", value: "11/03/2026" },
                { label: "Avaliador", value: "Dra. Maria Fernanda Costa" },
                { label: "Protocolo", value: "Pollock 7 dobras" },
                { label: "Peso Atual", value: "78,0 kg" },
                { label: "Peso Usual", value: "72,0 kg (2022)" },
                { label: "Peso Desejado", value: "68,0 kg" },
                { label: "Peso Ideal (Lorentz)", value: "60–67 kg" },
                { label: "Altura", value: "168 cm" },
                { label: "Envergadura", value: "169 cm" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* EVOLUÇÃO — Indicadores principais */}
      <ExportSection title="Evolução dos Indicadores Principais">
        <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
          <CardHeader className="pb-0 pt-3 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Comparativo {AVALIACOES[0]} → {AVALIACOES[AVALIACOES.length - 1]}
            </span>
          </CardHeader>
          <CardBody className="pt-2 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {EVOLUCAO_INDICES.map((item, i) => {
                const cores = ["#6366f1", "#f59e0b", "#ef4444", "#10b981"];
                const atual = item.valores[item.valores.length - 1];
                return (
                  <div key={item.label} className="border border-slate-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-600">{item.label}</span>
                      <TendenciaBadge valores={item.valores} />
                    </div>
                    <div className="text-2xl font-extrabold mb-1" style={{ color: cores[i] }}>
                      {atual.toFixed(1).replace(".", ",")}
                    </div>
                    <MiniLineChart item={item} cor={cores[i]} />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>

        {/* Tabela comparativa dos indicadores */}
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Indicador</th>
                  {AVALIACOES.map((d, i) => (
                    <th key={d} className={`text-right px-3 py-2.5 font-semibold uppercase tracking-wider ${i === AVALIACOES.length - 1 ? "text-indigo-600" : "text-slate-400"}`}>
                      {d}
                    </th>
                  ))}
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {EVOLUCAO_INDICES.map((item, si) => {
                  const d = delta(item.valores);
                  return (
                    <tr key={si} className={`border-b border-slate-50 ${si % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                      <td className="px-4 py-2.5 font-semibold text-slate-700">{item.label}</td>
                      {item.valores.map((v, vi) => (
                        <td key={vi} className={`text-right px-3 py-2.5 font-mono ${vi === AVALIACOES.length - 1 ? "font-bold text-slate-900 text-sm" : "text-slate-400"}`}>
                          {v.toFixed(1).replace(".", ",")}
                        </td>
                      ))}
                      <td className="text-center px-3 py-2.5">
                        {d && <TendenciaBadge valores={item.valores} />}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Índices Antropométricos actuais */}
      <ExportSection title="Índices Antropométricos — Avaliação Atual">
        <div className="grid grid-cols-2 gap-3">
          {INDICES_ATUAIS.map((idx) => (
            <Card key={idx.label} shadow="none" classNames={{ base: "border border-slate-200" }}>
              <CardBody className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">{idx.label}</div>
                  <Chip size="sm" variant="flat" color={idx.cor}>{idx.classif}</Chip>
                </div>
                <div className="text-xl font-extrabold text-slate-800 mb-2">{idx.value}</div>
                <Progress size="sm" value={idx.pct} color={idx.cor} />
              </CardBody>
            </Card>
          ))}
        </div>
      </ExportSection>

      {/* Composição Corporal */}
      <ExportSection title="Evolução da Composição Corporal">
        <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
          <CardHeader className="pb-0 pt-3 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Massa Gorda vs Massa Magra (kg) — {AVALIACOES[0]} a {AVALIACOES[AVALIACOES.length - 1]}
            </span>
          </CardHeader>
          <CardBody className="pt-1 pb-3">
            <ComposicaoBarChart />
          </CardBody>
        </Card>

        <Card shadow="none" classNames={{ base: "border border-slate-200 mb-3" }}>
          <CardBody>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Distribuição Atual</div>
                <div className="space-y-3">
                  {[
                    { label: "Massa Gorda", val: "25,6 kg · 32,8%", pct: 32.8, max: 60, cor: "danger" as const },
                    { label: "Massa Magra", val: "52,4 kg · 67,2%", pct: 67.2, max: 100, cor: "success" as const },
                    { label: "Massa Muscular", val: "28,1 kg · 36%", pct: 36, max: 60, cor: "primary" as const },
                    { label: "Massa Óssea", val: "2,8 kg · 3,6%", pct: 3.6, max: 6, cor: "secondary" as const },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">{item.label}</span>
                        <span className="text-slate-600">{item.val}</span>
                      </div>
                      <Progress size="sm" value={item.pct} maxValue={item.max} color={item.cor} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Dados Calculados</div>
                <div className="space-y-2">
                  {[
                    { label: "Somatório de 7 Dobras", value: "158 mm" },
                    { label: "Densidade Corporal", value: "1,0495 g/ml" },
                    { label: "% Gordura (Siri)", value: "32,8%" },
                    { label: "Classificação (ACSM)", value: "Obeso — Fem/32a" },
                    { label: "% Gordura Desejado", value: "22–26%" },
                    { label: "Gordura a Perder", value: "5,4–8,4 kg" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Circunferências com evolução */}
      <ExportSection title="Evolução das Circunferências">
        <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
          <CardHeader className="pb-0 pt-3 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Principais circunferências (cm)
            </span>
          </CardHeader>
          <CardBody className="pt-1 pb-3">
            <CircunferenciasChart />
          </CardBody>
        </Card>

        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Medida</th>
                  {AVALIACOES.map((d, i) => (
                    <th key={d} className={`text-right px-3 py-2.5 font-semibold uppercase tracking-wider ${i === AVALIACOES.length - 1 ? "text-indigo-600" : "text-slate-400"}`}>
                      {d}
                    </th>
                  ))}
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Var.</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Ref.</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "Cervical",              valores: [37.5, 37.2, 36.8, 36.5], ref: "< 38 cm",      negBom: true  },
                  { nome: "Ombro",                 valores: [108.0, 107.5, 107.0, 106.5], ref: "proporcional", negBom: false },
                  { nome: "Tórax",                 valores: [93.0, 92.0, 91.5, 91.0], ref: "proporcional", negBom: false },
                  { nome: "Cintura",               valores: [82.0, 80.5, 79.5, 78.5], ref: "< 80 cm",      negBom: true  },
                  { nome: "Abdominal",             valores: [88.0, 86.0, 84.5, 83.0], ref: "< 88 cm",      negBom: true  },
                  { nome: "Quadril",               valores: [106.0, 104.5, 103.2, 102.0], ref: "proporcional", negBom: true  },
                  { nome: "Braço D (relaxado)",    valores: [31.0, 30.5, 30.2, 30.0], ref: "proporcional", negBom: false },
                  { nome: "Braço D (contraído)",   valores: [33.2, 33.0, 32.7, 32.5], ref: "proporcional", negBom: false },
                  { nome: "Braço E (relaxado)",    valores: [30.5, 30.0, 29.8, 29.5], ref: "proporcional", negBom: false },
                  { nome: "Antebraço D",           valores: [24.0, 23.8, 23.6, 23.5], ref: "proporcional", negBom: false },
                  { nome: "Antebraço E",           valores: [23.5, 23.3, 23.2, 23.0], ref: "proporcional", negBom: false },
                  { nome: "Coxa D (proximal)",     valores: [59.0, 58.2, 57.5, 57.0], ref: "proporcional", negBom: true  },
                  { nome: "Coxa D (medial)",       valores: [52.0, 51.5, 51.0, 50.5], ref: "proporcional", negBom: true  },
                  { nome: "Coxa E (proximal)",     valores: [58.5, 57.8, 57.2, 56.7], ref: "proporcional", negBom: true  },
                  { nome: "Panturrilha D",         valores: [37.8, 37.5, 37.2, 37.0], ref: "proporcional", negBom: false },
                  { nome: "Panturrilha E",         valores: [37.5, 37.2, 37.0, 36.8], ref: "proporcional", negBom: false },
                ].map((circ, si) => {
                  const d = delta(circ.valores);
                  const cor = d ? (d.valor < 0 ? (circ.negBom ? "text-green-600" : "text-red-600") : (circ.negBom ? "text-red-600" : "text-green-600")) : "text-slate-400";
                  return (
                    <tr key={si} className={`border-b border-slate-50 ${si % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{circ.nome}</td>
                      {circ.valores.map((v, vi) => (
                        <td key={vi} className={`text-right px-3 py-2.5 font-mono ${vi === AVALIACOES.length - 1 ? "font-bold text-slate-900 text-sm" : "text-slate-400"}`}>
                          {v.toFixed(1).replace(".", ",")}
                        </td>
                      ))}
                      <td className={`text-center px-3 py-2.5 font-bold text-sm ${cor}`}>
                        {d ? `${d.valor < 0 ? "▼" : "▲"} ${Math.abs(d.valor).toFixed(1)}` : "—"}
                      </td>
                      <td className="text-center px-3 py-2.5 text-slate-400 text-[10px]">{circ.ref}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Dobras Cutâneas */}
      <ExportSection title="Dobras Cutâneas — Evolução">
        <Card shadow="none" classNames={{ base: "border border-slate-200 mb-3" }}>
          <CardBody className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Dobra</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-400 uppercase tracking-wider">Jun/25</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-400 uppercase tracking-wider">Set/25</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-400 uppercase tracking-wider">Dez/25</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-indigo-600 uppercase tracking-wider">Mar/26</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Med. 1</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Med. 2</th>
                  <th className="text-right px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Med. 3</th>
                  <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Var.</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "Peitoral",     hist: [26, 24, 23, 22.3], m1: "22", m2: "23", m3: "22" },
                  { nome: "Axilar Média", hist: [21, 20, 19, 18.3], m1: "18", m2: "19", m3: "18" },
                  { nome: "Tríceps",      hist: [31, 30, 29, 27.7], m1: "28", m2: "27", m3: "28" },
                  { nome: "Subescapular", hist: [27, 26, 25, 24.3], m1: "24", m2: "24", m3: "25" },
                  { nome: "Abdominal",    hist: [34, 33, 32, 30.3], m1: "30", m2: "31", m3: "30" },
                  { nome: "Suprailíaca",  hist: [23, 22, 21, 20.3], m1: "20", m2: "21", m3: "20" },
                  { nome: "Coxa",         hist: [18, 17, 16, 15.3], m1: "15", m2: "15", m3: "16" },
                ].map((d, si) => {
                  const vd = delta(d.hist);
                  return (
                    <tr key={si} className={`border-b border-slate-50 ${si % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{d.nome}</td>
                      {d.hist.map((v, vi) => (
                        <td key={vi} className={`text-right px-3 py-2.5 font-mono ${vi === 3 ? "font-bold text-slate-900 text-sm" : "text-slate-400"}`}>
                          {v.toFixed(1).replace(".", ",")}
                        </td>
                      ))}
                      <td className="text-right px-3 py-2.5 text-slate-400">{d.m1}</td>
                      <td className="text-right px-3 py-2.5 text-slate-400">{d.m2}</td>
                      <td className="text-right px-3 py-2.5 text-slate-400">{d.m3}</td>
                      <td className={`text-center px-3 py-2.5 font-bold text-sm ${vd && vd.valor < 0 ? "text-green-600" : "text-red-600"}`}>
                        {vd ? `${vd.valor < 0 ? "▼" : "▲"} ${Math.abs(vd.valor).toFixed(1)}` : "—"}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-100 border-t-2 border-slate-300">
                  <td className="px-4 py-2.5 font-bold text-slate-900">Σ7 Dobras</td>
                  {[172, 168, 163, 158].map((v, vi) => (
                    <td key={vi} className={`text-right px-3 py-2.5 font-mono font-extrabold ${vi === 3 ? "text-indigo-700 text-sm" : "text-slate-500"}`}>
                      {v} mm
                    </td>
                  ))}
                  <td colSpan={3} />
                  <td className="text-center px-3 py-2.5 font-extrabold text-green-600">▼ 14 mm</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Diâmetros Ósseos */}
      <ExportSection title="Diâmetros Ósseos">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Segmento</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-400 uppercase tracking-wider">Medida</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Referência (♀)</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "Úmero D (epicôndilos)",  valor: 6.4, refMin: 5.8, refMax: 7.0, unidade: "cm" },
                  { nome: "Punho D (estiloides)",    valor: 5.1, refMin: 4.5, refMax: 5.5, unidade: "cm" },
                  { nome: "Fêmur D (epicôndilos)",   valor: 8.8, refMin: 8.0, refMax: 9.6, unidade: "cm" },
                ].map((d, i) => {
                  const ok = d.valor >= d.refMin && d.valor <= d.refMax;
                  return (
                    <tr key={i} className={`border-b border-slate-50 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                      <td className="px-4 py-2.5 font-medium text-slate-700">{d.nome}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">{d.valor.toFixed(1)} {d.unidade}</td>
                      <td className="px-4 py-2.5 text-right text-slate-400">{d.refMin.toFixed(1)}–{d.refMax.toFixed(1)} {d.unidade}</td>
                      <td className="px-4 py-2.5 text-center">
                        <Chip size="sm" variant="flat" color={ok ? "success" : "warning"}>{ok ? "Adequado" : "Avaliar"}</Chip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Bioimpedância */}
      <ExportSection title="Bioimpedância Elétrica (BIA)">
        <Card shadow="none" classNames={{ base: "border border-slate-200 mb-3" }}>
          <CardBody>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 mb-3">
              {[
                { label: "Equipamento", value: "InBody 270" },
                { label: "Data / Hora", value: "11/03/2026 · 08h15" },
                { label: "Condições", value: "Jejum 4h, bexiga vazia, sem exercício 24h" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Parâmetro</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-indigo-600 uppercase tracking-wider">Mar/26</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-slate-400 uppercase tracking-wider">Referência</th>
                  <th className="text-center px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nome: "Massa Magra (kg)",            valor: "52,4 kg", ref: "49–60 kg",       ok: true  },
                  { nome: "Massa Gorda (kg)",             valor: "25,6 kg", ref: "< 24 kg",        ok: false },
                  { nome: "% Gordura Corporal",           valor: "32,8%",   ref: "20–30%",         ok: false },
                  { nome: "Água Corporal Total (L)",      valor: "33,8 L",  ref: "31,5–39,5 L",    ok: true  },
                  { nome: "Água Intracelular (L)",        valor: "20,1 L",  ref: "18,5–24,0 L",    ok: true  },
                  { nome: "Água Extracelular (L)",        valor: "13,7 L",  ref: "12,5–16,5 L",    ok: true  },
                  { nome: "Índice de Hidratação (ECW/TBW)", valor: "0,405", ref: "0,36–0,39",      ok: false },
                  { nome: "Metabolismo Basal (BIA)",      valor: "1.489 kcal", ref: "—",           ok: true  },
                  { nome: "Impedância (ω 50Hz)",          valor: "498 Ω",   ref: "450–600 Ω",      ok: true  },
                  { nome: "Ângulo de Fase (°)",           valor: "5,8°",    ref: "5,0–8,0° (♀)",   ok: true  },
                ].map((item, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                    <td className="px-4 py-2.5 font-medium text-slate-700">{item.nome}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">{item.valor}</td>
                    <td className="px-4 py-2.5 text-right text-slate-400">{item.ref}</td>
                    <td className="px-4 py-2.5 text-center">
                      {item.ref !== "—" && (
                        <Chip size="sm" variant="flat" color={item.ok ? "success" : "warning"}>
                          {item.ok ? "Adequado" : "Atenção"}
                        </Chip>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Observações */}
      <ExportSection title="Observações Clínicas">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-xs text-slate-600 leading-relaxed space-y-2">
            <p>Avaliação realizada no período da manhã (08h30), em jejum de 12 horas, com bexiga vazia. Paciente descansada, sem exercício físico nas 24h anteriores.</p>
            <p>A evolução de 9 meses mostra redução consistente do peso (-4,0 kg), % de gordura (-2,4 pp) e circunferências, com preservação da massa magra (52,4 kg), evidenciando boa resposta ao protocolo dietoterápico e musculação.</p>
            <p>Redução do somatório de dobras de 172 → 158 mm (-14 mm) reforça a perda de gordura localizada, especialmente abdominal e tricipital.</p>
            <p><strong>Meta:</strong> Atingir 22–26% de gordura corporal com peso entre 68–70 kg, preservando massa magra acima de 50 kg. Projeção: 6–9 meses com protocolo atual.</p>
          </CardBody>
        </Card>
      </ExportSection>
    </div>
  );
}
