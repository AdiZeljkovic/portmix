import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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

// The 'latin' subset already covers fr/de/en/it (accents, ß, œ) — dropping
// latin-ext halves the font payload.
const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin']
});

const sora = Sora({
    variable: '--font-sora',
    subsets: ['latin']
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    themeColor: '#1d1a17'
};

// Google Analytics 4 — inactive until NEXT_PUBLIC_GA_ID (G-XXXXXXX) is set
// in the deploy environment.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        <html lang={locale} className={`${inter.variable} ${sora.variable} antialiased`}>
            <body className="min-h-screen flex flex-col bg-ink text-cream">
                <StructuredData description={t('description')} />
                {GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="ga4" strategy="afterInteractive">
                            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
                        </Script>
                    </>
                )}
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
