import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { COMPANY } from '@/lib/company';
import Logo from './Logo';

const NAV_ITEMS = [
    { href: '/', key: 'home' },
    { href: '/a-propos', key: 'about' },
    { href: '/services', key: 'services' },
    { href: '/realisations', key: 'realisations' },
    { href: '/contact', key: 'contact' }
] as const;

export default function Footer() {
    const t = useTranslations();

    return (
        <footer className="overflow-hidden border-t border-line bg-ink-soft">
            {/* Giant outlined wordmark */}
            <div className="pointer-events-none select-none px-5 pt-10 lg:px-8" aria-hidden>
                <div className="outline-text mx-auto max-w-7xl font-display text-[19vw] font-extrabold leading-none tracking-tight lg:text-[13rem]">
                    PortMix
                </div>
            </div>
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
                <div>
                    <Logo className="h-12 w-auto" light />
                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
                        {t('footer.tagline')}
                    </p>
                </div>

                <div>
                    <h3 className="kicker mb-5">{t('footer.navTitle')}</h3>
                    <nav className="flex flex-col gap-3">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="text-sm text-cream/70 transition-colors hover:text-brand"
                            >
                                {t(`nav.${item.key}`)}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div>
                    <h3 className="kicker mb-5">{t('footer.contactTitle')}</h3>
                    <div className="flex flex-col gap-4 text-sm text-cream/70">
                        <a
                            href={COMPANY.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 transition-colors hover:text-brand"
                        >
                            <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                            {COMPANY.address}
                        </a>
                        <a
                            href={COMPANY.phoneHref}
                            className="flex items-center gap-3 transition-colors hover:text-brand"
                        >
                            <Phone size={16} className="shrink-0 text-brand" />
                            {COMPANY.phone}
                        </a>
                        <a
                            href={`mailto:${COMPANY.email}`}
                            className="flex items-center gap-3 transition-colors hover:text-brand"
                        >
                            <Mail size={16} className="shrink-0 text-brand" />
                            {COMPANY.email}
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-line">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted sm:flex-row lg:px-8">
                    <span>
                        © {new Date().getFullYear()} {COMPANY.name}. {t('footer.rights')}
                    </span>
                    <span className="italic">{COMPANY.tagline}</span>
                </div>
            </div>
        </footer>
    );
}
