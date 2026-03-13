export function ExportHeader() {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start pb-5" style={{ borderBottom: "2px solid var(--green)" }}>
        {/* Esquerda: logo + info do profissional */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--green), var(--green-dark))" }}
          >
            DF
          </div>
          <div>
            <div className="text-base font-bold text-slate-900 leading-snug">Dra. Maria Fernanda Costa</div>
            <div className="text-sm text-slate-500 mt-1">Nutricionista · CRN 12345/SP</div>
            <div className="text-xs text-slate-400 mt-0.5">DietFlow — Nutrição Clínica Personalizada</div>
          </div>
        </div>

        {/* Direita: clínica + endereço */}
        <div className="text-right flex-shrink-0 max-w-[260px] pt-1">
          <div className="text-sm font-semibold text-slate-700">Clínica NutriVida</div>
          <div className="text-xs text-slate-400 mt-1 leading-relaxed">
            Av. Paulista, 1000 · Bela Vista<br />
            São Paulo, SP · CEP 01310-100
          </div>
        </div>
      </div>

      {/* Patient bar */}
      <div className="flex items-center justify-between mt-4 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
        <span className="text-sm font-semibold text-slate-800">Ana Silva Santos</span>
        <div className="flex gap-5">
          <span className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">Idade:</span> 32 anos
          </span>
          <span className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">Telefone:</span> (11) 99876-5432
          </span>
          <span className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">Data:</span> 11/03/2026
          </span>
        </div>
      </div>
    </div>
  );
}
