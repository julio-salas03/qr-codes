import { createSignal, Show } from 'solid-js';
import { TextField, TextFieldTextArea } from '~/components/ui/text-field';
import { Label } from '~/components/ui/label';
import {
  ERROR_CORRECTION_LEVEL,
  ERROR_CORRECTION_LEVEL_LABELS,
  IMAGE_FORMATS,
} from './lib/const';
import QRCode from 'qrcode';
import { buttonVariants } from '~/components/ui/button';
import { GitHub } from './components/icons/github';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { download, t } from './lib/utils';
import { Separator } from '~/components/ui/separator';
import { ArrowDown } from './components/icons/arrow-down';
import { Col, Grid } from '~/components/ui/grid';
import { NumberField, NumberFieldInput } from '~/components/ui/number-field';
import ThemeProvider from './components/ThemeProvider';
import ThemePicker from './components/ThemePicker';
import { Button } from '~/components/ui/button';
import { createForm } from '@felte/solid';
import { HiddenSelect } from '@kobalte/core/select';
import InputTooltip from './components/InputTooltip';
import LanguagePicker from './components/LanguagePicker';
import SkipLink from './components/SkipLink';
import { showToast } from './components/ui/toast';

const DEFAULT_FORM_VALUES = {
  data: '',
  scale: 4,
  margin: 4,
  errorCorrectionLevel: ERROR_CORRECTION_LEVEL.MEDIUM,
  imageFormat: IMAGE_FORMATS.PNG,
};

function App() {
  const [image, setImage] = createSignal('');
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
          if (err) {
            if (err.message.includes('amount of data is too big'))
              return showToast({
                variant: 'error',
                title: t('qr_code_data_too_large'),
              });
            return showToast({
              variant: 'error',
              title: t('qr_code_unknown_error'),
            });
          }
          setImage(url);
        }
      );
    },
  });

  return (
    <ThemeProvider>
      <div class="min-h-screen bg-background pb-10 text-foreground">
        <nav class="border-b">
          <div class="container relative flex h-14 items-center justify-end gap-2">
            <SkipLink />
            <a
              class={buttonVariants({
                variant: 'ghost',
                class: 'w-9 !px-0',
                size: 'sm',
              })}
              target="_blank"
              href="https://github.com/julio-salas03/qr-codes"
            >
              <GitHub />
              <span class="sr-only">{t('download_button')}</span>
            </a>
            <LanguagePicker />
            <ThemePicker />
          </div>
        </nav>
        <main id="main">
          <Grid colsLg={12} class="container mt-4 gap-10 md:mt-10 lg:mt-36">
            <Col span={6}>
              <form ref={form} class="rounded-md border p-4">
                <Collapsible
                  onOpenChange={open => setAdvancedOptionsOpen(open)}
                  open={advancedOptionsOpen()}
                >
                  <CollapsibleTrigger class="flex items-center justify-center space-x-1 py-2">
                    <span>{t('advanced_settings')}</span>
                    <ArrowDown
                      classList={{
                        'rotate-180 relative pb-1': advancedOptionsOpen(),
                        'pt-1': !advancedOptionsOpen(),
                      }}
                    />
                  </CollapsibleTrigger>
                  <Separator class="my-2" />
                  <CollapsibleContent>
                    <Grid cols={2} class="w-full gap-2">
                      <Col>
                        <div class="mb-3 flex items-center space-x-1">
                          <Label for="imageFormat">
                            {t('image_format_label')}
                          </Label>
                          <InputTooltip
                            triggerText={t(
                              'image_format_field_info_trigger_text'
                            )}
                            title={t('image_format_field_info_title')}
                          >
                            {t('image_format_tooltip')}
                          </InputTooltip>
                        </div>
                        <Select
                          name="imageFormat"
                          options={Object.values(IMAGE_FORMATS)}
                          defaultValue={DEFAULT_FORM_VALUES.imageFormat}
                          itemComponent={props => (
                            <SelectItem
                              class="cursor-pointer"
                              item={props.item}
                            >
                              {props.item.rawValue
                                .replace('image/', '')
                                .toUpperCase()}
                            </SelectItem>
                          )}
                          disallowEmptySelection
                        >
                          <HiddenSelect />
                          <SelectTrigger aria-label={t('image_format_label')}>
                            <SelectValue<string>>
                              {state =>
                                state
                                  .selectedOption()
                                  .replace('image/', '')
                                  .toUpperCase()
                              }
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent />
                        </Select>
                      </Col>
                      <Col>
                        <div class="mb-3 flex items-center space-x-1">
                          <Label for="errorCorrectionLevel">
                            <span>{t('error_correction_level_label')}</span>
                          </Label>
                          <InputTooltip
                            triggerText={t(
                              'error_correction_level_field_info_trigger_text'
                            )}
                            title={t('error_correction_level_field_info_title')}
                          >
                            {t('error_correction_level_tooltip')}
                          </InputTooltip>
                        </div>
                        <Select
                          name="errorCorrectionLevel"
                          defaultValue={
                            DEFAULT_FORM_VALUES.errorCorrectionLevel
                          }
                          options={Object.values(ERROR_CORRECTION_LEVEL)}
                          itemComponent={props => (
                            <SelectItem
                              class="cursor-pointer"
                              item={props.item}
                            >
                              {ERROR_CORRECTION_LEVEL_LABELS[
                                props.item.rawValue
                              ]()}
                            </SelectItem>
                          )}
                          disallowEmptySelection
                        >
                          <HiddenSelect />
                          <SelectTrigger
                            aria-label={t('error_correction_level_label')}
                          >
                            <SelectValue<ERROR_CORRECTION_LEVEL>>
                              {state =>
                                ERROR_CORRECTION_LEVEL_LABELS[
                                  state.selectedOption()
                                ]()
                              }
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent />
                        </Select>
                      </Col>
                      <Col>
                        <NumberField
                          defaultValue={DEFAULT_FORM_VALUES.margin}
                          minValue={1}
                        >
                          <div class="mb-3 flex items-center space-x-1">
                            <Label for="margin">{t('margin_label')}</Label>
                            <InputTooltip
                              triggerText={t('margin_field_info_trigger_text')}
                              title={t('margin_field_info_title')}
                            >
                              {t('margin_tooltip')}
                            </InputTooltip>
                          </div>
                          <NumberFieldInput name="margin" />
                        </NumberField>
                      </Col>
                      <Col>
                        <NumberField
                          defaultValue={DEFAULT_FORM_VALUES.scale}
                          minValue={1}
                        >
                          <div class="mb-3 flex items-center space-x-1">
                            <Label for="scale">{t('scale_label')}</Label>
                            <InputTooltip
                              triggerText={t('scale_field_info_trigger_text')}
                              title={t('scale_field_info_title')}
                            >
                              {t('scale_tooltip')}
                            </InputTooltip>
                          </div>
                          <NumberFieldInput name="scale" />
                        </NumberField>
                      </Col>
                    </Grid>
                    <Separator class="mb-2 mt-3" />
                  </CollapsibleContent>
                </Collapsible>
                <div class="space-y-4">
                  <TextField>
                    <Label class="space-y-3">
                      <span>{t('qr_code_data_label')}</span>
                      <TextFieldTextArea
                        placeholder={t('qr_code_data_placeholder')}
                        name="data"
                        required
                      />
                    </Label>
                  </TextField>
                </div>
                <div class="mt-3 flex gap-2">
                  <Button type="submit">{t('generate_button')}</Button>
                  <Button
                    type="button"
                    variant="secondary"
                    disabled={!image()}
                    onClick={() => download(image())}
                  >
                    {t('download_button')}
                  </Button>
                </div>
              </form>
            </Col>
            <Col span={6}>
              <Show when={image()}>
                <div class="mt-4 md:mt-10">
                  <img
                    class="mx-auto border-4 border-foreground"
                    src={image()}
                    alt={t('qr_code_alt_text')}
                  />
                </div>
              </Show>
            </Col>
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
