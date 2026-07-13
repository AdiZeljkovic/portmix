import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.portmix.ch';

function urlFor(locale: string, path: string) {
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
            locale,
            type: 'website',
            url: urlFor(locale, path)
        }
    };
}
