import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectKeys<T extends Object>(obj: T) {
  return Object.keys(obj) as Array<keyof typeof obj>;
}

export function download(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = url.split("/").pop()!;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
