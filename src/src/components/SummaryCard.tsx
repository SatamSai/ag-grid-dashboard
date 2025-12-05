
const SummaryCard = ({
    title,
    value,
    color,
    subtitle,
}: {
    title: string;
    value: string | number;
    color: string;
    subtitle?: string;
}) => {
    return (
        <div
            className="relative overflow-hidden rounded-2xl p-5"
            style={{ backgroundColor: color, borderColor: "rgba(0,0,0,0.06)" }}
        >
            {/* soft gloss */}
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
                style={{ background: "white" }} />
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700">{title}</div>
                    <div className="mt-1 text-5xl font-extrabold tracking-tight text-gray-900 leading-none">
                        {value}
                    </div>
                    {subtitle && (
                        <div className="mt-2 text-xs font-medium text-gray-600">{subtitle}</div>
                    )}
                </div>

                {/* subtle pill */}
                <div className="shrink-0 rounded-full bg-white/60 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-800 border border-black/5">
                    Summary
                </div>
            </div>
        </div>
    );
}

export default SummaryCard