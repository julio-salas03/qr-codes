import { createSignal, JSX } from "solid-js";
import { effect } from "solid-js/web";

export type ThemeProviderProps = {
  children: JSX.Element;
};

const LOCAL_STORAGE_THEME_KEY = "theme";

type Theme = "system" | "dark" | "light";

const [theme, setTheme] = createSignal<Theme>("system");

export const setColorScheme = (theme: Theme) => {
  setTheme(theme);
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
};

export default function ThemeProvider(props: ThemeProviderProps) {
  effect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    setTheme((theme || "system") as Theme);
  });

  return (
    <div
      classList={{
        dark: theme() === "dark",
        light: theme() === "light",
      }}
    >
      {props.children}
    </div>
  );
}
