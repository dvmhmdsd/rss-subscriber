import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractRssLink(text: string) {
  return text.substring(text.indexOf("RSS") + 11, text.indexOf('">', text.indexOf("RSS")));
}

export function isValidYoutubeChannelLink(url: string) {
  return url.includes("youtube.com") && url.includes("/@");
}
