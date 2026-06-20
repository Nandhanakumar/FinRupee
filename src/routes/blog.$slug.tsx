import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPost } from "../lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.post;
    const title = p ? `${p.title} | FinRupee Blog` : "Blog | FinRupee";
    const desc = p?.excerpt ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { property: "article:published_time", content: p?.date ?? "" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: p.title,
                description: p.excerpt,
                datePublished: p.date,
                author: { "@type": "Organization", name: "FinRupee" },
                articleSection: p.category,
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to blog</Link>
    </div>
  ),
});

function Page() {
  const { post } = Route.useLoaderData();
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>
      <header className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-primary">{post.category}</div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </time>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
      </header>
      <div className="mt-8 max-w-none">
        {post.content.map((para: string, i: number) => (
          <p key={i} className="mt-5 text-base leading-relaxed text-foreground/90">
            {para}
          </p>
        ))}
      </div>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="text-xl font-bold text-foreground">Keep reading</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/blog/$slug"
              params={{ slug: r.slug }}
              className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/40"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">{r.category}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{r.title}</div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}