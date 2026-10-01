import type { Application, ApplicationInput } from "@/types/application";
import type { Category } from "@/types/category";
import type { CreateJobInput, Job } from "@/types/job";

export type ApiResult<T> = { data: T; error: null } | { data: null; error: string };

export async function getApiResult<T>(requestPromise: Promise<T>): Promise<ApiResult<T>> {
  try {
    return { data: await requestPromise, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Unable to load data." };
  }
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  return baseUrl.replace(/\/$/, "");
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const apiBaseUrl = getApiBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
      cache: "no-store",
    });
  } catch {
    throw new Error("The job board API could not be reached. Please try again later.");
  }

  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof payload === "object" && payload !== null && "message" in payload && typeof payload.message === "string"
      ? payload.message
      : "The request could not be completed.";
    throw new Error(message);
  }
  return payload as T;
}

export function getJobs(filters: { search?: string; category?: string } = {}): Promise<Job[]> {
  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.category) query.set("category", filters.category);
  const suffix = query.size ? `?${query.toString()}` : "";
  return request<Job[]>(`/api/jobs${suffix}`);
}

export function getJob(id: string): Promise<Job> {
  return request<Job>(`/api/jobs/${encodeURIComponent(id)}`);
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>("/api/categories");
}

export function createJob(input: CreateJobInput): Promise<Job> {
  return request<Job>("/api/jobs", { method: "POST", body: JSON.stringify(input) });
}

export function createApplication(input: ApplicationInput): Promise<Application> {
  return request<Application>("/api/applications", { method: "POST", body: JSON.stringify(input) });
}