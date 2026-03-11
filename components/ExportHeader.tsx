import { Divider } from "@heroui/react";

export function ExportHeader() {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-start pb-4" style={{ borderBottom: "2px solid var(--green)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--green), var(--green-dark))" }}
          >
            DF
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 leading-tight">Dra. Maria Fernanda Costa</div>
            <div className="text-xs text-slate-500 mt-0.5">Nutricionista · CRN 12345/SP</div>
            <div className="text-xs text-slate-400 mt-0.5">DietFlow — Nutrição Clínica Personalizada</div>
          </div>
        </div>
        <div className="text-right text-xs text-slate-400 flex-shrink-0 max-w-[240px]">
          <div className="font-semibold text-slate-600 text-xs">Clínica NutriVida</div>
          <div className="mt-0.5">Av. Paulista, 1000 · Bela Vista</div>
          <div>São Paulo, SP · CEP 01310-100</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 px-3 py-2 bg-slate-50 rounded-lg">
        <span className="text-xs font-bold text-slate-800">Ana Silva Santos</span>
        <div className="flex gap-4 text-xs text-slate-500">
          <span><span className="font-medium text-slate-600">Idade:</span> 32 anos</span>
          <span><span className="font-medium text-slate-600">Data:</span> 11/03/2026</span>
          <span><span className="font-medium text-slate-600">Registro:</span> #00485</span>
        </div>
      </div>
    </div>
  );
}
