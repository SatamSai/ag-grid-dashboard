import type { CustomCellRendererProps } from "ag-grid-react";

export function RatingCell({ value }: CustomCellRendererProps<number>) {
    const r = Math.max(0, Math.min(5, Number(value ?? 0)));
    const tone =
        r >= 4.5 ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
            r >= 4 ? "bg-green-100 text-green-800 border-green-200" :
                r >= 3 ? "bg-amber-100 text-amber-800 border-amber-200" :
                    "bg-rose-100 text-rose-800 border-rose-200";

    return (
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${tone}`}>
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.3 2.6 1-5.8-4.2-4.1 5.9-.9L10 1.5z" />
            </svg>
            {r.toFixed(1)}
        </span>
    );
}
