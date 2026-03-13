"use client";
import { Card, CardBody, CardHeader, Chip, Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Divider } from "@heroui/react";
import { ExportSection } from "../ExportSection";

function MacroProgress({ label, grams, pct, color }: { label: string; grams: number; pct: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold" style={{ color }}>{label}</span>
        <span className="text-slate-500">{grams}g · {pct}%</span>
      </div>
      <Progress size="sm" value={pct}
        classNames={{ indicator: label === "PTN" ? "bg-indigo-500" : label === "CHO" ? "bg-amber-400" : "bg-blue-500" }}
      />
    </div>
  );
}

export function CalculoTab() {
  return (
    <div>
      {/* S1 — Dados do Paciente */}
      <ExportSection title="Dados do Paciente">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {[
                { label: "Peso", value: "78,0 kg" },
                { label: "Altura", value: "168 cm" },
                { label: "Idade", value: "32 anos" },
                { label: "Sexo", value: "Feminino" },
                { label: "Massa Magra", value: "52,4 kg" },
                { label: "% Gordura", value: "32,8%" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
            <Divider className="my-3" />
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
              <span><span className="font-medium text-slate-600">Fórmula:</span> Harris-Benedict revisada</span>
              <span><span className="font-medium text-slate-600">FAF:</span> 1,55 (moderadamente ativo)</span>
              <span><span className="font-medium text-slate-600">Ajuste:</span> −555 kcal/dia</span>
              <span><span className="font-medium text-slate-600">Objetivo:</span> Perda de peso controlada</span>
              <span><span className="font-medium text-slate-600">Meta:</span> 68,0 kg em 180 dias</span>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* S2 — Rotina de Treinos */}
      <ExportSection title="Rotina de Treinos">
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              nome: "Musculação Upper (Peito, Costas, Ombros)", dias: ["Seg", "Qua", "Sex"],
              horario: "07:00", duracao: "60 min", intensidade: "Moderada", met: 5.0, gasto: 420, intensidadePct: 55,
            },
            {
              nome: "Corrida em esteira / parque ao ar livre", dias: ["Ter", "Qui"],
              horario: "06:30", duracao: "45 min", intensidade: "Alta", met: 7.5, gasto: 380, intensidadePct: 80,
            },
            {
              nome: "Yoga e mobilidade articular", dias: ["Sáb"],
              horario: "09:00", duracao: "60 min", intensidade: "Leve", met: 2.5, gasto: 180, intensidadePct: 25,
            },
          ].map((treino, i) => (
            <Card key={i} shadow="none" classNames={{ base: "border border-slate-200" }}>
              <CardHeader className="pb-2 flex justify-between items-start flex-wrap gap-2">
                <div>
                  <span className="font-semibold text-sm text-slate-800">{treino.nome}</span>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {treino.dias.map(d => (
                      <Chip key={d} size="sm" variant="flat" color="primary" className="text-[10px]">{d}</Chip>
                    ))}
                  </div>
                </div>
                <Chip size="sm" variant="flat" color="success" className="font-bold">
                  {treino.gasto} kcal/sessão
                </Chip>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="flex gap-6 text-xs text-slate-500 mb-3">
                  <span><span className="font-medium text-slate-600">Horário:</span> {treino.horario}</span>
                  <span><span className="font-medium text-slate-600">Duração:</span> {treino.duracao}</span>
                  <span><span className="font-medium text-slate-600">MET:</span> {treino.met}</span>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="font-medium text-slate-500">Intensidade: {treino.intensidade}</span>
                    <span className="text-slate-400">{treino.intensidadePct}%</span>
                  </div>
                  <Progress
                    size="sm"
                    value={treino.intensidadePct}
                    color={treino.intensidadePct >= 70 ? "danger" : treino.intensidadePct >= 45 ? "warning" : "success"}
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
        <Card shadow="none" classNames={{ base: "border border-dashed border-slate-200 mt-3" }}>
          <CardBody className="py-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Total de sessões por semana:</span>
              <span className="font-semibold text-slate-700">6 sessões</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-slate-500">Gasto médio semanal por treinos:</span>
              <span className="font-semibold text-slate-700">~2.120 kcal/semana</span>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* S3 — Gastos e Valores Energéticos (UNIFICADO) */}
      <ExportSection title="Gastos e Valores Energéticos">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="p-0">
            <Table removeWrapper aria-label="Gastos e valores energéticos">
              <TableHeader>
                <TableColumn className="text-[10px] uppercase tracking-wider">Componente</TableColumn>
                <TableColumn className="text-right text-[10px] uppercase tracking-wider">Valor</TableColumn>
                <TableColumn className="text-[10px] uppercase tracking-wider">Descrição</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-slate-700 text-sm">TMB</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">1.547 kcal</TableCell>
                  <TableCell className="text-xs text-slate-500">Taxa Metabólica Basal (Harris-Benedict)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-slate-700 text-sm">GEA</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">2.398 kcal</TableCell>
                  <TableCell className="text-xs text-slate-500">Gasto Energético em Atividade (TMB × FAF 1,55)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-slate-700 text-sm">GMT</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">303 kcal/dia</TableCell>
                  <TableCell className="text-xs text-slate-500">Gasto Médio por Treinos (2.120 kcal ÷ 7 dias)</TableCell>
                </TableRow>
                <TableRow className="border-t-2 border-slate-300">
                  <TableCell className="font-semibold text-slate-700 text-sm">GET</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">2.534 kcal</TableCell>
                  <TableCell className="text-xs text-slate-500">Gasto Energético Total (GEA + GMT)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-slate-700 text-sm">Ajuste</TableCell>
                  <TableCell className="text-right font-bold text-red-500">−555 kcal</TableCell>
                  <TableCell className="text-xs text-slate-500">Déficit calórico para perda de 0,5 kg/semana</TableCell>
                </TableRow>
                <TableRow className="bg-slate-50">
                  <TableCell className="font-bold text-slate-900">VET</TableCell>
                  <TableCell className="text-right font-extrabold text-lg" style={{ color: "var(--green-dark)" }}>1.979 kcal</TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">Valor Energético Total prescrito</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-slate-700 text-sm">VET/kg</TableCell>
                  <TableCell className="text-right font-bold text-slate-900">25,4 kcal/kg</TableCell>
                  <TableCell className="text-xs text-slate-500">1.979 kcal ÷ 78 kg de peso corporal</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </ExportSection>

      {/* S4 — Cenários com Distribuição */}
      {[
        {
          nome: "Cenário 1 — Dia Normal",
          dias: ["Seg", "Ter", "Qua", "Qui", "Sex"],
          vet: 1979,
          macros: { ptn: 150, cho: 222, lip: 55 },
          pcts: { ptn: 30, cho: 45, lip: 25 },
          refeicoes: [
            { key: "cafe", nome: "Café da Manhã", horario: "07:00", ptn: 25, cho: 45, lip: 12, kcal: 386, isTotal: false },
            { key: "lanche-m", nome: "Lanche da Manhã", horario: "10:00", ptn: 15, cho: 30, lip: 8, kcal: 248, isTotal: false },
            { key: "almoco", nome: "Almoço", horario: "13:00", ptn: 45, cho: 70, lip: 15, kcal: 595, isTotal: false },
            { key: "lanche-t", nome: "Lanche da Tarde", horario: "16:00", ptn: 20, cho: 35, lip: 8, kcal: 292, isTotal: false },
            { key: "jantar", nome: "Jantar", horario: "19:30", ptn: 35, cho: 35, lip: 10, kcal: 370, isTotal: false },
            { key: "ceia", nome: "Ceia", horario: "22:00", ptn: 10, cho: 7, lip: 2, kcal: 88, isTotal: false },
            { key: "total", nome: "Total", horario: "", ptn: 150, cho: 222, lip: 55, kcal: 1979, isTotal: true },
          ],
        },
        {
          nome: "Cenário 2 — Dia de Treino",
          dias: ["Sáb", "Dom"],
          vet: 2279,
          macros: { ptn: 170, cho: 270, lip: 63 },
          pcts: { ptn: 30, cho: 47, lip: 25 },
          refeicoes: [
            { key: "cafe", nome: "Café da Manhã", horario: "06:30", ptn: 28, cho: 55, lip: 12, kcal: 440, isTotal: false },
            { key: "pre-treino", nome: "Pré-treino", horario: "09:00", ptn: 30, cho: 50, lip: 5, kcal: 365, isTotal: false },
            { key: "pos-treino", nome: "Pós-treino", horario: "11:30", ptn: 40, cho: 30, lip: 3, kcal: 307, isTotal: false },
            { key: "almoco", nome: "Almoço", horario: "13:30", ptn: 50, cho: 80, lip: 20, kcal: 700, isTotal: false },
            { key: "lanche-t", nome: "Lanche da Tarde", horario: "16:30", ptn: 12, cho: 35, lip: 10, kcal: 278, isTotal: false },
            { key: "jantar", nome: "Jantar", horario: "20:00", ptn: 10, cho: 20, lip: 13, kcal: 189, isTotal: false },
            { key: "total", nome: "Total", horario: "", ptn: 170, cho: 270, lip: 63, kcal: 2279, isTotal: true },
          ],
        },
        {
          nome: "Cenário 3 — Jejum Intermitente (16:8)",
          dias: ["variável"],
          vet: 1979,
          macros: { ptn: 160, cho: 200, lip: 64 },
          pcts: { ptn: 32, cho: 40, lip: 29 },
          refeicoes: [
            { key: "ref1", nome: "1ª Refeição (quebrar jejum)", horario: "12:00", ptn: 55, cho: 80, lip: 22, kcal: 754, isTotal: false },
            { key: "ref2", nome: "2ª Refeição", horario: "15:30", ptn: 45, cho: 65, lip: 20, kcal: 614, isTotal: false },
            { key: "ref3", nome: "3ª Refeição (última do dia)", horario: "19:30", ptn: 60, cho: 55, lip: 22, kcal: 666, isTotal: false },
            { key: "total", nome: "Total", horario: "", ptn: 160, cho: 200, lip: 64, kcal: 1979, isTotal: true },
          ],
        },
      ].map((cenario, ci) => (
        <ExportSection key={ci} title={cenario.nome}>
          <Card shadow="none" classNames={{ base: "border border-slate-200 mb-4" }}>
            <CardHeader className="pb-2 flex justify-between items-center flex-wrap gap-2">
              <div className="flex gap-1 flex-wrap">
                {cenario.dias.map(d => (
                  <Chip key={d} size="sm" variant="flat" color="primary">{d}</Chip>
                ))}
              </div>
              <span className="font-bold text-slate-800">VET: {cenario.vet.toLocaleString('pt-BR')} kcal</span>
            </CardHeader>
            <CardBody className="pt-0 space-y-2">
              <MacroProgress label="PTN" grams={cenario.macros.ptn} pct={cenario.pcts.ptn} color="var(--protein)" />
              <MacroProgress label="CHO" grams={cenario.macros.cho} pct={cenario.pcts.cho} color="var(--carbs)" />
              <MacroProgress label="LIP" grams={cenario.macros.lip} pct={cenario.pcts.lip} color="var(--fat)" />
            </CardBody>
          </Card>

          <Table removeWrapper aria-label={`Distribuição ${cenario.nome}`}>
            <TableHeader>
              <TableColumn className="text-xs font-medium uppercase tracking-wider">Refeição</TableColumn>
              <TableColumn className="text-xs font-medium uppercase tracking-wider">Horário</TableColumn>
              <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">PTN</TableColumn>
              <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">CHO</TableColumn>
              <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">LIP</TableColumn>
              <TableColumn className="text-right text-xs font-medium uppercase tracking-wider">kcal</TableColumn>
            </TableHeader>
            <TableBody items={cenario.refeicoes}>
              {(ref) => (
                <TableRow key={ref.key} className={ref.isTotal ? "border-t-2 border-slate-300 bg-slate-50" : ""}>
                  <TableCell className={ref.isTotal ? "font-bold text-slate-900 text-sm" : "text-sm font-medium text-slate-700"}>{ref.nome}</TableCell>
                  <TableCell className="text-xs text-slate-500">{ref.horario}</TableCell>
                  <TableCell className={`text-right ${ref.isTotal ? "font-bold text-slate-900" : "text-xs text-slate-600"}`}>{ref.ptn}g</TableCell>
                  <TableCell className={`text-right ${ref.isTotal ? "font-bold text-slate-900" : "text-xs text-slate-600"}`}>{ref.cho}g</TableCell>
                  <TableCell className={`text-right ${ref.isTotal ? "font-bold text-slate-900" : "text-xs text-slate-600"}`}>{ref.lip}g</TableCell>
                  <TableCell className={`text-right ${ref.isTotal ? "font-extrabold text-slate-900" : "text-xs font-semibold text-slate-800"}`}>{ref.kcal}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ExportSection>
      ))}

      {/* Observações */}
      <ExportSection title="Observações">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-sm text-slate-600 leading-relaxed space-y-2">
            <p>Os cenários acima foram calculados com base nos dados antropométricos e de composição corporal da paciente, utilizando a fórmula Harris-Benedict revisada para estimar o metabolismo basal.</p>
            <p>O fator de atividade 1,55 foi aplicado considerando a rotina semanal de treinos cadastrada: 6 sessões por semana com intensidades variadas (musculação, corrida e yoga).</p>
            <p>O déficit calórico de 555 kcal/dia visa a perda de aproximadamente 0,5 kg/semana, considerada uma taxa segura e sustentável. O objetivo final é atingir 68 kg em 180 dias.</p>
            <p><strong>Importante:</strong> Os valores são estimativas e devem ser ajustados conforme evolução da paciente. Reavaliação recomendada a cada 30–45 dias.</p>
          </CardBody>
        </Card>
      </ExportSection>
    </div>
  );
}
