import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calculator as CalcIcon, MessageSquare, Sparkles } from "lucide-react";
import { calculators } from "../lib/calculators";
import { blogPosts } from "../lib/blog-data";
import { qas } from "../lib/qa-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinGrove — Free Financial Calculators, Investing Blog & Money Q&A" },
      {
        name: "description",
        content:
          "Free SIP, EMI, FD, PPF, NPS, income tax & 11 more calculators. Read investing guides and get expert answers to money questions — built for Indian investors.",
      },
      { name: "keywords", content: "SIP calculator, EMI calculator, FD calculator, PPF, NPS, income tax calculator, mutual funds India, personal finance" },
      { property: "og:title", content: "FinGrove — Calculators, Blog & Q&A for Indian Investors" },
      { property: "og:description", content: "14+ free financial calculators with finance blog and money Q&A." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const popular = calculators.slice(0, 8);
  return (
    <>
      <section className="relative overflow-hidden" style={{ backgroundImage: "var(--gradient-soft)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              14 calculators · finance blog · expert Q&A
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Smarter money decisions, <span className="text-primary">in seconds.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              FinGrove gives you free SIP, EMI, FD, tax and retirement calculators alongside
              honest investing guides and answers to the money questions Indians actually ask.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/calculators"
                className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                Explore calculators <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
              >
                Read the blog
              </Link>
            </div>
            <div className="mt-8 flex gap-8 text-sm">
              <Stat n="14+" label="Calculators" />
              <Stat n="6" label="Guides" />
              <Stat n="8" label="Q&A answered" />
            </div>
          </div>

          <div className="relative">
            <div
              className="rounded-3xl p-6 text-primary-foreground shadow-[var(--shadow-soft)] sm:p-8"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              <div className="text-sm uppercase tracking-wide opacity-85">If you invest</div>
              <div className="mt-1 text-2xl font-bold">₹10,000 / month for 20 years</div>
              <div className="mt-6 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-wide opacity-90">Estimated value @ 12%</div>
                <div className="mt-1 text-4xl font-extrabold">₹98.9 L</div>
                <div className="mt-3 flex justify-between text-sm opacity-90">
                  <span>Invested ₹24 L</span><span>Gained ₹74.9 L</span>
                </div>
              </div>
              <Link
                to="/calculators/$slug"
                params={{ slug: "sip" }}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/25"
              >
                Open SIP calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Popular calculators</h2>
            <p className="mt-2 text-muted-foreground">Plan investments, loans, savings and taxes in seconds.</p>
          </div>
          <Link to="/calculators" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
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
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                Calculate <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-primary" /> From the blog
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Money guides, no jargon.</h2>
            <p className="mt-2 text-muted-foreground">Practical reads on investing, taxes and personal finance.</p>
            <ul className="mt-6 space-y-3">
              {blogPosts.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary/40"
                  >
                    <div className="text-xs font-medium uppercase tracking-wide text-primary">{p.category}</div>
                    <div className="mt-1 font-semibold text-foreground">{p.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5 text-primary" /> Money Q&A
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Real questions, clear answers.</h2>
            <p className="mt-2 text-muted-foreground">Quick takes on the money questions Indians actually ask.</p>
            <ul className="mt-6 space-y-3">
              {qas.slice(0, 4).map((q) => (
                <li key={q.slug}>
                  <Link
                    to="/qa/$slug"
                    params={{ slug: q.slug }}
                    className="block rounded-xl border border-border bg-card p-4 transition hover:border-primary/40"
                  >
                    <div className="text-xs font-medium uppercase tracking-wide text-primary">{q.category}</div>
                    <div className="mt-1 font-semibold text-foreground">{q.question}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-foreground">{n}</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
