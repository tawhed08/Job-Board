import Link from "next/link";
import { notFound } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { getApiResult, getJob } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getApiResult(getJob(id));
  if (result.data === null) {
    if (result.error === "Job not found") notFound();
    return <div className="page-shell py-16"><ErrorMessage message={result.error} /></div>;
  }
  const job = result.data;
  const category = typeof job.category === "string" ? "Opportunity" : job.category.name;
  return (
      <article className="page-shell max-w-4xl py-12 md:py-16">
        <Link href="/jobs" className="text-sm text-stone-400 hover:text-emerald-300">&lt;- All jobs</Link>
        <header className="mt-8 border-b border-zinc-800 pb-8">
          <p className="eyebrow mb-3">{category}</p><h1 className="text-3xl font-semibold leading-tight text-stone-50 sm:text-4xl">{job.title}</h1>
          <p className="mt-3 text-lg text-amber-400">{job.company}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-stone-300"><span>{job.location}</span><span>{job.jobType}</span>{job.salary && <span>{job.salary}</span>}</div>
          <Link href={`/apply/${encodeURIComponent(job._id)}`} className="mt-7 inline-flex bg-emerald-500 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400">Apply now</Link>
        </header>
        <div className="grid gap-10 py-9 md:grid-cols-[1fr_15rem]">
          <div className="space-y-9">
            <section><h2 className="text-lg font-semibold text-stone-100">About the role</h2><p className="mt-3 whitespace-pre-line leading-7 text-stone-300">{job.description}</p></section>
            {job.responsibilities?.length ? <section><h2 className="text-lg font-semibold text-stone-100">Responsibilities</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-stone-300">{job.responsibilities.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section> : null}
            {job.requirements?.length ? <section><h2 className="text-lg font-semibold text-stone-100">What you bring</h2><ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-stone-300">{job.requirements.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul></section> : null}
          </div>
          <aside className="h-fit border border-zinc-800 bg-zinc-900/60 p-5"><h2 className="font-semibold text-stone-100">Role details</h2><dl className="mt-4 space-y-4 text-sm"><div><dt className="text-stone-500">Company</dt><dd className="mt-1 text-stone-200">{job.company}</dd></div><div><dt className="text-stone-500">Location</dt><dd className="mt-1 text-stone-200">{job.location}</dd></div><div><dt className="text-stone-500">Job type</dt><dd className="mt-1 text-stone-200">{job.jobType}</dd></div><div><dt className="text-stone-500">Salary</dt><dd className="mt-1 text-stone-200">{job.salary || "Not specified"}</dd></div>{job.deadline && <div><dt className="text-stone-500">Apply by</dt><dd className="mt-1 text-stone-200">{new Date(job.deadline).toLocaleDateString()}</dd></div>}</dl></aside>
        </div>
      </article>
  );
}