import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { resources, TranslationKeys } from '~/lib/i18next';
import { useTranslationsContext } from '~/components/context/Translations';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function download(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = url.split('/').pop()!;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const defaultTranslations = resources.en.translation;

export const t = (key: TranslationKeys) => {
  const i18next = useTranslationsContext();
  const translation = i18next?.t(key);
  return translation || defaultTranslations[key];
};
