export type QA = {
  slug: string;
  question: string;
  answer: string[];
  category: string;
};

export const qas: QA[] = [
  {
    slug: "how-much-should-i-invest-in-sip",
    question: "How much should I invest in SIP every month?",
    category: "Mutual Funds",
    answer: [
      "A common framework is the 50/30/20 rule: 50% of take-home for needs, 30% for wants, 20% for savings & investments. Of that 20%, at least three-quarters should flow into long-term investments like equity SIPs once your emergency fund is in place.",
      "If you're starting late, push the savings rate towards 30–35% of take-home. Use the SIP Calculator to back-solve the monthly amount needed for your goal corpus.",
    ],
  },
  {
    slug: "is-fd-better-than-mutual-fund",
    question: "Is FD better than mutual funds?",
    category: "Savings",
    answer: [
      "They solve different problems. FDs offer capital protection and predictable, but fully taxable, returns — ideal for short-term goals or emergency reserves.",
      "Equity mutual funds carry market risk but have historically delivered 11–13% CAGR over long horizons, comfortably beating inflation and FD returns post-tax. For goals more than 5–7 years away, equity funds usually win.",
    ],
  },
  {
    slug: "best-tax-saving-investment",
    question: "Which is the best tax-saving investment under 80C?",
    category: "Tax",
    answer: [
      "ELSS mutual funds offer the shortest lock-in (3 years) and equity-like returns, making them the most efficient choice for younger investors.",
      "PPF suits conservative investors who want guaranteed, tax-free returns over 15 years. NPS adds an extra ₹50,000 deduction under 80CCD(1B) — useful once 80C is full.",
      "Avoid stuffing 80C with low-yield endowment policies just for the deduction.",
    ],
  },
  {
    slug: "how-to-pick-mutual-fund",
    question: "How do I pick a good mutual fund?",
    category: "Mutual Funds",
    answer: [
      "Start with the category that matches your goal and risk appetite — large-cap index funds for first-time investors, flexi-cap or mid-cap for higher risk-tolerance.",
      "Check 5-year and 10-year rolling returns vs the benchmark, not just last year's chart-topper. Look at expense ratio (lower is better) and fund manager tenure (consistency matters).",
      "Stick to 3–4 funds across categories. More funds rarely add diversification — they just add overlap.",
    ],
  },
  {
    slug: "emergency-fund-or-invest",
    question: "Should I build an emergency fund before investing?",
    category: "Personal Finance",
    answer: [
      "Yes. Without a buffer, the first medical or job emergency forces you to redeem investments — often at the worst time. Build 3–6 months of essential expenses in a liquid fund or sweep-in FD before starting equity SIPs.",
    ],
  },
  {
    slug: "home-loan-tenure",
    question: "What's the right home loan tenure?",
    category: "Loans",
    answer: [
      "Pick the shortest tenure whose EMI fits comfortably in your budget — under 35–40% of take-home. Longer tenures reduce EMI but multiply total interest dramatically.",
      "A common compromise: take a 20-year tenure for headroom, then prepay 5–10% of outstanding principal each year to effectively close it in 12–14 years.",
    ],
  },
  {
    slug: "how-much-life-insurance",
    question: "How much life insurance do I need?",
    category: "Insurance",
    answer: [
      "Aim for term cover of 10–15× your annual income, plus outstanding loans and the future cost of large goals (children's education).",
      "Always buy pure term — not endowment or ULIP. Term plans are 10× cheaper and pay out properly when needed. Investment and insurance should stay separate.",
    ],
  },
  {
    slug: "stock-market-beginner",
    question: "How do I start investing in the stock market as a beginner?",
    category: "Investing",
    answer: [
      "Open a demat account with any SEBI-registered broker. For your first 2–3 years, focus on index funds (Nifty 50, Nifty Next 50) via SIP — they remove the burden of stock-picking while you learn.",
      "Once you're comfortable, allocate up to 10–15% of your equity portfolio to direct stocks. Never start with derivatives, F&O or intraday — that's how most retail investors lose money.",
    ],
  },
];

export const getQA = (slug: string) => qas.find((q) => q.slug === slug);