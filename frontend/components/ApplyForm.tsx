"use client";

import { useState, type FormEvent } from "react";
import { createApplication } from "@/lib/api";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    try {
      await createApplication({
        job: jobId,
        name: String(formData.get("name")).trim(),
        email: String(formData.get("email")).trim(),
        phone: String(formData.get("phone")).trim(),
        resume: String(formData.get("resume")).trim(),
        coverLetter: String(formData.get("coverLetter")).trim(),
      });
      setSubmitted(true);
      formElement.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your application.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) return <div role="status" className="border border-emerald-500/40 bg-emerald-950/30 p-6"><h2 className="font-semibold text-emerald-300">Application received</h2><p className="mt-2 text-sm leading-6 text-stone-300">Thank you for applying. Your details have been sent to the hiring team.</p></div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Full name</span><input name="name" autoComplete="name" required maxLength={120} className="field-control" /></label>
        <label><span className="field-label">Email</span><input name="email" type="email" autoComplete="email" required className="field-control" /></label>
        <label><span className="field-label">Phone</span><input name="phone" type="tel" autoComplete="tel" required className="field-control" /></label>
        <label><span className="field-label">Resume link</span><input name="resume" type="url" className="field-control" placeholder="https://..." /><span className="mt-1 block text-xs text-stone-500">Share a link to your resume.</span></label>
      </div>
      <label className="block"><span className="field-label">Cover letter</span><textarea name="coverLetter" rows={6} className="field-control resize-y" placeholder="A few words about why this role is right for you..." /></label>
      {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
      <button disabled={isSubmitting} className="bg-emerald-500 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Sending..." : "Submit application"}</button>
    </form>
  );
}