/* @refresh reload */
import { render } from "solid-js/web";
import i18next from "i18next";
import "./index.css";
import App from "./App";
import { resources } from "./lib/i18next";

i18next.init(
  {
    lng: "en",
    debug: !import.meta.env.PROD,
    resources,
  },
  function () {
    const root = document.getElementById("root");
    render(() => <App />, root!);
  }
);
