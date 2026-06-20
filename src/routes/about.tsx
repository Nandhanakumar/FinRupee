import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FinRupee — Free Finance Calculators for India" },
      { name: "description", content: "FinRupee is a free toolkit of financial calculators, investing guides and money Q&A built for Indian investors. Learn what we do and why." },
      { property: "og:title", content: "About FinRupee" },
      { property: "og:description", content: "Free calculators, investing guides and Q&A for Indian investors." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">About FinRupee</h1>
      <p className="mt-5 text-lg text-muted-foreground">
        FinRupee is a free toolkit for Indian investors — 14+ financial calculators, plain-English guides and
        answers to the money questions that matter most.
      </p>
      <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90">
        <p>
          We built FinRupee because most "money" sites are either trying to sell you a product or drown
          you in jargon. We do neither. Every calculator runs entirely in your browser — your numbers
          never leave your device — and every article is written to give you a clear answer, not a sales pitch.
        </p>
        <p>
          Use the SIP, lumpsum and SWP calculators to plan investments. Use the EMI, home and car loan
          calculators to decide what you can borrow. Use the FD, RD, PPF and NPS calculators to model
          your savings. Use the income tax, HRA and GST calculators to estimate your liability.
        </p>
        <p>
          The blog covers practical decisions: SIP vs lumpsum, new vs old tax regime, whether to prepay
          a home loan, and how much emergency fund you actually need. The Q&A section answers the
          questions readers send us — directly.
        </p>
        <p className="text-sm text-muted-foreground">
          FinRupee is informational. We are not SEBI-registered investment advisors. Please consult a
          qualified financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}