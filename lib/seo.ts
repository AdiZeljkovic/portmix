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

/**
 * Slika koja se vidi kad se link zalijepi (Facebook, LinkedIn, WhatsApp,
 * Slack, iMessage…).
 *
 * 1200x630 je standard koji svi citaci razumiju; ista slika u punoj velicini
 * (1731x909, 1,9 MB) bi kod nekih — WhatsApp posebno — bila preskocena zbog
 * tezine. Ova je 93 KB.
 *
 * ⚠️ URL MORA biti apsolutan. Relativan (`/og.jpg`) rade neki citaci, ali
 * WhatsApp i dio Slack integracija ga tada ne dohvate.
 *
 * 📌 Natpis na slici je na FRANCUSKOM, a sajt ima cetiri jezika. Za sada ide
 * ista svima; kad stignu verzije po jeziku, ovdje se bira po `locale`.
 */
const OG_SLIKA = {
    url: `${BASE_URL}/og.jpg`,
    width: 1200,
    height: 630,
    alt: "PortMix SA — intérieurs d'exception"
};

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
            url: urlFor(locale, path),
            images: [OG_SLIKA]
        },
        /**
         * X/Twitter ne cita `openGraph.images` pouzdano — trazi svoje
         * `twitter:*` oznake, pa se navode i one.
         */
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [OG_SLIKA.url]
        }
    };
}
