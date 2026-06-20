import { Link } from "@tanstack/react-router";
import { calculators } from "../lib/calculators";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="text-xl font-bold tracking-tight text-foreground">FinGrove</div>
          <p className="mt-3 text-sm text-muted-foreground">
            Free financial calculators, investing knowledge and money Q&A — built for Indian investors.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Popular calculators</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {calculators.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/calculators/$slug"
                  params={{ slug: c.slug }}
                  className="text-muted-foreground hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Learn</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Finance blog</Link></li>
            <li><Link to="/qa" className="text-muted-foreground hover:text-primary">Money Q&A</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About FinGrove</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Disclaimer</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Tools and content are for educational purposes. Always consult a SEBI-registered advisor before investing.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} FinGrove. All rights reserved.
        </div>
      </div>
    </footer>
  );
}