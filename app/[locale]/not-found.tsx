import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-20 text-center">
            <p className="font-display text-8xl font-extrabold text-brand/25 sm:text-9xl">404</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {t('title')}
            </h1>
            <p className="mt-4 max-w-md text-cream/70">{t('text')}</p>
            <Link
                href="/"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
                <ArrowLeft size={17} />
                {t('cta')}
            </Link>
        </section>
    );
}
