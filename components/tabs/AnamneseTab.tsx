"use client";
import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import { ExportSection } from "../ExportSection";

/* ─── Dados de Rotina do Dia ─────────────────────────── */
const REFEICOES = [
  { nome: "Café da manhã", horario: "08:00", descricao: "Frequentemente pulado — sai cedo para o trabalho" },
  { nome: "Lanche da manhã", horario: "10:00", descricao: "Biscoito recheado ou salgado de padaria" },
  { nome: "Almoço", horario: "13:00", descricao: "Refeitório da empresa, sem critérios nutricionais definidos" },
  { nome: "Lanche da tarde", horario: "16:30", descricao: "Castanhas, chocolate ou biscoito salgado" },
  { nome: "Jantar", horario: "19:30", descricao: "Refeição completa + petiscos em frente à TV — maior descontrole alimentar" },
];

const EXERCICIOS = [
  { nome: "Musculação (Upper + Lower)", horario: "07:00", descricao: "Seg, qua, sex — 60 min com personal trainer" },
  { nome: "Corrida / esteira", horario: "06:30", descricao: "Ter, qui — 45 min, intensidade moderada-alta" },
  { nome: "Yoga e mobilidade", horario: "09:00", descricao: "Sáb — 60 min, leve" },
  { nome: "Descanso ativo", horario: "—", descricao: "Dom — caminhada ou atividade livre" },
];

const REMEDIOS = [
  { nome: "Anticoncepcional oral combinado", horario: "08:00", descricao: "Levonorgestrel 0,15mg + Etinilestradiol 0,03mg — uso contínuo há 4 anos" },
];

const SUPLEMENTOS = [
  { nome: "Whey Protein", horario: "Pós-treino", descricao: "Tentou por 3 meses em 2024, abandonou por sabor ruim — não está em uso" },
];

/* ─── Dados de Hidratação ────────────────────────────── */
const HIDRATACAO = {
  litros: 1.3,
  copos: 5,
  perfil: "Moderadamente ativa",
  recomendado: "35–40 ml/kg ≈ 2,7 L/dia",
  peso: 78,
};

/* ─── Dados de Sono ──────────────────────────────────── */
const SONO = {
  horas: 6,
  acorda: "1–2 vezes por noite",
  satisfacao: "Ruim",
  interferencia: "Moderada",
  preocupacao: "Alguma",
  scoreISI: 9,
  scoreMax: 28,
  classificacao: "Insônia subclínica",
  obs: "Dificuldade para iniciar o sono, sono fragmentado e não reparador",
};

/* ─── Hábito Intestinal ──────────────────────────────── */
const GI = {
  bristol: "Tipo 3–4",
  frequencia: "A cada 2 dias",
  inchaco: "Leve",
  gases: "Leve",
  dorAbdominal: "Ausente",
  refluxo: "Leve (1–2x/semana)",
  giScore: 5,
  giScoreMax: 21,
  classificacaoGI: "Atenção",
};

/* ─── Problemas de Saúde ─────────────────────────────── */
const PROBLEMAS_SAUDE = [
  {
    nome: "Hipotireoidismo subclínico (histórico)",
    detalhe: "TSH 4,2 μUI/mL em 2022 — normalizado espontaneamente em 2023. Monitorar.",
  },
  {
    nome: "Dislipidemia",
    detalhe: "LDL elevado em exame de fevereiro/2026. Sem medicação. Alvo de intervenção nutricional.",
  },
  {
    nome: "Possível sensibilidade à lactose",
    detalhe: "Não diagnosticada formalmente. Melhora sintomática com leite zero lactose.",
  },
];

/* ─── Histórico Familiar ─────────────────────────────── */
const HISTORICO_FAMILIAR = [
  { parentesco: "Mãe", condicoes: "Obesidade (IMC 32), diabetes tipo 2, hipotireoidismo" },
  { parentesco: "Pai", condicoes: "Hipertensão arterial, dislipidemia em tratamento farmacológico" },
  { parentesco: "Avó materna", condicoes: "Doença cardiovascular" },
];

/* ─── Adesão à Dieta ─────────────────────────────────── */
const ADESAO = {
  status: "Parcialmente" as "Sim" | "Parcialmente" | "Não",
  obs: "Boa adesão nos dias de treino; descontrole noturno em dias de maior estresse laboral.",
};

/* ─── Notas Livres ───────────────────────────────────── */
const BLOCO_TEXTO =
  "Paciente motivada pelo casamento em dezembro/2026 e pelos resultados preocupantes dos exames de fevereiro. Reconhece relação emocional com a comida em situações de estresse. Histórico de dietas restritivas sem sucesso duradouro. Prioridade: reeducação alimentar sustentável + abordagem do comer emocional.";

/* ─── Sub-componentes ────────────────────────────────── */
function RotinaCatItem({
  horario,
  nome,
  descricao,
}: {
  horario: string;
  nome: string;
  descricao: string;
}) {
  return (
    <div className="border border-slate-200 rounded-xl px-4 py-3">
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-sm text-slate-800">{nome}</span>
        <span className="text-[11px] text-slate-400">{horario}</span>
      </div>
      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{descricao}</p>
    </div>
  );
}

function DataGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(({ label, value }) => (
        <div key={label} className="border border-slate-200 rounded-xl px-4 py-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</div>
          <div className="text-sm font-semibold text-slate-800">{value}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Componente principal ───────────────────────────── */
export function AnamneseTab() {
  const adesaoCor =
    ADESAO.status === "Sim"
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : ADESAO.status === "Parcialmente"
      ? "bg-amber-50 border-amber-200 text-amber-700"
      : "bg-red-50 border-red-200 text-red-700";

  return (
    <div>

      {/* ── Rotina do Dia ───────────────────────────────── */}
      <ExportSection title="Rotina do Dia">
        <div className="space-y-4">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Refeições</p>
            <div className="space-y-2">
              {REFEICOES.map((r) => (
                <RotinaCatItem key={r.nome} horario={r.horario} nome={r.nome} descricao={r.descricao} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Exercícios</p>
            <div className="space-y-2">
              {EXERCICIOS.map((e) => (
                <RotinaCatItem key={e.nome} horario={e.horario} nome={e.nome} descricao={e.descricao} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Remédios</p>
            <div className="space-y-2">
              {REMEDIOS.map((r) => (
                <RotinaCatItem key={r.nome} horario={r.horario} nome={r.nome} descricao={r.descricao} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Suplementos</p>
            <div className="space-y-2">
              {SUPLEMENTOS.map((s) => (
                <RotinaCatItem key={s.nome} horario={s.horario} nome={s.nome} descricao={s.descricao} />
              ))}
            </div>
          </div>

        </div>
      </ExportSection>

      {/* ── Hidratação ──────────────────────────────────── */}
      <ExportSection title="Hidratação">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-slate-800">{HIDRATACAO.litros} L</span>
          <span className="text-sm text-slate-400">{HIDRATACAO.copos} copos (250 ml) · estimativa</span>
        </div>
        <DataGrid
          items={[
            { label: "Perfil", value: HIDRATACAO.perfil },
            { label: "Recomendado", value: HIDRATACAO.recomendado },
          ]}
        />
      </ExportSection>

      {/* ── Sono ────────────────────────────────────────── */}
      <ExportSection title="Sono">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="text-3xl font-extrabold text-slate-800">{SONO.horas} h</span>
          <span className="text-sm text-slate-400">de sono · acorda {SONO.acorda}</span>
        </div>
        <DataGrid
          items={[
            { label: "Satisfação", value: SONO.satisfacao },
            { label: "Interferência no dia", value: SONO.interferencia },
            { label: "Preocupação", value: SONO.preocupacao },
            { label: `Score ISI  (/${SONO.scoreMax})`, value: `${SONO.scoreISI} — ${SONO.classificacao}` },
          ]}
        />
        {SONO.obs && (
          <p className="text-xs text-slate-500 italic mt-3">{SONO.obs}</p>
        )}
      </ExportSection>

      {/* ── Hábito Intestinal ───────────────────────────── */}
      <ExportSection title="Hábito Intestinal">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Bristol e Frequência</p>
            <DataGrid
              items={[
                { label: "Bristol", value: GI.bristol },
                { label: "Frequência", value: GI.frequencia },
              ]}
            />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Sintomas Gastrointestinais</p>
            <DataGrid
              items={[
                { label: "Inchaço", value: GI.inchaco },
                { label: "Gases", value: GI.gases },
                { label: "Dor abdominal", value: GI.dorAbdominal },
                { label: "Refluxo", value: GI.refluxo },
              ]}
            />
          </div>
          <div className="border border-slate-200 rounded-xl px-4 py-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">GI Score</div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-800">{GI.giScore}/{GI.giScoreMax}</span>
              <Chip size="sm" variant="flat" color="warning">{GI.classificacaoGI}</Chip>
            </div>
          </div>
        </div>
      </ExportSection>

      {/* ── Problemas de Saúde ──────────────────────────── */}
      <ExportSection title="Problemas de Saúde">
        <div className="space-y-2">
          {PROBLEMAS_SAUDE.map((p) => (
            <div key={p.nome} className="border border-slate-200 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-slate-800">{p.nome}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.detalhe}</p>
            </div>
          ))}
        </div>
      </ExportSection>

      {/* ── Histórico Familiar ──────────────────────────── */}
      <ExportSection title="Histórico Familiar">
        <div className="space-y-2">
          {HISTORICO_FAMILIAR.map((h) => (
            <div key={h.parentesco} className="border border-slate-200 rounded-xl px-4 py-3 flex items-start gap-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 w-20 flex-shrink-0 pt-0.5">{h.parentesco}</span>
              <span className="text-xs text-slate-700 leading-relaxed">{h.condicoes}</span>
            </div>
          ))}
        </div>
      </ExportSection>

      {/* ── Medicações ──────────────────────────────────── */}
      <ExportSection title="Medicações">
        <div className="space-y-2">
          {REMEDIOS.map((r) => (
            <div key={r.nome} className="border border-slate-200 rounded-xl px-4 py-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-slate-800">{r.nome}</span>
                <span className="text-[11px] text-slate-400">{r.horario}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{r.descricao}</p>
            </div>
          ))}
        </div>
      </ExportSection>

      {/* ── Adesão à Dieta ──────────────────────────────── */}
      <ExportSection title="Adesão à Dieta">
        <div className={`border rounded-xl px-6 py-5 text-center mb-3 ${adesaoCor}`}>
          <p className="text-xl font-bold">{ADESAO.status}</p>
        </div>
        {ADESAO.obs && (
          <p className="text-xs text-slate-500 leading-relaxed">{ADESAO.obs}</p>
        )}
      </ExportSection>

      {/* ── Bloco de Texto ──────────────────────────────── */}
      <ExportSection title="Observações Clínicas">
        <div className="border border-slate-200 rounded-xl px-4 py-3">
          <p className="text-xs text-slate-600 leading-relaxed">{BLOCO_TEXTO}</p>
        </div>
      </ExportSection>

    </div>
  );
}
