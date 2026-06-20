import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator as CalcIcon } from "lucide-react";
import { calculators } from "../lib/calculators";

export const Route = createFileRoute("/calculators/")({
  head: () => ({
    meta: [
      { title: "Financial Calculators — SIP, EMI, FD, PPF, Tax & More | FinRupee" },
      { name: "description", content: "Browse 14+ free financial calculators: SIP, lumpsum, EMI, FD, RD, PPF, NPS, income tax, HRA, GST and more. Built for Indian investors." },
      { property: "og:title", content: "All Financial Calculators | FinRupee" },
      { property: "og:description", content: "Free SIP, EMI, FD, PPF, tax and more — instant results." },
      { property: "og:url", content: "/calculators" },
    ],
    links: [{ rel: "canonical", href: "/calculators" }],
  }),
  component: Page,
});

function Page() {
  const categories = ["Investing", "Loans", "Savings", "Tax"] as const;
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">All Financial Calculators</h1>
        <p className="mt-3 text-muted-foreground">
          Free, instant calculators for investing, loans, savings and taxes — no signup required.
        </p>
      </header>

      {categories.map((cat) => {
        const list = calculators.filter((c) => c.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="mt-10">
            <h2 className="text-xl font-bold tracking-tight text-foreground">{cat}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <Link
                  key={c.slug}
                  to="/calculators/$slug"
                  params={{ slug: c.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <CalcIcon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.short}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}