type TranslationKeys =
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
  | "qr_code_alt_text";

type Translation = Record<TranslationKeys, string>;

export const resources: Record<string, { translation: Translation }> = {
  en: {
    translation: {
      github_link_label: "check the project on github",
      advanced_settings: "Advanced settings",
      image_format_label: "Image Format",
      image_format_tooltip:
        "Format used to export the QR Code when using the 'download' button.",
      image_format_field_info_trigger_text:
        "display image format field information.",
      image_format_field_info_title: "Image Format field description",
      error_correction_level_label: "Error Correction Level",
      error_correction_level_tooltip:
        "Allows to successfully scan a QR Code even if the symbol is dirty or damaged. Higher levels offer a better error resistance but reduces the symbol's capacity.",
      error_correction_level_field_info_trigger_text:
        "display error correction level field information.",
      error_correction_level_field_info_title:
        "Error Correction Level field description",
      margin_label: "Margin",
      margin_tooltip: "Define how much wide the quiet zone should be.",
      margin_field_info_trigger_text: "display margin field information.",
      margin_field_info_title: "Margin field description",
      scale_label: "Scale",
      scale_tooltip: "A value of 1 means 1px per modules (black dots).",
      scale_field_info_trigger_text: "display scale field information.",
      scale_field_info_title: "Scale field description",
      qr_code_data_label: "QR Code Data",
      qr_code_data_placeholder: "E.g. https://google.com",
      generate_button: "Generate QR Code",
      download_button: "Download",
      qr_code_alt_text: "QR Code",
    },
  },
  es: {
    translation: {
      github_link_label: "ver el proyecto en github",
      advanced_settings: "Configuración avanzada",
      image_format_label: "Formato de imagen",
      image_format_tooltip:
        "Formato utilizado para exportar el código QR cuando se usa el botón 'descargar'.",
      image_format_field_info_trigger_text:
        "mostrar información del campo de formato de imagen.",
      image_format_field_info_title:
        "Descripción del campo de formato de imagen",
      error_correction_level_label: "Nivel de corrección de error",
      error_correction_level_tooltip:
        "Permite escanear correctamente un código QR incluso si el símbolo está sucio o dañado. Niveles más altos ofrecen mejor resistencia a errores pero reducen la capacidad del símbolo.",
      error_correction_level_field_info_trigger_text:
        "mostrar información del campo de nivel de corrección de error.",
      error_correction_level_field_info_title:
        "Descripción del campo de nivel de corrección de error",
      margin_label: "Margen",
      margin_tooltip: "Define cuán ancha debe ser la zona tranquila.",
      margin_field_info_trigger_text:
        "mostrar información del campo de margen.",
      margin_field_info_title: "Descripción del campo de margen",
      scale_label: "Escala",
      scale_tooltip: "Un valor de 1 significa 1px por módulos (puntos negros).",
      scale_field_info_trigger_text: "mostrar información del campo de escala.",
      scale_field_info_title: "Descripción del campo de escala",
      qr_code_data_label: "Datos del código QR",
      qr_code_data_placeholder: "Ej. https://google.com",
      generate_button: "Generar código QR",
      download_button: "Descargar",
      qr_code_alt_text: "Código QR",
    },
  },
};
