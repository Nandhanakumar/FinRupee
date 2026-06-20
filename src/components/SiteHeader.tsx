import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Calculator } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/calculators", label: "Calculators" },
  { to: "/blog", label: "Blog" },
  { to: "/qa", label: "Q&A" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground shadow-[var(--shadow-soft)]"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            <Calculator className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">FinGrove</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-primary bg-accent" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/calculators"
          className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95 md:inline-flex"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          Try a calculator
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                activeProps={{ className: "rounded-md px-3 py-2.5 text-sm font-semibold text-primary bg-accent" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}