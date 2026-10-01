import Link from "next/link";

const links = [
  { href: "/jobs", label: "Find a job" },
  { href: "/categories", label: "Categories" },
];

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800/90 bg-zinc-950/90">
      <nav aria-label="Main navigation" className="page-shell flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight text-stone-100">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-sm bg-emerald-500 text-sm font-black text-zinc-950">F</span>
          <span>fieldwork<span className="text-amber-400">.</span></span>
        </Link>
        <div className="flex flex-wrap items-center gap-5 text-sm text-stone-400">
          {links.map((link) => <Link key={link.href} href={link.href} className="transition hover:text-stone-100">{link.label}</Link>)}
          <Link href="/create-job" className="border border-emerald-500/50 px-3.5 py-2 font-semibold text-emerald-300 transition hover:bg-emerald-500 hover:text-zinc-950">Post a job</Link>
        </div>
      </nav>
    </header>
  );
}