'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { COMPANY } from '@/lib/company';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
    { href: '/', key: 'home' },
    { href: '/a-propos', key: 'about' },
    { href: '/services', key: 'services' },
    { href: '/realisations', key: 'realisations' },
    { href: '/contact', key: 'contact' }
] as const;

export default function Header() {
    const t = useTranslations('nav');
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const lastY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 24);
            // Hide when scrolling down, reveal when scrolling up
            setHidden(y > 140 && y > lastY.current);
            lastY.current = y;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the mobile menu on navigation
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                hidden && !open ? '-translate-y-full' : 'translate-y-0'
            } ${
                scrolled || open
                    ? 'bg-ink/90 backdrop-blur-md border-b border-line'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Link href="/" aria-label="PortMix SA — Accueil" className="shrink-0">
                    <Logo className="h-10 w-auto" light />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-8 lg:flex">
                    {NAV_ITEMS.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand ${
                                    active ? 'text-brand' : 'text-cream/80'
                                }`}
                            >
                                {t(item.key)}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-5 lg:flex">
                    <LanguageSwitcher />
                    <a
                        href={COMPANY.phoneHref}
                        className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
                    >
                        <Phone size={15} />
                        {COMPANY.phone}
                    </a>
                </div>

                {/* Mobile toggle */}
                <div className="flex items-center gap-4 lg:hidden">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                        className="text-cream"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <nav className="flex h-[calc(100dvh-5rem)] flex-col gap-2 border-t border-line bg-ink px-6 py-8 lg:hidden">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`border-b border-line py-4 font-display text-2xl font-semibold ${
                                pathname === item.href ? 'text-brand' : 'text-cream'
                            }`}
                        >
                            {t(item.key)}
                        </Link>
                    ))}
                    <a
                        href={COMPANY.phoneHref}
                        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 font-semibold text-white"
                    >
                        <Phone size={17} />
                        {COMPANY.phone}
                    </a>
                </nav>
            )}
        </header>
    );
}
