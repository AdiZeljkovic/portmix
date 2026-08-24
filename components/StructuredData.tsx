import { COMPANY } from '@/lib/company';
import { BASE_URL } from '@/lib/site';

// schema.org WebSite + LocalBusiness markup for local SEO / rich results.
// No `image`/`sameAs` yet — add once real photos and verified social
// profiles exist, rather than pointing search engines at placeholders.
export default function StructuredData({
    description
}: {
    description: string;
}) {
    const data = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': `${BASE_URL}/#website`,
                name: COMPANY.name,
                url: BASE_URL,
                inLanguage: ['fr', 'de', 'en', 'it'],
                publisher: { '@id': `${BASE_URL}/#business` }
            },
            {
                '@type': 'HomeAndConstructionBusiness',
                '@id': `${BASE_URL}/#business`,
                name: COMPANY.name,
                url: BASE_URL,
                telephone: COMPANY.phone,
                email: COMPANY.email,
                description,
                foundingDate: String(COMPANY.foundedYear),
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: COMPANY.street,
                    postalCode: COMPANY.postalCode,
                    addressLocality: COMPANY.city,
                    addressRegion: COMPANY.region,
                    addressCountry: COMPANY.country
                },
                areaServed: ['Vaud', 'Genève', 'Suisse romande']
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
