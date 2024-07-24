export type TranslationKeys =
  | "github_link_label"
  | "advanced_settings"
  | "image_format_label"
  | "image_format_tooltip"
  | "image_format_field_info_trigger_text"
  | "image_format_field_info_title"
  | "error_correction_level_label"
  | "error_correction_level_tooltip"
  | "error_correction_level_field_info_trigger_text"
  | "error_correction_level_field_info_title"
  | "margin_label"
  | "margin_tooltip"
  | "margin_field_info_trigger_text"
  | "margin_field_info_title"
  | "scale_label"
  | "scale_tooltip"
  | "scale_field_info_trigger_text"
  | "scale_field_info_title"
  | "qr_code_data_label"
  | "qr_code_data_placeholder"
  | "generate_button"
  | "download_button"
  | "qr_code_alt_text"
  | "qr_code_data_too_large"
  | "qr_code_unknown_error"
  | "low_error_correction_level"
  | "medium_error_correction_level"
  | "quartile_error_correction_level"
  | "high_error_correction_level";

type Translation = Record<TranslationKeys, string>;

type Languages = "en" | "es";

export const resources: Record<Languages, { translation: Translation }> = {
  en: {
    translation: {
      github_link_label: "Check the project on github",
      advanced_settings: "Advanced settings",
      image_format_label: "Image Format",
      image_format_tooltip:
        "Format used to export the QR Code when using the 'download' button.",
      image_format_field_info_trigger_text:
        "Display 'Image Format' field information.",
      image_format_field_info_title: "'Image Format' field description",
      error_correction_level_label: "Error Correction Level",
      error_correction_level_tooltip:
        "Allows to successfully scan a QR Code even if it's dirty or damaged. Higher levels offer a better error resistance but reduces its capacity.",
      error_correction_level_field_info_trigger_text:
        "Display 'Error Correction Level' field information.",
      error_correction_level_field_info_title:
        "'Error Correction Level' field description",
      margin_label: "Margin",
      margin_tooltip:
        "Define how much wide the borders of the QR code should be.",
      margin_field_info_trigger_text: "Display 'Margin' field information.",
      margin_field_info_title: "'Margin' field description",
      scale_label: "Scale",
      scale_tooltip: "A value of 1 means 1 pixels per modules (black dots).",
      scale_field_info_trigger_text: "Display 'Scale' field information.",
      scale_field_info_title: "'Scale' field description",
      qr_code_data_label: "QR Code Data",
      qr_code_data_placeholder: "E.g. https://google.com",
      generate_button: "Generate QR Code",
      download_button: "Download",
      qr_code_alt_text: "QR Code",
      qr_code_data_too_large:
        "The data provided for the QR Code is too large. Please reduce the amount of data",
      qr_code_unknown_error:
        "An unknown error has occurred while creating your QR Code. Please create an issue at https://github.com/julio-salas03/qr-codes/issues if it persists",
      high_error_correction_level: "High",
      low_error_correction_level: "Low",
      medium_error_correction_level: "Medium",
      quartile_error_correction_level: "Quartile",
    },
  },
  es: {
    translation: {
      github_link_label: "Ver el proyecto en github",
      advanced_settings: "Configuración avanzada",
      image_format_label: "Formato de la imagen",
      image_format_tooltip:
        "Formato utilizado para exportar el código QR al usar el botón 'descargar'.",
      image_format_field_info_trigger_text:
        "Mostrar información del campo 'Formato de la imagen'.",
      image_format_field_info_title:
        "Descripción del campo 'Formato de la imagen'",
      error_correction_level_label: "Nivel de corrección de error",
      error_correction_level_tooltip:
        "Permite escanear correctamente un código QR incluso si este está sucio o dañado. Niveles más altos ofrecen mejor resistencia, pero reducen la capacidad del código.",
      error_correction_level_field_info_trigger_text:
        "Mostrar información del campo 'Nivel de corrección de error'.",
      error_correction_level_field_info_title:
        "Descripción del campo 'Nivel de corrección de error'",
      margin_label: "Margen",
      margin_tooltip: "Define cuán ancho deben ser los bordes del codigo QR.",
      margin_field_info_trigger_text: "Mostrar información del campo 'Margen'.",
      margin_field_info_title: "Descripción del campo margen",
      scale_label: "Escalado",
      scale_tooltip:
        "Un valor de 1 significa 1 pixel por módulo (puntos negros).",
      scale_field_info_trigger_text:
        "mostrar información del campo 'Escalado'.",
      scale_field_info_title: "Descripción del campo 'Escalado'",
      qr_code_data_label: "Datos del código QR",
      qr_code_data_placeholder: "Ej. https://google.com",
      generate_button: "Generar código QR",
      download_button: "Descargar",
      qr_code_alt_text: "Código QR",
      qr_code_data_too_large:
        "Los datos proporcionados para el código QR exceden su capacidad máxima. Por favor, reduzca la cantidad de datos.",
      qr_code_unknown_error:
        "Ha ocurrido un error desconocido al crear tu código QR. Por favor, crea un problema en https://github.com/julio-salas03/qr-codes/issues si este persiste.",
      high_error_correction_level: "Alto",
      low_error_correction_level: "Bajo",
      medium_error_correction_level: "Medio",
      quartile_error_correction_level: "Cuartil",
    },
  },
};
