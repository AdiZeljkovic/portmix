import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ParallaxImage from '@/components/ParallaxImage';

// TODO: replace with the client's real projects & photos when they arrive
const PROJECTS = [
    { n: 1, image: '/images/placeholders/projet-1.jpg' },
    { n: 2, image: '/images/placeholders/projet-2.jpg' },
    { n: 3, image: '/images/placeholders/projet-3.jpg' },
    { n: 4, image: '/images/placeholders/projet-4.jpg' },
    { n: 5, image: '/images/placeholders/projet-5.jpg' },
    { n: 6, image: '/images/placeholders/projet-6.jpg' }
] as const;

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });
    return { title: t('titleRealisations'), description: t('description') };
}

export default async function RealisationsPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('realisations');

    return (
        <>
            <PageHeader kicker={t('kicker')} title={t('title')} intro={t('intro')} />

            {/* Project grid */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {PROJECTS.map((p, i) => (
                        <Reveal key={p.n} delay={(i % 3) * 0.1}>
                            <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                                <ParallaxImage
                                    src={p.image}
                                    alt={t(`project${p.n}`)}
                                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                    className="absolute inset-0"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-6">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                                        {t(`project${p.n}Cat`)}
                                    </p>
                                    <h3 className="mt-2 font-display text-xl font-bold">
                                        {t(`project${p.n}`)}
                                    </h3>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Showroom CTA */}
            <section className="relative overflow-hidden py-28 lg:py-40">
                <Image
                    src="/images/placeholders/showroom-1.jpg"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/80" />
                <Reveal className="relative mx-auto max-w-3xl px-5 text-center">
                    <p className="kicker">{t('showroomKicker')}</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                        {t('showroomTitle')}
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
                        {t('showroomText')}
                    </p>
                    <Link
                        href="/contact"
                        className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                        {t('showroomCta')}
                        <ArrowRight size={17} />
                    </Link>
                </Reveal>
            </section>
        </>
    );
}
