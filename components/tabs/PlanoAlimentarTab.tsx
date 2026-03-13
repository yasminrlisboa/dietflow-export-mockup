"use client";
import { Card, CardBody, CardHeader, Chip, Progress, Divider } from "@heroui/react";
import { ExportSection } from "../ExportSection";

interface Alimento {
  nome: string;
  qtd: string;
  ptn: string;
  cho: string;
  lip: string;
  kcal: number;
}

interface Refeicao {
  nome: string;
  emoji: string;
  horario: string;
  alimentos: Alimento[];
  obs?: string;
  totais: { ptn: number; cho: number; lip: number; kcal: number };
}

interface Micronutriente {
  nome: string;
  valor: number;
  unidade: string;
  dri: number;
  pctDRI: number;
}

interface Cenario {
  nome: string;
  dias: string[];
  vet: number;
  refeicoes: Refeicao[];
  macros: { ptn: number; cho: number; lip: number };
  micronutrientes: Micronutriente[];
}

const CENARIOS: Cenario[] = [
  {
    nome: "Cenário 1 — Segunda a Sexta",
    dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    vet: 2100,
    macros: { ptn: 158, cho: 245, lip: 58 },
    micronutrientes: [
      { nome: "Vitamina A",     valor: 1245, unidade: "mcg RE", dri: 700,  pctDRI: 178 },
      { nome: "Vitamina D",     valor: 18,   unidade: "mcg",    dri: 15,   pctDRI: 120 },
      { nome: "Vitamina E",     valor: 12,   unidade: "mg",     dri: 15,   pctDRI: 80  },
      { nome: "Vitamina C",     valor: 89,   unidade: "mg",     dri: 75,   pctDRI: 119 },
      { nome: "Vitamina B12",   valor: 3.2,  unidade: "mcg",    dri: 2.4,  pctDRI: 133 },
      { nome: "Ácido Fólico",   valor: 285,  unidade: "mcg",    dri: 400,  pctDRI: 71  },
      { nome: "Cálcio",         valor: 820,  unidade: "mg",     dri: 1000, pctDRI: 82  },
      { nome: "Ferro",          valor: 14,   unidade: "mg",     dri: 18,   pctDRI: 78  },
      { nome: "Magnésio",       valor: 298,  unidade: "mg",     dri: 320,  pctDRI: 93  },
      { nome: "Potássio",       valor: 3280, unidade: "mg",     dri: 2600, pctDRI: 126 },
      { nome: "Sódio",          valor: 1450, unidade: "mg",     dri: 2300, pctDRI: 63  },
      { nome: "Zinco",          valor: 9.2,  unidade: "mg",     dri: 8,    pctDRI: 115 },
      { nome: "Selênio",        valor: 48,   unidade: "mcg",    dri: 55,   pctDRI: 87  },
      { nome: "Fósforo",        valor: 1180, unidade: "mg",     dri: 700,  pctDRI: 169 },
    ],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "07:00",
        alimentos: [
          { nome: "Aveia em flocos", qtd: "50g", ptn: "7g", cho: "34g", lip: "4g", kcal: 191 },
          { nome: "Banana prata", qtd: "1 un (80g)", ptn: "1g", cho: "21g", lip: "—", kcal: 89 },
          { nome: "Leite integral", qtd: "200ml", ptn: "6g", cho: "10g", lip: "7g", kcal: 128 },
          { nome: "Mel", qtd: "10g", ptn: "—", cho: "8g", lip: "—", kcal: 30 },
          { nome: "Ovo cozido inteiro", qtd: "2 unidades", ptn: "12g", cho: "1g", lip: "10g", kcal: 143 },
          { nome: "Pasta de amendoim integral sem açúcar", qtd: "15g", ptn: "4g", cho: "2g", lip: "8g", kcal: 95 },
          { nome: "Mamão formosa picado", qtd: "100g", ptn: "1g", cho: "11g", lip: "—", kcal: 44 },
        ],
        obs: "Pode substituir a banana por maçã ou pera. A pasta de amendoim pode ser trocada por pasta de castanha-de-caju.",
        totais: { ptn: 31, cho: 87, lip: 29, kcal: 720 },
      },
      {
        nome: "Almoço", emoji: "🥗", horario: "12:30",
        alimentos: [
          { nome: "Arroz integral cozido", qtd: "120g", ptn: "3g", cho: "27g", lip: "1g", kcal: 128 },
          { nome: "Feijão carioca cozido", qtd: "80g", ptn: "6g", cho: "14g", lip: "0g", kcal: 82 },
          { nome: "Filé de frango grelhado", qtd: "150g", ptn: "37g", cho: "—", lip: "5g", kcal: 198 },
          { nome: "Salada mista (alface, rúcula, tomate, pepino)", qtd: "120g", ptn: "2g", cho: "5g", lip: "—", kcal: 28 },
          { nome: "Azeite de oliva extra virgem", qtd: "10ml", ptn: "—", cho: "—", lip: "10g", kcal: 88 },
          { nome: "Couve refogada com alho", qtd: "60g", ptn: "2g", cho: "4g", lip: "2g", kcal: 40 },
          { nome: "Abóbora cozida temperada com cúrcuma", qtd: "80g", ptn: "1g", cho: "8g", lip: "—", kcal: 35 },
        ],
        obs: "Proteína pode ser substituída por atum em lata (120g) ou carne bovina patinho grelhado. Evitar frituras.",
        totais: { ptn: 51, cho: 58, lip: 18, kcal: 599 },
      },
      {
        nome: "Lanche da Tarde", emoji: "🍎", horario: "15:30",
        alimentos: [
          { nome: "Iogurte grego natural integral sem açúcar", qtd: "170g", ptn: "17g", cho: "6g", lip: "9g", kcal: 170 },
          { nome: "Granola caseira com castanhas e coco", qtd: "30g", ptn: "3g", cho: "16g", lip: "6g", kcal: 128 },
          { nome: "Morangos frescos", qtd: "100g", ptn: "1g", cho: "8g", lip: "—", kcal: 33 },
        ],
        totais: { ptn: 21, cho: 30, lip: 15, kcal: 331 },
      },
      {
        nome: "Jantar", emoji: "🌙", horario: "19:30",
        alimentos: [
          { nome: "Salmão grelhado com limão e ervas", qtd: "150g", ptn: "30g", cho: "—", lip: "13g", kcal: 234 },
          { nome: "Batata-doce assada com canela", qtd: "150g", ptn: "2g", cho: "32g", lip: "—", kcal: 136 },
          { nome: "Brócolis no vapor com azeite e alho", qtd: "100g", ptn: "3g", cho: "5g", lip: "5g", kcal: 73 },
          { nome: "Quinoa cozida", qtd: "60g", ptn: "4g", cho: "20g", lip: "2g", kcal: 111 },
        ],
        obs: "O salmão pode ser substituído por tilápia ou frango. Evitar jantar após 21h.",
        totais: { ptn: 39, cho: 57, lip: 20, kcal: 554 },
      },
    ],
  },
  {
    nome: "Cenário 2 — Final de Semana",
    dias: ["Sáb", "Dom"],
    vet: 1850,
    macros: { ptn: 140, cho: 210, lip: 55 },
    micronutrientes: [
      { nome: "Vitamina A",     valor: 980,  unidade: "mcg RE", dri: 700,  pctDRI: 140 },
      { nome: "Vitamina D",     valor: 22,   unidade: "mcg",    dri: 15,   pctDRI: 147 },
      { nome: "Vitamina E",     valor: 10,   unidade: "mg",     dri: 15,   pctDRI: 67  },
      { nome: "Vitamina C",     valor: 72,   unidade: "mg",     dri: 75,   pctDRI: 96  },
      { nome: "Vitamina B12",   valor: 4.1,  unidade: "mcg",    dri: 2.4,  pctDRI: 171 },
      { nome: "Ácido Fólico",   valor: 220,  unidade: "mcg",    dri: 400,  pctDRI: 55  },
      { nome: "Cálcio",         valor: 710,  unidade: "mg",     dri: 1000, pctDRI: 71  },
      { nome: "Ferro",          valor: 12,   unidade: "mg",     dri: 18,   pctDRI: 67  },
      { nome: "Magnésio",       valor: 265,  unidade: "mg",     dri: 320,  pctDRI: 83  },
      { nome: "Potássio",       valor: 2950, unidade: "mg",     dri: 2600, pctDRI: 113 },
      { nome: "Sódio",          valor: 1680, unidade: "mg",     dri: 2300, pctDRI: 73  },
      { nome: "Zinco",          valor: 8.5,  unidade: "mg",     dri: 8,    pctDRI: 106 },
      { nome: "Selênio",        valor: 55,   unidade: "mcg",    dri: 55,   pctDRI: 100 },
      { nome: "Fósforo",        valor: 1050, unidade: "mg",     dri: 700,  pctDRI: 150 },
    ],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "09:00",
        alimentos: [
          { nome: "Tapioca média com queijo cottage light", qtd: "50g + 60g", ptn: "14g", cho: "30g", lip: "4g", kcal: 215 },
          { nome: "Ovo mexido com tomate e cebola roxa", qtd: "2 ovos + 50g", ptn: "13g", cho: "4g", lip: "10g", kcal: 154 },
          { nome: "Suco de laranja natural sem açúcar", qtd: "200ml", ptn: "1g", cho: "20g", lip: "—", kcal: 84 },
          { nome: "Café com leite desnatado", qtd: "150ml", ptn: "5g", cho: "7g", lip: "0g", kcal: 50 },
        ],
        obs: "Café da manhã mais tranquilo e relaxado para o final de semana.",
        totais: { ptn: 33, cho: 61, lip: 14, kcal: 503 },
      },
      {
        nome: "Almoço em Família", emoji: "🍽️", horario: "13:00",
        alimentos: [
          { nome: "Frango assado ao limão com ervas frescas", qtd: "180g", ptn: "40g", cho: "—", lip: "8g", kcal: 234 },
          { nome: "Arroz branco cozido com azeite", qtd: "100g", ptn: "2g", cho: "23g", lip: "1g", kcal: 110 },
          { nome: "Feijão preto cozido temperado", qtd: "80g", ptn: "5g", cho: "12g", lip: "0g", kcal: 68 },
          { nome: "Farofa de aveia com cenoura ralada", qtd: "40g", ptn: "4g", cho: "20g", lip: "3g", kcal: 120 },
          { nome: "Vinagrete (tomate, cebola, pimentão)", qtd: "100g", ptn: "1g", cho: "5g", lip: "3g", kcal: 49 },
          { nome: "Couve refogada com bacon de peru", qtd: "80g", ptn: "5g", cho: "5g", lip: "4g", kcal: 72 },
          { nome: "Água com gás e rodela de limão", qtd: "300ml", ptn: "—", cho: "—", lip: "—", kcal: 0 },
        ],
        obs: "No almoço de final de semana, é permitida uma porção moderada de sobremesa (fruta fresca ou sorvete de creme, máx. 60g).",
        totais: { ptn: 57, cho: 65, lip: 19, kcal: 653 },
      },
      {
        nome: "Lanche da Tarde", emoji: "☕", horario: "16:00",
        alimentos: [
          { nome: "Vitamina de banana com aveia e mel", qtd: "300ml", ptn: "8g", cho: "48g", lip: "4g", kcal: 250 },
          { nome: "Torrada integral com pasta de abacate", qtd: "2 un + 30g", ptn: "3g", cho: "18g", lip: "8g", kcal: 157 },
        ],
        totais: { ptn: 11, cho: 66, lip: 12, kcal: 407 },
      },
      {
        nome: "Jantar Leve", emoji: "🌙", horario: "20:00",
        alimentos: [
          { nome: "Omelete de 3 ovos com espinafre e queijo feta", qtd: "1 unidade", ptn: "22g", cho: "2g", lip: "18g", kcal: 265 },
          { nome: "Pão de centeio integral torrado", qtd: "2 fatias (50g)", ptn: "4g", cho: "22g", lip: "1g", kcal: 113 },
        ],
        obs: "Jantar mais leve no final de semana para compensar o almoço mais farto.",
        totais: { ptn: 26, cho: 24, lip: 19, kcal: 378 },
      },
    ],
  },
  {
    nome: "Cenário 3 — Dia de Pré-treino Intenso",
    dias: ["Seg", "Qua", "Sex"],
    vet: 2350,
    macros: { ptn: 176, cho: 278, lip: 58 },
    micronutrientes: [
      { nome: "Vitamina A",     valor: 1560, unidade: "mcg RE", dri: 700,  pctDRI: 223 },
      { nome: "Vitamina D",     valor: 20,   unidade: "mcg",    dri: 15,   pctDRI: 133 },
      { nome: "Vitamina E",     valor: 14,   unidade: "mg",     dri: 15,   pctDRI: 93  },
      { nome: "Vitamina C",     valor: 105,  unidade: "mg",     dri: 75,   pctDRI: 140 },
      { nome: "Vitamina B12",   valor: 3.8,  unidade: "mcg",    dri: 2.4,  pctDRI: 158 },
      { nome: "Ácido Fólico",   valor: 340,  unidade: "mcg",    dri: 400,  pctDRI: 85  },
      { nome: "Cálcio",         valor: 890,  unidade: "mg",     dri: 1000, pctDRI: 89  },
      { nome: "Ferro",          valor: 16,   unidade: "mg",     dri: 18,   pctDRI: 89  },
      { nome: "Magnésio",       valor: 348,  unidade: "mg",     dri: 320,  pctDRI: 109 },
      { nome: "Potássio",       valor: 3680, unidade: "mg",     dri: 2600, pctDRI: 142 },
      { nome: "Sódio",          valor: 1620, unidade: "mg",     dri: 2300, pctDRI: 70  },
      { nome: "Zinco",          valor: 11.5, unidade: "mg",     dri: 8,    pctDRI: 144 },
      { nome: "Selênio",        valor: 62,   unidade: "mcg",    dri: 55,   pctDRI: 113 },
      { nome: "Fósforo",        valor: 1380, unidade: "mg",     dri: 700,  pctDRI: 197 },
    ],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "06:30",
        alimentos: [
          { nome: "Panqueca de aveia, banana e ovo (sem farinha)", qtd: "2 unidades", ptn: "14g", cho: "40g", lip: "8g", kcal: 287 },
          { nome: "Mel puro para cobertura", qtd: "15g", ptn: "—", cho: "12g", lip: "—", kcal: 45 },
          { nome: "Café preto com canela (sem açúcar)", qtd: "200ml", ptn: "—", cho: "—", lip: "—", kcal: 5 },
        ],
        totais: { ptn: 14, cho: 52, lip: 8, kcal: 337 },
      },
      {
        nome: "Pré-treino (1h antes)", emoji: "⚡", horario: "09:00",
        alimentos: [
          { nome: "Banana prata bem madura (índice glicêmico alto)", qtd: "2 un (160g)", ptn: "2g", cho: "42g", lip: "—", kcal: 177 },
          { nome: "Whey Protein Isolado (sabor baunilha)", qtd: "30g", ptn: "27g", cho: "2g", lip: "1g", kcal: 126 },
          { nome: "Água com creatina monohidratada", qtd: "5g em 300ml", ptn: "—", cho: "—", lip: "—", kcal: 0 },
        ],
        obs: "Consumir 60–90 min antes do treino. Creatina pode ser tomada a qualquer hora. Evitar gordura nesta refeição.",
        totais: { ptn: 29, cho: 44, lip: 1, kcal: 303 },
      },
      {
        nome: "Pós-treino (até 30 min após)", emoji: "💪", horario: "11:30",
        alimentos: [
          { nome: "Whey Protein Isolado com água (janela anabólica)", qtd: "40g", ptn: "36g", cho: "3g", lip: "1g", kcal: 167 },
          { nome: "Dextrose de milho ou maltodextrina", qtd: "20g", ptn: "—", cho: "20g", lip: "—", kcal: 80 },
        ],
        totais: { ptn: 36, cho: 23, lip: 1, kcal: 247 },
      },
      {
        nome: "Almoço", emoji: "🥗", horario: "13:00",
        alimentos: [
          { nome: "Patinho moído grelhado na frigideira antiaderente", qtd: "180g", ptn: "40g", cho: "—", lip: "9g", kcal: 241 },
          { nome: "Arroz branco cozido (carboidrato de recuperação)", qtd: "150g", ptn: "3g", cho: "34g", lip: "—", kcal: 151 },
          { nome: "Lentilha cozida temperada com cominho", qtd: "80g", ptn: "7g", cho: "14g", lip: "—", kcal: 83 },
          { nome: "Espinafre refogado com azeite e alho triturado", qtd: "80g", ptn: "3g", cho: "3g", lip: "5g", kcal: 67 },
          { nome: "Cenoura e beterraba assadas com ervas", qtd: "100g", ptn: "2g", cho: "12g", lip: "—", kcal: 55 },
        ],
        totais: { ptn: 55, cho: 63, lip: 14, kcal: 597 },
      },
      {
        nome: "Lanche da Tarde", emoji: "🍎", horario: "16:30",
        alimentos: [
          { nome: "Iogurte grego natural integral sem açúcar", qtd: "200g", ptn: "20g", cho: "7g", lip: "10g", kcal: 199 },
          { nome: "Banana prata com pasta de amendoim integral", qtd: "1 un + 20g", ptn: "6g", cho: "26g", lip: "11g", kcal: 218 },
        ],
        totais: { ptn: 26, cho: 33, lip: 21, kcal: 417 },
      },
      {
        nome: "Jantar", emoji: "🌙", horario: "20:00",
        alimentos: [
          { nome: "Tilápia assada com tomate e cebola roxa", qtd: "160g", ptn: "32g", cho: "3g", lip: "3g", kcal: 166 },
          { nome: "Purê de batata-doce com azeite e alecrim", qtd: "180g", ptn: "3g", cho: "38g", lip: "5g", kcal: 210 },
          { nome: "Aspargos grelhados com limão e flor de sal", qtd: "80g", ptn: "2g", cho: "4g", lip: "—", kcal: 24 },
        ],
        obs: "Jantar mais proteico e moderado em carboidratos. Priorizar digestibilidade para recuperação muscular.",
        totais: { ptn: 37, cho: 45, lip: 8, kcal: 400 },
      },
    ],
  },
];

function MicronutrientesTable({ items }: { items: Micronutriente[] }) {
  return (
    <Card shadow="none" classNames={{ base: "border border-slate-200 mt-3" }}>
      <CardHeader className="pb-0 pt-3 px-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Micronutrientes — Estimativa do Dia (% DRI para ♀ adulta)
        </span>
      </CardHeader>
      <CardBody className="pt-2 pb-3">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {items.map((m) => {
            const cor = m.pctDRI >= 100 ? "bg-emerald-400" : m.pctDRI >= 70 ? "bg-amber-400" : "bg-red-400";
            return (
              <div key={m.nome}>
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="font-semibold text-slate-600">{m.nome}</span>
                  <span className="text-slate-400">{m.valor} {m.unidade} · <span className={m.pctDRI >= 100 ? "text-emerald-600 font-bold" : m.pctDRI >= 70 ? "text-amber-600 font-bold" : "text-red-500 font-bold"}>{m.pctDRI}%</span></span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${cor}`} style={{ width: `${Math.min(m.pctDRI, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-400 mt-3 italic">Valores estimados com base nos alimentos prescritos. DRI: Dietary Reference Intake (Institute of Medicine). Variação de ±15% esperada.</p>
      </CardBody>
    </Card>
  );
}

function MacroBar({ ptn, cho, lip }: { ptn: number; cho: number; lip: number }) {
  const total = ptn * 4 + cho * 4 + lip * 9;
  const ptnPct = Math.round((ptn * 4 / total) * 100);
  const choPct = Math.round((cho * 4 / total) * 100);
  const lipPct = Math.round((lip * 9 / total) * 100);
  return (
    <div className="flex gap-4 mt-2">
      <div className="flex-1">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-semibold" style={{ color: "var(--protein)" }}>PTN</span>
          <span className="text-slate-500">{ptn}g · {ptnPct}%</span>
        </div>
        <Progress size="sm" value={ptnPct} classNames={{ indicator: "bg-indigo-500" }} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-semibold" style={{ color: "var(--carbs)" }}>CHO</span>
          <span className="text-slate-500">{cho}g · {choPct}%</span>
        </div>
        <Progress size="sm" value={choPct} classNames={{ indicator: "bg-amber-400" }} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="font-semibold" style={{ color: "var(--fat)" }}>LIP</span>
          <span className="text-slate-500">{lip}g · {lipPct}%</span>
        </div>
        <Progress size="sm" value={lipPct} classNames={{ indicator: "bg-blue-500" }} />
      </div>
    </div>
  );
}

export function PlanoAlimentarTab() {
  return (
    <div>
      {CENARIOS.map((cenario, ci) => (
        <ExportSection key={ci} title={cenario.nome}>
          {/* Card do cenário — header verde */}
          <Card shadow="none" classNames={{ base: "mb-4 overflow-hidden" }} style={{ border: "1px solid #c6f0df" }}>
            <CardHeader
              className="pb-3 flex justify-between flex-wrap gap-2"
              style={{ background: "linear-gradient(135deg, var(--green-light), #f0fdf8)" }}
            >
              <div className="flex gap-1 flex-wrap">
                {cenario.dias.map(d => (
                  <Chip key={d} size="sm" variant="solid" color="success" classNames={{ base: "bg-emerald-500 text-white" }}>{d}</Chip>
                ))}
              </div>
              <div className="text-sm font-extrabold" style={{ color: "var(--green-dark)" }}>
                VET: {cenario.vet.toLocaleString('pt-BR')} kcal
              </div>
            </CardHeader>
            <CardBody className="pt-2">
              <MacroBar ptn={cenario.macros.ptn} cho={cenario.macros.cho} lip={cenario.macros.lip} />
            </CardBody>
          </Card>

          {cenario.refeicoes.map((ref, ri) => (

            <Card key={ri} shadow="none" classNames={{ base: "mb-3 overflow-hidden" }} style={{ border: "1px solid #f1f5f9" }}>
              {/* Cabeçalho da refeição com fundo levemente tintado */}
              <CardHeader
                className="pb-2"
                style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}
              >
                <span className="font-semibold text-sm text-slate-800">
                  <span className="text-slate-400 font-normal mr-2">{ref.horario}</span>
                  {ref.emoji} {ref.nome}
                </span>
              </CardHeader>
              <CardBody className="pt-0">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">Alimento</th>
                      <th className="text-right py-1.5 text-xs font-medium uppercase tracking-wider text-slate-400 w-16">Qtd</th>
                      <th className="text-right py-1.5 text-xs font-medium uppercase tracking-wider w-10" style={{ color: "var(--protein)" }}>PTN</th>
                      <th className="text-right py-1.5 text-xs font-medium uppercase tracking-wider w-10" style={{ color: "var(--carbs)" }}>CHO</th>
                      <th className="text-right py-1.5 text-xs font-medium uppercase tracking-wider w-10" style={{ color: "var(--fat)" }}>LIP</th>
                      <th className="text-right py-1.5 text-xs font-medium uppercase tracking-wider text-slate-400 w-12">kcal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ref.alimentos.map((al, ai) => (
                      <tr key={ai} className="border-b border-slate-50 hover:bg-slate-50">
                        <td className="py-1 text-slate-700">{al.nome}</td>
                        <td className="py-1 text-right text-slate-400">{al.qtd}</td>
                        <td className="py-1 text-right text-slate-500">{al.ptn}</td>
                        <td className="py-1 text-right text-slate-500">{al.cho}</td>
                        <td className="py-1 text-right text-slate-500">{al.lip}</td>
                        <td className="py-1 text-right font-semibold text-slate-700">{al.kcal}</td>
                      </tr>
                    ))}
                    {ref.obs && (
                      <tr>
                        <td colSpan={6} className="py-2 text-[10px] italic border-t border-slate-50" style={{ color: "var(--green-dark)", background: "var(--green-light)" }}>
                          💡 {ref.obs}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* Totais coloridos */}
                <div className="flex gap-3 mt-2 pt-2 border-t border-slate-100">
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "#eef2ff", color: "var(--protein)" }}>PTN {ref.totais.ptn}g</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "#fffbeb", color: "#b45309" }}>CHO {ref.totais.cho}g</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "#eff6ff", color: "#1d4ed8" }}>LIP {ref.totais.lip}g</span>
                  <span className="text-xs font-extrabold text-slate-800 ml-auto">{ref.totais.kcal} kcal</span>
                </div>
              </CardBody>
            </Card>
          ))}

          <MicronutrientesTable items={cenario.micronutrientes} />
        </ExportSection>
      ))}
    </div>
  );
}
