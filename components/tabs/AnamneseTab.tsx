"use client";
import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { ExportSection } from "../ExportSection";

const SECOES = [
  {
    titulo: "Queixa Principal e Motivo da Consulta",
    chips: ["Perda de peso", "Melhora da composição corporal", "Redução do colesterol"],
    conteudo: `Paciente Ana Silva Santos, 32 anos, procura atendimento nutricional com o objetivo principal de perder peso e melhorar sua composição corporal. Relata ganho de aproximadamente 12 kg nos últimos 3 anos, que coincide com mudança de emprego para cargo administrativo com menor atividade física, período de alta demanda emocional e uso de anticoncepcional hormonal. Além da perda ponderal, deseja melhora nos níveis de colesterol (LDL elevado em exame recente) e mais disposição no dia a dia. Refere cansaço excessivo, especialmente nas tardes, e dificuldade para "desligar" à noite, o que prejudica a qualidade do sono.

Já realizou dietas restritivas por conta própria (low carb, jejum de 24h) sem sucesso duradouro — relata perder peso mas recuperar logo após. Nega histórico de transtornos alimentares, mas reconhece relação emocional com comida em momentos de estresse ("como ansiedade"). Motivação atual: casamento programado para dezembro/2026 e resultados dos exames de fevereiro/2026 que indicaram necessidade de intervenção.`,
  },
  {
    titulo: "Histórico de Saúde e Medicamentos",
    chips: ["Saudável", "Sem comorbidades ativas"],
    conteudo: `Histórico pessoal: Sem comorbidades crônicas diagnosticadas. Histórico de hipotireoidismo subclínico investigado em 2022 (TSH 4,2 μUI/mL), normalizado espontaneamente em reavaliação de 2023. Nega diabetes, hipertensão, doenças cardiovasculares ou autoimunes. Histórico de cistites de repetição entre 2019–2021, resolvido após ajuste da hidratação e pH alimentar.

Histórico familiar relevante: Mãe com obesidade (IMC 32), diabetes tipo 2 diagnosticada aos 50 anos e hipotireoidismo. Pai com hipertensão e dislipidemia em tratamento farmacológico. Avó materna com doença cardiovascular. Histórico familiar indica predisposição genética para síndrome metabólica — fator importante no planejamento nutricional de longo prazo.

Medicamentos em uso: Anticoncepcional oral combinado (levonorgestrel + etinilestradiol, 0,15mg/0,03mg) — em uso contínuo há 4 anos. Sem outros medicamentos regulares. Nega uso de corticoides, antidepressivos ou outros medicamentos que possam interferir no metabolismo. Suplementação anterior: tentou Whey Protein por 3 meses em 2024 mas abandonou por "sabor ruim".`,
  },
  {
    titulo: "Histórico e Comportamento Alimentar",
    chips: ["Compulsão ocasional", "Comer emocional", "Restrição prévia"],
    conteudo: `Histórico alimentar: Padrão alimentar atual desorganizado, sem horários fixos. Frequentemente pula o café da manhã (sai cedo para o trabalho), faz um lanche rápido às 10h (biscoito recheado ou salgado da padaria), almoça "o que tiver" no refeitório da empresa sem critérios nutricionais claros, e chega em casa com muita fome às 19h — momento em que relata maior descontrole alimentar. Jantar geralmente composto por refeição completa mais petiscos (castanhas, chocolate, biscoito salgado enquanto "descansa" na frente da TV).

Preferências e aversões: Aprecia carnes (especialmente frango e peixe), frutas, iogurte e saladas. Tem dificuldade com amargos (rúcula, brócolis cru). Gosta de doces mas não os considera compulsivos. Nega intolerância alimentar diagnósticada, mas relata "barriga inchada" após consumo de leite integral em grandes quantidades — possível intolerância leve à lactose.

Frequência de refeições fora de casa: 5x/semana (almoço no trabalho). Consumo de álcool: 2–3 doses/semana (vinho aos fins de semana principalmente). Consumo de cafeína: 2 cafés/dia. Ingestão hídrica estimada: 1,2–1,5L/dia (abaixo do adequado para seu peso e atividade física).

Comportamento em situações de estresse: Busca comida como conforto, especialmente doces e carboidratos simples. Reconhece o padrão mas tem dificuldade de quebrar o ciclo fome-emocional-culpa.`,
  },
  {
    titulo: "Atividade Física e Rotina",
    chips: ["Iniciante", "6 sessões/semana", "Sedentário anteriormente"],
    conteudo: `Histórico de atividade física: Sedentária por aproximadamente 3 anos (coincide com novo emprego). Praticou natação na adolescência e musculação por 1 ano durante a faculdade. Iniciou academia há 2 meses com personal trainer.

Rotina atual de exercícios:
— Musculação (Upper + Lower): segunda, quarta e sexta-feira às 07h00 (60 min)
— Corrida na esteira ou parque: terça e quinta-feira às 06h30 (45 min, intensidade moderada-alta)
— Yoga e mobilidade: sábado às 09h00 (60 min, leve)
— Domingo: descanso ativo (caminhada ou atividade livre)

Rotina diária: Acorda às 05h30, trabalha das 08h às 18h em escritório (postura sentada > 80% do tempo), chega em casa às 19h. Dorme entre 23h–24h em média. Sono relatado como fragmentado e não reparador — acorda 1–2 vezes por noite e demora a pegar no sono. Nível de estresse laboral: alto (gerência de equipe, metas mensais). Utiliza transporte público (metrô + ônibus, ~40 min cada trajeto).

Nível de atividade física classificado como: Moderadamente ativo (PAF 1,55) — considerando os treinos programados mas natureza sedentária do trabalho e trajetos.`,
  },
  {
    titulo: "Avaliação Gastrointestinal",
    chips: ["Distensão abdominal", "Constipação leve"],
    conteudo: `Hábito intestinal: Evacuação a cada 2 dias (constipação leve). Fezes tipo 3–4 na Escala de Bristol. Relata melhora com consumo de frutas e piora nos dias de maior estresse ou viagens. Nega sangramento, dor abdominal intensa ou mucorreia.

Outros sintomas gastrointestinais: Distensão abdominal pós-prandial frequente, especialmente após almoço no trabalho. Refluxo esofágico leve relatado 1–2x/semana, sem medicação. Nega náuseas, vômitos ou diarreia crônica.

Saúde bucal: Consulta odontológica regular. Nega bruxismo. Uso de fio dental diário.

Investigação de intolerâncias: Possível sensibilidade à lactose (testada empiricamente — sintomas menores ao usar leite sem lactose). Nega alergia alimentar diagnosticada. Sensibilidade ao glúten investigada em 2023 (IgA anti-gliadina normal) — descartada doença celíaca, mas possível sensibilidade não-celíaca (subjetiva).`,
  },
  {
    titulo: "Objetivos, Metas e Expectativas",
    chips: ["Meta realista", "Prazo 12 meses", "Engajada"],
    conteudo: `Objetivos declarados pela paciente:
1. Perda de peso: atingir 68–70 kg (redução de ~7–9 kg do peso atual de 78 kg)
2. Melhora da composição corporal: reduzir % de gordura de 32,8% para ~24–26%
3. Normalização do colesterol LDL e triglicerídeos sem uso de estatinas
4. Melhora da qualidade do sono e do nível de energia diário
5. Criar relação mais saudável com a comida (reduzir comer emocional)

Expectativas de prazo: Casamento em dezembro/2026 (9 meses) — objetivo de estar próxima da meta até esse momento. Entende que o processo é gradual e declara estar comprometida com mudanças de longo prazo, não apenas perda temporária de peso.

Motivadores identificados: casamento, resultados de exames preocupantes, exemplo de saúde para filhos futuros, histórico familiar de doenças metabólicas, melhora da autoestima e disposição.

Barreiras identificadas: rotina de trabalho intensa, alimentação fora de casa 5x/semana, fome emocional em momentos de estresse, sleep deprivation que aumenta grelina e reduz saciedade.

Plano de acompanhamento: Retorno a cada 30 dias nas primeiras 3 avaliações, depois a cada 45–60 dias conforme progresso.`,
  },
];

export function AnamneseTab() {
  return (
    <div>
      {SECOES.map((secao, i) => (
        <ExportSection key={i} title={secao.titulo}>
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            {secao.chips.length > 0 && (
              <CardHeader className="pb-2">
                <div className="flex gap-1.5 flex-wrap">
                  {secao.chips.map(chip => (
                    <Chip key={chip} size="sm" variant="flat" color="default">{chip}</Chip>
                  ))}
                </div>
              </CardHeader>
            )}
            <CardBody className={secao.chips.length > 0 ? "pt-0" : ""}>
              {secao.conteudo.split("\n").filter(Boolean).map((paragrafo, pi) => (
                <p key={pi} className="text-xs text-slate-600 leading-relaxed mb-2 last:mb-0">
                  {paragrafo}
                </p>
              ))}
            </CardBody>
          </Card>
        </ExportSection>
      ))}
    </div>
  );
}
