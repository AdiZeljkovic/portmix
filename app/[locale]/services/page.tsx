import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ImageReveal from '@/components/ImageReveal';
import Magnetic from '@/components/Magnetic';
import { buildMetadata } from '@/lib/seo';

const SERVICES = [
    { key: 'portes', image: '/images/placeholders/porte-2.jpg' },
    { key: 'armoires', image: '/images/placeholders/armoire-1.jpg' },
    { key: 'dressings', image: '/images/placeholders/dressing-2.jpg' }
] as const;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });
    return buildMetadata({
        locale,
        path: '/services',
        title: t('titleServices'),
        description: t('descriptionServices')
    });
}

export default async function ServicesPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('services');
    const tNav = await getTranslations('nav');

    return (
        <>
            <PageHeader kicker={t('kicker')} title={t('title')} intro={t('intro')} />

            {/* Alternating service sections */}
            <section className="mx-auto max-w-7xl space-y-24 px-5 py-24 lg:space-y-32 lg:px-8 lg:py-32">
                {SERVICES.map((s, i) => (
                    <div
                        key={s.key}
                        className={`grid items-center gap-12 lg:grid-cols-2 ${
                            i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                        }`}
                    >
                        <ImageReveal
                            src={s.image}
                            alt={t(`${s.key}Title`)}
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="aspect-[4/3] rounded-2xl"
                        />
                        <Reveal delay={0.15}>
                            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                                {t(`${s.key}Title`)}
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-cream/75">
                                {t(`${s.key}Text`)}
                            </p>
                            <ul className="mt-8 space-y-3">
                                {([1, 2, 3, 4] as const).map((n) => (
                                    <li key={n} className="flex items-start gap-3 text-cream/80">
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15">
                                            <Check size={14} className="text-brand" />
                                        </span>
                                        {t(`${s.key}F${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                ))}
            </section>

            {/* Process */}
            <section className="bg-ink-soft py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <p className="kicker">{t('processKicker')}</p>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            {t('processTitle')}
                        </h2>
                    </Reveal>
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {([1, 2, 3, 4] as const).map((n, i) => (
                            <Reveal key={n} delay={i * 0.12}>
                                <div className="h-full rounded-2xl border border-line bg-ink-card p-8">
                                    <div className="font-display text-5xl font-extrabold text-brand/25">
                                        0{n}
                                    </div>
                                    <h3 className="mt-4 font-display text-xl font-bold">
                                        {t(`step${n}Title`)}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-cream/65">
                                        {t(`step${n}Text`)}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal className="mt-16 flex justify-center">
                        <Magnetic>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                                {tNav('cta')}
                                <ArrowRight size={17} />
                            </Link>
                        </Magnetic>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
