import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="page-shell flex flex-col gap-3 py-7 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <p>Fieldwork <span className="text-amber-400">/</span> Find work worth doing.</p>
        <div className="flex gap-5"><Link href="/jobs" className="hover:text-stone-200">Browse jobs</Link><Link href="/create-job" className="hover:text-stone-200">Post a job</Link></div>
      </div>
    </footer>
  );
}