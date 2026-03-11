"use client";
import { Card, CardBody, CardHeader, Chip, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { ExportSection } from "../ExportSection";

const GRUPOS = [
  {
    nome: "Avaliação Nutricional Completa",
    exames: [
      "Hemograma completo", "Glicemia de jejum", "Hemoglobina glicada (HbA1c)", "Insulina basal",
      "HOMA-IR", "Colesterol total e frações", "Triglicerídeos",
    ],
  },
  {
    nome: "Função Tireoidiana",
    exames: ["TSH", "T4 livre", "T3 livre", "Anti-TPO (anticorpos anti-tireoperoxidase)", "Anti-TG (anticorpos anti-tireoglobulina)"],
  },
  {
    nome: "Vitaminas e Micronutrientes",
    exames: [
      "Vitamina D (25-hidroxivitamina D)", "Vitamina B12 (cobalamina)", "Vitamina B9 (ácido fólico sérico)",
      "Vitamina A (retinol sérico)", "Ferritina sérica", "Ferro sérico e TIBC",
    ],
  },
  {
    nome: "Minerais e Eletrólitos",
    exames: [
      "Zinco sérico", "Magnésio sérico", "Potássio sérico", "Sódio sérico",
      "Cálcio iônico", "Fósforo sérico",
    ],
  },
  {
    nome: "Função Hepática, Renal e Inflamatória",
    exames: [
      "TGO (AST)", "TGP (ALT)", "Gama-GT", "Creatinina sérica",
      "Ureia", "Ácido úrico", "Proteína C-reativa (PCR ultra-sensível)", "Albumina sérica",
    ],
  },
];

export function PrescricaoExamesTab() {
  return (
    <div>
      <Card shadow="none" classNames={{ base: "border border-blue-100 bg-blue-50 mb-6" }}>
        <CardBody className="py-3">
          <p className="text-xs text-blue-700">
            <span className="font-semibold">Indicação clínica:</span> Avaliação do estado nutricional, monitoramento metabólico e investigação de deficiências nutricionais.
            Jejum de 12 horas obrigatório para os exames de sangue.
          </p>
        </CardBody>
      </Card>

      {GRUPOS.map((grupo, gi) => (
        <ExportSection key={gi} title={grupo.nome}>
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardBody className="py-3">
              <div className="space-y-1.5">
                {grupo.exames.map((exame, ei) => (
                  <div key={ei} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{exame}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </ExportSection>
      ))}

      <ExportSection title="Observações">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-xs text-slate-600 leading-relaxed space-y-2">
            <p>• Jejum de 12 horas antes da coleta para exames de glicemia, perfil lipídico e insulina.</p>
            <p>• Coletar todos os exames em um único laboratório para facilitar comparação futura.</p>
            <p>• Trazer resultados anteriores (se houver) para comparação durante a consulta de retorno.</p>
            <p>• Em caso de uso de suplementação, informar ao laboratório antes da coleta.</p>
            <p>• Evitar atividade física intensa nas 24 horas anteriores à coleta.</p>
          </CardBody>
        </Card>
      </ExportSection>

      <div className="mt-12 text-center">
        <div className="inline-block">
          <div className="border-t border-slate-800 w-64 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">Dra. Maria Fernanda Costa</p>
          <p className="text-xs text-slate-500">Nutricionista · CRN 12345/SP</p>
          <p className="text-xs text-slate-400 mt-1">São Paulo, 11 de março de 2026</p>
        </div>
      </div>
    </div>
  );
}
