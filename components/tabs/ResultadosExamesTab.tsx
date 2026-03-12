"use client";
import { Card, CardBody, CardHeader, Chip, Progress } from "@heroui/react";
import { ExportSection } from "../ExportSection";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend,
} from "recharts";

const DATAS = ["Jun/25", "Set/25", "Dez/25", "Mar/26"];

interface SubExame {
  nome: string;
  unidade: string;
  refMin: number;
  refMax: number;
  valores: (number | null)[];
  status: "normal" | "alto" | "baixo" | "muito-alto" | "muito-baixo";
  formatado?: (v: number) => string;
}

interface Grupo {
  nome: string;
  cor: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  subExames: SubExame[];
}

const fmt = (v: number, dec = 1) => v.toFixed(dec).replace(".", ",");
const fmtInt = (v: number) => Math.round(v).toLocaleString("pt-BR");

const GRUPOS: Grupo[] = [
  {
    nome: "Hemograma Completo", cor: "primary",
    subExames: [
      { nome: "Hemoglobina",  unidade: "g/dL",   refMin: 12,     refMax: 16,     valores: [13.8, 13.5, 13.1, 13.2], status: "normal" },
      { nome: "Hematócrito",  unidade: "%",       refMin: 36,     refMax: 46,     valores: [41.2, 40.5, 39.8, 39.5], status: "normal" },
      { nome: "Leucócitos",   unidade: "/mm³",    refMin: 4000,   refMax: 10000,  valores: [6200, 5900, 5700, 5800], status: "normal", formatado: fmtInt },
      { nome: "Plaquetas",    unidade: "/mm³",    refMin: 150000, refMax: 400000, valores: [310000, 305000, 315000, 320000], status: "normal", formatado: fmtInt },
      { nome: "VCM",          unidade: "fL",      refMin: 80,     refMax: 98,     valores: [88, 87, 86, 85], status: "normal" },
      { nome: "HCM",          unidade: "pg",      refMin: 26,     refMax: 34,     valores: [29, 29, 28, 28], status: "normal" },
    ],
  },
  {
    nome: "Perfil Lipídico", cor: "warning",
    subExames: [
      { nome: "Colesterol Total", unidade: "mg/dL", refMin: 0,   refMax: 200, valores: [228, 220, 215, 212], status: "alto" },
      { nome: "HDL Colesterol",   unidade: "mg/dL", refMin: 50,  refMax: 100, valores: [44, 46, 47, 48],    status: "baixo" },
      { nome: "LDL Colesterol",   unidade: "mg/dL", refMin: 0,   refMax: 130, valores: [152, 145, 141, 138], status: "alto" },
      { nome: "Triglicerídeos",   unidade: "mg/dL", refMin: 0,   refMax: 150, valores: [210, 198, 190, 185], status: "alto" },
      { nome: "VLDL",             unidade: "mg/dL", refMin: 0,   refMax: 40,  valores: [30, 28, 27, 26],    status: "normal" },
    ],
  },
  {
    nome: "Glicemia e Insulina", cor: "danger",
    subExames: [
      { nome: "Glicemia de Jejum",   unidade: "mg/dL",  refMin: 70,  refMax: 99,  valores: [104, 101, 99, 98],       status: "normal" },
      { nome: "Insulina Basal",      unidade: "μUI/mL", refMin: 0,   refMax: 10,  valores: [15.2, 13.8, 13.1, 12.3], status: "alto" },
      { nome: "Hemoglobina Glicada", unidade: "%",      refMin: 0,   refMax: 5.7, valores: [5.7, 5.6, 5.5, 5.4],    status: "normal" },
      { nome: "HOMA-IR",             unidade: "",       refMin: 0,   refMax: 2.5, valores: [3.91, 3.46, 3.22, 2.98], status: "alto" },
    ],
  },
  {
    nome: "Função Tireoidiana", cor: "secondary",
    subExames: [
      { nome: "TSH",      unidade: "μUI/mL", refMin: 0.4, refMax: 4.0, valores: [4.1, 3.9, 3.8, 3.8],     status: "normal" },
      { nome: "T4 Livre", unidade: "ng/dL",  refMin: 0.8, refMax: 1.9, valores: [0.88, 0.91, 0.9, 0.9],   status: "normal" },
      { nome: "T3 Livre", unidade: "pg/mL",  refMin: 2.3, refMax: 4.2, valores: [2.6, 2.7, 2.8, 2.8],     status: "normal" },
      { nome: "Anti-TPO", unidade: "UI/mL",  refMin: 0,   refMax: 35,  valores: [18, 15, 13, 12],          status: "normal" },
    ],
  },
  {
    nome: "Vitaminas e Minerais", cor: "success",
    subExames: [
      { nome: "Vitamina D (25-OH)", unidade: "ng/mL", refMin: 30,  refMax: 100, valores: [12, 15, 17, 18],     status: "baixo" },
      { nome: "Vitamina B12",       unidade: "pg/mL", refMin: 200, refMax: 900, valores: [295, 302, 308, 310], status: "normal" },
      { nome: "Ferritina",          unidade: "ng/mL", refMin: 15,  refMax: 150, valores: [19, 20, 21, 22],     status: "normal" },
      { nome: "Zinco",              unidade: "μg/dL", refMin: 70,  refMax: 120, valores: [62, 64, 66, 68],     status: "baixo" },
      { nome: "Magnésio",           unidade: "mg/dL", refMin: 1.7, refMax: 2.4, valores: [1.6, 1.7, 1.7, 1.7], status: "normal" },
    ],
  },
  {
    nome: "Função Hepática e Renal", cor: "default",
    subExames: [
      { nome: "TGO (AST)",   unidade: "U/L",   refMin: 0,   refMax: 40,  valores: [32, 30, 29, 28],         status: "normal" },
      { nome: "TGP (ALT)",   unidade: "U/L",   refMin: 0,   refMax: 40,  valores: [38, 35, 33, 32],         status: "normal" },
      { nome: "Creatinina",  unidade: "mg/dL", refMin: 0.5, refMax: 1.1, valores: [0.85, 0.83, 0.82, 0.82], status: "normal" },
      { nome: "Ácido Úrico", unidade: "mg/dL", refMin: 2.4, refMax: 5.7, valores: [5.2, 5.0, 4.9, 4.8],    status: "normal" },
      { nome: "Albumina",    unidade: "g/dL",  refMin: 3.5, refMax: 5.0, valores: [4.0, 4.1, 4.2, 4.2],    status: "normal" },
    ],
  },
];

const STATUS_COLOR: Record<string, "success" | "warning" | "danger" | "default"> = {
  normal: "success", alto: "warning", baixo: "warning", "muito-alto": "danger", "muito-baixo": "danger",
};
const STATUS_LABEL: Record<string, string> = {
  normal: "Normal", alto: "Elevado", baixo: "Baixo", "muito-alto": "Muito elevado", "muito-baixo": "Muito baixo",
};

function tendencia(valores: (number | null)[]): { icone: string; cor: string; texto: string } {
  const validos = valores.filter((v) => v !== null) as number[];
  if (validos.length < 2) return { icone: "→", cor: "text-slate-400", texto: "sem histórico" };
  const diff = validos[validos.length - 1] - validos[validos.length - 2];
  const pct = Math.abs((diff / (validos[validos.length - 2] || 1)) * 100).toFixed(1);
  if (Math.abs(diff) < 0.01) return { icone: "→", cor: "text-slate-400", texto: "estável" };
  if (diff > 0) return { icone: "↑", cor: "text-red-500", texto: `+${pct}%` };
  return { icone: "↓", cor: "text-green-500", texto: `-${pct}%` };
}

function formatarValor(v: number | null, sub: SubExame): string {
  if (v === null) return "—";
  if (sub.formatado) return sub.formatado(v);
  return fmt(v);
}

const CORES_LINHA = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

function GrupoChart({ grupo }: { grupo: Grupo }) {
  const data = DATAS.map((d, i) => {
    const point: Record<string, any> = { data: d };
    grupo.subExames.forEach((s) => {
      if (s.valores[i] !== null) point[s.nome] = s.valores[i];
    });
    return point;
  });

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="data" tick={{ fontSize: 10, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={40} />
          <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
          <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} />
          {grupo.subExames.map((s, i) => (
            <Line
              key={s.nome} type="monotone" dataKey={s.nome}
              stroke={CORES_LINHA[i % CORES_LINHA.length]} strokeWidth={2}
              dot={{ r: 3 }} activeDot={{ r: 5 }} connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResultadosExamesTab() {
  const ultimaColeta = DATAS[DATAS.length - 1];
  const alterados = GRUPOS.flatMap((g) => g.subExames).filter((s) => s.status !== "normal");

  return (
    <div>
      {/* Legenda + datas */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <Chip size="sm" variant="flat" color="success">Normal</Chip>
          <Chip size="sm" variant="flat" color="warning">Atenção</Chip>
          <Chip size="sm" variant="flat" color="danger">Crítico</Chip>
        </div>
        <div className="flex gap-3 text-xs text-slate-500">
          {DATAS.map((d, i) => (
            <span key={d} className={i === DATAS.length - 1 ? "font-bold text-indigo-600" : ""}>
              {i === DATAS.length - 1 ? `● ${d} (atual)` : `○ ${d}`}
            </span>
          ))}
        </div>
      </div>

      {/* Alertas */}
      {alterados.length > 0 && (
        <Card shadow="none" classNames={{ base: "border border-amber-200 bg-amber-50 mb-5" }}>
          <CardBody className="py-3 px-4">
            <p className="text-xs font-bold text-amber-800 mb-1.5">
              ⚠ Parâmetros fora da referência — {ultimaColeta}:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {alterados.map((s) => (
                <Chip key={s.nome} size="sm" variant="flat" color={STATUS_COLOR[s.status]}>
                  {s.nome} · {STATUS_LABEL[s.status]}
                </Chip>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {GRUPOS.map((grupo, gi) => (
        <ExportSection key={gi} title={grupo.nome}>
          {/* Gráfico de evolução */}
          <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
            <CardHeader className="pb-0 pt-3 px-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Evolução — {DATAS[0]} a {DATAS[DATAS.length - 1]}
              </span>
            </CardHeader>
            <CardBody className="pt-1 pb-3">
              <GrupoChart grupo={grupo} />
            </CardBody>
          </Card>

          {/* Tabela comparativa */}
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardBody className="p-0">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider w-[28%]">Exame</th>
                    {DATAS.map((d, i) => (
                      <th
                        key={d}
                        className={`text-right px-3 py-2.5 font-semibold uppercase tracking-wider ${
                          i === DATAS.length - 1 ? "text-indigo-600" : "text-slate-400"
                        }`}
                      >
                        {d}
                      </th>
                    ))}
                    <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Var.</th>
                    <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Ref.</th>
                    <th className="text-center px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.subExames.map((sub, si) => {
                    const tend = tendencia(sub.valores);
                    const ultimoValor = sub.valores[sub.valores.length - 1];
                    const range = sub.refMax - sub.refMin;
                    const pct =
                      range > 0 && ultimoValor !== null
                        ? Math.min(100, Math.max(0, ((ultimoValor - sub.refMin) / range) * 100))
                        : 0;

                    return (
                      <tr key={si} className={`border-b border-slate-50 ${si % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-700">{sub.nome}</div>
                          {sub.unidade && <div className="text-slate-400">{sub.unidade}</div>}
                          <div className="mt-1.5">
                            <Progress
                              size="sm"
                              value={pct}
                              color={STATUS_COLOR[sub.status]}
                              className="max-w-[90px]"
                            />
                          </div>
                        </td>
                        {sub.valores.map((v, vi) => (
                          <td
                            key={vi}
                            className={`text-right px-3 py-3 font-mono ${
                              vi === DATAS.length - 1
                                ? "font-bold text-slate-900 text-sm"
                                : "text-slate-400"
                            }`}
                          >
                            {formatarValor(v, sub)}
                          </td>
                        ))}
                        <td className="text-center px-3 py-3">
                          <span className={`font-bold text-base leading-none ${tend.cor}`}>{tend.icone}</span>
                          <div className={`text-[10px] mt-0.5 ${tend.cor}`}>{tend.texto}</div>
                        </td>
                        <td className="text-center px-3 py-3 text-slate-400 text-[10px]">
                          {sub.refMin > 0 ? `${sub.refMin}–${sub.refMax}` : `< ${sub.refMax}`}
                        </td>
                        <td className="text-center px-3 py-3">
                          <Chip size="sm" variant="flat" color={STATUS_COLOR[sub.status]}>
                            {STATUS_LABEL[sub.status]}
                          </Chip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </ExportSection>
      ))}
    </div>
  );
}
