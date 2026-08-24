import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
    // Staging safety net: build with NOINDEX=1 on any non-production host
    // so a preview deployment can never get indexed.
    if (process.env.NOINDEX === '1') {
        return { rules: { userAgent: '*', disallow: '/' } };
    }
    return {
        rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
        sitemap: `${BASE_URL}/sitemap.xml`
    };
}
