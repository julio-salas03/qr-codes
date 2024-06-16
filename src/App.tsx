import { createEffect, createSignal, For, Show } from "solid-js";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "~/components/ui/radio-group";
import { TextField, TextFieldTextArea } from "~/components/ui/text-field";
import { Label } from "~/components/ui/label";
import { ERROR_CORRECTION_LEVELS } from "./lib/const";
import QRCode from "qrcode";
import { buttonVariants } from "~/components/ui/button";

function App() {
  const [data, setData] = createSignal("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = createSignal<
    (typeof ERROR_CORRECTION_LEVELS)[number]
  >(ERROR_CORRECTION_LEVELS[0]);
  const [image, setImage] = createSignal("");

  createEffect(() => {
    if (!data()) return setImage("");

    QRCode.toDataURL(
      data(),
      { errorCorrectionLevel: errorCorrectionLevel() },
      (err, url) => {
        if (err) throw err;
        setImage(url);
      }
    );
  });

  return (
    <main class="">
      <nav class="bg-black h-14 flex text-white items-center justify-end px-6">
        <a target="_blank" href="https://github.com/julio-salas03/qr-codes">
          <svg
            width={36}
            height={36}
            fill="currentColor"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </nav>
      <div class="space-y-4">
        <TextField
          value={data()}
          onChange={(value) => setData(value)}
          class="space-y-3"
        >
          <Label for="data">QR Code data</Label>
          <TextFieldTextArea
            placeholder="E.g. https://google.com"
            name="data"
            id="data"
          />
        </TextField>
        <div class="space-y-3">
          <Label for="errorCorrectionLevel">Error correction level</Label>
          <RadioGroup
            value={errorCorrectionLevel()}
            onChange={(value) => setErrorCorrectionLevel(value)}
            defaultValue={ERROR_CORRECTION_LEVELS[0]}
            name="errorCorrectionLevel"
          >
            <For each={ERROR_CORRECTION_LEVELS}>
              {(fruit) => (
                <RadioGroupItem value={fruit}>
                  <RadioGroupItemLabel>{fruit}</RadioGroupItemLabel>
                </RadioGroupItem>
              )}
            </For>
          </RadioGroup>
        </div>
      </div>
      <Show when={image()}>
        <div>
          <img src={image()} alt="QR Code" />
          <a
            download
            href={image()}
            class={buttonVariants({ variant: "default" })}
          >
            Download
          </a>
        </div>
      </Show>
    </main>
  );
}

export default App;
