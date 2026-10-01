import Link from "next/link";
import ErrorMessage from "@/components/ErrorMessage";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import { getApiResult, getCategories, getJobs } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const result = await getApiResult(Promise.all([getJobs(), getCategories()]));
  if (result.data === null) {
    return <div className="page-shell py-20"><ErrorMessage message={result.error} /></div>;
  }

  const [jobs, categories] = result.data;
  const featuredJobs = jobs.slice(0, 3);

  return (
    <div>
      <section className="page-shell grid min-h-[440px] items-center gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
        <div>
          <p className="eyebrow mb-5">The work worth finding</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-stone-50 sm:text-6xl">
            Make your next move <span className="text-emerald-400">count.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
            Thoughtful opportunities from teams building what comes next. Find a role that fits the way you want to work.
          </p>
          <div className="mt-9 max-w-2xl"><SearchBar /></div>
          <Link href="/jobs" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300">
            Browse all jobs <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <div className="relative hidden min-h-[300px] items-end border-l border-emerald-500/30 pl-10 md:flex">
          <div className="absolute left-10 top-3 h-40 w-px bg-gradient-to-b from-amber-400 to-transparent" />
          <div className="pb-3">
            <span className="text-7xl font-light text-emerald-400">{jobs.length.toString().padStart(2, "0")}</span>
            <p className="mt-3 max-w-[16rem] text-sm leading-6 text-stone-400">open roles, each one a chance to do meaningful work with a good team.</p>
          </div>
          <span className="absolute right-10 top-10 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_22px_5px_rgb(251_191_36_/_22%)]" />
        </div>
      </section>

      <section className="border-y border-zinc-800/80 bg-zinc-900/40">
        <div className="page-shell py-12 md:py-14">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="eyebrow mb-2">Find your field</p><h2 className="text-2xl font-semibold text-stone-100">Browse categories</h2></div>
            <Link href="/categories" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">All categories <span aria-hidden="true">-&gt;</span></Link>
          </div>
          {categories.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {categories.slice(0, 8).map((category) => (
                <Link key={category._id} href={`/jobs?category=${encodeURIComponent(category._id)}`} className="group flex min-h-24 items-center justify-between border border-zinc-800 bg-zinc-950/70 px-5 py-4 transition hover:border-emerald-500/50">
                  <span className="font-medium text-stone-200 group-hover:text-emerald-300">{category.name}</span>
                  <span className="text-amber-400 transition group-hover:translate-x-1" aria-hidden="true">-&gt;</span>
                </Link>
              ))}
            </div>
          ) : <p className="text-sm text-stone-400">No categories have been added yet.</p>}
        </div>
      </section>

      <section className="page-shell py-14 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div><p className="eyebrow mb-2">Recently posted</p><h2 className="text-2xl font-semibold text-stone-100">Featured opportunities</h2></div>
          <Link href="/jobs" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300">View all <span aria-hidden="true">-&gt;</span></Link>
        </div>
        {featuredJobs.length ? <div className="grid gap-4 lg:grid-cols-3">{featuredJobs.map((job) => <JobCard key={job._id} job={job} />)}</div> : <p className="border border-dashed border-zinc-700 px-6 py-10 text-center text-stone-400">No jobs are available right now. Check back soon.</p>}
      </section>
    </div>
  );
}