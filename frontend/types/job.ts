import type { Category } from "@/types/category";

export type JobType = "Full Time" | "Part Time" | "Remote" | "Internship" | "Contract";

export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  salary?: string;
  category: Category | string;
  jobType: JobType;
  requirements?: string[];
  responsibilities?: string[];
  deadline?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateJobInput {
  title: string;
  company: string;
  description: string;
  location: string;
  salary?: string;
  category: string;
  jobType: JobType;
}