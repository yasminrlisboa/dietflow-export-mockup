export function ExportFooter({ docTitle }: { docTitle: string }) {
  return (
    <div className="mt-10 pt-5 border-t border-slate-200">
      <div className="flex justify-between items-center">
        {/* Data + documento */}
        <span className="text-xs text-slate-400">11/03/2026 · {docTitle}</span>

        {/* Logo DietFlow centralizada */}
        <div className="flex items-center gap-2">
          <svg width="20" height="19" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dfg-footer" x1="0" y1="0" x2="64" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#7B5DFF"/>
                <stop offset="1" stopColor="#29B6F6"/>
              </linearGradient>
            </defs>
            <path d="M10 12C10 7.582 13.582 4 18 4h16c4.418 0 8 3.582 8 8v1c0 1.326-.492 2.5-1.38 3.574l-6.94 8.402a4 4 0 0 0-.68 3.365l1.32 5.76a4 4 0 0 1-1.62 4.18L22 46l-8-6.5V24L10 12Z" fill="url(#dfg-footer)"/>
            <path d="M26 8h6c3.314 0 6 2.686 6 6v0c0 .94-.333 1.85-.94 2.574l-4.94 6a3 3 0 0 0-.51 2.524l.89 3.73c.36 1.5-.257 3.05-1.55 3.95L25 37l-7-5.5V18l2-6c.47-1.41 1.79-2.36 3.28-2.36H26Z" fill="white" fillOpacity="0.8"/>
          </svg>
          <span className="text-xs font-semibold text-slate-500">DietFlow</span>
        </div>

        {/* Página */}
        <span className="text-xs text-slate-400">Página 1</span>
      </div>
    </div>
  );
}
