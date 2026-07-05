import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'de', 'en'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed' // no /fr prefix for the default locale
});

export type Locale = (typeof routing.locales)[number];
