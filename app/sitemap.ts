import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.portmix.ch';
const PATHS = ['', '/a-propos', '/services', '/realisations', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
    return PATHS.flatMap((path) =>
        routing.locales.map((locale) => ({
            url:
                locale === routing.defaultLocale
                    ? `${BASE_URL}${path || '/'}`
                    : `${BASE_URL}/${locale}${path}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: path === '' ? 1 : 0.8
        }))
    );
}
