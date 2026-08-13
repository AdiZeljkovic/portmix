import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { BASE_URL } from '@/lib/site';

// OpenGraph wants language_TERRITORY locales, not bare language codes.
const OG_LOCALES: Record<string, string> = {
    fr: 'fr_CH',
    de: 'de_CH',
    en: 'en_US',
    it: 'it_CH'
};

export function urlFor(locale: string, path: string) {
    return locale === routing.defaultLocale ? `${BASE_URL}${path || '/'}` : `${BASE_URL}/${locale}${path}`;
}

// Builds title/description plus hreflang alternates and OpenGraph for a
// given page path, so every route gets its own canonical + language variants
// instead of silently inheriting the homepage's.
export function buildMetadata({
    locale,
    path,
    title,
    description
}: {
    locale: string;
    path: string;
    title: string;
    description: string;
}): Metadata {
    const languages: Record<string, string> = { 'x-default': urlFor(routing.defaultLocale, path) };
    for (const l of routing.locales) {
        languages[l] = urlFor(l, path);
    }

    return {
        title,
        description,
        alternates: {
            canonical: urlFor(locale, path),
            languages
        },
        openGraph: {
            title,
            description,
            siteName: 'PortMix SA',
            locale: OG_LOCALES[locale] ?? locale,
            alternateLocale: routing.locales
                .filter((l) => l !== locale)
                .map((l) => OG_LOCALES[l] ?? l),
            type: 'website',
            url: urlFor(locale, path)
        }
    };
}
