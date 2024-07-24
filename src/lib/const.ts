import { t } from "./utils";

export enum IMAGE_FORMATS {
  PNG = "image/png",
  WEBP = "image/webp",
  JPEG = "image/jpeg",
}

export enum ERROR_CORRECTION_LEVEL {
  LOW = "L",
  MEDIUM = "M",
  QUARTILE = "Q",
  HIGH = "H",
}

export const ERROR_CORRECTION_LEVEL_LABELS = {
  [ERROR_CORRECTION_LEVEL.LOW]: () => t("low_error_correction_level"),
  [ERROR_CORRECTION_LEVEL.MEDIUM]: () => t("medium_error_correction_level"),
  [ERROR_CORRECTION_LEVEL.QUARTILE]: () => t("quartile_error_correction_level"),
  [ERROR_CORRECTION_LEVEL.HIGH]: () => t("high_error_correction_level"),
};
