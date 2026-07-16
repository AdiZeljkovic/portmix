'use client';

import { useTranslations } from 'next-intl';
import { Moon, Sun } from 'lucide-react';

// Icon visibility is pure CSS (the `light:` variant follows html[data-theme]),
// so no mounted-state is needed and there is no hydration mismatch.
export default function ThemeSwitcher() {
    const t = useTranslations('nav');

    const toggle = () => {
        const root = document.documentElement;
        const next = root.dataset.theme === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        try {
            localStorage.setItem('pm-theme', next);
        } catch {}
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', next === 'light' ? '#f7f3ec' : '#181614');
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={t('theme')}
            title={t('theme')}
            className="text-cream/60 transition-colors hover:text-brand"
        >
            <Sun size={17} className="hidden light:block" />
            <Moon size={17} className="light:hidden" />
        </button>
    );
}
