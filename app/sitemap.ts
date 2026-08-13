import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { urlFor } from '@/lib/seo';

const PATHS = ['', '/a-propos', '/services', '/realisations', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
    return PATHS.flatMap((path) =>
        routing.locales.map((locale) => ({
            url: urlFor(locale, path),
            changeFrequency: 'monthly' as const,
            priority: path === '' ? 1 : 0.8,
            alternates: {
                languages: Object.fromEntries(
                    routing.locales.map((l) => [l, urlFor(l, path)])
                )
            }
        }))
    );
}
