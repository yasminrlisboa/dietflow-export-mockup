"use client";
import { Card, CardBody, CardHeader, Chip, Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { ExportSection } from "../ExportSection";

interface Resultado {
  nome: string;
  valor: string;
  unidade: string;
  refMin: number;
  refMax: number;
  valorNum: number;
  status: "normal" | "alto" | "baixo" | "muito-alto" | "muito-baixo";
}

interface Grupo {
  nome: string;
  cor: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
  resultados: Resultado[];
}

const GRUPOS: Grupo[] = [
  {
    nome: "Hemograma Completo", cor: "primary",
    resultados: [
      { nome: "Hemoglobina", valor: "13,2", unidade: "g/dL", refMin: 12, refMax: 16, valorNum: 13.2, status: "normal" },
      { nome: "Hematócrito", valor: "39,5", unidade: "%", refMin: 36, refMax: 46, valorNum: 39.5, status: "normal" },
      { nome: "Leucócitos", valor: "5.800", unidade: "/mm³", refMin: 4000, refMax: 10000, valorNum: 5800, status: "normal" },
      { nome: "Plaquetas", valor: "320.000", unidade: "/mm³", refMin: 150000, refMax: 400000, valorNum: 320000, status: "normal" },
      { nome: "VCM", valor: "85", unidade: "fL", refMin: 80, refMax: 98, valorNum: 85, status: "normal" },
      { nome: "HCM", valor: "28", unidade: "pg", refMin: 26, refMax: 34, valorNum: 28, status: "normal" },
    ],
  },
  {
    nome: "Perfil Lipídico", cor: "warning",
    resultados: [
      { nome: "Colesterol Total", valor: "212", unidade: "mg/dL", refMin: 0, refMax: 200, valorNum: 212, status: "alto" },
      { nome: "HDL Colesterol", valor: "48", unidade: "mg/dL", refMin: 50, refMax: 100, valorNum: 48, status: "baixo" },
      { nome: "LDL Colesterol", valor: "138", unidade: "mg/dL", refMin: 0, refMax: 130, valorNum: 138, status: "alto" },
      { nome: "VLDL", valor: "26", unidade: "mg/dL", refMin: 0, refMax: 40, valorNum: 26, status: "normal" },
      { nome: "Triglicerídeos", valor: "185", unidade: "mg/dL", refMin: 0, refMax: 150, valorNum: 185, status: "alto" },
    ],
  },
  {
    nome: "Glicemia e Insulina", cor: "danger",
    resultados: [
      { nome: "Glicemia de Jejum", valor: "98", unidade: "mg/dL", refMin: 70, refMax: 99, valorNum: 98, status: "normal" },
      { nome: "Insulina Basal", valor: "12,3", unidade: "μUI/mL", refMin: 0, refMax: 10, valorNum: 12.3, status: "alto" },
      { nome: "Hemoglobina Glicada (HbA1c)", valor: "5,4", unidade: "%", refMin: 0, refMax: 5.7, valorNum: 5.4, status: "normal" },
      { nome: "HOMA-IR", valor: "2,98", unidade: "", refMin: 0, refMax: 2.5, valorNum: 2.98, status: "alto" },
    ],
  },
  {
    nome: "Função Tireoidiana", cor: "secondary",
    resultados: [
      { nome: "TSH", valor: "3,8", unidade: "μUI/mL", refMin: 0.4, refMax: 4.0, valorNum: 3.8, status: "normal" },
      { nome: "T4 Livre", valor: "0,9", unidade: "ng/dL", refMin: 0.8, refMax: 1.9, valorNum: 0.9, status: "normal" },
      { nome: "T3 Livre", valor: "2,8", unidade: "pg/mL", refMin: 2.3, refMax: 4.2, valorNum: 2.8, status: "normal" },
      { nome: "Anti-TPO", valor: "12", unidade: "UI/mL", refMin: 0, refMax: 35, valorNum: 12, status: "normal" },
    ],
  },
  {
    nome: "Vitaminas e Minerais", cor: "success",
    resultados: [
      { nome: "Vitamina D (25-OH)", valor: "18", unidade: "ng/mL", refMin: 30, refMax: 100, valorNum: 18, status: "baixo" },
      { nome: "Vitamina B12", valor: "310", unidade: "pg/mL", refMin: 200, refMax: 900, valorNum: 310, status: "normal" },
      { nome: "Ferritina", valor: "22", unidade: "ng/mL", refMin: 15, refMax: 150, valorNum: 22, status: "normal" },
      { nome: "Ferro Sérico", valor: "68", unidade: "μg/dL", refMin: 60, refMax: 160, valorNum: 68, status: "normal" },
      { nome: "Zinco", valor: "68", unidade: "μg/dL", refMin: 70, refMax: 120, valorNum: 68, status: "baixo" },
      { nome: "Magnésio", valor: "1,7", unidade: "mg/dL", refMin: 1.7, refMax: 2.4, valorNum: 1.7, status: "normal" },
      { nome: "Potássio", valor: "4,0", unidade: "mEq/L", refMin: 3.5, refMax: 5.0, valorNum: 4.0, status: "normal" },
    ],
  },
  {
    nome: "Função Hepática e Renal", cor: "default",
    resultados: [
      { nome: "TGO (AST)", valor: "28", unidade: "U/L", refMin: 0, refMax: 40, valorNum: 28, status: "normal" },
      { nome: "TGP (ALT)", valor: "32", unidade: "U/L", refMin: 0, refMax: 40, valorNum: 32, status: "normal" },
      { nome: "Creatinina", valor: "0,82", unidade: "mg/dL", refMin: 0.5, refMax: 1.1, valorNum: 0.82, status: "normal" },
      { nome: "Ureia", valor: "28", unidade: "mg/dL", refMin: 15, refMax: 45, valorNum: 28, status: "normal" },
      { nome: "Ácido Úrico", valor: "4,8", unidade: "mg/dL", refMin: 2.4, refMax: 5.7, valorNum: 4.8, status: "normal" },
      { nome: "Albumina", valor: "4,2", unidade: "g/dL", refMin: 3.5, refMax: 5.0, valorNum: 4.2, status: "normal" },
    ],
  },
];

const STATUS_COLOR: Record<string, "success" | "warning" | "danger" | "default"> = {
  normal: "success", alto: "warning", baixo: "warning", "muito-alto": "danger", "muito-baixo": "danger",
};

const STATUS_LABEL: Record<string, string> = {
  normal: "Normal", alto: "Elevado", baixo: "Baixo", "muito-alto": "Muito elevado", "muito-baixo": "Muito baixo",
};

function RangeBar({ resultado }: { resultado: Resultado }) {
  const range = resultado.refMax - resultado.refMin;
  if (range <= 0) return null;
  const pct = Math.min(100, Math.max(0, ((resultado.valorNum - resultado.refMin) / range) * 100));
  return (
    <div className="w-24">
      <Progress
        size="sm"
        value={pct}
        color={resultado.status === "normal" ? "success" : resultado.status === "alto" || resultado.status === "baixo" ? "warning" : "danger"}
      />
    </div>
  );
}

export function ResultadosExamesTab() {
  return (
    <div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <Chip size="sm" variant="flat" color="success">Normal</Chip>
        <Chip size="sm" variant="flat" color="warning">Atenção</Chip>
        <Chip size="sm" variant="flat" color="danger">Crítico</Chip>
        <span className="text-xs text-slate-400 self-center">Coleta: 05/03/2026</span>
      </div>

      {GRUPOS.map((grupo, gi) => (
        <ExportSection key={gi} title={grupo.nome}>
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardHeader className="pb-2">
              <Chip size="sm" variant="solid" color={grupo.cor}>{grupo.nome}</Chip>
            </CardHeader>
            <CardBody className="pt-0">
              <Table removeWrapper aria-label={grupo.nome} isStriped>
                <TableHeader>
                  <TableColumn className="text-xs font-medium uppercase tracking-wider">Exame</TableColumn>
                  <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">Resultado</TableColumn>
                  <TableColumn className="text-xs font-medium uppercase tracking-wider">Referência</TableColumn>
                  <TableColumn className="text-xs font-medium uppercase tracking-wider">Range</TableColumn>
                  <TableColumn className="text-xs font-medium uppercase tracking-wider">Status</TableColumn>
                </TableHeader>
                <TableBody items={grupo.resultados}>
                  {(res) => (
                    <TableRow key={res.nome}>
                      <TableCell className="font-medium text-slate-700 text-sm">{res.nome}</TableCell>
                      <TableCell className="text-right font-bold text-slate-900">
                        {res.valor} <span className="text-xs font-normal text-slate-400">{res.unidade}</span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {res.refMin > 0 ? `${res.refMin} – ${res.refMax}` : `< ${res.refMax}`}
                      </TableCell>
                      <TableCell><RangeBar resultado={res} /></TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat" color={STATUS_COLOR[res.status]}>
                          {STATUS_LABEL[res.status]}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </ExportSection>
      ))}
    </div>
  );
}
