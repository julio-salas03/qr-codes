/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App";
import { TranslationsProvider } from "./components/context/Translations";

const root = document.getElementById("root");
render(
  () => (
    <TranslationsProvider>
      <App />
    </TranslationsProvider>
  ),
  root!,
);
