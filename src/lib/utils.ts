import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { resources, TranslationKeys } from '~/lib/i18next';
import { useTranslationsContext } from '~/components/context/Translations';
import { NAME_GENERATOR_DICTIONARY } from './const';

function randomNoun() {
  return NAME_GENERATOR_DICTIONARY.NOUNS[
    Math.floor(Math.random() * NAME_GENERATOR_DICTIONARY.NOUNS.length)
  ]!;
}

function randomAdjective() {
  return NAME_GENERATOR_DICTIONARY.ADJECTIVES[
    Math.floor(Math.random() * NAME_GENERATOR_DICTIONARY.ADJECTIVES.length)
  ]!;
}

/**
 * Modified version of https://github.com/thedeveloper/sillyname
 */

function generateStupidName() {
  const noun1 = randomNoun();
  let noun2 = randomNoun();
  noun2 = noun2.substr(0, 1).toUpperCase() + noun2.substr(1);
  const adjective = randomAdjective();
  return adjective + noun1 + ' ' + noun2;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function download(url: string, filename = generateStupidName()) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
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
