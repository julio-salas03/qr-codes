import USFlag from './icons/us-flag';
import SpainFlag from './icons/spain-flag';
import { Button } from './ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
} from './ui/dropdown-menu';
import Language from './icons/language';
import { useTranslationsContext } from './context/Translations';

export default function LanguagePicker() {
  const i18next = useTranslationsContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button<'button'>}
        variant="ghost"
        size="sm"
        class="w-9 px-0"
      >
        <Language />
        <span class="sr-only">change language</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          as={'button'}
          class="flex w-full cursor-pointer items-center gap-2"
          onSelect={() => i18next?.changeLanguage('en')}
        >
          <USFlag />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          as={'button'}
          class="flex w-full cursor-pointer items-center gap-2"
          onSelect={() => i18next?.changeLanguage('es')}
        >
          <SpainFlag />
          <span>Español</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
