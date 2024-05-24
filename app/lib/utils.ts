import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractRssLink(text: string) {
  return text.substring(
    text.indexOf("RSS") + 11,
    text.indexOf('">', text.indexOf("RSS"))
  );
}

export function isValidYoutubeChannelLink(url: string) {
  return url.includes("youtube.com") && url.includes("/@");
}

export function formatIsoDateToNormalDateAndTime(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

export const CHANNELS_KEY = "channels_links";

export const storeLink = (link: string) => {
  const storedLinks = JSON.parse(localStorage.getItem(CHANNELS_KEY) ?? "[]");

  if (!storedLinks.includes(link)) {
    storedLinks.push(link);
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(storedLinks));
  }
};
