"use client";
import { Chip } from "@heroui/react";
import { ExportSection } from "../ExportSection";
import { ExportAssinatura } from "../ExportAssinatura";

const SUPLEMENTOS = [
  {
    nome: "Whey Protein Isolado",
    marca: "Optimum Nutrition",
    forma: "Pó",
    dosagem: "40g",
    frequencia: "Diária",
    via: "Oral",
    horario: "Pós-treino (até 30 min após) ou café da manhã nos dias sem treino",
    orientacao: "Diluir em 300ml de água fria ou leite desnatado. Não misturar com suco cítrico (reduz absorção).",
    categoria: "Proteína",
    cor: "primary" as const,
  },
  {
    nome: "Creatina Monohidratada",
    marca: "Probiótica",
    forma: "Pó",
    dosagem: "5g",
    frequencia: "Diária",
    via: "Oral",
    horario: "Qualquer horário — preferencialmente pós-treino. Nos dias sem treino, junto com a primeira refeição.",
    orientacao: "Diluir em 300ml de água ou suco. Manter hidratação adequada (mínimo 2L/dia). Fase de saturação opcional.",
    categoria: "Performance",
    cor: "secondary" as const,
  },
  {
    nome: "Vitamina D3 + K2",
    marca: "Catarinense Pharma",
    forma: "Cápsulas",
    dosagem: "5.000 UI D3 + 100mcg K2",
    frequencia: "Diária",
    via: "Oral",
    horario: "Com a refeição principal (almoço ou jantar)",
    orientacao: "Tomar obrigatoriamente junto com refeição que contenha gordura (melhora absorção em até 50%). A K2 protege contra calcificação vascular ao direcionar o cálcio para os ossos.",
    categoria: "Vitamina",
    cor: "success" as const,
  },
  {
    nome: "Ômega-3 (EPA/DHA)",
    marca: "Vitafor",
    forma: "Cápsulas",
    dosagem: "2g (EPA 720mg + DHA 480mg)",
    frequencia: "Diária",
    via: "Oral",
    horario: "Com as refeições (dividido: 1g almoço + 1g jantar)",
    orientacao: "Guardar na geladeira após aberto para evitar oxidação. Tomar com alimentos para minimizar refluxo. Suspender 7 dias antes de cirurgias.",
    categoria: "Anti-inflamatório",
    cor: "warning" as const,
  },
  {
    nome: "Magnésio Dimalato",
    marca: "Florien",
    forma: "Cápsulas",
    dosagem: "400mg de magnésio elementar",
    frequencia: "Diária",
    via: "Oral",
    horario: "Jantar ou antes de dormir",
    orientacao: "Forma dimalato tem melhor biodisponibilidade e menor efeito laxativo que o óxido. Auxilia no sono, redução de câimbras e função muscular.",
    categoria: "Mineral",
    cor: "default" as const,
  },
  {
    nome: "Vitamina B12 (Metilcobalamina)",
    marca: "Sundown",
    forma: "Comprimido sublingual",
    dosagem: "1.000mcg",
    frequencia: "2x por semana",
    via: "Sublingual",
    horario: "Manhã, em jejum",
    orientacao: "Forma metilcobalamina é mais biodisponível que a cianocobalamina. Manter sob a língua por 30–60 segundos antes de engolir.",
    categoria: "Vitamina",
    cor: "success" as const,
  },
  {
    nome: "Zinco Quelado (ZMA)",
    marca: "Max Titanium",
    forma: "Cápsulas",
    dosagem: "30mg zinco + 450mg magnésio + B6",
    frequencia: "Diária",
    via: "Oral",
    horario: "30–60 min antes de dormir, em jejum ou 2h após refeição",
    orientacao: "Não tomar junto com cálcio (competição de absorção). Auxilia na recuperação muscular, síntese hormonal e qualidade do sono.",
    categoria: "Mineral",
    cor: "default" as const,
  },
  {
    nome: "Colágeno Hidrolisado Tipo I e III",
    marca: "Verisol",
    forma: "Pó",
    dosagem: "10g",
    frequencia: "Diária",
    via: "Oral",
    horario: "Qualquer horário — preferencialmente com vitamina C para maior síntese",
    orientacao: "Pode ser adicionado ao café, suco ou vitamina. Tomar com 50–200mg de vitamina C aumenta significativamente a absorção e síntese de colágeno.",
    categoria: "Estrutural",
    cor: "secondary" as const,
  },
  {
    nome: "Probiótico Multicepa",
    marca: "Floratil",
    forma: "Sachê",
    dosagem: "5 bilhões UFC",
    frequencia: "Diária",
    via: "Oral",
    horario: "Com o café da manhã",
    orientacao: "Manter refrigerado. Não misturar em bebidas quentes (mata os microrganismos). Usar por 30 dias consecutivos para colonização adequada da microbiota intestinal.",
    categoria: "Microbiota",
    cor: "warning" as const,
  },
  {
    nome: "L-Glutamina",
    marca: "Nitech Nutrition",
    forma: "Pó",
    dosagem: "5g",
    frequencia: "Diária nos dias de treino",
    via: "Oral",
    horario: "Pós-treino junto ao Whey ou antes de dormir",
    orientacao: "Auxilia na recuperação muscular e integridade da mucosa intestinal. Em períodos de maior volume de treino, pode-se aumentar para 10g/dia divididas em 2 doses.",
    categoria: "Aminoácido",
    cor: "primary" as const,
  },
];

export function PrescricaoSuplementosTab() {
  return (
    <div>
      {SUPLEMENTOS.map((sup, i) => (
        <ExportSection key={i} title={`${i + 1}. ${sup.nome}`}>
          <div className="border border-slate-200 rounded-xl overflow-hidden">

            {/* Marca + categoria */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50">
              <span className="text-xs text-slate-500">{sup.marca}</span>
              <Chip size="sm" variant="flat" color={sup.cor}>{sup.categoria}</Chip>
            </div>

            {/* Dosagem + forma + frequência + via */}
            <div className="grid grid-cols-4 border-t border-slate-100">
              {[
                { label: "Dosagem",    value: sup.dosagem    },
                { label: "Forma",      value: sup.forma      },
                { label: "Frequência", value: sup.frequencia },
                { label: "Via",        value: sup.via        },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-2.5 border-r border-slate-100 last:border-r-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</div>
                  <div className="text-sm font-semibold text-slate-800">{value}</div>
                </div>
              ))}
            </div>

            {/* Horário */}
            <div className="border-t border-slate-100 px-4 py-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Horário</div>
              <p className="text-sm text-slate-700">{sup.horario}</p>
            </div>

            {/* Orientações */}
            <div className="border-t border-slate-100 px-4 py-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Orientações</div>
              <p className="text-xs text-slate-500 leading-relaxed">{sup.orientacao}</p>
            </div>

          </div>
        </ExportSection>
      ))}

      <ExportSection title="Observações Gerais">
        <div className="border border-slate-200 rounded-xl px-4 py-3">
          <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
            {[
              "Manter hidratação adequada (mínimo 35ml/kg de peso corporal/dia = ~2,7L/dia).",
              "Suplementação não substitui alimentação equilibrada — os alimentos devem ser a base do aporte nutricional.",
              "Em caso de eventos adversos (alergias, desconforto gastrointestinal, alterações de sono), suspender o suplemento e informar a nutricionista.",
              "Não associar suplementos não listados sem orientação profissional prévia.",
              "Guardar todos os suplementos em local fresco, seco e ao abrigo da luz solar direta.",
            ].map((txt, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                <p>{txt}</p>
              </div>
            ))}
          </div>
        </div>
      </ExportSection>

      <ExportAssinatura />
    </div>
  );
}
