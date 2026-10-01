export default function Loading({ label = "Loading opportunities" }: { label?: string }) {
  return <div role="status" className="flex items-center gap-3 py-12 text-sm text-stone-400"><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-400" />{label}</div>;
}