"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<Response>(
  endpoint: string,
  options: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  } = {}
): Promise<Response> {
  const reqCookies = await cookies();
  const token = reqCookies.get("token")?.value;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(
    `${endpoint.startsWith("http") ? "" : BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      next: {
        revalidate: options.next?.revalidate ?? 60 * 60,
        tags: options.next?.tags ?? ["ALL"],
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<Response>;
}
