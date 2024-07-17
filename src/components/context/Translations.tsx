import { createContext, createSignal, JSX, useContext } from "solid-js";
import i18next, { type InitOptions, type TFunction, type i18n } from "i18next";
import { resources } from "~/lib/i18next";

type ContextTFunction = TFunction | (() => void);

type TranslationsContextProps = {
  t: ContextTFunction;
  changeLanguage: (lng: string) => Promise<void>;
};

const TranslationsContext = createContext<TranslationsContextProps>();

const createTranslationsContext = (instance: i18n, options: InitOptions) => {
  const [translate, setTranslate] = createSignal<TFunction | (() => null)>(
    !!options.resources ? instance.t : () => null
  );

  instance.on("loaded", () => setTranslate(() => instance.t));
  instance.init(options, (_, t) => setTranslate(() => t));

  const changeLanguage = async (lng: string) => {
    const t = await instance.changeLanguage(lng);
    setTranslate(() => t);
  };

  return {
    changeLanguage,
    t: (...args: Parameters<TFunction>) => translate().apply(null, args),
  };
};

type TranslationsProviderProps = {
  children: JSX.Element;
  instance?: i18n;
};

export const TranslationsProvider = (props: TranslationsProviderProps) => {
  const context = createTranslationsContext(props.instance || i18next, {
    resources,
    lng: "en",
  });
  return (
    <TranslationsContext.Provider value={context}>
      {props.children}
    </TranslationsContext.Provider>
  );
};

export const useTranslationsContext = () => useContext(TranslationsContext);
