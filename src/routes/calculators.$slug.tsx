import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, HelpCircle, ListChecks, Calculator as CalcIcon } from "lucide-react";
import { calculators, getCalculator, type Calculator } from "../lib/calculators";
import { CalculatorView } from "../components/CalculatorView";

// Category-specific evergreen FAQs appended to each calculator's own FAQs.
const CATEGORY_FAQS: Record<Calculator["category"], { q: string; a: string }[]> = {
  Investing: [
    { q: "Are the returns shown guaranteed?", a: "No. Investment calculators use an assumed rate of return for projection only. Actual market returns vary year to year and are not guaranteed." },
    { q: "Should I adjust for inflation?", a: "Yes. To see real purchasing power, subtract expected inflation (typically 5–6% in India) from your expected return before projecting." },
  ],
  Loans: [
    { q: "Does the EMI include processing fees or insurance?", a: "No. The calculator shows only principal + interest. Lenders may add one-time processing fees, GST, and optional insurance separately." },
    { q: "Can I reduce my interest outgo?", a: "Yes — choose a shorter tenure, make periodic prepayments, or refinance to a lower rate when market rates fall." },
  ],
  Tax: [
    { q: "Is this an official tax computation?", a: "No. This tool gives an indicative estimate based on standard slab rates. Please confirm your exact liability with a chartered accountant or the Income Tax portal before filing." },
    { q: "Does it include surcharge and cess?", a: "Health & Education cess at 4% is included. Surcharge for incomes above ₹50 lakh is not auto-applied and should be added separately." },
  ],
  Savings: [
    { q: "How often is interest compounded?", a: "Most Indian bank fixed and recurring deposits compound interest quarterly. This calculator uses that convention by default." },
    { q: "Is the interest taxable?", a: "Yes — interest on FDs and RDs is added to your taxable income and taxed at your slab rate. TDS is deducted above the annual threshold." },
  ],
};

function howToSteps(calc: Calculator) {
  return [
    `Enter your ${calc.fields[0].label.toLowerCase()} in the first field${calc.fields[0].suffix ? ` (in ${calc.fields[0].suffix.trim()})` : ""}.`,
    ...calc.fields.slice(1).map((f) => `Adjust the ${f.label.toLowerCase()} slider${f.suffix ? ` to set the ${f.suffix.trim().replace(/[()]/g, "")}` : ""}.`),
    `Read the ${calc.compute(Object.fromEntries(calc.fields.map((f) => [f.name, f.default]))).primary.label.toLowerCase()} and full breakdown instantly — no signup required.`,
  ];
}

export const Route = createFileRoute("/calculators/$slug")({
  loader: ({ params }) => {
    const calc = getCalculator(params.slug);
    if (!calc) throw notFound();
    return { calc };
  },
  head: ({ params, loaderData }) => {
    const c = loaderData?.calc;
    const title = c
      ? `${c.name} Online — Free ${c.short} | FinRupee`
      : "Calculator | FinRupee";
    const desc = c
      ? `${c.description} Free, instant ${c.name.toLowerCase()} with step-by-step breakdown and FAQs for Indian investors.`
      : "";
    const allFaqs = c ? [...c.faqs, ...CATEGORY_FAQS[c.category]] : [];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: c ? `${c.name.toLowerCase()}, ${c.name.toLowerCase()} online, ${c.category.toLowerCase()} calculator india, ${c.slug} calculator` : "" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/calculators/${params.slug}` },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/calculators/${params.slug}` }],
      scripts: c
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: allFaqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: `How to use the ${c.name}`,
                description: c.description,
                step: howToSteps(c).map((s, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: `Step ${i + 1}`,
                  text: s,
                })),
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "/calculators" },
                  { "@type": "ListItem", position: 3, name: c.name, item: `/calculators/${params.slug}` },
                ],
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
  const steps = howToSteps(calc);
  const allFaqs = [...calc.faqs, ...CATEGORY_FAQS[calc.category]];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link to="/calculators" className="hover:text-primary">Calculators</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground" aria-current="page">{calc.name}</li>
        </ol>
      </nav>
      <Link to="/calculators" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
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

      <section className="mt-14 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-primary">
            <ListChecks className="h-5 w-5" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">How to use the {calc.name}</h2>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 text-primary">
            <CalcIcon className="h-5 w-5" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">What this {calc.name.toLowerCase()} calculates</h2>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{calc.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {calc.fields.map((f) => (
              <li key={f.name}>
                <span className="font-semibold text-foreground">{f.label}</span>
                {f.suffix ? <> — entered in <span className="font-mono">{f.suffix.trim()}</span></> : null}
                , ranging from {f.min.toLocaleString("en-IN")} to {f.max.toLocaleString("en-IN")}.
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-14 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <HelpCircle className="h-5 w-5" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {calc.name} — Frequently asked questions
            </h2>
          </div>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {allFaqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground sm:text-base">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <h2 className="text-lg font-bold tracking-tight text-foreground">Learn more about {calc.category.toLowerCase()}</h2>
            </div>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <li>
                <Link to="/blog" className="text-primary hover:underline">Read finance guides on the blog →</Link>
              </li>
              <li>
                <Link to="/qa" className="text-primary hover:underline">Browse money Q&A →</Link>
              </li>
              <li>
                <Link to="/calculators" className="text-primary hover:underline">All financial calculators →</Link>
              </li>
              <li>
                <Link to="/about" className="text-primary hover:underline">About FinRupee →</Link>
              </li>
            </ul>
          </div>
        </div>
        <aside>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Related {calc.category.toLowerCase()} calculators</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/calculators/$slug"
                  params={{ slug: r.slug }}
                  className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40"
                >
                  <div className="font-semibold">{r.name}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{r.short}</div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}