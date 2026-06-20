import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { calculators, getCalculator } from "../lib/calculators";
import { CalculatorView } from "../components/CalculatorView";

export const Route = createFileRoute("/calculators/$slug")({
  loader: ({ params }) => {
    const calc = getCalculator(params.slug);
    if (!calc) throw notFound();
    return { calc };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData?.calc;
    const title = c ? `${c.name} — Free Online ${c.name} | FinGrove` : "Calculator | FinGrove";
    const desc = c ? `${c.description} Free, instant ${c.name.toLowerCase()} for Indian investors.` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/calculators/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/calculators/${params.slug}` }],
      scripts: c
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: c.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Calculator not found</h1>
      <Link to="/calculators" className="mt-4 inline-block text-primary hover:underline">Browse all calculators</Link>
    </div>
  ),
});

function Page() {
  const { calc } = Route.useLoaderData();
  const related = calculators.filter((c) => c.category === calc.category && c.slug !== calc.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to="/calculators" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All calculators
      </Link>
      <header className="mt-4 max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">{calc.category}</div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{calc.name}</h1>
        <p className="mt-3 text-muted-foreground">{calc.description}</p>
      </header>

      <div className="mt-8">
        <CalculatorView calc={calc} />
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Frequently asked questions</h2>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {calc.faqs.map((f: { q: string; a: string }) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground sm:text-base">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Related calculators</h3>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/calculators/$slug"
                  params={{ slug: r.slug }}
                  className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}