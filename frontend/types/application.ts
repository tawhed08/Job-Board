import type { Job } from "@/types/job";

export interface ApplicationInput {
  job: string;
  name: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
}

export interface Application extends Omit<ApplicationInput, "job"> {
  _id: string;
  job: Job | string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  createdAt?: string;
}