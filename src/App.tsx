import { createEffect, createSignal, For, Show } from "solid-js";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemLabel,
} from "~/components/ui/radio-group";
import { TextField, TextFieldTextArea } from "~/components/ui/text-field";
import { Label } from "~/components/ui/label";
import { ERROR_CORRECTION_LEVELS, IMAGE_FORMATS } from "./lib/const";
import QRCode from "qrcode";
import { buttonVariants } from "~/components/ui/button";
import { GitHub } from "./components/icons/github";
import { AlertCircle } from "./components/icons/alert-circle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { objectKeys } from "./lib/utils";

const imageFormatKeys = objectKeys(IMAGE_FORMATS);

function App() {
  const [data, setData] = createSignal("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = createSignal<
    (typeof ERROR_CORRECTION_LEVELS)[number]
  >(ERROR_CORRECTION_LEVELS[0]);
  const [image, setImage] = createSignal("");
  const [imageFormat, setImageFormat] =
    createSignal<(typeof imageFormatKeys)[number]>("png");

  createEffect(() => {
    if (!data()) return setImage("");

    QRCode.toDataURL(
      data(),
      {
        errorCorrectionLevel: errorCorrectionLevel(),
        margin: 2,
        type: IMAGE_FORMATS[imageFormat()],
      },
      (err, url) => {
        if (err) throw err;
        setImage(url);
      }
    );
  });

  return (
    <div>
      <nav class="bg-black h-14 flex text-white items-center justify-end px-6">
        <a target="_blank" href="https://github.com/julio-salas03/qr-codes">
          <GitHub />
        </a>
      </nav>
      <main class="container mx-auto">
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
            <Label
              class="space-x-1 flex items-center"
              for="errorCorrectionLevel"
            >
              <span>Error correction level</span>
              <Popover>
                <PopoverTrigger>
                  <AlertCircle />
                </PopoverTrigger>
                <PopoverContent>
                  Allows to successfully scan a QR Code even if the symbol is
                  dirty or damaged. Higher levels offer a better error
                  resistance but reduces the symbol's capacity
                </PopoverContent>
              </Popover>
            </Label>
            <RadioGroup
              value={errorCorrectionLevel()}
              onChange={(value) => {
                /**
                 * TODO: remove this type assertion
                 */
                setErrorCorrectionLevel(
                  value as (typeof ERROR_CORRECTION_LEVELS)[number]
                );
              }}
              defaultValue={ERROR_CORRECTION_LEVELS[0]}
              name="errorCorrectionLevel"
            >
              <For each={ERROR_CORRECTION_LEVELS}>
                {(level) => (
                  <RadioGroupItem value={level}>
                    <RadioGroupItemLabel>{level}</RadioGroupItemLabel>
                  </RadioGroupItem>
                )}
              </For>
            </RadioGroup>
          </div>
        </div>
        <Collapsible>
          <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
          <CollapsibleContent>
            <Select
              onChange={(value) => setImageFormat(value)}
              defaultValue={imageFormat()}
              options={imageFormatKeys}
              placeholder="Select an image format..."
              itemComponent={(props) => (
                <SelectItem class="cursor-pointer" item={props.item}>
                  {props.item.rawValue.toUpperCase()}
                </SelectItem>
              )}
            >
              <SelectTrigger aria-label="Image format" class="w-[180px]">
                <SelectValue<string>>
                  {(state) => state.selectedOption()?.toUpperCase()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </CollapsibleContent>
        </Collapsible>
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
    </div>
  );
}

export default App;
