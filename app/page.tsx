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
  { key: "plano",         label: "Plano Alimentar",         icon: "🥗", title: "Plano Alimentar",         Component: PlanoAlimentarTab },
  { key: "resultados",    label: "Resultados de Exames",    icon: "🧪", title: "Resultados de Exames",    Component: ResultadosExamesTab },
  { key: "presc-exames",  label: "Prescrição de Exames",    icon: "📋", title: "Prescrição de Exames",    Component: PrescricaoExamesTab },
  { key: "suplementos",   label: "Suplementos",             icon: "💊", title: "Prescrição de Suplementos", Component: PrescricaoSuplementosTab },
  { key: "anamnese",      label: "Anamnese",                icon: "📝", title: "Anamnese",                Component: AnamneseTab },
  { key: "calculo",       label: "Cálculo Energético",      icon: "⚡", title: "Cálculo Energético",      Component: CalculoTab },
  { key: "antropometria", label: "Antropometria",           icon: "📐", title: "Antropometria",           Component: AntropometriaTab },
  { key: "evolucao",      label: "Evolução",                icon: "📈", title: "Evolução do Paciente",    Component: EvolucaoTab },
];

export default function Home() {
  const [active, setActive] = useState("plano");
  const current = TABS.find(t => t.key === active)!;
  const { Component } = current;

  return (
    <div className="min-h-screen flex" style={{ background: "#dde3ea" }}>

      {/* ── Sidebar ── */}
      <div
        className="flex flex-col sticky top-0 h-screen overflow-y-auto"
        style={{ width: 210, background: "#fff", borderRight: "1px solid #e2e8f0", flexShrink: 0 }}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-extrabold text-sm"
              style={{ background: "linear-gradient(135deg, var(--green), var(--green-dark))" }}
            >
              DF
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">DietFlow</div>
              <div className="text-[10px]" style={{ color: "var(--green-dark)" }}>Exportações</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-0.5 p-3 flex-1">
          {TABS.map(tab => {
            const isActive = active === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className="text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2.5"
                style={{
                  background: isActive ? "var(--green-light)" : "transparent",
                  color: isActive ? "var(--green-dark)" : "#64748b",
                  fontWeight: isActive ? 600 : 400,
                  boxShadow: isActive ? "inset 3px 0 0 var(--green)" : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Rodapé sidebar */}
        <div className="px-4 py-4 border-t border-slate-100">
          <div className="text-[10px] text-slate-400">Ana Silva Santos</div>
          <div className="text-[10px] text-slate-300">Registro #00485</div>
        </div>
      </div>

      {/* ── Documento A4 ── */}
      <div className="flex-1 py-10 px-10 overflow-y-auto">
        <div className="a4-page">
          <ExportHeader />
          {/* Título do documento */}
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl">{current.icon}</span>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight">{current.title}</h1>
              <div className="h-0.5 w-10 rounded-full mt-1" style={{ background: "var(--green)" }} />
            </div>
          </div>
          <Component />
          <ExportFooter docTitle={current.title} />
        </div>
      </div>
    </div>
  );
}
