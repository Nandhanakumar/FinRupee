export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  category: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "sip-vs-lumpsum-which-is-better",
    title: "SIP vs Lumpsum: Which One Builds More Wealth?",
    excerpt:
      "SIPs reduce timing risk and instil discipline. Lumpsums can pay off when markets are clearly cheap. Here's how to decide.",
    date: "2025-02-14",
    readMinutes: 6,
    category: "Mutual Funds",
    content: [
      "Most investors agonise over whether to invest a windfall as a lumpsum or stagger it through a SIP. The honest answer: both work, but the right choice depends on valuation, your behaviour, and your time horizon.",
      "A SIP averages your purchase price across market levels. If markets drop after you start, you accumulate more units. That mathematical cushion is the reason SIPs reduce regret — and regret is what causes most investors to abandon plans mid-cycle.",
      "A lumpsum, by contrast, puts every rupee to work immediately. Over a 10-year horizon a lumpsum invested at an average price typically beats a SIP because the money is invested for longer.",
      "Rule of thumb: if you have a windfall and markets look reasonably valued, split it into 6 monthly tranches (a 'STP'). If you only have monthly surplus, a SIP is the natural choice. Either way, the most important factor is staying invested through cycles.",
    ],
  },
  {
    slug: "emergency-fund-how-much",
    title: "How Much Should Your Emergency Fund Actually Be?",
    excerpt:
      "The standard 3–6 months rule is too simplistic. Here's a sharper way to size your emergency fund based on income stability and dependants.",
    date: "2025-01-30",
    readMinutes: 5,
    category: "Personal Finance",
    content: [
      "An emergency fund is the foundation of every financial plan. Without it, every investment becomes a hostage to the next medical bill or job change.",
      "Salaried with stable employment and no dependants: 3 months of essential expenses. Salaried with dependants or a single-income household: 6 months. Self-employed or commission-based: 9–12 months.",
      "Keep the corpus in a sweep-in FD or a liquid fund. The goal is access within 24 hours, not high returns. Do not chase yield with this money.",
      "Recalibrate annually. Every salary hike or new dependant changes the required size of your buffer.",
    ],
  },
  {
    slug: "new-vs-old-tax-regime",
    title: "New vs Old Tax Regime: A Calculator-Based Comparison",
    excerpt:
      "Which regime saves you more depends on your deductions. Use this framework to figure it out in five minutes.",
    date: "2025-01-12",
    readMinutes: 7,
    category: "Tax",
    content: [
      "The New Tax Regime offers lower slab rates but strips away most deductions (80C, 80D, HRA, LTA, home-loan interest on self-occupied property). The Old Regime keeps the deductions but charges higher slab rates.",
      "Rough breakeven: if your total deductions exceed roughly ₹3.75 lakh, the Old Regime is usually better. Below that, the New Regime tends to win.",
      "Use FinGrove's Income Tax Calculator to compare both scenarios with your real numbers before opting in. Salaried employees can switch regimes every financial year; business income earners cannot.",
    ],
  },
  {
    slug: "home-loan-prepayment-strategy",
    title: "Should You Prepay Your Home Loan or Invest Instead?",
    excerpt:
      "Compare your effective post-tax loan rate against your realistic investment return. The decision becomes obvious.",
    date: "2024-12-22",
    readMinutes: 6,
    category: "Loans",
    content: [
      "A home loan at 8.5% nominal often has a real post-tax cost closer to 6–6.5% after Section 24 and 80C benefits — so the bar to beat with investments is lower than the sticker rate.",
      "If your equity portfolio realistically returns 11–12% pre-tax over the long run, investing wins. If you're conservative and largely hold debt instruments, prepaying may give a guaranteed, tax-free 'return' equal to your loan rate.",
      "A balanced approach: prepay 1 extra EMI per year while continuing equity SIPs. You shorten the tenure and still compound.",
    ],
  },
  {
    slug: "ppf-still-worth-it",
    title: "Is PPF Still a Smart Investment in 2025?",
    excerpt:
      "PPF's 7.1% tax-free return is equivalent to over 10% pre-tax for someone in the 30% slab. Here's where it fits.",
    date: "2024-11-18",
    readMinutes: 5,
    category: "Savings",
    content: [
      "PPF carries EEE tax status — contributions deductible under 80C, interest tax-free, maturity tax-free. For investors in the 30% slab, the 7.1% rate is equivalent to ~10.3% pre-tax.",
      "The 15-year lock-in is a feature, not a bug. It enforces discipline for goals like a child's education or down payment.",
      "Use PPF as the 'debt' part of your portfolio. Pair it with equity mutual funds via SIP for growth. Avoid putting your entire 80C limit in PPF if you also need ELSS or NPS exposure.",
    ],
  },
  {
    slug: "credit-score-fundamentals",
    title: "Five Habits That Quietly Raise Your Credit Score",
    excerpt:
      "Your CIBIL score decides your loan rate. These five low-effort habits move it the most.",
    date: "2024-10-05",
    readMinutes: 4,
    category: "Personal Finance",
    content: [
      "Keep credit-card utilisation under 30% of your limit. High utilisation is the fastest score killer.",
      "Never miss an EMI or credit-card due date. Set autopay on minimum dues as a safety net.",
      "Keep your oldest credit card active. Credit history length contributes meaningfully to your score.",
      "Avoid applying for multiple loans simultaneously — each hard enquiry shaves off a few points.",
      "Check your free credit report annually and dispute any errors. Wrong defaults can drag your score for years.",
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);