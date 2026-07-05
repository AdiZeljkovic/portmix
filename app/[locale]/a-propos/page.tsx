import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Award, Ruler, HeartHandshake, UserRound } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import TiltCard from '@/components/TiltCard';
import ImageReveal from '@/components/ImageReveal';
import AnimatedText from '@/components/AnimatedText';
import { TEAM } from '@/lib/company';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });
    return { title: t('titleAbout'), description: t('description') };
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

    return (
        <>
            <PageHeader kicker={t('kicker')} title={t('title')} />

            {/* Story */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                            <span className="text-brand">{t('storyTitle')}</span>
                        </h2>
                        <div className="mt-7 space-y-5 text-lg leading-relaxed text-cream/75">
                            <p>{t('storyP1')}</p>
                            <p>{t('storyP2')}</p>
                            <p>{t('storyP3')}</p>
                        </div>
                    </Reveal>
                    <ImageReveal
                        src="/images/placeholders/atelier.jpg"
                        alt="PortMix SA"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="aspect-[4/5] rounded-2xl"
                        delay={0.15}
                    />
                </div>
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

            {/* Team */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <Reveal className="max-w-2xl">
                    <p className="kicker">{t('teamKicker')}</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                        <AnimatedText text={t('teamTitle')} />
                    </h2>
                    <p className="mt-6 text-lg text-cream/75">{t('teamText')}</p>
                </Reveal>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {TEAM.map((member, i) => (
                        <Reveal key={member.name || member.roleKey} delay={(i % 3) * 0.1}>
                            <TiltCard
                                className={`rounded-2xl border p-8 text-center ${
                                    member.placeholder
                                        ? 'border-dashed border-cream/20 bg-transparent'
                                        : 'border-line bg-ink-card'
                                }`}
                            >
                                {/* Monogram avatar until real photos arrive */}
                                <div
                                    className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full font-display text-2xl font-bold ${
                                        member.placeholder
                                            ? 'border border-dashed border-cream/25 text-cream/40'
                                            : 'bg-gradient-to-br from-brand to-brand-dark text-white'
                                    }`}
                                >
                                    {member.placeholder ? (
                                        <UserRound size={30} />
                                    ) : (
                                        initials(member.name)
                                    )}
                                </div>
                                <h3 className="mt-6 font-display text-lg font-bold">
                                    {member.placeholder ? t('teamJoining') : member.name}
                                </h3>
                                <p
                                    className={`mt-2 text-sm ${
                                        member.placeholder ? 'text-cream/40' : 'text-brand'
                                    }`}
                                >
                                    {t(member.roleKey)}
                                </p>
                            </TiltCard>
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
