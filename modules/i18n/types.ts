export interface I18nLocale {
  code: string;
  name: string;
  file: string;
}

export interface ModuleOptions {
  defaultLocale: string;
  locales: I18nLocale[];
}
