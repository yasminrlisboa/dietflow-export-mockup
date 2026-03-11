"use client";

import { useState } from "react";
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
  const [active, setActive] = useState("plano");
  const current = TABS.find(t => t.key === active)!;
  const { Component } = current;

  return (
    <div className="min-h-screen flex" style={{ background: "#e8edf3" }}>
      {/* Sidebar de abas */}
      <div
        className="flex flex-col py-8 px-3 gap-1 sticky top-0 h-screen overflow-y-auto"
        style={{ width: 200, background: "#fff", borderRight: "1px solid #e2e8f0", flexShrink: 0 }}
      >
        <div className="mb-5 px-2">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-xs"
              style={{ background: "linear-gradient(135deg, var(--green), var(--green-dark))" }}
            >
              DF
            </div>
            <span className="text-xs font-bold text-slate-700">DietFlow</span>
          </div>
          <p className="text-[10px] text-slate-400">Exportações</p>
        </div>

        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="text-left px-3 py-2 rounded-lg text-xs font-medium transition-all"
            style={{
              background: active === tab.key ? "var(--green-light)" : "transparent",
              color: active === tab.key ? "var(--green-dark)" : "#64748b",
              borderLeft: active === tab.key ? "3px solid var(--green)" : "3px solid transparent",
              fontWeight: active === tab.key ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Documento A4 */}
      <div className="flex-1 py-8 px-8 overflow-y-auto">
        <div className="a4-page">
          <ExportHeader />
          <div className="mb-5">
            <h1 className="text-xl font-extrabold text-slate-900 mb-1">{current.title}</h1>
            <div className="h-0.5 w-12 rounded-full" style={{ background: "var(--green)" }} />
          </div>
          <Component />
          <ExportFooter docTitle={current.title} />
        </div>
      </div>
    </div>
  );
}
