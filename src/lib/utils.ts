import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectKeys<T extends Object>(obj: T) {
  return Object.keys(obj) as Array<keyof typeof obj>;
}