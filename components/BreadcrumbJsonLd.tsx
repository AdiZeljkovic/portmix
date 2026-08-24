import { getTranslations } from 'next-intl/server';
import { urlFor } from '@/lib/seo';

// BreadcrumbList JSON-LD for sub-pages (the site is one level deep, so no
// visual breadcrumb bar — markup only, for SERP breadcrumb display).
export default async function BreadcrumbJsonLd({
    locale,
    path,
    labelKey
}: {
    locale: string;
    path: string;
    labelKey: 'about' | 'services' | 'realisations' | 'contact';
}) {
    const t = await getTranslations({ locale, namespace: 'nav' });
    const data = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('home'), item: urlFor(locale, '') },
            { '@type': 'ListItem', position: 2, name: t(labelKey), item: urlFor(locale, path) }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
