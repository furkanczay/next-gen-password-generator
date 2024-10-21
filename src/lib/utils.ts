import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const i18n = {
  defaultLocale: "tr",
  locales: ["tr", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  tr: () => import("../dictionaries/tr.json").then((module) => module.default),
  en: () => import("../dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.tr();

