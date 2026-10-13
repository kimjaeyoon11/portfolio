import type { Metric } from "@/lib/projects";

// 개선 전후 수치를 실제 비율대로 막대로 보여준다.
function Bar({ value, max, tone }: { value: number; max: number; tone: "before" | "after" }) {
  const pct = Math.max((value / max) * 100, value === 0 ? 0 : 1.5);
  return (
    <div className="relative h-3 w-full bg-wash" aria-hidden="true">
      {value === 0 ? (
        <span className="absolute inset-y-0 left-0 w-[3px] bg-berry" />
      ) : (
        <span
          className={`absolute inset-y-0 left-0 ${tone === "after" ? "bg-berry" : "bg-faint/60"}`}
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  );
}

export default function MetricBars({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="mt-8 grid gap-8 sm:grid-cols-2">
      {metrics.map((m) => (
        <figure key={m.label} className="min-w-0">
          <figcaption className="text-sm font-medium text-ink">{m.label}</figcaption>
          <div className="mt-3 grid grid-cols-[2.5rem_1fr_4.5rem] items-center gap-x-3 gap-y-2 text-sm">
            <span className="text-faint">전</span>
            <Bar value={m.before} max={m.max} tone="before" />
            <span className="text-right tabular-nums text-muted">{m.beforeText}</span>
            <span className="text-faint">후</span>
            <Bar value={m.after} max={m.max} tone="after" />
            <span className="text-right font-semibold tabular-nums text-berry">{m.afterText}</span>
          </div>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-faint">{m.note}</p>
        </figure>
      ))}
    </div>
  );
}
