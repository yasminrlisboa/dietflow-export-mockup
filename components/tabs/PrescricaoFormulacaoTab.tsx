"use client";
import { Card, CardBody, Divider } from "@heroui/react";
import { ExportSection } from "../ExportSection";

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface Ativo {
  nome: string;
  dose: string;
  unidade: string;
  obs?: string;
}

interface Formulacao {
  numero: number;
  nome: string;
  indicacao: string;
  ativos: Ativo[];
  formaFarmaceutica: string;
  formaDescricao: string;
  quantidade: string;
  posologia: string;
  momento: string;
  duracao: string;
  orientacoesEspeciais?: string[];
  armazenamento?: string;
}

// ─── FORMAS FARMACÊUTICAS — glossário ────────────────────────────────────────

const FORMAS: Record<string, { icone: string; descricao: string }> = {
  "Cápsula Gelatinosa": {
    icone: "○",
    descricao: "Invólucro de gelatina bovina/suína. Desintegração rápida (~15 min). Uso geral.",
  },
  "Cápsula Vegetal (HPMC)": {
    icone: "○",
    descricao: "Invólucro 100% vegetal (hidroxipropilmetilcelulose). Indicado para veganos, ativos higroscópicos ou restrição religiosa.",
  },
  "Softgel": {
    icone: "○",
    descricao: "Cápsula mole com preenchimento oleoso. Biodisponibilidade superior. Indicado para vitaminas lipossolúveis e ômega-3.",
  },
  "Sachê (pó oral)": {
    icone: "○",
    descricao: "Envelope selado com pó para dispersão em água. Indicado para doses altas, crianças, idosos ou dificuldade de deglutição.",
  },
  "Comprimido Efervescente": {
    icone: "○",
    descricao: "Dissolução em água com liberação de CO₂. Absorção rápida e boa palatabilidade.",
  },
  "Solução Oral (gotas)": {
    icone: "○",
    descricao: "Forma líquida para administração por gotas. Indicado para crianças e doses de precisão.",
  },
};

// ─── DADOS ────────────────────────────────────────────────────────────────────

const FORMULACOES: Formulacao[] = [
  {
    numero: 1,
    nome: "Reposição de Vitamina D3 + K2 + Magnésio",
    indicacao: "Deficiência de vitamina D (18 ng/mL), zinco e magnésio na borda inferior — suporte à mineralização óssea, imunidade e função neuromuscular.",
    formaFarmaceutica: "Softgel",
    formaDescricao: "Cápsula mole com veículo oleoso (óleo de TCM) para máxima biodisponibilidade das vitaminas lipossolúveis.",
    quantidade: "60 softgéis",
    posologia: "Tomar 1 softgel ao dia",
    momento: "Junto à refeição principal (almoço ou jantar — com presença de gordura alimentar para absorção)",
    duracao: "60 dias — reavaliação laboratorial ao término",
    ativos: [
      { nome: "Vitamina D3 (colecalciferol)", dose: "5.000", unidade: "UI", obs: "Dose de reposição — reavaliar após 60 dias" },
      { nome: "Vitamina K2 (MK-7, menaquinona-7)", dose: "100", unidade: "mcg", obs: "Direciona cálcio para os ossos, evita calcificação vascular" },
      { nome: "Magnésio (quelato — bisglicinato)", dose: "150", unidade: "mg", obs: "Magnésio elementar — forma de alta biodisponibilidade" },
      { nome: "Zinco (quelato — bisglicinato)", dose: "10", unidade: "mg", obs: "Cofator da vitamina D" },
      { nome: "Vitamina A (retinol acetato)", dose: "500", unidade: "mcg RAE", obs: "Sinergia com vitamina D no eixo imunológico" },
    ],
    orientacoesEspeciais: [
      "Utilizar APENAS óleo de TCM (triglicerídeos de cadeia média) como veículo — não substituir por outro óleo",
      "Cápsula de gelatina bovina — se paciente preferir vegetal, usar HPMC mole (verificar disponibilidade)",
      "Sem corante, sem conservante artificial",
    ],
    armazenamento: "Conservar em local fresco e seco, ao abrigo de luz direta. Não ultrapassar 25°C.",
  },
  {
    numero: 2,
    nome: "Modulação Insulínica e Glicêmica",
    indicacao: "HOMA-IR 2,98 e insulina basal elevada (12,3 μUI/mL) — suporte à sensibilidade insulínica e metabolismo glicídico.",
    formaFarmaceutica: "Cápsula Vegetal (HPMC)",
    formaDescricao: "Cápsula vegetal HPMC tamanho 00. Sem lactose, sem glúten.",
    quantidade: "90 cápsulas",
    posologia: "Tomar 1 cápsula, 3 vezes ao dia",
    momento: "Imediatamente antes das 3 principais refeições (café da manhã, almoço e jantar)",
    duracao: "90 dias — reavaliação laboratorial com HOMA-IR ao término",
    ativos: [
      { nome: "Berberina HCl 97%", dose: "500", unidade: "mg", obs: "Padronizada para 97% — verificar certificado COA no insumo" },
      { nome: "Cromo (picolinato de cromo)", dose: "100", unidade: "mcg", obs: "Cofator da ação insulínica" },
      { nome: "Ácido Alfa-Lipóico (ALA — forma R racêmica)", dose: "200", unidade: "mg", obs: "Antioxidante mitocondrial, melhora captação de glicose" },
      { nome: "Canela (Cinnamomum verum — extrato padronizado 20:1)", dose: "200", unidade: "mg", obs: "Padronizado em polifenóis tipo A" },
    ],
    orientacoesEspeciais: [
      "Cápsula HPMC vegetal — obrigatório (berberina é higroscópica; gelatinosa absorve umidade do ativo)",
      "Sem lactose no excipiente — usar celulose microcristalina como diluente",
      "Não utilizar dióxido de titânio como corante — preferir cápsula natural (transparente ou creme)",
      "Certificado de Análise (COA) do insumo de berberina deve ser solicitado — padronização mínima 97% em berberina",
    ],
    armazenamento: "Conservar em temperatura ambiente (até 25°C), longe de umidade e luz.",
  },
  {
    numero: 3,
    nome: "Suporte Imunológico e Antioxidante",
    indicacao: "Zinco abaixo do limite inferior (68 μg/dL), vitamina B12 na borda inferior e marcadores inflamatórios em acompanhamento.",
    formaFarmaceutica: "Cápsula Gelatinosa",
    formaDescricao: "Cápsula dura gelatinosa bovina tamanho 0. Uso geral.",
    quantidade: "60 cápsulas",
    posologia: "Tomar 1 cápsula ao dia",
    momento: "Pela manhã, em jejum ou junto ao café da manhã",
    duracao: "60 dias",
    ativos: [
      { nome: "Zinco (bisglicinato de zinco)", dose: "15", unidade: "mg", obs: "Zinco elementar — forma quelada de alta biodisponibilidade" },
      { nome: "Vitamina C (ácido ascórbico tamponado)", dose: "500", unidade: "mg", obs: "Tamponado (ascorbato de cálcio) — menos irritante gástrico" },
      { nome: "Vitamina B12 (metilcobalamina)", dose: "1.000", unidade: "mcg", obs: "Forma ativa (metilcobalamina) — não usar cianocobalamina" },
      { nome: "Ácido Fólico (5-MTHF — L-metilfolato)", dose: "400", unidade: "mcg", obs: "Forma ativa — indicada especialmente em polimorfismo MTHFR" },
      { nome: "Quercetina (diidrato de quercetina)", dose: "250", unidade: "mg", obs: "Antioxidante e anti-inflamatório natural" },
      { nome: "Selênio (selenometionina)", dose: "100", unidade: "mcg", obs: "Forma orgânica — maior retenção tecidual" },
    ],
    orientacoesEspeciais: [
      "Vitamina B12 obrigatoriamente na forma METILCOBALAMINA — não substituir por cianocobalamina",
      "Folato na forma 5-MTHF (L-metilfolato de cálcio) — não substituir por ácido fólico sintético",
      "Vitamina C na forma tamponada (ascorbato de cálcio ou sódio) — reduz acidez gástrica",
    ],
    armazenamento: "Conservar em temperatura ambiente (até 25°C), longe de umidade e luz.",
  },
  {
    numero: 4,
    nome: "Probiótico Personalizado + Prebiótico",
    indicacao: "Suporte ao microbioma intestinal, modulação imunológica e melhora do trânsito intestinal.",
    formaFarmaceutica: "Sachê (pó oral)",
    formaDescricao: "Sachê monodose 3 g com pó para dispersão em água fria ou iogurte. Selado individualmente para preservar viabilidade das cepas.",
    quantidade: "30 sachês",
    posologia: "Tomar 1 sachê ao dia",
    momento: "Em jejum pela manhã (30 minutos antes do café) — ou conforme orientação da nutricionista",
    duracao: "30 dias — reavaliar",
    ativos: [
      { nome: "Lacticaseibacillus rhamnosus GG (LGG)", dose: "5 bilhões", unidade: "UFC", obs: "Cepa específica — exigir certificação de identidade da cepa" },
      { nome: "Bifidobacterium longum BB536", dose: "5 bilhões", unidade: "UFC", obs: "Cepa específica certificada" },
      { nome: "Lacticaseibacillus acidophilus NCFM", dose: "5 bilhões", unidade: "UFC", obs: "Cepa específica certificada" },
      { nome: "Saccharomyces boulardii CNCM I-745", dose: "5 bilhões", unidade: "UFC", obs: "Levedura probiótica — exigir cepa certificada CNCM I-745" },
      { nome: "FOS (frutooligossacarídeos — grau alimentar)", dose: "1.500", unidade: "mg", obs: "Prebiótico — substrato para as cepas probióticas" },
      { nome: "Inulina (raiz de chicória)", dose: "500", unidade: "mg", obs: "Prebiótico complementar" },
    ],
    orientacoesEspeciais: [
      "Exigir certificado de análise (COA) comprovando viabilidade mínima de UFC ao final da validade — não apenas na fabricação",
      "Cepas devem ser identificadas pela designação alfanumérica completa (ex: LGG, BB536, NCFM, CNCM I-745)",
      "Sachê deve ser selado individualmente com barreira de umidade e oxigênio (embalagem laminada)",
      "Adicionar saborizante neutro ou sabor de fruta neutra — sem corante artificial",
      "Não utilizar maltodextrina como excipiente principal — preferir inulina ou FOS como carreador",
    ],
    armazenamento: "Refrigerar entre 2°C e 8°C. Não congelar. Manter ao abrigo de luz e calor. Consumir em até 30 dias após abertura do sachê.",
  },
  {
    numero: 5,
    nome: "Magnésio Noturno + L-Teanina (Relaxamento e Sono)",
    indicacao: "Suporte à qualidade do sono, relaxamento neuromuscular e redução da ansiedade moderada. Complementar ao tratamento nutricional do estresse oxidativo.",
    formaFarmaceutica: "Cápsula Vegetal (HPMC)",
    formaDescricao: "Cápsula vegetal HPMC tamanho 00. Sem lactose, sem glúten, sem corante.",
    quantidade: "30 cápsulas",
    posologia: "Tomar 1 cápsula ao dia",
    momento: "30 a 60 minutos antes de dormir",
    duracao: "30 dias — reavaliar",
    ativos: [
      { nome: "Magnésio (treonato de magnésio — Magtein®)", dose: "2.000", unidade: "mg", obs: "Equivalente a ~144 mg de magnésio elementar — forma com melhor penetração no SNC" },
      { nome: "L-Teanina (extrato de Camellia sinensis)", dose: "200", unidade: "mg", obs: "Aminoácido do chá verde — induz relaxamento sem sedação" },
      { nome: "Glicina (grau alimentar)", dose: "500", unidade: "mg", obs: "Aminoácido com ação inibitória no SNC — suporte ao sono profundo" },
      { nome: "Vitamina B6 (piridoxal-5-fosfato — P5P)", dose: "10", unidade: "mg", obs: "Forma ativa — cofator essencial na síntese de serotonina e GABA" },
      { nome: "Extrato de Valeriana (Valeriana officinalis — padronizado 0,8% valerenato)", dose: "200", unidade: "mg", obs: "Indicação fitoterapêutica — prescrito conforme habilitação em fitoterapia" },
    ],
    orientacoesEspeciais: [
      "Magnésio: utilizar OBRIGATORIAMENTE treonato de magnésio (Magtein® ou similar certificado) — não substituir por óxido ou citrato para esta fórmula",
      "Vitamina B6 na forma P5P (piridoxal-5-fosfato) — forma ativa — não usar piridoxina HCl",
      "Valeriana: apresentar CRN habilitado em fitoterapia ou validar junto ao CRN responsável pela prescrição",
      "Cápsula HPMC vegetal tamanho 00 — magnésio treonato tem volume significativo",
      "Sem corante, sem lactose, sem glúten no excipiente",
    ],
    armazenamento: "Conservar em temperatura ambiente (até 25°C), longe de umidade e luz.",
  },
];

// ─── COMPONENTE ───────────────────────────────────────────────────────────────

function LinhaAtivo({ ativo }: { ativo: Ativo }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <div className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0 mt-2" />
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <span className="text-sm font-medium text-slate-800">{ativo.nome}</span>
          <span className="font-mono font-bold text-slate-900 text-sm whitespace-nowrap">
            {ativo.dose} <span className="text-xs font-normal text-slate-500">{ativo.unidade}</span>
          </span>
        </div>
        {ativo.obs && (
          <p className="text-xs text-slate-400 italic mt-0.5">{ativo.obs}</p>
        )}
      </div>
    </div>
  );
}

export function PrescricaoFormulacaoTab() {
  return (
    <div>
      {/* Banner informativo */}
      <Card shadow="none" classNames={{ base: "border border-blue-100 bg-blue-50 mb-5" }}>
        <CardBody className="py-3 px-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <span className="font-bold">Prescrição magistral individualizada.</span> Documento destinado exclusivamente à farmácia de manipulação.
            Cada formulação deve ser preparada conforme composição, forma farmacêutica e orientações especificadas.
            Validade da receita: <span className="font-semibold">30 dias</span> a partir da data de emissão.
          </p>
        </CardBody>
      </Card>

      {/* Resumo */}
      <div className="flex gap-3 mb-6">
        {[
          { label: "Formulações",  value: FORMULACOES.length },
          { label: "Total de ativos", value: FORMULACOES.reduce((a, f) => a + f.ativos.length, 0) },
          { label: "Validade receita", value: "30 dias" },
        ].map((item) => (
          <div key={item.label} className="border border-slate-200 rounded-xl px-4 py-2 text-center">
            <div className="text-lg font-extrabold text-slate-800">{item.value}</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Formulações */}
      {FORMULACOES.map((f) => (
        <ExportSection key={f.numero} title={`Formulação ${f.numero} — ${f.nome}`}>
          {/* Indicação */}
          <p className="text-xs text-slate-500 italic mb-3">{f.indicacao}</p>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Forma farmacêutica */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Forma Farmacêutica</span>
              </div>
              <span className="text-sm font-bold text-slate-800">{f.formaFarmaceutica}</span>
            </div>
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
              <p className="text-xs text-slate-400 italic">{f.formaDescricao}</p>
            </div>

            {/* Ativos */}
            <div className="px-4 pt-1 pb-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 py-2">
                Composição — por dose unitária
              </div>
              {f.ativos.map((a, i) => (
                <LinhaAtivo key={i} ativo={a} />
              ))}
            </div>

            {/* Quantidade + posologia */}
            <div className="border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-100">
              <div className="px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Quantidade</div>
                <div className="text-sm font-bold text-slate-800">{f.quantidade}</div>
              </div>
              <div className="px-4 py-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Posologia</div>
                <div className="text-sm font-bold text-slate-800">{f.posologia}</div>
                <div className="text-xs text-slate-500 mt-0.5">{f.momento}</div>
              </div>
            </div>

            {/* Duração */}
            <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Duração do Tratamento</span>
              <span className="text-sm font-semibold text-slate-700">{f.duracao}</span>
            </div>

            {/* Orientações especiais para a farmácia */}
            {f.orientacoesEspeciais && f.orientacoesEspeciais.length > 0 && (
              <div className="border-t border-slate-100 px-4 py-3 bg-amber-50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-2">
                  Orientações Especiais — Farmácia de Manipulação
                </div>
                <div className="space-y-1.5">
                  {f.orientacoesEspeciais.map((o, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                      <p className="text-xs text-amber-900">{o}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Armazenamento */}
            {f.armazenamento && (
              <div className="border-t border-slate-100 px-4 py-2.5 flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0 mt-1.5" />
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-600">Armazenamento:</span> {f.armazenamento}
                </p>
              </div>
            )}
          </div>
        </ExportSection>
      ))}

      {/* Observações gerais */}
      <ExportSection title="Observações Gerais">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-xs text-slate-600 leading-relaxed space-y-2">
            {[
              { titulo: "Validade", texto: "Esta prescrição tem validade de 30 dias a partir da data de emissão. Após este prazo, nova receita é necessária para remanipulação." },
              { titulo: "Interações", texto: "O paciente deve informar ao farmacêutico todos os medicamentos e suplementos em uso para verificação de compatibilidade antes da manipulação." },
              { titulo: "Certificados", texto: "Para formulações com indicação de COA (Certificado de Análise), o farmacêutico deve solicitar ao fornecedor do insumo e arquivar conforme RDC 67/2007." },
              { titulo: "Cepas probióticas", texto: "As cepas probióticas prescritas com designação alfanumérica específica (LGG, BB536, etc.) não podem ser substituídas por cepas genéricas sem autorização prévia do prescritor." },
              { titulo: "Substituição de ativos", texto: "Qualquer substituição de insumo, forma farmacêutica ou excipiente deve ser comunicada e aprovada pela nutricionista antes do preparo." },
              { titulo: "Retorno", texto: "Trazer todos os produtos manipulados nas próximas consultas para verificação de adesão e ajuste de protocolo." },
            ].map(({ titulo, texto }) => (
              <div key={titulo} className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                <p><strong>{titulo}:</strong> {texto}</p>
              </div>
            ))}
          </CardBody>
        </Card>
      </ExportSection>

      {/* Assinatura */}
      <div className="mt-10 flex justify-between items-end">
        {/* Data */}
        <div className="text-xs text-slate-500">
          <p>São Paulo, 12 de março de 2026</p>
          <p className="mt-1 text-slate-400">Validade: até 11 de abril de 2026</p>
        </div>

        {/* Assinatura */}
        <div className="text-center">
          <div className="border-t border-slate-800 w-64 mb-2" />
          <p className="text-sm font-semibold text-slate-800">Dra. Maria Fernanda Costa</p>
          <p className="text-xs text-slate-500">Nutricionista · CRN-3 12345/SP</p>
          <p className="text-xs text-slate-400 mt-0.5">contato@clinicanutrivida.com.br</p>
        </div>
      </div>
    </div>
  );
}
