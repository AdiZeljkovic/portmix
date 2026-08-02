import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['fr', 'de', 'en', 'it'],
    defaultLocale: 'fr',
    localePrefix: 'as-needed', // no /fr prefix for the default locale
    // Always open in French — don't redirect based on the browser's
    // Accept-Language; visitors switch languages explicitly via the menu.
    localeDetection: false
});

export type Locale = (typeof routing.locales)[number];
