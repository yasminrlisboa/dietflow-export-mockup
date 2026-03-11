"use client";
import { Card, CardBody, CardHeader, Chip, Progress, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Divider } from "@heroui/react";
import { ExportSection } from "../ExportSection";

export function AntropometriaTab() {
  return (
    <div>
      {/* Dados Gerais */}
      <ExportSection title="Identificação e Data da Avaliação">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody>
            <div className="grid grid-cols-3 gap-x-6 gap-y-3">
              {[
                { label: "Data da Avaliação", value: "11/03/2026" },
                { label: "Avaliador", value: "Dra. Maria Fernanda Costa" },
                { label: "Protocolo", value: "Pollock 7 dobras" },
                { label: "Peso Atual", value: "78,0 kg" },
                { label: "Peso Usual", value: "72,0 kg (2022)" },
                { label: "Peso Desejado", value: "68,0 kg" },
                { label: "Peso Ideal (Lorentz)", value: "60–67 kg" },
                { label: "Altura", value: "168 cm" },
                { label: "Envergadura", value: "169 cm" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</div>
                  <div className="text-sm font-semibold text-slate-800 mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Índices Antropométricos */}
      <ExportSection title="Índices Antropométricos">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "IMC", value: "27,6 kg/m²", classif: "Sobrepeso", cor: "warning" as const, pct: 64 },
            { label: "RCQ (Relação Cintura-Quadril)", value: "0,76", classif: "Risco Baixo", cor: "success" as const, pct: 38 },
            { label: "RCE (Relação Cintura-Estatura)", value: "0,46", classif: "Adequado", cor: "success" as const, pct: 46 },
            { label: "IAC (Índice Adiposidade Corporal)", value: "31,8%", classif: "Obeso I", cor: "danger" as const, pct: 72 },
          ].map((idx) => (
            <Card key={idx.label} shadow="none" classNames={{ base: "border border-slate-200" }}>
              <CardBody className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{idx.label}</div>
                  <Chip size="sm" variant="flat" color={idx.cor}>{idx.classif}</Chip>
                </div>
                <div className="text-xl font-extrabold text-slate-800 mb-2">{idx.value}</div>
                <Progress size="sm" value={idx.pct} color={idx.cor} />
              </CardBody>
            </Card>
          ))}
        </div>
      </ExportSection>

      {/* Composição Corporal */}
      <ExportSection title="Composição Corporal">
        <Card shadow="none" classNames={{ base: "border border-slate-200 mb-4" }}>
          <CardBody>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Distribuição Corporal</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Massa Gorda</span>
                      <span className="text-slate-600">25,6 kg · 32,8%</span>
                    </div>
                    <Progress size="sm" value={32.8} maxValue={60} color="danger" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Massa Magra</span>
                      <span className="text-slate-600">52,4 kg · 67,2%</span>
                    </div>
                    <Progress size="sm" value={67.2} maxValue={100} color="success" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Massa Muscular Esq.</span>
                      <span className="text-slate-600">28,1 kg · 36%</span>
                    </div>
                    <Progress size="sm" value={36} maxValue={60} color="primary" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-700">Massa Óssea (est.)</span>
                      <span className="text-slate-600">2,8 kg · 3,6%</span>
                    </div>
                    <Progress size="sm" value={3.6} maxValue={6} color="secondary" />
                  </div>
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Dados Calculados</div>
                <div className="space-y-2">
                  {[
                    { label: "Somatório de 7 Dobras", value: "158 mm" },
                    { label: "Densidade Corporal", value: "1,0495 g/ml" },
                    { label: "% Gordura (Siri)", value: "32,8%" },
                    { label: "Classificação (ACSM)", value: "Obeso — Feminino/32 anos" },
                    { label: "% Gordura Desejado", value: "22–26%" },
                    { label: "Peso Gordo a Perder", value: "5,4–8,4 kg" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </ExportSection>

      {/* Circunferências */}
      <ExportSection title="Circunferências">
        <Table removeWrapper aria-label="Circunferências" isStriped>
          <TableHeader>
            <TableColumn className="text-[10px] uppercase">Medida</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Valor (cm)</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Referência</TableColumn>
            <TableColumn className="text-[10px] uppercase">Status</TableColumn>
          </TableHeader>
          <TableBody items={[
            { key: "cervical", nome: "Cervical", valor: "36,5", ref: "< 38 cm" },
            { key: "torax", nome: "Tórax (Peitoral)", valor: "96,0", ref: "proporcional" },
            { key: "cintura", nome: "Cintura (menor circunferência)", valor: "78,5", ref: "< 80 cm" },
            { key: "abdominal", nome: "Abdominal (cicatriz umbilical)", valor: "83,0", ref: "< 88 cm" },
            { key: "quadril", nome: "Quadril (maior proeminência)", valor: "102,0", ref: "proporcional" },
            { key: "coxa-d", nome: "Coxa Direita (proximal)", valor: "57,0", ref: "proporcional" },
            { key: "coxa-e", nome: "Coxa Esquerda (proximal)", valor: "56,5", ref: "proporcional" },
            { key: "pant-d", nome: "Panturrilha Direita", valor: "37,0", ref: "proporcional" },
            { key: "pant-e", nome: "Panturrilha Esquerda", valor: "36,5", ref: "proporcional" },
            { key: "braco-d-rel", nome: "Braço Direito Relaxado", valor: "30,0", ref: "proporcional" },
            { key: "braco-d-cont", nome: "Braço Direito Contraído", valor: "32,5", ref: "proporcional" },
            { key: "antebraco-d", nome: "Antebraço Direito", valor: "24,0", ref: "proporcional" },
          ]}>
            {(c) => (
              <TableRow key={c.key}>
                <TableCell className="font-medium text-slate-700">{c.nome}</TableCell>
                <TableCell className="text-right font-bold text-slate-900">{c.valor}</TableCell>
                <TableCell className="text-right text-xs text-slate-500">{c.ref}</TableCell>
                <TableCell>
                  <Chip size="sm" variant="flat" color="success">Normal</Chip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ExportSection>

      {/* Dobras Cutâneas */}
      <ExportSection title="Dobras Cutâneas (mm)">
        <Table removeWrapper aria-label="Dobras cutâneas">
          <TableHeader>
            <TableColumn className="text-[10px] uppercase">Dobra</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Med. 1</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Med. 2</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Med. 3</TableColumn>
            <TableColumn className="text-right text-[10px] uppercase">Média</TableColumn>
          </TableHeader>
          <TableBody items={[
            { key: "peitoral", nome: "Peitoral", m1: "22", m2: "23", m3: "22", media: "22.3", isTotal: false },
            { key: "axilar", nome: "Axilar Média", m1: "18", m2: "19", m3: "18", media: "18.3", isTotal: false },
            { key: "triceps", nome: "Tríceps", m1: "28", m2: "27", m3: "28", media: "27.7", isTotal: false },
            { key: "subescapular", nome: "Subescapular", m1: "24", m2: "24", m3: "25", media: "24.3", isTotal: false },
            { key: "abdominal", nome: "Abdominal", m1: "30", m2: "31", m3: "30", media: "30.3", isTotal: false },
            { key: "suprailiaca", nome: "Suprailíaca", m1: "20", m2: "21", m3: "20", media: "20.3", isTotal: false },
            { key: "coxa", nome: "Coxa", m1: "15", m2: "15", m3: "16", media: "15.3", isTotal: false },
            { key: "total", nome: "Somatório (Σ7)", m1: "", m2: "", m3: "", media: "158,5 mm", isTotal: true },
          ]}>
            {(d) => (
              <TableRow key={d.key} className={d.isTotal ? "bg-slate-50" : ""}>
                <TableCell className={d.isTotal ? "font-bold text-slate-900" : "font-medium text-slate-700"}>{d.nome}</TableCell>
                <TableCell className="text-right text-slate-600">{d.m1}</TableCell>
                <TableCell className="text-right text-slate-600">{d.m2}</TableCell>
                <TableCell className="text-right text-slate-600">{d.m3}</TableCell>
                <TableCell className={`text-right ${d.isTotal ? "font-extrabold text-slate-900" : "font-bold text-slate-900"}`}>{d.media}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ExportSection>

      {/* Observações */}
      <ExportSection title="Observações Clínicas">
        <Card shadow="none" classNames={{ base: "border border-slate-200" }}>
          <CardBody className="text-xs text-slate-600 leading-relaxed space-y-2">
            <p>Avaliação realizada no período da manhã (08h30), em jejum de 12 horas, com bexiga vazia. Paciente descansada, sem exercício físico nas 24h anteriores. Condições padronizadas de acordo com protocolo da clínica.</p>
            <p>A distribuição de gordura corporal predominantemente ginóide (quadril e coxas) representa menor risco cardiovascular em comparação à distribuição androide. RCQ de 0,76 está dentro do limite aceitável para o sexo feminino (risco baixo {"< 0,80"}).</p>
            <p>Massa magra bem preservada (52,4 kg) para o nível de atividade física atual, especialmente considerando o histórico sedentário dos últimos 3 anos. Dois meses de musculação já apresentam impacto positivo na manutenção muscular.</p>
            <p>Recomenda-se nova avaliação em 30 dias para acompanhamento do impacto da musculação na composição corporal. Atenção especial ao risco de perda de massa muscular caso o déficit calórico seja muito agressivo.</p>
            <p><strong>Metas de composição corporal:</strong> Reduzir % de gordura para 24–26% (perda de ~5–7 kg de massa gorda) mantendo massa muscular atual. Não focar apenas na balança — a evolução da composição corporal é o indicador primário de sucesso.</p>
          </CardBody>
        </Card>
      </ExportSection>
    </div>
  );
}
