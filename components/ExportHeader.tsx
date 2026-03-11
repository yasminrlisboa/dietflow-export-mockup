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
            {/* labelLarge — 14px/500 */}
            <div className="text-sm font-semibold text-slate-900 leading-tight">Dra. Maria Fernanda Costa</div>
            {/* bodySmall — 12px */}
            <div className="text-xs text-slate-500 mt-0.5">Nutricionista · CRN 12345/SP</div>
            <div className="text-xs text-slate-400 mt-0.5">DietFlow — Nutrição Clínica Personalizada</div>
          </div>
        </div>
        <div className="text-right flex-shrink-0 max-w-[240px]">
          <div className="text-xs font-semibold text-slate-600">Clínica NutriVida</div>
          <div className="text-xs text-slate-400 mt-0.5">Av. Paulista, 1000 · Bela Vista</div>
          <div className="text-xs text-slate-400">São Paulo, SP · CEP 01310-100</div>
        </div>
      </div>
      {/* Patient bar — slate-50, como era antes */}
      <div className="flex items-center justify-between mt-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100">
        <span className="text-sm font-semibold text-slate-800">Ana Silva Santos</span>
        <div className="flex gap-4">
          <span className="text-xs text-slate-500"><span className="font-medium text-slate-600">Idade:</span> 32 anos</span>
          <span className="text-xs text-slate-500"><span className="font-medium text-slate-600">Telefone:</span> (11) 99876-5432</span>
          <span className="text-xs text-slate-500"><span className="font-medium text-slate-600">Data:</span> 11/03/2026</span>
        </div>
      </div>
    </div>
  );
}
