"use client";

import { Tabs, Tab } from "@heroui/react";
import { ExportHeader } from "@/components/ExportHeader";
import { ExportFooter } from "@/components/ExportFooter";
import { PlanoAlimentarTab } from "@/components/tabs/PlanoAlimentarTab";
import { ResultadosExamesTab } from "@/components/tabs/ResultadosExamesTab";
import { PrescricaoExamesTab } from "@/components/tabs/PrescricaoExamesTab";
import { PrescricaoSuplementosTab } from "@/components/tabs/PrescricaoSuplementosTab";
import { AnamneseTab } from "@/components/tabs/AnamneseTab";
import { CalculoTab } from "@/components/tabs/CalculoTab";
import { AntropometriaTab } from "@/components/tabs/AntropometriaTab";
import { EvolucaoTab } from "@/components/tabs/EvolucaoTab";

const TABS = [
  { key: "plano", label: "Plano Alimentar", title: "Plano Alimentar", Component: PlanoAlimentarTab },
  { key: "resultados", label: "Resultados de Exames", title: "Resultados de Exames", Component: ResultadosExamesTab },
  { key: "presc-exames", label: "Prescrição de Exames", title: "Prescrição de Exames", Component: PrescricaoExamesTab },
  { key: "suplementos", label: "Prescrição de Suplementos", title: "Prescrição de Suplementos", Component: PrescricaoSuplementosTab },
  { key: "anamnese", label: "Anamnese", title: "Anamnese", Component: AnamneseTab },
  { key: "calculo", label: "Cálculo Energético", title: "Cálculo Energético", Component: CalculoTab },
  { key: "antropometria", label: "Antropometria", title: "Antropometria", Component: AntropometriaTab },
  { key: "evolucao", label: "Evolução", title: "Evolução do Paciente", Component: EvolucaoTab },
];

export default function Home() {
  return (
    <div className="min-h-screen py-8" style={{ background: "#e8edf3" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 16px" }}>
        <div className="mb-6">
          <Tabs
            aria-label="Documentos de exportação"
            variant="underlined"
            color="primary"
            classNames={{
              tabList: "flex-wrap gap-1 bg-white rounded-xl p-2 shadow-sm",
              tab: "text-xs",
            }}
          >
            {TABS.map(({ key, label, title, Component }) => (
              <Tab key={key} title={label}>
                <div className="a4-page mt-4">
                  <ExportHeader />
                  <div className="mb-5">
                    <h1 className="text-xl font-extrabold text-slate-900 mb-1">{title}</h1>
                    <div className="h-0.5 w-12 rounded-full" style={{ background: "var(--green)" }} />
                  </div>
                  <Component />
                  <ExportFooter docTitle={title} />
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
