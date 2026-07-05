import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import AnimatedText from '@/components/AnimatedText';
import Counter from '@/components/Counter';
import Marquee from '@/components/Marquee';
import Magnetic from '@/components/Magnetic';
import HorizontalGallery from '@/components/HorizontalGallery';

const SERVICES = [
    { key: 'Portes', image: '/images/placeholders/porte-1.jpg' },
    { key: 'Armoires', image: '/images/placeholders/armoire-1.jpg' },
    { key: 'Dressings', image: '/images/placeholders/dressing-1.jpg' }
] as const;

// TODO: replace with real projects once the client's photos arrive (WhatsApp)
const FEATURED = [1, 3, 2, 4, 6, 5] as const;

export default async function HomePage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('home');
    const tr = await getTranslations('realisations');

    return (
        <>
            <Hero />

            {/* Intro */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <p className="kicker">{t('introKicker')}</p>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            <AnimatedText text={t('introTitle')} />
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="text-lg leading-relaxed text-cream/75">{t('introText')}</p>
                        <Link
                            href="/a-propos"
                            className="group mt-6 inline-flex items-center gap-2 font-semibold text-brand"
                        >
                            {t('introLink')}
                            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* Marquee band */}
            <Marquee
                items={[
                    t('marquee1'),
                    t('marquee2'),
                    t('marquee3'),
                    t('marquee4'),
                    t('marquee5')
                ]}
            />

            {/* Services */}
            <section className="bg-ink-soft py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <p className="kicker">{t('servicesKicker')}</p>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            <AnimatedText text={t('servicesTitle')} />
                        </h2>
                    </Reveal>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {SERVICES.map((s, i) => (
                            <Reveal key={s.key} delay={i * 0.12}>
                                <TiltCard className="overflow-hidden rounded-2xl border border-line bg-ink-card">
                                    <Link href="/services" className="group block">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image
                                                src={s.image}
                                                alt={t(`service${s.key}Title`)}
                                                fill
                                                sizes="(min-width: 768px) 33vw, 100vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent" />
                                        </div>
                                        <div className="p-7">
                                            <h3 className="font-display text-2xl font-bold">
                                                {t(`service${s.key}Title`)}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-cream/65">
                                                {t(`service${s.key}Text`)}
                                            </p>
                                            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                                                {t('serviceMore')}
                                                <ArrowRight
                                                    size={15}
                                                    className="transition-transform group-hover:translate-x-1"
                                                />
                                            </span>
                                        </div>
                                    </Link>
                                </TiltCard>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-line">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line lg:grid-cols-4">
                    {([1, 2, 3, 4] as const).map((n, i) => (
                        <Reveal
                            key={n}
                            delay={i * 0.1}
                            className={`px-6 py-12 text-center lg:py-16 ${
                                i >= 2 ? 'border-t border-line lg:border-t-0' : ''
                            }`}
                        >
                            <div className="font-display text-4xl font-extrabold text-brand sm:text-5xl">
                                <Counter value={t(`stat${n}Value`)} />
                            </div>
                            <div className="mt-3 text-sm text-cream/60">{t(`stat${n}Label`)}</div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Featured projects — pinned horizontal gallery */}
            <HorizontalGallery
                kicker={t('featuredKicker')}
                title={t('featuredTitle')}
                cta={t('featuredCta')}
                viewLabel={tr('viewLabel')}
                projects={FEATURED.map((n) => ({
                    title: tr(`project${n}`),
                    cat: tr(`project${n}Cat`),
                    image: `/images/placeholders/projet-${n}.jpg`
                }))}
            />

            {/* Showroom band */}
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
                    <div className="mt-9 flex justify-center">
                        <Magnetic>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                                {t('showroomCta')}
                                <ArrowRight size={17} />
                            </Link>
                        </Magnetic>
                    </div>
                </Reveal>
            </section>

            {/* Contact CTA */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
                <Reveal className="rounded-3xl border border-line bg-ink-soft px-8 py-14 text-center lg:py-20">
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        {t('ctaTitle')}
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg text-cream/70">{t('ctaText')}</p>
                    <div className="mt-8 flex justify-center">
                        <Magnetic>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
                            >
                                {t('ctaButton')}
                                <ArrowRight size={17} />
                            </Link>
                        </Magnetic>
                    </div>
                </Reveal>
            </section>
        </>
    );
}
