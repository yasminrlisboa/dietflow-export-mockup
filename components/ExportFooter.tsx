export function ExportFooter({ docTitle }: { docTitle: string }) {
  return (
    <div className="mt-10 pt-5 border-t border-slate-200">
      <div className="flex justify-between items-center">
        {/* Data + documento */}
        <span className="text-xs text-slate-400">11/03/2026 · {docTitle}</span>

        {/* DietFlow centralizado */}
        <span className="text-xs font-semibold text-slate-400">DietFlow</span>

        {/* Página */}
        <span className="text-xs text-slate-400">Página 1</span>
      </div>
    </div>
  );
}
