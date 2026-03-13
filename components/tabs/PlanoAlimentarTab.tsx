"use client";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { ExportSection } from "../ExportSection";

interface Alimento {
  nome: string;
  quantidade: string;
}

interface Refeicao {
  nome: string;
  emoji: string;
  horario: string;
  alimentos: Alimento[];
  obs?: string;
}

interface Cenario {
  nome: string;
  dias: string[];
  refeicoes: Refeicao[];
}

const CENARIOS: Cenario[] = [
  {
    nome: "Cenário 1 — Segunda a Sexta",
    dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "07:00",
        alimentos: [
          { nome: "Aveia em flocos",                           quantidade: "4 colheres de sopa" },
          { nome: "Banana prata",                              quantidade: "1 unidade média" },
          { nome: "Leite integral",                            quantidade: "1 copo (200ml)" },
          { nome: "Mel",                                       quantidade: "1 colher de sobremesa" },
          { nome: "Ovo cozido",                                quantidade: "2 unidades" },
          { nome: "Pasta de amendoim integral (sem açúcar)",   quantidade: "1 colher de sobremesa" },
          { nome: "Mamão formosa picado",                      quantidade: "2 fatias médias" },
        ],
        obs: "Pode substituir a banana por maçã ou pera. A pasta de amendoim pode ser trocada por pasta de castanha-de-caju.",
      },
      {
        nome: "Almoço", emoji: "🥗", horario: "12:30",
        alimentos: [
          { nome: "Arroz integral cozido",                     quantidade: "4 colheres de sopa cheias" },
          { nome: "Feijão carioca cozido",                     quantidade: "1 concha pequena" },
          { nome: "Filé de frango grelhado",                   quantidade: "1 filé médio (150g)" },
          { nome: "Salada mista (alface, rúcula, tomate, pepino)", quantidade: "1 prato raso" },
          { nome: "Azeite de oliva extra virgem",              quantidade: "1 colher de sopa" },
          { nome: "Couve refogada com alho",                   quantidade: "2 colheres de sopa cheias" },
          { nome: "Abóbora cozida com cúrcuma",                quantidade: "3 colheres de sopa" },
        ],
        obs: "Proteína pode ser substituída por atum em lata (120g) ou patinho grelhado. Evitar frituras.",
      },
      {
        nome: "Lanche da Tarde", emoji: "🍎", horario: "15:30",
        alimentos: [
          { nome: "Iogurte grego natural integral (sem açúcar)", quantidade: "1 pote pequeno (170g)" },
          { nome: "Granola com castanhas e coco",               quantidade: "2 colheres de sopa" },
          { nome: "Morangos frescos",                           quantidade: "8 unidades médias" },
        ],
      },
      {
        nome: "Jantar", emoji: "🌙", horario: "19:30",
        alimentos: [
          { nome: "Salmão grelhado com limão e ervas",          quantidade: "1 filé médio (150g)" },
          { nome: "Batata-doce assada com canela",              quantidade: "1 unidade média (150g)" },
          { nome: "Brócolis no vapor com azeite e alho",        quantidade: "1 xícara" },
          { nome: "Quinoa cozida",                              quantidade: "3 colheres de sopa cheias" },
        ],
        obs: "O salmão pode ser substituído por tilápia ou frango. Evitar jantar após 21h.",
      },
    ],
  },
  {
    nome: "Cenário 2 — Fim de Semana",
    dias: ["Sáb", "Dom"],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "09:00",
        alimentos: [
          { nome: "Tapioca com queijo cottage light",           quantidade: "1 tapioca média" },
          { nome: "Ovo mexido com tomate e cebola roxa",        quantidade: "2 ovos + legumes" },
          { nome: "Suco de laranja natural (sem açúcar)",       quantidade: "1 copo (200ml)" },
          { nome: "Café com leite desnatado",                   quantidade: "1 xícara (150ml)" },
        ],
        obs: "Café da manhã mais tranquilo e relaxado para o fim de semana.",
      },
      {
        nome: "Almoço em Família", emoji: "🍽️", horario: "13:00",
        alimentos: [
          { nome: "Frango assado ao limão com ervas frescas",  quantidade: "1 coxa + sobrecoxa (180g)" },
          { nome: "Arroz branco cozido com azeite",            quantidade: "3 colheres de sopa cheias" },
          { nome: "Feijão preto cozido temperado",             quantidade: "1 concha pequena" },
          { nome: "Farofa de aveia com cenoura ralada",        quantidade: "2 colheres de sopa" },
          { nome: "Vinagrete (tomate, cebola, pimentão)",      quantidade: "3 colheres de sopa" },
          { nome: "Couve refogada com bacon de peru",          quantidade: "3 colheres de sopa" },
        ],
        obs: "É permitida uma porção moderada de sobremesa no almoço (fruta fresca ou sorvete, máx. 60g).",
      },
      {
        nome: "Lanche da Tarde", emoji: "☕", horario: "16:00",
        alimentos: [
          { nome: "Vitamina de banana com aveia e mel",        quantidade: "1 copo grande (300ml)" },
          { nome: "Torrada integral com pasta de abacate",     quantidade: "2 torradas" },
        ],
      },
      {
        nome: "Jantar Leve", emoji: "🌙", horario: "20:00",
        alimentos: [
          { nome: "Omelete de 3 ovos com espinafre e queijo feta", quantidade: "1 omelete" },
          { nome: "Pão de centeio integral torrado",           quantidade: "2 fatias (50g)" },
        ],
        obs: "Jantar mais leve no fim de semana para compensar o almoço mais farto.",
      },
    ],
  },
  {
    nome: "Cenário 3 — Dia de Treino Intenso",
    dias: ["Seg", "Qua", "Sex"],
    refeicoes: [
      {
        nome: "Café da Manhã", emoji: "☀️", horario: "06:30",
        alimentos: [
          { nome: "Panqueca de aveia, banana e ovo (sem farinha)", quantidade: "2 panquecas" },
          { nome: "Mel puro para cobertura",                   quantidade: "1 colher de sopa rasa" },
          { nome: "Café preto com canela (sem açúcar)",        quantidade: "1 copo (200ml)" },
        ],
      },
      {
        nome: "Pré-treino (1h antes)", emoji: "⚡", horario: "09:00",
        alimentos: [
          { nome: "Banana prata bem madura",                   quantidade: "2 bananas médias" },
          { nome: "Whey Protein Isolado (baunilha)",           quantidade: "1 scoop (30g)" },
          { nome: "Creatina monohidratada em água",            quantidade: "5g em 1 copo d'água" },
        ],
        obs: "Consumir 60–90 min antes do treino. Evitar gordura nesta refeição.",
      },
      {
        nome: "Pós-treino (até 30 min após)", emoji: "💪", horario: "11:30",
        alimentos: [
          { nome: "Whey Protein Isolado com água",             quantidade: "1 scoop cheio (40g)" },
          { nome: "Dextrose de milho ou maltodextrina",        quantidade: "2 colheres de sopa rasas (20g)" },
        ],
      },
      {
        nome: "Almoço", emoji: "🥗", horario: "13:00",
        alimentos: [
          { nome: "Patinho moído grelhado",                    quantidade: "1 porção (180g)" },
          { nome: "Arroz branco cozido",                       quantidade: "5 colheres de sopa cheias" },
          { nome: "Lentilha cozida com cominho",               quantidade: "1 concha pequena" },
          { nome: "Espinafre refogado com azeite e alho",      quantidade: "3 colheres de sopa" },
          { nome: "Cenoura e beterraba assadas com ervas",     quantidade: "½ xícara de cada" },
        ],
      },
      {
        nome: "Lanche da Tarde", emoji: "🍎", horario: "16:30",
        alimentos: [
          { nome: "Iogurte grego natural integral (sem açúcar)", quantidade: "1 pote grande (200g)" },
          { nome: "Banana prata com pasta de amendoim integral", quantidade: "1 banana + 1 colher" },
        ],
      },
      {
        nome: "Jantar", emoji: "🌙", horario: "20:00",
        alimentos: [
          { nome: "Tilápia assada com tomate e cebola roxa",   quantidade: "1 filé grande (160g)" },
          { nome: "Purê de batata-doce com azeite e alecrim",  quantidade: "3 colheres de sopa cheias" },
          { nome: "Aspargos grelhados com limão e flor de sal", quantidade: "6 unidades médias" },
        ],
        obs: "Jantar mais proteico e moderado em carboidratos para favorecer a recuperação muscular.",
      },
    ],
  },
];

export function PlanoAlimentarTab() {
  return (
    <div>
      {CENARIOS.map((cenario, ci) => (
        <ExportSection key={ci} title={cenario.nome}>

          {/* Header verde do cenário — dias */}
          <Card shadow="none" classNames={{ base: "mb-4 overflow-hidden" }} style={{ border: "1px solid #c6f0df" }}>
            <CardHeader
              className="py-3 px-4"
              style={{ background: "linear-gradient(135deg, var(--green-light), #f0fdf8)" }}
            >
              <div className="flex gap-1.5 flex-wrap">
                {cenario.dias.map(d => (
                  <Chip key={d} size="sm" variant="solid" classNames={{ base: "bg-emerald-500 text-white font-semibold" }}>{d}</Chip>
                ))}
              </div>
            </CardHeader>
          </Card>

          {/* Refeições */}
          <div className="space-y-3">
            {cenario.refeicoes.map((ref, ri) => (
              <Card key={ri} shadow="none" classNames={{ base: "overflow-hidden border border-slate-100" }}>

                {/* Cabeçalho da refeição */}
                <CardHeader className="py-2.5 px-4" style={{ background: "#f8fafc", borderBottom: "1px solid #f1f5f9" }}>
                  <span className="text-sm font-bold text-slate-900 mr-3">{ref.horario}</span>
                  <span className="text-sm font-semibold text-slate-800">{ref.emoji} {ref.nome}</span>
                </CardHeader>

                <CardBody className="px-4 py-3">
                  <div className="space-y-2">
                    {ref.alimentos.map((al, ai) => (
                      <div key={ai} className="flex items-baseline justify-between gap-4">
                        <span className="text-sm text-slate-700">{al.nome}</span>
                        <span className="text-sm font-semibold text-slate-900 flex-shrink-0">{al.quantidade}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>

                {ref.obs && (
                  <div
                    className="px-4 py-2.5 text-xs leading-relaxed"
                    style={{ color: "var(--green-dark)", background: "var(--green-light)", borderTop: "1px solid #c6f0df" }}
                  >
                    💡 {ref.obs}
                  </div>
                )}

              </Card>
            ))}
          </div>

        </ExportSection>
      ))}
    </div>
  );
}
