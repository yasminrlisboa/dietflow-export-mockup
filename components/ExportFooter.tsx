import { Divider } from "@heroui/react";

export function ExportFooter({ docTitle }: { docTitle: string }) {
  return (
    <div className="mt-10 pt-4 border-t border-slate-200">
      <div className="flex justify-between text-xs text-slate-400">
        <span>11/03/2026</span>
        <span className="text-slate-400 font-medium">DietFlow · {docTitle}</span>
        <span>Página 1</span>
      </div>
    </div>
  );
}
