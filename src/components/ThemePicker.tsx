import ColorPalette from "./icons/color-palette";
import Computer from "./icons/computer";
import Moon from "./icons/moon";
import Sun from "./icons/sun";
import { setColorScheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
export default function ThemePicker() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        as={Button<"button">}
        variant="ghost"
        size="sm"
        class="w-9 px-0"
      >
        <ColorPalette />
        <span class="sr-only">change theme color</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          as={"button"}
          class="flex w-full cursor-pointer items-center gap-2"
          onSelect={() => setColorScheme("light")}
        >
          <Sun />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          as={"button"}
          class="flex w-full cursor-pointer items-center gap-2"
          onSelect={() => setColorScheme("dark")}
        >
          <Moon />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          as={"button"}
          class="flex w-full cursor-pointer items-center gap-2"
          onSelect={() => setColorScheme("system")}
        >
          <Computer />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
