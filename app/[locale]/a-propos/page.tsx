import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Award, Ruler, HeartHandshake } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import Reveal from '@/components/Reveal';
import ImageReveal from '@/components/ImageReveal';
import AnimatedText from '@/components/AnimatedText';
import { ORG } from '@/lib/company';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });
    return buildMetadata({
        locale,
        path: '/a-propos',
        title: t('titleAbout'),
        description: t('descriptionAbout')
    });
}

const VALUE_ICONS = [Award, Ruler, HeartHandshake] as const;

function initials(name: string) {
    return name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('');
}

export default async function AboutPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('about');

    const storyLead = t.raw('storyLead') as string[];
    const storyParagraphs = t.raw('storyParagraphs') as string[];
    const storyParagraphs2 = t.raw('storyParagraphs2') as string[];
    const storyList = t.raw('storyList') as string[];
    const familyParagraphs = t.raw('familyParagraphs') as string[];
    const familyEmphasis = t.raw('familyEmphasis') as string[];
    const valuesLines = t.raw('valuesLines') as string[];

    return (
        <>
            <BreadcrumbJsonLd locale={locale} path="/a-propos" labelKey="about" />
            <PageHeader kicker={t('kicker')} title={t('title')} />

            {/* Story */}
            <section className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
                <Reveal>
                    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                        <span className="text-brand">{t('storyTitle')}</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.1} className="mt-8 space-y-1">
                    {storyLead.map((line, i) => (
                        <p
                            key={i}
                            className="font-display text-2xl italic leading-snug text-cream sm:text-3xl"
                        >
                            {line}
                        </p>
                    ))}
                </Reveal>

                <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/75">
                    {storyParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                <Reveal className="my-12 text-center">
                    <p className="font-display text-2xl font-bold text-brand sm:text-3xl">
                        {t('storyEmphasis1')}
                    </p>
                </Reveal>

                <div className="space-y-5 text-lg leading-relaxed text-cream/75">
                    {storyParagraphs2.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
            </section>

            {/* Atelier image break */}
            <section className="mx-auto max-w-5xl px-5 lg:px-8">
                <ImageReveal
                    src="/images/placeholders/atelier.jpg"
                    alt={t('imageAlt')}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="aspect-[16/9] rounded-2xl"
                />
            </section>

            {/* Poetic list + family story */}
            <section className="mx-auto max-w-3xl px-5 py-24 lg:px-8 lg:py-32">
                <Reveal className="space-y-3 border-l-2 border-brand pl-6">
                    {storyList.map((line, i) => (
                        <p
                            key={i}
                            className="font-display text-xl italic leading-snug text-cream/90"
                        >
                            {line}
                        </p>
                    ))}
                </Reveal>

                <Reveal delay={0.1}>
                    <p className="mt-10 text-lg leading-relaxed text-cream/75">
                        {t('storyQualityLine')}
                    </p>
                </Reveal>

                <Reveal className="mt-16 text-center">
                    <p className="font-display text-2xl font-bold sm:text-3xl">
                        {t('familyIntro')}
                    </p>
                </Reveal>

                <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream/75">
                    {familyParagraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                <Reveal className="mt-10 space-y-1 text-center">
                    {familyEmphasis.map((line, i) => (
                        <p
                            key={i}
                            className="font-display text-xl font-bold text-brand sm:text-2xl"
                        >
                            {line}
                        </p>
                    ))}
                </Reveal>

                <p className="mt-8 text-center text-lg italic leading-relaxed text-cream/75">
                    {t('familyClosingParagraph')}
                </p>

                <Reveal className="mt-10 space-y-3 border-l-2 border-brand pl-6">
                    {valuesLines.map((line, i) => (
                        <p
                            key={i}
                            className="font-display text-xl italic leading-snug text-cream/90"
                        >
                            {line}
                        </p>
                    ))}
                </Reveal>

                <Reveal className="mt-16 text-center">
                    <p className="font-display text-xl italic text-cream/70">
                        {t('storyClosing')}
                    </p>
                </Reveal>
            </section>

            {/* Values */}
            <section className="bg-ink-soft py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <p className="kicker">{t('valuesKicker')}</p>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            <AnimatedText text={t('valuesTitle')} />
                        </h2>
                    </Reveal>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {([1, 2, 3] as const).map((n, i) => {
                            const Icon = VALUE_ICONS[i];
                            return (
                                <Reveal key={n} delay={i * 0.12}>
                                    <div className="h-full rounded-2xl border border-line bg-ink-card p-8">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                                            <Icon size={22} className="text-brand" />
                                        </div>
                                        <h3 className="mt-6 font-display text-xl font-bold">
                                            {t(`value${n}Title`)}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-cream/65">
                                            {t(`value${n}Text`)}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team — organizational chart (structure supplied by the client) */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <Reveal className="max-w-2xl">
                    <p className="kicker">{t('teamKicker')}</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                        <AnimatedText text={t('teamTitle')} />
                    </h2>
                    <p className="mt-6 text-lg text-cream/75">{t('teamText')}</p>
                </Reveal>

                <div className="mt-14">
                    {/* Direction */}
                    <Reveal className="flex justify-center">
                        <div className="w-full max-w-xs rounded-2xl border border-line border-t-2 border-t-brand bg-ink-card p-8 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-display text-xl font-bold text-white">
                                {initials(ORG.lead.name)}
                            </div>
                            <h3 className="mt-5 font-display text-xl font-bold">{ORG.lead.name}</h3>
                            <p className="mt-1 text-sm text-brand-soft">{t(ORG.lead.roleKey)}</p>
                        </div>
                    </Reveal>

                    {/* Connectors down to the two branches */}
                    <div aria-hidden className="hidden lg:block">
                        <div className="mx-auto h-10 w-px bg-cream/15" />
                        <div className="relative mx-auto h-10 w-1/2">
                            <div className="absolute inset-x-0 top-0 h-px bg-cream/15" />
                            <div className="absolute left-0 top-0 h-full w-px bg-cream/15" />
                            <div className="absolute right-0 top-0 h-full w-px bg-cream/15" />
                        </div>
                    </div>
                    <div aria-hidden className="mx-auto h-10 w-px bg-cream/15 lg:hidden" />

                    {/* Branches */}
                    <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
                        {ORG.branches.map((branch, bi) => (
                            <div key={branch.head.name}>
                                <Reveal delay={bi * 0.12} className="flex justify-center">
                                    <div className="w-full max-w-xs rounded-2xl border border-line border-t-2 border-t-brand bg-ink-card p-6 text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-display text-lg font-bold text-white">
                                            {initials(branch.head.name)}
                                        </div>
                                        <h3 className="mt-4 font-display text-lg font-bold">
                                            {branch.head.name}
                                        </h3>
                                        <p className="mt-1 text-sm text-brand-soft">
                                            {t(branch.head.roleKey)}
                                        </p>
                                    </div>
                                </Reveal>

                                <div aria-hidden className="mx-auto h-8 w-px bg-cream/15" />

                                <Reveal delay={bi * 0.12 + 0.08}>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {branch.members.map((m) => (
                                            <div
                                                key={m.name}
                                                className="flex items-center gap-4 rounded-2xl border border-line bg-ink-card p-5"
                                            >
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-display font-bold text-white">
                                                    {initials(m.name)}
                                                </div>
                                                <div className="min-w-0">
                                                    <h4
                                                        className={`font-display font-bold ${
                                                            m.italic ? 'italic' : ''
                                                        }`}
                                                    >
                                                        {m.name}
                                                    </h4>
                                                    <p className="mt-0.5 text-xs uppercase tracking-wider text-brand-soft">
                                                        {t(m.roleKey)}
                                                    </p>
                                                    {m.badgeKey && (
                                                        <span className="mt-1.5 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-soft">
                                                            {t(m.badgeKey)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {branch.department && (
                                            <div className="rounded-2xl border border-dashed border-brand/40 bg-brand/5 p-5 sm:col-span-2">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-brand-soft">
                                                    {branch.department.name}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                                                    {branch.department.members.map((name) => (
                                                        <div key={name} className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark font-display text-sm font-bold text-white">
                                                                {initials(name)}
                                                            </div>
                                                            <span className="font-display font-bold">
                                                                {name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>

                    <Reveal className="mx-auto mt-14 max-w-2xl text-center">
                        <p className="text-sm italic leading-relaxed text-muted">{t('orgNote')}</p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
