import { getRequestConfig } from 'next-intl/server';

export const locales = ['uz', 'ru'] as const;

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale ?? 'uz'}.json`)).default
}));
