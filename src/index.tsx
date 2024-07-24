/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { TranslationsProvider } from "./components/context/Translations";
import { Toaster } from "./components/ui/toast";

const root = document.getElementById("root");
render(
  () => (
    <TranslationsProvider>
      <App />
      <Toaster />
    </TranslationsProvider>
  ),
  root!,
);
