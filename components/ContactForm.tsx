'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
    'w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-cream placeholder:text-cream/35 outline-none transition-colors focus:border-brand';

export default function ContactForm() {
    const t = useTranslations('contact');
    const [status, setStatus] = useState<Status>('idle');

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('sending');
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setStatus(res.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-ink-card p-10 text-center">
                <CheckCircle2 size={44} className="text-brand" />
                <p className="text-lg text-cream/85">{t('formSuccess')}</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-line bg-ink-card p-7 lg:p-9"
        >
            <h2 className="font-display text-2xl font-bold">{t('formTitle')}</h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/60">
                        {t('formName')} *
                    </label>
                    <input id="name" name="name" required className={inputClass} />
                </div>
                <div>
                    <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/60">
                        {t('formEmail')} *
                    </label>
                    <input id="email" name="email" type="email" required className={inputClass} />
                </div>
                <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/60">
                        {t('formPhone')}
                    </label>
                    <input id="phone" name="phone" type="tel" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-cream/60">
                        {t('formMessage')} *
                    </label>
                    <textarea id="message" name="message" required rows={5} className={inputClass} />
                </div>
            </div>

            {status === 'error' && (
                <p className="mt-5 text-sm text-brand">{t('formError')}</p>
            )}

            <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
            >
                <Send size={16} />
                {status === 'sending' ? t('formSending') : t('formSubmit')}
            </button>
        </form>
    );
}
