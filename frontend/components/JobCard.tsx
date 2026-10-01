import Link from "next/link";
import type { Job } from "@/types/job";

export default function JobCard({ job }: { job: Job }) {
  const category = typeof job.category === "string" ? "Opportunity" : job.category.name;
  return (
    <article className="flex h-full flex-col border border-zinc-800 bg-zinc-900/60 p-5 transition hover:-translate-y-0.5 hover:border-emerald-500/40">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div><p className="text-sm font-medium text-amber-400">{job.company}</p><h3 className="mt-1 text-lg font-semibold text-stone-100">{job.title}</h3></div>
        <span className="shrink-0 border border-emerald-500/30 px-2 py-1 text-xs text-emerald-300">{job.jobType}</span>
      </div>
      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-zinc-800 pt-4 text-sm text-stone-400">
        <span>{job.location}</span><span>{category}</span>{job.salary && <span>{job.salary}</span>}
      </div>
      <Link href={`/jobs/${encodeURIComponent(job._id)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">View opportunity <span aria-hidden="true">-&gt;</span></Link>
    </article>
  );
}