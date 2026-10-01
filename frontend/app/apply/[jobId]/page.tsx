import Link from "next/link";
import { notFound } from "next/navigation";
import ApplyForm from "@/components/ApplyForm";
import ErrorMessage from "@/components/ErrorMessage";
import { getApiResult, getJob } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const result = await getApiResult(getJob(jobId));
  if (result.data === null) {
    if (result.error === "Job not found") notFound();
    return <section className="page-shell max-w-3xl py-16"><ErrorMessage message={result.error} /></section>;
  }
  const job = result.data;
  return <section className="page-shell max-w-3xl py-12 md:py-16"><Link href={`/jobs/${encodeURIComponent(job._id)}`} className="text-sm text-stone-400 hover:text-emerald-300">&lt;- Back to role</Link><div className="mb-8 mt-7 border-b border-zinc-800 pb-6"><p className="eyebrow mb-2">Application</p><h1 className="text-3xl font-semibold text-stone-100">Apply for {job.title}</h1><p className="mt-2 text-stone-400">{job.company} <span className="text-amber-400">/</span> {job.location}</p></div><ApplyForm jobId={job._id} /></section>;
}