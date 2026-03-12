"use client";
import { Card, CardBody, Chip } from "@heroui/react";
import { ExportSection } from "../ExportSection";

interface SubExame {
  nome: string;
  obs?: string;
  subExames?: SubExame[];
}

interface Exame {
  nome: string;
  obs?: string;
  jejum?: boolean;
  subExames?: SubExame[];
}

interface Grupo {
  nome: string;
  indicacao?: string;
  exames: Exame[];
}

const GRUPOS: Grupo[] = [
  {
    nome: "Hemograma Completo",
    indicacao: "Avaliação global da série vermelha, branca e plaquetas",
    exames: [
      {
        nome: "Hemograma Completo",
        jejum: false,
        subExames: [
          { nome: "Hemoglobina" },
          { nome: "Hematócrito" },
          { nome: "VCM (Volume Corpuscular Médio)" },
          { nome: "HCM (Hemoglobina Corpuscular Média)" },
          { nome: "CHCM (Concentração de Hemoglobina Corpuscular Média)" },
          { nome: "RDW (Amplitude de Distribuição Eritrocitária)" },
          {
            nome: "Leucócitos Totais",
            subExames: [
              { nome: "Neutrófilos (segmentados + bastonetes)" },
              { nome: "Linfócitos" },
              { nome: "Monócitos" },
              { nome: "Eosinófilos" },
              { nome: "Basófilos" },
            ],
          },
          { nome: "Plaquetas" },
          { nome: "VPM (Volume Plaquetário Médio)" },
        ],
      },
    ],
  },
  {
    nome: "Avaliação Metabólica e Glicêmica",
    indicacao: "Monitoramento do metabolismo da glicose e resistência insulínica",
    exames: [
      {
        nome: "Perfil Glicêmico",
        jejum: true,
        subExames: [
          { nome: "Glicemia de Jejum" },
          { nome: "Hemoglobina Glicada (HbA1c)" },
          { nome: "Insulina Basal" },
          { nome: "HOMA-IR (calculado: glicemia × insulina / 405)" },
          { nome: "HOMA-β (função das células β)" },
        ],
      },
    ],
  },
  {
    nome: "Perfil Lipídico",
    indicacao: "Avaliação do risco cardiovascular e metabolismo lipídico",
    exames: [
      {
        nome: "Lipidograma Completo",
        jejum: true,
        subExames: [
          { nome: "Colesterol Total" },
          { nome: "HDL Colesterol (fração protetora)" },
          { nome: "LDL Colesterol (calculado por Friedewald)" },
          { nome: "VLDL Colesterol" },
          { nome: "Triglicerídeos" },
          { nome: "Índice de Castelli I (CT/HDL)" },
          { nome: "Índice de Castelli II (LDL/HDL)" },
          { nome: "Não-HDL Colesterol" },
        ],
      },
    ],
  },
  {
    nome: "Função Tireoidiana",
    indicacao: "Avaliação completa do eixo hipófise-tireoide e autoimunidade",
    exames: [
      {
        nome: "Painel Tireoidiano",
        jejum: false,
        subExames: [
          { nome: "TSH (Hormônio Estimulante da Tireoide)" },
          { nome: "T4 Livre (Tiroxina Livre)" },
          { nome: "T3 Livre (Triiodotironina Livre)" },
          { nome: "T4 Total" },
          { nome: "T3 Total" },
        ],
      },
      {
        nome: "Autoimunidade Tireoidiana",
        jejum: false,
        subExames: [
          { nome: "Anti-TPO (Anticorpos Anti-Tireoperoxidase)" },
          { nome: "Anti-TG (Anticorpos Anti-Tireoglobulina)" },
          { nome: "Anti-TSHR (Anticorpos Anti-Receptor de TSH)", obs: "Se suspeita de Graves" },
        ],
      },
    ],
  },
  {
    nome: "Vitaminas e Micronutrientes",
    indicacao: "Investigação de deficiências nutricionais e status vitamínico",
    exames: [
      {
        nome: "Vitaminas Lipossolúveis",
        jejum: true,
        subExames: [
          { nome: "Vitamina D (25-hidroxivitamina D — 25-OH-D3)" },
          { nome: "Vitamina A (Retinol Sérico)" },
          { nome: "Vitamina E (Alpha-Tocoferol)", obs: "Se sintomas específicos" },
        ],
      },
      {
        nome: "Vitaminas Hidrossolúveis",
        jejum: false,
        subExames: [
          { nome: "Vitamina B12 (Cobalamina)" },
          { nome: "Vitamina B9 (Ácido Fólico Sérico)" },
          { nome: "Vitamina B6 (Piridoxina)", obs: "Se suspeita de deficiência" },
          { nome: "Vitamina C (Ácido Ascórbico)", obs: "Se sintomas específicos" },
        ],
      },
      {
        nome: "Ferro e Anemia",
        jejum: true,
        subExames: [
          { nome: "Ferritina Sérica" },
          { nome: "Ferro Sérico" },
          { nome: "TIBC (Capacidade Total de Ligação do Ferro)" },
          { nome: "Saturação de Transferrina" },
          { nome: "Transferrina" },
        ],
      },
    ],
  },
  {
    nome: "Minerais e Eletrólitos",
    indicacao: "Avaliação do equilíbrio mineral e eletrolítico",
    exames: [
      {
        nome: "Painel Mineral",
        jejum: false,
        subExames: [
          { nome: "Zinco Sérico" },
          { nome: "Magnésio Sérico" },
          { nome: "Cobre Sérico" },
          { nome: "Selênio Sérico" },
          { nome: "Cromo Sérico", obs: "Se resistência insulínica" },
        ],
      },
      {
        nome: "Eletrólitos",
        jejum: false,
        subExames: [
          { nome: "Sódio Sérico" },
          { nome: "Potássio Sérico" },
          { nome: "Cloreto Sérico" },
          { nome: "Cálcio Total" },
          { nome: "Cálcio Iônico" },
          { nome: "Fósforo Sérico" },
        ],
      },
    ],
  },
  {
    nome: "Função Hepática",
    indicacao: "Avaliação da integridade e função do fígado",
    exames: [
      {
        nome: "Enzimas Hepáticas",
        jejum: true,
        subExames: [
          { nome: "TGO / AST (Aspartato Aminotransferase)" },
          { nome: "TGP / ALT (Alanina Aminotransferase)" },
          { nome: "Gama-GT (Gama-Glutamiltransferase)" },
          { nome: "Fosfatase Alcalina" },
          { nome: "DHL (Desidrogenase Lática)" },
        ],
      },
      {
        nome: "Síntese e Metabolismo Hepático",
        jejum: true,
        subExames: [
          { nome: "Albumina Sérica" },
          { nome: "Proteínas Totais e Frações" },
          { nome: "Bilirrubina Total, Direta e Indireta" },
          { nome: "TP (Tempo de Protrombina) / INR" },
        ],
      },
    ],
  },
  {
    nome: "Função Renal e Ácido Úrico",
    indicacao: "Avaliação da função dos rins e metabolismo das purinas",
    exames: [
      {
        nome: "Painel Renal",
        jejum: true,
        subExames: [
          { nome: "Creatinina Sérica" },
          { nome: "Taxa de Filtração Glomerular (TFG estimada — CKD-EPI)" },
          { nome: "Ureia Sérica" },
          { nome: "Ácido Úrico Sérico" },
          { nome: "Cistatina C", obs: "Se suspeita de DRC precoce" },
        ],
      },
      {
        nome: "Urina",
        jejum: false,
        subExames: [
          { nome: "Urina de Rotina (EQU)" },
          { nome: "Microalbuminúria (urina de 24h ou spot)", obs: "Se DM ou HAS" },
          { nome: "Creatinina Urinária (urina de 24h)" },
        ],
      },
    ],
  },
  {
    nome: "Inflamação e Imunidade",
    indicacao: "Avaliação do estado inflamatório sistêmico",
    exames: [
      {
        nome: "Marcadores Inflamatórios",
        jejum: false,
        subExames: [
          { nome: "Proteína C-Reativa Ultra-Sensível (PCR-us)" },
          { nome: "VHS (Velocidade de Hemossedimentação)" },
          { nome: "Homocisteína Sérica" },
          { nome: "Fibrinogênio", obs: "Se risco cardiovascular elevado" },
          { nome: "Interleucina-6 (IL-6)", obs: "Se suspeita de inflamação crônica" },
        ],
      },
    ],
  },
];

export function PrescricaoExamesTab() {
  const totalParams = GRUPOS.reduce(
    (acc, g) => acc + g.exames.reduce((a, e) => a + (e.subExames?.length ?? 1), 0),
    0
  );

  return (
    <div>
      {/* Indicação clínica */}
      <Card shadow="none" classNames={{ base: "border border-blue-100 bg-blue-50 mb-5" }}>
        <CardBody className="py-3 px-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <span className="font-bold">Indicação clínica:</span> Avaliação do estado nutricional, monitoramento
            metabólico e investigação de deficiências nutricionais. Jejum de{" "}
            <span className="font-semibold">12 horas</span> obrigatório nos exames marcados com{" "}
            <span className="font-semibold">Jejum 12h</span>. Coletar em um único laboratório.
          </p>
        </CardBody>
      </Card>

      {/* Resumo */}
      <div className="flex gap-3 mb-6">
        {[
          { label: "Grupos",     value: GRUPOS.length },
          { label: "Painéis",   value: GRUPOS.reduce((a, g) => a + g.exames.length, 0) },
          { label: "Parâmetros", value: totalParams },
        ].map((item) => (
          <div key={item.label} className="border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-lg font-extrabold text-slate-800">{item.value}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {GRUPOS.map((grupo, gi) => (
        <ExportSection key={gi} title={grupo.nome}>
          {grupo.indicacao && (
            <p className="text-xs text-slate-400 italic mb-3">{grupo.indicacao}</p>
          )}
          <div className="space-y-2">
            {grupo.exames.map((exame, ei) => (
              <div key={ei} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Cabeçalho do painel */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{exame.nome}</span>
                  </div>
                  {exame.jejum !== undefined && (
                    <Chip
                      size="sm"
                      variant="flat"
                      color={exame.jejum ? "primary" : "default"}
                      className="text-[10px]"
                    >
                      {exame.jejum ? "Jejum 12h" : "Sem jejum"}
                    </Chip>
                  )}
                </div>

                {/* Sub-exames */}
                {exame.subExames && (
                  <div className="bg-white px-4 py-3 space-y-2">
                    {exame.subExames.map((sub, si) => (
                      <div key={si}>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
                          <div className="flex-1">
                            <span className="text-sm text-slate-700">{sub.nome}</span>
                            {sub.obs && (
                              <span className="text-xs text-slate-400 ml-1.5 italic">— {sub.obs}</span>
                            )}
                            {/* sub-sub-exames */}
                            {sub.subExames && (
                              <div className="mt-1.5 ml-3 space-y-1 border-l-2 border-slate-100 pl-3">
                                {sub.subExames.map((ssub, ssi) => (
                                  <div key={ssi} className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-slate-200 flex-shrink-0" />
                                    <span className="text-xs text-slate-500">{ssub.nome}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ExportSection>
      ))}

      {/* Orientações */}
      <ExportSection title="Orientações ao Paciente">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-xs text-slate-600 leading-relaxed space-y-2">
            {[
              { titulo: "Jejum", texto: 'Exames marcados com "Jejum 12h" exigem 12 horas sem comer ou beber (exceto água sem gás).' },
              { titulo: "Suplementos", texto: "Informar ao laboratório sobre uso de suplementos nutricionais antes da coleta." },
              { titulo: "Atividade física", texto: "Evitar exercício intenso nas 24 horas anteriores à coleta." },
              { titulo: "Laboratório único", texto: "Coletar todos os exames em um único laboratório para facilitar comparações futuras." },
              { titulo: "Resultados anteriores", texto: "Trazer todos os resultados anteriores para a consulta de retorno." },
              { titulo: "Coleta pela manhã", texto: "Preferencialmente entre 7h e 9h para melhor padronização hormonal." },
            ].map(({ titulo, texto }) => (
              <div key={titulo} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                <p><strong>{titulo}:</strong> {texto}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </ExportSection>

      <div className="mt-12 text-center">
        <div className="inline-block">
          <div className="border-t border-slate-800 w-64 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">Dra. Maria Fernanda Costa</p>
          <p className="text-xs text-slate-500">Nutricionista · CRN 12345/SP</p>
          <p className="text-xs text-slate-400 mt-1">São Paulo, 12 de março de 2026</p>
        </div>
      </div>
    </div>
  );
}
