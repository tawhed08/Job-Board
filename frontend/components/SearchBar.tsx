export default function SearchBar({ initialSearch = "" }: { initialSearch?: string }) {
  return (
    <form action="/jobs" method="get" className="flex flex-col gap-2 border border-zinc-700 bg-zinc-900 p-2 sm:flex-row">
      <label htmlFor="job-search" className="sr-only">Search by role, company, or location</label>
      <input id="job-search" name="search" defaultValue={initialSearch} placeholder="Role, company, or location" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500" />
      <button type="submit" className="bg-emerald-500 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400">Search jobs</button>
    </form>
  );
}