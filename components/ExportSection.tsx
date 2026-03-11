export function ExportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200 pb-2 mb-3">
        {title}
      </div>
      {children}
    </div>
  );
}
