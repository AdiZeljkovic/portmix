'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider">
            {routing.locales.map((l, i) => (
                <span key={l} className="flex items-center">
                    {i > 0 && <span className="mx-1 text-cream/25">/</span>}
                    <Link
                        href={pathname}
                        locale={l}
                        className={`transition-colors hover:text-brand ${
                            l === locale ? 'text-brand' : 'text-cream/60'
                        }`}
                    >
                        {l}
                    </Link>
                </span>
            ))}
        </div>
    );
}
