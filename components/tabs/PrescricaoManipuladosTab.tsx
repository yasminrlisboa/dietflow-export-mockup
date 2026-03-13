"use client";
import { Card, CardBody, Chip } from "@heroui/react";
import { ExportSection } from "../ExportSection";

// ─── TIPOS — espelhando exatamente o DietFlow ────────────────────────────────

interface Molecula {
  substancia: string;
  molecula: string;   // molécula ativa / forma química
  quantidade: string;
  unidade: string;
}

interface Apresentacao {
  tipo: "Cápsula" | "Sachê";
  subtipo: string;    // para Cápsula: Gelatinosa | Vegetal | Gastroresistente
                      // para Sachê: sabor (texto livre)
  dose: string;       // quantidade total (ex: "60", "30")
}

interface Formulacao {
  id: string;
  nome: string;
  moleculas: Molecula[];
  apresentacao: Apresentacao;
  posologia: string;
}

// ─── DADOS MOCK — baseados nas formulações reais do DietFlow ─────────────────

const FORMULACOES: Formulacao[] = [
  {
    id: "f1",
    nome: "Anti-Estresse e Sono",
    moleculas: [
      { substancia: "Magnésio",       molecula: "Bisglicinato de Magnésio",    quantidade: "300", unidade: "mg" },
      { substancia: "Ashwagandha",    molecula: "Extrato KSM-66",              quantidade: "500", unidade: "mg" },
      { substancia: "L-Teanina",      molecula: "L-Teanina",                   quantidade: "200", unidade: "mg" },
      { substancia: "Vitamina B6",    molecula: "Piridoxal-5-Fosfato (P5P)",   quantidade: "10",  unidade: "mg" },
    ],
    apresentacao: { tipo: "Cápsula", subtipo: "Vegetal", dose: "60" },
    posologia: "Tomar 1 cápsula duas vezes ao dia, sendo uma delas 30 minutos antes de dormir.",
  },
  {
    id: "f2",
    nome: "Modulação Insulínica",
    moleculas: [
      { substancia: "Berberina",      molecula: "Cloridrato de Berberina 97%", quantidade: "500", unidade: "mg" },
      { substancia: "Cromo",          molecula: "Picolinato de Cromo",         quantidade: "100", unidade: "mcg" },
      { substancia: "Ácido Alfa-Lipóico", molecula: "Ácido R-Alfa-Lipóico",  quantidade: "200", unidade: "mg" },
      { substancia: "Canela",         molecula: "Extrato de Cinnamomum verum", quantidade: "200", unidade: "mg" },
    ],
    apresentacao: { tipo: "Cápsula", subtipo: "Vegetal", dose: "90" },
    posologia: "Tomar 1 cápsula 3 vezes ao dia, imediatamente antes das principais refeições.",
  },
  {
    id: "f3",
    nome: "Suporte Imunológico",
    moleculas: [
      { substancia: "Vitamina D3",    molecula: "Colecalciferol",              quantidade: "5000", unidade: "UI" },
      { substancia: "Vitamina K2",    molecula: "Menaquinona-7 (MK-7)",        quantidade: "100",  unidade: "mcg" },
      { substancia: "Zinco",          molecula: "Bisglicinato de Zinco",        quantidade: "15",   unidade: "mg" },
      { substancia: "Selênio",        molecula: "Selenometionina",              quantidade: "100",  unidade: "mcg" },
      { substancia: "Vitamina C",     molecula: "Ascorbato de Cálcio",          quantidade: "500",  unidade: "mg" },
    ],
    apresentacao: { tipo: "Cápsula", subtipo: "Gelatinosa", dose: "60" },
    posologia: "Tomar 1 cápsula ao dia, preferencialmente junto à refeição principal.",
  },
  {
    id: "f4",
    nome: "Pré-Treino Magistral",
    moleculas: [
      { substancia: "Beta-alanina",   molecula: "Beta-alanina",                quantidade: "3",   unidade: "g" },
      { substancia: "L-Citrulina",    molecula: "L-Citrulina DL-Malato 2:1",   quantidade: "6",   unidade: "g" },
      { substancia: "Cafeína",        molecula: "Cafeína Anidra",               quantidade: "200", unidade: "mg" },
      { substancia: "L-Arginina",     molecula: "L-Arginina HCl",              quantidade: "2",   unidade: "g" },
    ],
    apresentacao: { tipo: "Sachê", subtipo: "Frutas Vermelhas", dose: "20" },
    posologia: "Diluir 1 sachê em 300 mL de água gelada e tomar 20 minutos antes do treino.",
  },
  {
    id: "f5",
    nome: "Probiótico Personalizado",
    moleculas: [
      { substancia: "L. rhamnosus",   molecula: "Lacticaseibacillus rhamnosus GG",    quantidade: "5",   unidade: "bilhões UFC" },
      { substancia: "B. longum",      molecula: "Bifidobacterium longum BB536",        quantidade: "5",   unidade: "bilhões UFC" },
      { substancia: "L. acidophilus", molecula: "Lacticaseibacillus acidophilus NCFM", quantidade: "5",   unidade: "bilhões UFC" },
      { substancia: "FOS",            molecula: "Frutooligossacarídeos grau alimentar", quantidade: "1500", unidade: "mg" },
    ],
    apresentacao: { tipo: "Sachê", subtipo: "Neutro", dose: "30" },
    posologia: "Dissolver 1 sachê em 150 mL de água em temperatura ambiente e tomar em jejum pela manhã.",
  },
];

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

function TabelaMoleculas({ moleculas }: { moleculas: Molecula[] }) {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-slate-100 bg-slate-50">
          <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider w-[30%]">
            Nome da Substância
          </th>
          <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider w-[35%]">
            Molécula Ativa
          </th>
          <th className="text-right px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">
            Quantidade
          </th>
          <th className="text-left px-4 py-2.5 font-semibold text-slate-500 uppercase tracking-wider">
            Unidade
          </th>
        </tr>
      </thead>
      <tbody>
        {moleculas.map((m, i) => (
          <tr key={i} className={`border-b border-slate-50 ${i % 2 !== 0 ? "bg-slate-50/40" : ""}`}>
            <td className="px-4 py-2.5 font-semibold text-slate-800">{m.substancia}</td>
            <td className="px-4 py-2.5 text-slate-600">{m.molecula}</td>
            <td className="px-4 py-2.5 text-right font-mono font-bold text-slate-900">{m.quantidade}</td>
            <td className="px-4 py-2.5 text-slate-500">{m.unidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PrescricaoManipuladosTab() {
  return (
    <div>
      {/* Banner */}
      <Card shadow="none" classNames={{ base: "border border-blue-100 bg-blue-50 mb-5" }}>
        <CardBody className="py-3 px-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <span className="font-bold">Prescrição de manipulados.</span> Documento destinado à farmácia de manipulação.
            Cada formulação deve ser preparada conforme a composição, forma farmacêutica e posologia especificadas.
            Validade da receita: <span className="font-semibold">30 dias</span> a partir da data de emissão.
          </p>
        </CardBody>
      </Card>

      {/* Resumo */}
      <div className="flex gap-3 mb-6">
        {[
          { label: "Formulações",    value: FORMULACOES.length },
          { label: "Total moléculas", value: FORMULACOES.reduce((a, f) => a + f.moleculas.length, 0) },
          { label: "Validade",       value: "30 dias" },
        ].map((item) => (
          <div key={item.label} className="border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-lg font-extrabold text-slate-800">{item.value}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Formulações */}
      {FORMULACOES.map((f, idx) => (
        <ExportSection key={f.id} title={`${idx + 1}. ${f.nome}`}>
          <div className="border border-slate-200 rounded-xl overflow-hidden">

            {/* Header da formulação */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-sm font-bold text-slate-800">{f.nome}</span>
              </div>
              <Chip size="sm" variant="flat" color="primary">Manipulado</Chip>
            </div>

            {/* Tabela de moléculas */}
            <TabelaMoleculas moleculas={f.moleculas} />

            {/* Apresentação + Posologia */}
            <div className="border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-100">
              {/* Apresentação */}
              <div className="px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Apresentação
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Forma Farmacêutica</span>
                    <span className="font-semibold text-slate-800">{f.apresentacao.tipo}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {f.apresentacao.tipo === "Sachê" ? "Sabor" : "Especificação"}
                    </span>
                    <span className="font-semibold text-slate-800">{f.apresentacao.subtipo || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {f.apresentacao.tipo === "Sachê" ? "Sachês" : "Cápsulas"}
                    </span>
                    <span className="font-bold text-slate-900">{f.apresentacao.dose}</span>
                  </div>
                </div>
              </div>

              {/* Posologia */}
              <div className="px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Posologia
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{f.posologia}</p>
              </div>
            </div>
          </div>
        </ExportSection>
      ))}

      {/* Assinatura */}
      <div className="mt-12 flex justify-between items-end">
        <div className="text-xs text-slate-500">
          <p>São Paulo, 12 de março de 2026</p>
          <p className="mt-1 text-slate-400">Validade: até 11 de abril de 2026</p>
        </div>
        <div className="text-center">
          <div className="border-t border-slate-800 w-64 mb-2" />
          <p className="text-sm font-semibold text-slate-800">Dra. Maria Fernanda Costa</p>
          <p className="text-xs text-slate-500">Nutricionista · CRN-3 12345/SP</p>
        </div>
      </div>
    </div>
  );
}
