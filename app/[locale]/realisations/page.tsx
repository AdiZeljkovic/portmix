import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ProjectsGrid from '@/components/ProjectsGrid';
import { buildMetadata } from '@/lib/seo';
import { CURRENT_PROJECTS, COMPLETED_PROJECTS } from '@/lib/projects';

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta' });
    return buildMetadata({
        locale,
        path: '/realisations',
        title: t('titleRealisations'),
        description: t('descriptionRealisations')
    });
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

            {/* Ongoing projects */}
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <Reveal className="max-w-2xl">
                    <p className="kicker">{t('sectionCurrentKicker')}</p>
                    <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                        {t('sectionCurrentTitle')}
                    </h2>
                </Reveal>
                <div className="mt-14">
                    <ProjectsGrid
                        projects={CURRENT_PROJECTS}
                        initialCount={9}
                        loadMoreLabel={t('loadMore')}
                    />
                </div>
            </section>

            {/* Completed projects */}
            <section className="bg-ink-soft py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <Reveal className="max-w-2xl">
                        <p className="kicker">{t('sectionCompletedKicker')}</p>
                        <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            {t('sectionCompletedTitle')}
                        </h2>
                    </Reveal>
                    <div className="mt-14">
                        <ProjectsGrid
                            projects={COMPLETED_PROJECTS}
                            initialCount={9}
                            loadMoreLabel={t('loadMore')}
                        />
                    </div>
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
