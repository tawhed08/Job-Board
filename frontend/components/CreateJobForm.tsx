"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api";
import type { Category } from "@/types/category";
import type { JobType } from "@/types/job";

const jobTypes: JobType[] = ["Full Time", "Part Time", "Remote", "Internship", "Contract"];

export default function CreateJobForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const jobType = String(formData.get("jobType")) as JobType;
    try {
      const job = await createJob({
        title: String(formData.get("title")).trim(),
        company: String(formData.get("company")).trim(),
        description: String(formData.get("description")).trim(),
        location: String(formData.get("location")).trim(),
        salary: String(formData.get("salary")).trim(),
        category: String(formData.get("category")),
        jobType,
      });
      router.push(`/jobs/${encodeURIComponent(job._id)}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to publish this job.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label><span className="field-label">Job title</span><input name="title" required maxLength={120} className="field-control" placeholder="Senior product designer" /></label>
        <label><span className="field-label">Company</span><input name="company" required maxLength={120} className="field-control" placeholder="Company name" /></label>
        <label><span className="field-label">Location</span><input name="location" required maxLength={120} className="field-control" placeholder="City, country, or remote" /></label>
        <label><span className="field-label">Salary</span><input name="salary" className="field-control" placeholder="e.g. $90k-$120k" /></label>
        <label><span className="field-label">Job type</span><select name="jobType" required defaultValue="" className="field-control"><option value="" disabled>Select a job type</option>{jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        <label><span className="field-label">Category</span><select name="category" required defaultValue="" className="field-control"><option value="" disabled>Select a category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}</select></label>
      </div>
      <label className="block"><span className="field-label">Description</span><textarea name="description" required minLength={20} rows={7} className="field-control resize-y" placeholder="Describe the role, team, and impact..." /></label>
      {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
      {!categories.length && <p role="status" className="text-sm text-amber-300">Add a category before publishing a job.</p>}
      <button disabled={isSubmitting || !categories.length} className="bg-emerald-500 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Publishing..." : "Publish job"}</button>
    </form>
  );
}