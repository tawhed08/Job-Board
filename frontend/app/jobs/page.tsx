import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import ErrorMessage from "@/components/ErrorMessage";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import { getApiResult, getCategories, getJobs } from "@/lib/api";

export const dynamic = "force-dynamic";

type JobsPageProps = { searchParams: Promise<{ search?: string; category?: string }> };

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const search = params.search?.trim() ?? "";
  const category = params.category ?? "";

  const result = await getApiResult(Promise.all([getJobs({ search, category }), getCategories()]));
  if (result.data === null) {
    return <section className="page-shell py-16"><ErrorMessage message={result.error} /></section>;
  }
  const [jobs, categories] = result.data;
  return (
      <section className="page-shell py-12 md:py-16">
        <div className="mb-8"><p className="eyebrow mb-2">Open positions</p><h1 className="text-3xl font-semibold text-stone-100">Find your next opportunity</h1><p className="mt-2 text-stone-400">Search roles from teams doing work that matters.</p></div>
        <div className="grid gap-5 border-b border-zinc-800 pb-7 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <SearchBar initialSearch={search} />
          <CategoryFilter categories={categories} selected={category} search={search} />
        </div>
        <div className="mb-5 mt-7 flex items-center justify-between gap-4"><h2 className="font-semibold text-stone-200">{jobs.length} {jobs.length === 1 ? "role" : "roles"}</h2>{(search || category) && <Link href="/jobs" className="text-sm text-amber-400 hover:text-amber-300">Clear filters</Link>}</div>
        {jobs.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{jobs.map((job) => <JobCard key={job._id} job={job} />)}</div> : <div className="border border-dashed border-zinc-700 px-6 py-14 text-center"><p className="font-medium text-stone-200">No roles match those filters.</p><p className="mt-2 text-sm text-stone-500">Try a different search or browse all open positions.</p></div>}
      </section>
  );
}