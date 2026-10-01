export default function ErrorMessage({ message }: { message: string }) {
  return <div role="alert" className="border border-amber-500/30 bg-amber-950/20 px-5 py-4 text-sm text-amber-200"><p className="font-semibold">Something went wrong</p><p className="mt-1 text-amber-100/75">{message}</p></div>;
}