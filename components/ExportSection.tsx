export function ExportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--green-dark)" }}>
          {title}
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, #e2e8f0, transparent)" }} />
      </div>
      {children}
    </div>
  );
}
