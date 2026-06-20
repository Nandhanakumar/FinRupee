import { useMemo, useState } from "react";
import type { Calculator } from "../lib/calculators";

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export function CalculatorView({ calc }: { calc: Calculator }) {
  const initial = useMemo(() => {
    const init: Record<string, number> = {};
    calc.fields.forEach((f) => (init[f.name] = f.default));
    return init;
  }, [calc]);
  const [values, setValues] = useState<Record<string, number>>(initial);

  const result = calc.compute(values);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
        <div className="space-y-6">
          {calc.fields.map((f) => (
            <div key={f.name}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor={f.name} className="text-sm font-medium text-foreground">
                  {f.label}
                </label>
                <div className="flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1 text-sm font-semibold text-accent-foreground">
                  {f.suffix === "₹" && <span>₹</span>}
                  <input
                    id={f.name}
                    type="number"
                    className="w-24 bg-transparent text-right outline-none sm:w-28"
                    value={values[f.name]}
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setValues((prev) => ({ ...prev, [f.name]: isNaN(v) ? 0 : v }));
                    }}
                  />
                  {f.suffix && f.suffix !== "₹" && <span>{f.suffix}</span>}
                </div>
              </div>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={values[f.name]}
                onChange={(e) => setValues((p) => ({ ...p, [f.name]: Number(e.target.value) }))}
                className="w-full accent-[color:var(--primary)]"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>{f.suffix === "₹" ? `₹${formatINR(f.min)}` : f.min}</span>
                <span>{f.suffix === "₹" ? `₹${formatINR(f.max)}` : f.max}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-2xl p-6 text-primary-foreground shadow-[var(--shadow-soft)] sm:p-8"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="text-sm uppercase tracking-wide opacity-85">{result.primary.label}</div>
        <div className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          ₹{formatINR(result.primary.value)}
        </div>
        <div className="mt-6 space-y-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          {result.breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between gap-3 text-sm">
              <span className="opacity-90">{b.label}</span>
              <span className="font-semibold">₹{formatINR(b.value)}</span>
            </div>
          ))}
        </div>
        {result.note && <p className="mt-4 text-xs opacity-80">{result.note}</p>}
      </div>
    </div>
  );
}