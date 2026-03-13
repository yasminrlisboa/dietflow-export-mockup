"use client";
import { Card, CardBody, CardHeader, Chip, Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { ExportSection } from "../ExportSection";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine,
} from "recharts";

const AVALIACOES = [
  { data: "Jan/2025", peso: 85.2, imc: 30.2, gordura: 38.5, massaMagra: 52.4, circ: 94, classGordura: "Obeso I" },
  { data: "Mar/2025", peso: 83.1, imc: 29.5, gordura: 37.2, massaMagra: 52.2, circ: 91, classGordura: "Sobrepeso" },
  { data: "Mai/2025", peso: 81.4, imc: 28.9, gordura: 36.0, massaMagra: 52.1, circ: 89, classGordura: "Sobrepeso" },
  { data: "Jul/2025", peso: 80.0, imc: 28.4, gordura: 35.1, massaMagra: 51.9, circ: 87, classGordura: "Sobrepeso" },
  { data: "Set/2025", peso: 78.8, imc: 27.9, gordura: 33.8, massaMagra: 52.2, circ: 85, classGordura: "Sobrepeso" },
  { data: "Nov/2025", peso: 78.0, imc: 27.6, gordura: 32.8, massaMagra: 52.4, circ: 83, classGordura: "Sobrepeso" },
];

const CIRCUNFERENCIAS = [
  { nome: "Abdominal", valores: [94, 91, 89, 87, 85, 83], ref: "< 88 cm" },
  { nome: "Cintura", valores: [88, 85, 83, 81, 79, 78], ref: "< 80 cm" },
  { nome: "Quadril", valores: [108, 106, 105, 104, 103, 102], ref: "proporcional" },
  { nome: "Coxa Direita", valores: [62, 61, 60, 59, 58, 57], ref: "proporcional" },
  { nome: "Braço Direito", valores: [32, 31.5, 31, 30.5, 30, 30], ref: "proporcional" },
];

const NOTAS = [
  { data: "Jan/2025", texto: "Primeira avaliação. Paciente chegou relatando cansaço excessivo e dificuldade para perder peso. Iniciou protocolo nutricional focado em déficit calórico controlado e aumento de proteínas." },
  { data: "Mar/2025", texto: "Segunda avaliação. Boa adesão ao plano. Relatou leve melhora na disposição. Perdeu 2,1 kg em 2 meses — ritmo dentro do esperado. Ajustado VET para compensar adaptação metabólica." },
  { data: "Mai/2025", texto: "Terceira avaliação. Introdução dos treinos de musculação. Leve ganho de massa magra observado. Circunferências em queda consistente. Queixa de fome no período da tarde — lanche acrescentado." },
  { data: "Jul/2025", texto: "Quarta avaliação. Plateau de 2 semanas superado com refeeding estratégico. Manutenção de massa magra excelente. Incluído treino de corrida 2x/semana." },
  { data: "Set/2025", texto: "Quinta avaliação. Progresso contínuo. % de gordura abaixo de 34% pela primeira vez. Paciente relata melhora significativa na qualidade do sono e energia ao longo do dia." },
  { data: "Nov/2025", texto: "Sexta avaliação. Avaliação atual. Evolução consistente com 7,2 kg perdidos em 10 meses. Foco agora em manutenção e hipertrofia controlada para os próximos 3 meses." },
];

function VariacaoChip({ atual, anterior }: { atual: number; anterior: number }) {
  const diff = atual - anterior;
  if (Math.abs(diff) < 0.05) return <Chip size="sm" variant="flat" color="default">—</Chip>;
  const isGood = diff < 0;
  return (
    <Chip size="sm" variant="flat" color={isGood ? "success" : "danger"}>
      {diff > 0 ? "+" : ""}{diff.toFixed(1)}
    </Chip>
  );
}

export function EvolucaoTab() {
  const pesoInicial = AVALIACOES[0].peso;
  const pesoAtual = AVALIACOES[AVALIACOES.length - 1].peso;
  const pesoMeta = 68.0;
  const totalMeta = pesoInicial - pesoMeta;
  const realizado = pesoInicial - pesoAtual;
  const progresso = Math.round((realizado / totalMeta) * 100);

  return (
    <div>
      {/* Resumo de progresso */}
      <ExportSection title="Progresso Geral">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardBody className="text-center py-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Peso Inicial</div>
              <div className="text-2xl font-extrabold text-slate-700">{pesoInicial} kg</div>
              <div className="text-xs text-slate-400 mt-1">Janeiro/2025</div>
            </CardBody>
          </Card>
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardBody className="text-center py-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Peso Atual</div>
              <div className="text-2xl font-extrabold text-slate-800">{pesoAtual} kg</div>
              <Chip size="sm" variant="flat" color="success" className="mt-1">−{(pesoInicial - pesoAtual).toFixed(1)} kg</Chip>
            </CardBody>
          </Card>
          <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
            <CardBody className="text-center py-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Meta</div>
              <div className="text-2xl font-extrabold text-slate-700">{pesoMeta} kg</div>
              <div className="text-xs text-slate-400 mt-1">Faltam {(pesoAtual - pesoMeta).toFixed(1)} kg</div>
            </CardBody>
          </Card>
        </div>
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-slate-600">Progresso em direção à meta</span>
              <span className="font-bold text-slate-800">{progresso}% concluído</span>
            </div>
            <Progress
              value={progresso}
              size="md"
              color="success"
              showValueLabel={false}
              classNames={{ indicator: "bg-emerald-400" }}
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>85,2 kg (início)</span>
              <span>68,0 kg (meta)</span>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{realizado.toFixed(1)} kg</span> perdidos em <span className="font-medium text-slate-700">10 meses</span> · média de <span className="font-medium text-slate-700">0,72 kg/mês</span>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Gráfico — métricas principais */}
      <ExportSection title="Evolução das Métricas Principais">
        <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
          <CardHeader className="pb-0 pt-3 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Peso · IMC · % Gordura · Massa Magra — Jan/2025 a Nov/2025
            </span>
          </CardHeader>
          <CardBody className="pt-1 pb-4">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={AVALIACOES.map(av => ({
                    data: av.data,
                    "Peso (kg)": av.peso,
                    "IMC": av.imc,
                    "% Gordura": av.gordura,
                    "Massa Magra (kg)": av.massaMagra,
                  }))}
                  margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="data" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={36} domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} />
                  <Line type="monotone" dataKey="Peso (kg)"       stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="IMC"             stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="% Gordura"       stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Massa Magra (kg)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Gráfico — circunferências */}
      <ExportSection title="Evolução das Circunferências">
        <Card shadow="none" classNames={{ base: "border border-slate-100 mb-3" }}>
          <CardHeader className="pb-0 pt-3 px-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Circunferências (cm) — Jan/2025 a Nov/2025
            </span>
          </CardHeader>
          <CardBody className="pt-1 pb-4">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={AVALIACOES.map((av, i) => ({
                    data: av.data,
                    ...Object.fromEntries(CIRCUNFERENCIAS.map(c => [c.nome, c.valores[i]])),
                  }))}
                  margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="data" tick={{ fontSize: 10, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} width={36} unit=" cm" domain={["auto", "auto"]} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v} cm`]} />
                  <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} />
                  {CIRCUNFERENCIAS.map((c, i) => (
                    <Line
                      key={c.nome} type="monotone" dataKey={c.nome}
                      stroke={["#6366f1","#f59e0b","#ef4444","#10b981","#8b5cf6"][i]}
                      strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Tabela de evoluções */}
      <ExportSection title="Evolução Antropométrica Completa">
        <Table removeWrapper aria-label="Evolução antropométrica" isStriped>
          <TableHeader>
            <TableColumn className="text-xs font-medium uppercase tracking-wider">Data</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">Peso (kg)</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">Δ</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">IMC</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">% Gordura</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">Massa Magra</TableColumn>
            <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">C. Abdominal</TableColumn>
          </TableHeader>
          <TableBody items={AVALIACOES}>
            {(av) => (
              <TableRow key={av.data}>
                <TableCell className="font-semibold text-slate-700">{av.data}</TableCell>
                <TableCell className="text-right font-bold text-slate-800">{av.peso}</TableCell>
                <TableCell className="text-right">
                  {AVALIACOES.indexOf(av) === 0 ? <Chip size="sm" variant="flat">base</Chip> : (
                    <VariacaoChip atual={av.peso} anterior={AVALIACOES[AVALIACOES.indexOf(av) - 1].peso} />
                  )}
                </TableCell>
                <TableCell className="text-right text-slate-600">{av.imc}</TableCell>
                <TableCell className="text-right text-slate-600">{av.gordura}%</TableCell>
                <TableCell className="text-right text-slate-600">{av.massaMagra} kg</TableCell>
                <TableCell className="text-right text-slate-600">{av.circ} cm</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ExportSection>

      {/* Circunferências */}
      <ExportSection title="Evolução das Circunferências">
        <Table removeWrapper aria-label="Circunferências" isStriped>
          <TableHeader columns={[
            { key: "medida", label: "Medida", isDate: false },
            ...AVALIACOES.map(av => ({ key: av.data, label: av.data, isDate: true })),
            { key: "delta", label: "Δ Total", isDate: false },
          ]}>
            {(col) => (
              <TableColumn key={col.key} className={`${col.isDate ? "text-right " : ""}text-[10px] uppercase`}>
                {col.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={CIRCUNFERENCIAS}>
            {(circ) => (
              <TableRow key={circ.nome}>
                <TableCell className="font-semibold text-slate-700 text-sm">{circ.nome}</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[0]} cm</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[1]} cm</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[2]} cm</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[3]} cm</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[4]} cm</TableCell>
                <TableCell className="text-right text-xs text-slate-600">{circ.valores[5]} cm</TableCell>
                <TableCell className="text-right">
                  <Chip size="sm" variant="flat" color="success">
                    −{(circ.valores[0] - circ.valores[circ.valores.length - 1]).toFixed(1)} cm
                  </Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ExportSection>

      {/* % Gordura e composição */}
      <ExportSection title="Composição Corporal — Evolução">
        <div className="space-y-4">
          {AVALIACOES.map((av, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-16 text-xs font-semibold text-slate-600 flex-shrink-0">{av.data}</div>
              <div className="flex-1">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-500">% Gordura: <span className="font-bold text-slate-700">{av.gordura}%</span></span>
                  <Chip size="sm" variant="flat" color={av.gordura < 30 ? "success" : av.gordura < 35 ? "warning" : "danger"} className="text-[10px]">{av.classGordura}</Chip>
                </div>
                <Progress value={av.gordura} maxValue={50} size="sm" color={av.gordura < 30 ? "success" : av.gordura < 35 ? "warning" : "danger"} />
              </div>
              <div className="text-xs text-slate-500 w-24 flex-shrink-0 text-right">MM: {av.massaMagra} kg</div>
            </div>
          ))}
        </div>
      </ExportSection>

      {/* Notas por avaliação */}
      <ExportSection title="Notas das Avaliações">
        <div className="space-y-3">
          {NOTAS.map((nota, i) => (
            <Card key={i} shadow="none" classNames={{ base: "border border-slate-100" }}>
              <CardHeader className="pb-1">
                <Chip size="sm" variant="flat" color="default">{nota.data}</Chip>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-xs text-slate-600 leading-relaxed">{nota.texto}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </ExportSection>
    </div>
  );
}
