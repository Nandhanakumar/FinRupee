import { createFileRoute, Link } from "@tanstack/react-router";
import { qas } from "../lib/qa-data";

export const Route = createFileRoute("/qa/")({
  head: () => ({
    meta: [
      { title: "Money Q&A — Personal Finance Questions Answered | FinGrove" },
      { name: "description", content: "Clear, expert-style answers to the most common money questions Indians ask — SIPs, FDs, taxes, home loans, insurance and more." },
      { property: "og:title", content: "FinGrove Money Q&A" },
      { property: "og:description", content: "Real questions, clear answers about personal finance in India." },
      { property: "og:url", content: "/qa" },
    ],
    links: [{ rel: "canonical", href: "/qa" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Money Q&A</h1>
        <p className="mt-3 text-muted-foreground">
          Quick, honest answers to the personal finance questions Indians actually ask.
        </p>
      </header>
      <div className="mt-10 space-y-3">
        {qas.map((q) => (
          <Link
            key={q.slug}
            to="/qa/$slug"
            params={{ slug: q.slug }}
            className="block rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:border-primary/40"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">{q.category}</div>
            <h2 className="mt-1 text-base font-semibold text-foreground sm:text-lg">{q.question}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}