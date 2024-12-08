import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the types for `inputs`
export function cn(
  ...inputs: (string | Record<string, boolean> | undefined)[]
) {
  return twMerge(clsx(inputs));
}
