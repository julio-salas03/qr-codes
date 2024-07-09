import { createEffect, createSignal, Show } from "solid-js";
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
import { Separator } from "~/components/ui/separator";
import { ArrowDown } from "./components/icons/arrow-down";
import { Col, Grid } from "~/components/ui/grid";
import { NumberField, NumberFieldInput } from "~/components/ui/number-field";

const imageFormatKeys = objectKeys(IMAGE_FORMATS);

function App() {
  const [data, setData] = createSignal("");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = createSignal<
    (typeof ERROR_CORRECTION_LEVELS)[number]
  >(ERROR_CORRECTION_LEVELS[1]);
  const [image, setImage] = createSignal("");
  const [imageFormat, setImageFormat] =
    createSignal<(typeof imageFormatKeys)[number]>("png");
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = createSignal(false);
  const [margin, setMargin] = createSignal(4);
  const [scale, setScale] = createSignal(4);

  createEffect(() => {
    if (!data()) return setImage("");

    QRCode.toDataURL(
      data(),
      {
        errorCorrectionLevel: errorCorrectionLevel(),
        margin: margin(),
        scale: scale(),
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
        <Collapsible
          onOpenChange={(open) => setAdvancedOptionsOpen(open)}
          open={advancedOptionsOpen()}
        >
          <CollapsibleTrigger class="flex py-2 space-x-1 mt-4 items-center justify-center">
            <span>Advanced settings</span>
            <ArrowDown
              classList={{
                "rotate-180 relative pb-1": advancedOptionsOpen(),
                "pt-1": !advancedOptionsOpen(),
              }}
            />
          </CollapsibleTrigger>
          <Separator class="mb-2" />
          <CollapsibleContent>
            <Grid cols={2} class="w-full gap-2">
              <Col>
                <Label class="space-x-1 flex items-center mb-3">
                  <span>Image Format</span>
                  <Popover>
                    <PopoverTrigger>
                      <AlertCircle />
                    </PopoverTrigger>
                    <PopoverContent>
                      Format used to export the QR Code when using the
                      "download" button
                    </PopoverContent>
                  </Popover>
                </Label>
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
                  <SelectTrigger aria-label="Image format">
                    <SelectValue<string>>
                      {(state) => state.selectedOption().toUpperCase()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </Col>
              <Col>
                <Label
                  class="space-x-1 flex items-center mb-3"
                  for="errorCorrectionLevel"
                >
                  <span>Error Correction Level</span>
                  <Popover>
                    <PopoverTrigger>
                      <AlertCircle />
                    </PopoverTrigger>
                    <PopoverContent>
                      Allows to successfully scan a QR Code even if the symbol
                      is dirty or damaged. Higher levels offer a better error
                      resistance but reduces the symbol's capacity
                    </PopoverContent>
                  </Popover>
                </Label>
                <Select
                  onChange={(value) => setErrorCorrectionLevel(value)}
                  value={errorCorrectionLevel()}
                  options={ERROR_CORRECTION_LEVELS.slice()}
                  placeholder="Select an image format..."
                  itemComponent={(props) => (
                    <SelectItem class="cursor-pointer" item={props.item}>
                      {props.item.rawValue.toUpperCase()}
                    </SelectItem>
                  )}
                >
                  <SelectTrigger aria-label="Image format">
                    <SelectValue<string>>
                      {(state) => state.selectedOption().toUpperCase()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent />
                </Select>
              </Col>
              <Col>
                <Label class="space-x-1 flex items-center mb-3">
                  <span>Margin</span>
                  <Popover>
                    <PopoverTrigger>
                      <AlertCircle />
                    </PopoverTrigger>
                    <PopoverContent>
                      Define how much wide the quiet zone should be.
                    </PopoverContent>
                  </Popover>
                </Label>
                <NumberField
                  onChange={(value) => setMargin(Number(value))}
                  defaultValue={4}
                  minValue={1}
                >
                  <div class="relative">
                    <NumberFieldInput />
                  </div>
                </NumberField>
              </Col>
              <Col>
                <Label class="space-x-1 flex items-center mb-3">
                  <span>Scale</span>
                  <Popover>
                    <PopoverTrigger>
                      <AlertCircle />
                    </PopoverTrigger>
                    <PopoverContent>
                      A value of 1 means 1px per modules (black dots).
                    </PopoverContent>
                  </Popover>
                </Label>
                <NumberField
                  onChange={(value) => setScale(Number(value))}
                  defaultValue={4}
                  minValue={1}
                >
                  <div class="relative">
                    <NumberFieldInput />
                  </div>
                </NumberField>
              </Col>
            </Grid>

            <Separator class="mb-2 mt-3" />
          </CollapsibleContent>
        </Collapsible>
        <div class="space-y-4">
          <TextField value={data()} onChange={(value) => setData(value)}>
            <Label class="space-y-3" for="data">
              <span>QR Code Data</span>
              <TextFieldTextArea
                placeholder="E.g. https://google.com"
                name="data"
                id="data"
              />
            </Label>
          </TextField>
        </div>

        <Show when={image()}>
          <div class="mt-4">
            <a
              download
              href={image()}
              class={buttonVariants({ variant: "default" })}
            >
              Download
            </a>
            <img
              class="mx-auto border-4 border-black"
              src={image()}
              alt="QR Code"
            />
          </div>
        </Show>
      </main>
    </div>
  );
}

export default App;
