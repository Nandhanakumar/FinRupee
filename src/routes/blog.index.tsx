import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "../lib/blog-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Finance Blog — Investing, Tax & Personal Finance Guides | FinRupee" },
      { name: "description", content: "Practical, jargon-free articles on mutual funds, tax planning, home loans, PPF, credit scores and personal finance for Indian investors." },
      { property: "og:title", content: "FinRupee Finance Blog" },
      { property: "og:description", content: "Honest investing and personal finance guides." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Finance Blog</h1>
        <p className="mt-3 text-muted-foreground">Investing, tax and personal finance — without the jargon.</p>
      </header>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-primary">{p.category}</div>
            <h2 className="mt-2 text-lg font-bold tracking-tight text-foreground">{p.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
            <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time>
              <span>·</span>
              <span>{p.readMinutes} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}