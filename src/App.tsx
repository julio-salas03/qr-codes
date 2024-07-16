import { createSignal, Show } from "solid-js";
import { TextField, TextFieldTextArea } from "~/components/ui/text-field";
import { Label } from "~/components/ui/label";
import { ERROR_CORRECTION_LEVEL, IMAGE_FORMATS } from "./lib/const";
import QRCode from "qrcode";
import { buttonVariants } from "~/components/ui/button";
import { GitHub } from "./components/icons/github";
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
import { download } from "./lib/utils";
import { Separator } from "~/components/ui/separator";
import { ArrowDown } from "./components/icons/arrow-down";
import { Col, Grid } from "~/components/ui/grid";
import { NumberField, NumberFieldInput } from "~/components/ui/number-field";
import ThemeProvider from "./components/ThemeProvider";
import ThemePicker from "./components/ThemePicker";
import InputTooltip from "./components/InputTooltip";
import { Button } from "~/components/ui/button";
import { Description as NumberFieldDescription } from "@kobalte/core/number-field";
import { createForm } from "@felte/solid";
import { HiddenSelect } from "@kobalte/core/select";

const DEFAULT_FORM_VALUES = {
  data: "",
  scale: 4,
  margin: 4,
  errorCorrectionLevel: ERROR_CORRECTION_LEVEL.MEDIUM,
  imageFormat: IMAGE_FORMATS.PNG,
};

function App() {
  const [image, setImage] = createSignal("");
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = createSignal(false);

  const { form } = createForm({
    initialValues: DEFAULT_FORM_VALUES,
    onSubmit: ({ data, margin, scale, errorCorrectionLevel, imageFormat }) => {
      QRCode.toDataURL(
        data,
        {
          errorCorrectionLevel,
          margin,
          scale,
          type: imageFormat,
        },
        (err, url) => {
          if (err) throw err;
          setImage(url);
        }
      );
    },
  });


  return (
    <ThemeProvider>
      <div class="text-foreground bg-background min-h-screen">
        <nav class="h-14 flex items-center justify-end px-6 border-b gap-2">
          <a
            class={buttonVariants({
              variant: "ghost",
              class: "w-9 !px-0",
              size: "sm",
            })}
            target="_blank"
            href="https://github.com/julio-salas03/qr-codes"
          >
            <GitHub />
            <span class="sr-only">check the project on github</span>
          </a>
          <ThemePicker />
        </nav>
        <form ref={form} class="container mx-auto">
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
                  <Label>
                    <span class="space-x-1 flex items-center mb-3">
                      <span>Image Format</span>
                      <InputTooltip>
                        Format used to export the QR Code when using the
                        "download" button
                      </InputTooltip>
                    </span>
                    <Select
                      name="imageFormat"
                      options={Object.values(IMAGE_FORMATS)}
                      defaultValue={DEFAULT_FORM_VALUES.imageFormat}
                      itemComponent={(props) => (
                        <SelectItem class="cursor-pointer" item={props.item}>
                          {props.item.rawValue
                            .replace("image/", "")
                            .toUpperCase()}
                        </SelectItem>
                      )}
                      disallowEmptySelection
                    >
                      <HiddenSelect />
                      <SelectTrigger aria-label="Image format">
                        <SelectValue<string>>
                          {(state) =>
                            state
                              .selectedOption()
                              .replace("image/", "")
                              .toUpperCase()
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent />
                    </Select>
                  </Label>
                </Col>
                <Col>
                  <Label for="errorCorrectionLevel">
                    <span class="space-x-1 flex items-center mb-3">
                      <span>Error Correction Level</span>
                      <InputTooltip>
                        Allows to successfully scan a QR Code even if the symbol
                        is dirty or damaged. Higher levels offer a better error
                        resistance but reduces the symbol's capacity
                      </InputTooltip>
                    </span>
                    <Select
                      name="errorCorrectionLevel"
                      defaultValue={DEFAULT_FORM_VALUES.errorCorrectionLevel}
                      options={Object.values(ERROR_CORRECTION_LEVEL)}
                      itemComponent={(props) => (
                        <SelectItem class="cursor-pointer" item={props.item}>
                          {props.item.rawValue.toUpperCase()}
                        </SelectItem>
                      )}
                      disallowEmptySelection
                    >
                      <HiddenSelect />
                      <SelectTrigger aria-label="Image format">
                        <SelectValue<string>>
                          {(state) => state.selectedOption().toUpperCase()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent />
                    </Select>
                  </Label>
                </Col>
                <Col>
                  <NumberField
                    defaultValue={DEFAULT_FORM_VALUES.margin}
                    minValue={1}
                  >
                    <Label>
                      <span class="space-x-1 flex items-center mb-3">
                        <span>Margin</span>
                        <InputTooltip>
                          <NumberFieldDescription>
                            Define how much wide the quiet zone should be.
                          </NumberFieldDescription>
                        </InputTooltip>
                      </span>
                      <span class="relative block">
                        <NumberFieldInput name="margin" />
                      </span>
                    </Label>
                  </NumberField>
                </Col>
                <Col>
                  <NumberField
                    defaultValue={DEFAULT_FORM_VALUES.scale}
                    minValue={1}
                  >
                    <Label>
                      <span class="space-x-1 flex items-center mb-3">
                        <span>Scale</span>
                        <InputTooltip>
                          <NumberFieldDescription>
                            A value of 1 means 1px per modules (black dots).
                          </NumberFieldDescription>
                        </InputTooltip>
                      </span>
                      <span class="relative block">
                        <NumberFieldInput name="scale" />
                      </span>
                    </Label>
                  </NumberField>
                </Col>
              </Grid>
              <Separator class="mb-2 mt-3" />
            </CollapsibleContent>
          </Collapsible>
          <div class="space-y-4">
            <TextField>
              <Label class="space-y-3">
                <span>QR Code Data</span>
                <TextFieldTextArea
                  placeholder="E.g. https://google.com"
                  name="data"
                  required
                />
              </Label>
            </TextField>
          </div>
          <div class="mt-3 flex gap-2">
            <Button type="submit">Generate QR Code</Button>
            <Button
              type="button"
              variant="secondary"
              disabled={!image()}
              onClick={() => download(image())}
            >
              Download
            </Button>
          </div>
          <Show when={image()}>
            <div class="mt-4">
              <img
                class="mx-auto border-4 border-foreground"
                src={image()}
                alt="QR Code"
              />
            </div>
          </Show>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default App;
