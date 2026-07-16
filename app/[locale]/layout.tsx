import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import StructuredData from '@/components/StructuredData';
import { buildMetadata } from '@/lib/seo';
import '../globals.css';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin', 'latin-ext']
});

const sora = Sora({
    variable: '--font-sora',
    subsets: ['latin', 'latin-ext']
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    themeColor: '#181614'
};

// Runs before first paint: applies the stored theme (default dark) so there is
// no flash of the wrong theme, and keeps the theme-color meta in sync.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('pm-theme');if(t!=='light'&&t!=='dark'){t='dark'}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#f7f3ec':'#181614')}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.portmix.ch'),
        ...buildMetadata({ locale, path: '', title: t('title'), description: t('description') })
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'meta' });

    return (
        <html
            lang={locale}
            className={`${inter.variable} ${sora.variable} antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-screen flex flex-col bg-ink text-cream">
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
                <StructuredData locale={locale} description={t('description')} />
                <NextIntlClientProvider>
                    <Preloader />
                    <Cursor />
                    <ScrollProgress />
                    <SmoothScroll>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </SmoothScroll>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
