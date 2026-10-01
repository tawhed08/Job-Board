import ErrorMessage from "@/components/ErrorMessage";
import CreateJobForm from "@/components/CreateJobForm";
import { getApiResult, getCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CreateJobPage() {
  const result = await getApiResult(getCategories());
  if (result.data === null) return <section className="page-shell max-w-3xl py-16"><ErrorMessage message={result.error} /></section>;
  return <section className="page-shell max-w-3xl py-12 md:py-16"><div className="mb-8"><p className="eyebrow mb-2">For hiring teams</p><h1 className="text-3xl font-semibold text-stone-100">Post an opportunity</h1><p className="mt-2 text-stone-400">Share the role and find your next great teammate.</p></div><CreateJobForm categories={result.data} /></section>;
}