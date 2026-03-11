export function ExportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      {/* Padrão DietFlow: border-b cinza, título bold escuro */}
      <div className="border-b border-gray-200 pb-2 mb-3">
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );
}
