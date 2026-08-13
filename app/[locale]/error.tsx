'use client';

import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
    const t = useTranslations('error');

    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-20 text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
            </h1>
            <p className="mt-4 max-w-md text-cream/70">{t('text')}</p>
            <button
                onClick={reset}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
                <RotateCcw size={17} />
                {t('retry')}
            </button>
        </section>
    );
}
