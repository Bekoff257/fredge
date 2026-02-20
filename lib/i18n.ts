export const locales = ['uz', 'ru'] as const;
export type Locale = (typeof locales)[number];

export async function getMessages(locale: Locale) {
  return (await import(`@/i18n/messages/${locale}.json`)).default;
}
