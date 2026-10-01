import Link from "next/link";
import ErrorMessage from "@/components/ErrorMessage";
import { getApiResult, getCategories } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const result = await getApiResult(getCategories());
  if (result.data === null) {
    return <section className="page-shell py-16"><ErrorMessage message={result.error} /></section>;
  }
  const categories = result.data;
  return (
      <section className="page-shell py-12 md:py-16">
        <div className="mb-8"><p className="eyebrow mb-2">Explore by discipline</p><h1 className="text-3xl font-semibold text-stone-100">Browse categories</h1><p className="mt-2 text-stone-400">Find the kind of work you want to do.</p></div>
        {categories.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map((category) => <Link key={category._id} href={`/jobs?category=${encodeURIComponent(category._id)}`} className="group border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-emerald-500/50"><span className="eyebrow">Category</span><h2 className="mt-3 text-xl font-semibold text-stone-100 group-hover:text-emerald-300">{category.name}</h2>{category.description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-400">{category.description}</p>}<span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">View jobs <span aria-hidden="true">-&gt;</span></span></Link>)}</div> : <p className="border border-dashed border-zinc-700 px-6 py-12 text-center text-stone-400">No categories have been added yet.</p>}
      </section>
  );
}