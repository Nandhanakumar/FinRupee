import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { qas, getQA } from "../lib/qa-data";

export const Route = createFileRoute("/qa/$slug")({
  loader: ({ params }) => {
    const qa = getQA(params.slug);
    if (!qa) throw notFound();
    return { qa };
  },
  head: ({ params, loaderData }) => {
    const q = loaderData?.qa;
    const title = q ? `${q.question} | FinGrove Q&A` : "Q&A | FinGrove";
    const desc = q ? q.answer[0] : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: `/qa/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/qa/${params.slug}` }],
      scripts: q
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "QAPage",
                mainEntity: {
                  "@type": "Question",
                  name: q.question,
                  acceptedAnswer: { "@type": "Answer", text: q.answer.join(" ") },
                },
              }),
            },
          ]
        : [],
    };
  },
  component: Page,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Question not found</h1>
      <Link to="/qa" className="mt-4 inline-block text-primary hover:underline">Browse all Q&A</Link>
    </div>
  ),
});

function Page() {
  const { qa } = Route.useLoaderData();
  const related = qas.filter((q) => q.slug !== qa.slug).slice(0, 4);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link to="/qa" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All questions
      </Link>
      <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-primary">{qa.category}</div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{qa.question}</h1>
      <div className="mt-6 space-y-4">
        {qa.answer.map((p: string, i: number) => (
          <p key={i} className="text-base leading-relaxed text-foreground/90">{p}</p>
        ))}
      </div>

      <section className="mt-14 border-t border-border pt-10">
        <h2 className="text-xl font-bold text-foreground">Related questions</h2>
        <ul className="mt-4 space-y-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                to="/qa/$slug"
                params={{ slug: r.slug }}
                className="block rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary/40"
              >
                {r.question}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}