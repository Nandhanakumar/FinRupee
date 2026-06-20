export type CalculatorField = {
  name: string;
  label: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

export type CalcResult = {
  primary: { label: string; value: number };
  breakdown: { label: string; value: number }[];
  note?: string;
};

export type Calculator = {
  slug: string;
  name: string;
  short: string;
  description: string;
  category: "Investing" | "Loans" | "Tax" | "Savings";
  fields: CalculatorField[];
  compute: (values: Record<string, number>) => CalcResult;
  faqs: { q: string; a: string }[];
};

const inr = (n: number) => Math.round(n);

// Future value of a SIP: FV = P * [((1+i)^n - 1) / i] * (1+i)
function sipFV(monthly: number, annualRate: number, years: number) {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

function lumpsumFV(principal: number, annualRate: number, years: number) {
  return principal * Math.pow(1 + annualRate / 100, years);
}

function emiCalc(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return { emi: principal / n, total: principal, interest: 0 };
  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  return { emi, total, interest: total - principal };
}

export const calculators: Calculator[] = [
  {
    slug: "sip",
    name: "SIP Calculator",
    short: "Project mutual fund SIP returns",
    description:
      "Estimate the future value of a monthly Systematic Investment Plan (SIP) in mutual funds at an assumed annual return.",
    category: "Investing",
    fields: [
      { name: "monthly", label: "Monthly investment", suffix: "₹", min: 500, max: 200000, step: 500, default: 10000 },
      { name: "rate", label: "Expected return", suffix: "% p.a.", min: 1, max: 30, step: 0.5, default: 12 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 40, step: 1, default: 10 },
    ],
    compute: ({ monthly, rate, years }) => {
      const fv = sipFV(monthly, rate, years);
      const invested = monthly * years * 12;
      return {
        primary: { label: "Estimated value", value: inr(fv) },
        breakdown: [
          { label: "Invested amount", value: inr(invested) },
          { label: "Wealth gained", value: inr(fv - invested) },
        ],
      };
    },
    faqs: [
      { q: "What is a SIP?", a: "A Systematic Investment Plan lets you invest a fixed amount in a mutual fund every month, helping you average out market volatility." },
      { q: "Is SIP better than lumpsum?", a: "SIPs reduce timing risk and build discipline; lumpsums can outperform when markets are clearly undervalued." },
    ],
  },
  {
    slug: "lumpsum",
    name: "Lumpsum Calculator",
    short: "Grow a one-time investment",
    description: "Calculate how a single one-time investment compounds over time at an assumed annual return.",
    category: "Investing",
    fields: [
      { name: "principal", label: "Total investment", suffix: "₹", min: 1000, max: 10000000, step: 1000, default: 100000 },
      { name: "rate", label: "Expected return", suffix: "% p.a.", min: 1, max: 30, step: 0.5, default: 12 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 40, step: 1, default: 10 },
    ],
    compute: ({ principal, rate, years }) => {
      const fv = lumpsumFV(principal, rate, years);
      return {
        primary: { label: "Estimated value", value: inr(fv) },
        breakdown: [
          { label: "Invested amount", value: inr(principal) },
          { label: "Wealth gained", value: inr(fv - principal) },
        ],
      };
    },
    faqs: [
      { q: "When does a lumpsum make sense?", a: "When you have surplus capital and a long horizon, lumpsum investing avoids the cash-drag of staggered entries." },
    ],
  },
  {
    slug: "swp",
    name: "SWP Calculator",
    short: "Plan systematic withdrawals",
    description: "See how long a corpus lasts when you withdraw a fixed monthly amount while the balance keeps growing.",
    category: "Investing",
    fields: [
      { name: "corpus", label: "Total investment", suffix: "₹", min: 10000, max: 100000000, step: 10000, default: 1000000 },
      { name: "withdrawal", label: "Monthly withdrawal", suffix: "₹", min: 500, max: 1000000, step: 500, default: 10000 },
      { name: "rate", label: "Expected return", suffix: "% p.a.", min: 1, max: 20, step: 0.5, default: 8 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 40, step: 1, default: 10 },
    ],
    compute: ({ corpus, withdrawal, rate, years }) => {
      const i = rate / 12 / 100;
      const n = years * 12;
      let balance = corpus;
      let totalWithdrawn = 0;
      for (let m = 0; m < n; m++) {
        balance = balance * (1 + i) - withdrawal;
        if (balance < 0) { totalWithdrawn += withdrawal + balance; balance = 0; break; }
        totalWithdrawn += withdrawal;
      }
      return {
        primary: { label: "Final balance", value: inr(Math.max(balance, 0)) },
        breakdown: [
          { label: "Total withdrawn", value: inr(totalWithdrawn) },
          { label: "Starting corpus", value: inr(corpus) },
        ],
      };
    },
    faqs: [
      { q: "What is SWP?", a: "Systematic Withdrawal Plan pays out a fixed amount from a mutual fund every month, ideal for retirees." },
    ],
  },
  {
    slug: "mutual-fund",
    name: "Mutual Fund Calculator",
    short: "Estimate MF returns",
    description: "Project growth of a mutual fund investment using expected CAGR, whether SIP or lumpsum style.",
    category: "Investing",
    fields: [
      { name: "principal", label: "Total investment", suffix: "₹", min: 1000, max: 10000000, step: 1000, default: 100000 },
      { name: "rate", label: "Expected CAGR", suffix: "% p.a.", min: 1, max: 30, step: 0.5, default: 12 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 40, step: 1, default: 7 },
    ],
    compute: ({ principal, rate, years }) => {
      const fv = lumpsumFV(principal, rate, years);
      return {
        primary: { label: "Estimated value", value: inr(fv) },
        breakdown: [
          { label: "Invested amount", value: inr(principal) },
          { label: "Wealth gained", value: inr(fv - principal) },
        ],
      };
    },
    faqs: [{ q: "Are mutual fund returns guaranteed?", a: "No — mutual fund returns depend on market performance. Past returns are not indicative of future returns." }],
  },
  {
    slug: "emi",
    name: "EMI Calculator",
    short: "Calculate any loan EMI",
    description: "Find the equated monthly installment for any home, car or personal loan, plus the total interest payable.",
    category: "Loans",
    fields: [
      { name: "principal", label: "Loan amount", suffix: "₹", min: 10000, max: 100000000, step: 10000, default: 1000000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 1, max: 30, step: 0.1, default: 9 },
      { name: "years", label: "Loan tenure", suffix: "yrs", min: 1, max: 30, step: 1, default: 10 },
    ],
    compute: ({ principal, rate, years }) => {
      const { emi, total, interest } = emiCalc(principal, rate, years);
      return {
        primary: { label: "Monthly EMI", value: inr(emi) },
        breakdown: [
          { label: "Principal amount", value: inr(principal) },
          { label: "Total interest", value: inr(interest) },
          { label: "Total payment", value: inr(total) },
        ],
      };
    },
    faqs: [
      { q: "What is EMI?", a: "Equated Monthly Installment — a fixed monthly payment covering both interest and principal until the loan ends." },
      { q: "Does prepayment reduce EMI?", a: "Prepayment usually reduces tenure by default; banks may reduce the EMI if you specifically request it." },
    ],
  },
  {
    slug: "home-loan",
    name: "Home Loan Calculator",
    short: "Plan your housing EMI",
    description: "Estimate the monthly EMI and total interest cost for a home loan over your chosen tenure.",
    category: "Loans",
    fields: [
      { name: "principal", label: "Loan amount", suffix: "₹", min: 100000, max: 100000000, step: 50000, default: 3000000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 5, max: 15, step: 0.05, default: 8.5 },
      { name: "years", label: "Tenure", suffix: "yrs", min: 1, max: 30, step: 1, default: 20 },
    ],
    compute: ({ principal, rate, years }) => {
      const { emi, total, interest } = emiCalc(principal, rate, years);
      return {
        primary: { label: "Monthly EMI", value: inr(emi) },
        breakdown: [
          { label: "Principal", value: inr(principal) },
          { label: "Total interest", value: inr(interest) },
          { label: "Total payment", value: inr(total) },
        ],
      };
    },
    faqs: [{ q: "Should I prepay my home loan?", a: "Prepay if your post-tax loan rate exceeds your expected investment returns. Otherwise, investing the surplus may compound better." }],
  },
  {
    slug: "car-loan",
    name: "Car Loan Calculator",
    short: "Estimate vehicle EMI",
    description: "Work out the monthly installment and total cost of borrowing for a new or used car loan.",
    category: "Loans",
    fields: [
      { name: "principal", label: "Loan amount", suffix: "₹", min: 50000, max: 10000000, step: 10000, default: 800000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 5, max: 20, step: 0.1, default: 10 },
      { name: "years", label: "Tenure", suffix: "yrs", min: 1, max: 8, step: 1, default: 5 },
    ],
    compute: ({ principal, rate, years }) => {
      const { emi, total, interest } = emiCalc(principal, rate, years);
      return {
        primary: { label: "Monthly EMI", value: inr(emi) },
        breakdown: [
          { label: "Principal", value: inr(principal) },
          { label: "Total interest", value: inr(interest) },
          { label: "Total payment", value: inr(total) },
        ],
      };
    },
    faqs: [{ q: "What tenure is ideal?", a: "Shorter tenures save interest but raise EMIs. 3–5 years is typical for cars to avoid owing more than the car is worth." }],
  },
  {
    slug: "fd",
    name: "FD Calculator",
    short: "Fixed deposit maturity",
    description: "Calculate the maturity value and interest earned on a bank Fixed Deposit with quarterly compounding.",
    category: "Savings",
    fields: [
      { name: "principal", label: "Total investment", suffix: "₹", min: 1000, max: 100000000, step: 1000, default: 100000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 1, max: 12, step: 0.05, default: 7 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 20, step: 1, default: 5 },
    ],
    compute: ({ principal, rate, years }) => {
      const n = 4;
      const fv = principal * Math.pow(1 + rate / 100 / n, n * years);
      return {
        primary: { label: "Maturity value", value: inr(fv) },
        breakdown: [
          { label: "Invested amount", value: inr(principal) },
          { label: "Interest earned", value: inr(fv - principal) },
        ],
      };
    },
    faqs: [
      { q: "Is FD interest taxable?", a: "Yes — FD interest is added to your taxable income and taxed at your slab rate. TDS applies above the annual threshold." },
    ],
  },
  {
    slug: "rd",
    name: "RD Calculator",
    short: "Recurring deposit maturity",
    description: "See how much your monthly recurring deposit grows to at maturity with quarterly compounding.",
    category: "Savings",
    fields: [
      { name: "monthly", label: "Monthly deposit", suffix: "₹", min: 100, max: 100000, step: 100, default: 5000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 1, max: 12, step: 0.05, default: 6.5 },
      { name: "years", label: "Time period", suffix: "yrs", min: 1, max: 10, step: 1, default: 5 },
    ],
    compute: ({ monthly, rate, years }) => {
      const n = years * 12;
      const r = rate / 400; // quarterly rate
      let fv = 0;
      for (let m = 1; m <= n; m++) {
        const quartersLeft = (n - m + 1) / 3;
        fv += monthly * Math.pow(1 + r, quartersLeft);
      }
      const invested = monthly * n;
      return {
        primary: { label: "Maturity value", value: inr(fv) },
        breakdown: [
          { label: "Invested amount", value: inr(invested) },
          { label: "Interest earned", value: inr(fv - invested) },
        ],
      };
    },
    faqs: [{ q: "What is a recurring deposit?", a: "An RD is a bank savings product where you deposit a fixed amount monthly and earn interest similar to an FD." }],
  },
  {
    slug: "ppf",
    name: "PPF Calculator",
    short: "Public Provident Fund growth",
    description: "Estimate the maturity value of a yearly Public Provident Fund (PPF) contribution at the current rate.",
    category: "Savings",
    fields: [
      { name: "yearly", label: "Yearly investment", suffix: "₹", min: 500, max: 150000, step: 500, default: 100000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 1, max: 10, step: 0.05, default: 7.1 },
      { name: "years", label: "Time period", suffix: "yrs", min: 15, max: 50, step: 1, default: 15 },
    ],
    compute: ({ yearly, rate, years }) => {
      let bal = 0;
      for (let y = 0; y < years; y++) bal = (bal + yearly) * (1 + rate / 100);
      const invested = yearly * years;
      return {
        primary: { label: "Maturity value", value: inr(bal) },
        breakdown: [
          { label: "Total invested", value: inr(invested) },
          { label: "Interest earned", value: inr(bal - invested) },
        ],
      };
    },
    faqs: [
      { q: "Is PPF tax-free?", a: "Yes — PPF enjoys EEE status: contributions, interest and maturity are all tax-exempt under Section 80C." },
    ],
  },
  {
    slug: "nps",
    name: "NPS Calculator",
    short: "Retirement pension corpus",
    description: "Project your National Pension System (NPS) corpus at retirement based on monthly contributions and assumed returns.",
    category: "Investing",
    fields: [
      { name: "monthly", label: "Monthly investment", suffix: "₹", min: 500, max: 200000, step: 500, default: 5000 },
      { name: "rate", label: "Expected return", suffix: "% p.a.", min: 1, max: 15, step: 0.5, default: 10 },
      { name: "years", label: "Years to retirement", suffix: "yrs", min: 1, max: 40, step: 1, default: 25 },
    ],
    compute: ({ monthly, rate, years }) => {
      const fv = sipFV(monthly, rate, years);
      const invested = monthly * years * 12;
      const annuity = fv * 0.4;
      const lump = fv * 0.6;
      return {
        primary: { label: "Pension corpus", value: inr(fv) },
        breakdown: [
          { label: "Total invested", value: inr(invested) },
          { label: "Lumpsum at 60 (60%)", value: inr(lump) },
          { label: "Annuity (40%)", value: inr(annuity) },
        ],
      };
    },
    faqs: [{ q: "Is NPS withdrawal taxable?", a: "60% of the corpus withdrawn at retirement is tax-free; the remaining 40% must buy an annuity and pension income is taxed at slab." }],
  },
  {
    slug: "income-tax",
    name: "Income Tax Calculator",
    short: "New regime tax estimate (FY 2024-25)",
    description: "Estimate your annual income tax liability under the New Tax Regime for FY 2024-25 (AY 2025-26).",
    category: "Tax",
    fields: [
      { name: "income", label: "Annual income", suffix: "₹", min: 100000, max: 100000000, step: 10000, default: 1200000 },
    ],
    compute: ({ income }) => {
      const taxable = Math.max(0, income - 75000); // standard deduction
      const slabs = [
        { upto: 300000, rate: 0 },
        { upto: 700000, rate: 0.05 },
        { upto: 1000000, rate: 0.1 },
        { upto: 1200000, rate: 0.15 },
        { upto: 1500000, rate: 0.2 },
        { upto: Infinity, rate: 0.3 },
      ];
      let tax = 0;
      let prev = 0;
      for (const s of slabs) {
        if (taxable > s.upto) {
          tax += (s.upto - prev) * s.rate;
          prev = s.upto;
        } else {
          tax += (taxable - prev) * s.rate;
          break;
        }
      }
      if (taxable <= 700000) tax = 0; // 87A rebate
      const cess = tax * 0.04;
      const total = tax + cess;
      return {
        primary: { label: "Tax payable", value: inr(total) },
        breakdown: [
          { label: "Taxable income (after std deduction)", value: inr(taxable) },
          { label: "Income tax", value: inr(tax) },
          { label: "Health & education cess (4%)", value: inr(cess) },
        ],
        note: "Based on FY 2024-25 New Tax Regime slabs. Surcharge for high incomes not applied.",
      };
    },
    faqs: [
      { q: "Old vs New regime?", a: "The New Regime has lower slab rates but fewer deductions. Compare both for your specific deductions before choosing." },
    ],
  },
  {
    slug: "hra",
    name: "HRA Calculator",
    short: "House Rent Allowance exemption",
    description: "Compute the tax-exempt portion of your House Rent Allowance under Section 10(13A) of the Income Tax Act.",
    category: "Tax",
    fields: [
      { name: "basic", label: "Annual basic salary", suffix: "₹", min: 10000, max: 100000000, step: 1000, default: 600000 },
      { name: "hra", label: "Annual HRA received", suffix: "₹", min: 0, max: 100000000, step: 1000, default: 240000 },
      { name: "rent", label: "Annual rent paid", suffix: "₹", min: 0, max: 100000000, step: 1000, default: 300000 },
      { name: "metro", label: "Live in metro? (1=Yes, 0=No)", min: 0, max: 1, step: 1, default: 1 },
    ],
    compute: ({ basic, hra, rent, metro }) => {
      const rule1 = hra;
      const rule2 = (metro ? 0.5 : 0.4) * basic;
      const rule3 = Math.max(0, rent - 0.1 * basic);
      const exempt = Math.min(rule1, rule2, rule3);
      return {
        primary: { label: "Exempt HRA", value: inr(exempt) },
        breakdown: [
          { label: "Actual HRA received", value: inr(rule1) },
          { label: metro ? "50% of basic (metro)" : "40% of basic (non-metro)", value: inr(rule2) },
          { label: "Rent − 10% of basic", value: inr(rule3) },
          { label: "Taxable HRA", value: inr(hra - exempt) },
        ],
      };
    },
    faqs: [{ q: "Can I claim HRA without rent receipts?", a: "You need rent receipts; for rent above ₹1 lakh/year you also need the landlord's PAN." }],
  },
  {
    slug: "gst",
    name: "GST Calculator",
    short: "Add or remove GST",
    description: "Quickly calculate the GST component and net price for any sale at the chosen GST rate.",
    category: "Tax",
    fields: [
      { name: "amount", label: "Amount", suffix: "₹", min: 1, max: 100000000, step: 1, default: 10000 },
      { name: "rate", label: "GST rate", suffix: "%", min: 0, max: 28, step: 0.5, default: 18 },
      { name: "mode", label: "Mode (1=Add GST, 0=Remove GST)", min: 0, max: 1, step: 1, default: 1 },
    ],
    compute: ({ amount, rate, mode }) => {
      if (mode === 1) {
        const gst = (amount * rate) / 100;
        return {
          primary: { label: "Total (incl. GST)", value: inr(amount + gst) },
          breakdown: [
            { label: "Net amount", value: inr(amount) },
            { label: `GST @ ${rate}%`, value: inr(gst) },
          ],
        };
      }
      const net = (amount * 100) / (100 + rate);
      return {
        primary: { label: "Net amount", value: inr(net) },
        breakdown: [
          { label: "Gross amount", value: inr(amount) },
          { label: `GST @ ${rate}%`, value: inr(amount - net) },
        ],
      };
    },
    faqs: [{ q: "Common GST rates?", a: "India uses 0%, 5%, 12%, 18% and 28% slabs depending on the goods or service category." }],
  },
  {
    slug: "simple-interest",
    name: "Simple Interest Calculator",
    short: "SI = P × R × T / 100",
    description: "Calculate simple interest and total amount for any principal, rate and time using the SI formula.",
    category: "Savings",
    fields: [
      { name: "principal", label: "Principal", suffix: "₹", min: 100, max: 100000000, step: 100, default: 100000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 0.1, max: 30, step: 0.1, default: 8 },
      { name: "years", label: "Time", suffix: "yrs", min: 0.5, max: 40, step: 0.5, default: 5 },
    ],
    compute: ({ principal, rate, years }) => {
      const interest = (principal * rate * years) / 100;
      return {
        primary: { label: "Total amount", value: inr(principal + interest) },
        breakdown: [
          { label: "Principal", value: inr(principal) },
          { label: "Interest", value: inr(interest) },
        ],
      };
    },
    faqs: [{ q: "Simple vs compound interest?", a: "Simple interest is calculated only on the principal; compound interest is calculated on principal plus accumulated interest." }],
  },
  {
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    short: "Power of compounding",
    description: "Compute the maturity value when interest compounds annually, quarterly or monthly.",
    category: "Savings",
    fields: [
      { name: "principal", label: "Principal", suffix: "₹", min: 100, max: 100000000, step: 100, default: 100000 },
      { name: "rate", label: "Interest rate", suffix: "% p.a.", min: 0.1, max: 30, step: 0.1, default: 10 },
      { name: "years", label: "Time", suffix: "yrs", min: 1, max: 40, step: 1, default: 10 },
      { name: "freq", label: "Compounds/year", min: 1, max: 12, step: 1, default: 4 },
    ],
    compute: ({ principal, rate, years, freq }) => {
      const fv = principal * Math.pow(1 + rate / 100 / freq, freq * years);
      return {
        primary: { label: "Maturity value", value: inr(fv) },
        breakdown: [
          { label: "Principal", value: inr(principal) },
          { label: "Interest earned", value: inr(fv - principal) },
        ],
      };
    },
    faqs: [{ q: "Why does compounding matter?", a: "Compounding lets your interest earn its own interest — small differences in rate or time become huge over decades." }],
  },
];

export function getCalculator(slug: string) {
  return calculators.find((c) => c.slug === slug);
}