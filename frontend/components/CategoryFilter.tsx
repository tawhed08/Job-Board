import type { Category } from "@/types/category";

export default function CategoryFilter({ categories, selected = "", search = "" }: { categories: Category[]; selected?: string; search?: string }) {
  return (
    <form action="/jobs" method="get" className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <input type="hidden" name="search" value={search} />
      <label className="flex-1"><span className="field-label">Category</span>
        <select name="category" defaultValue={selected} className="field-control">
          <option value="">All categories</option>
          {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
        </select>
      </label>
      <button type="submit" className="border border-zinc-700 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-emerald-500/60 hover:text-emerald-300">Apply filters</button>
    </form>
  );
}