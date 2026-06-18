import en from "./en";
import th from "./th";

const dictionaries = { en, th } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof en;

export function getDictionary(lang: string): Dictionary {
  return dictionaries[lang as Locale] ?? dictionaries.en;
}
