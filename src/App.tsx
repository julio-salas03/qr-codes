import { createEffect, createSignal, For, Show } from "solid-js";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "~/components/ui/radio-group";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import { Label } from "~/components/ui/label";
import { ERROR_CORRECTION_LEVELS } from "./lib/const";
import QRCode from "qrcode";
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
    <main class="container mx-auto p-5 grid grid-cols-2 gap-5">
      <div class="space-y-4">
        <TextField
          value={data()}
          onChange={(value) => setData(value)}
          class="space-y-3"
        >
          <Label for="data">QR Code data</Label>
          <TextFieldInput
            placeholder="E.g. https://google.com"
            name="data"
            id="data"
            type="text"
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
        <img src={image()} alt="QR Code" />
      </Show>
    </main>
  );
}

export default App;
