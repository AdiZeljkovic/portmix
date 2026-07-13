import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, DoorOpen } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { COMPANY } from '@/lib/company';
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
        path: '/contact',
        title: t('titleContact'),
        description: t('descriptionContact')
    });
}

export default async function ContactPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('contact');

    const items = [
        {
            icon: MapPin,
            label: t('addressLabel'),
            value: t('address'),
            href: COMPANY.mapsUrl
        },
        {
            icon: Phone,
            label: t('phoneLabel'),
            value: COMPANY.phone,
            href: COMPANY.phoneHref
        },
        {
            icon: Mail,
            label: t('emailLabel'),
            value: COMPANY.email,
            href: `mailto:${COMPANY.email}`
        },
        {
            icon: DoorOpen,
            label: t('showroomLabel'),
            value: t('showroomNote'),
            href: null
        }
    ];

    return (
        <>
            <PageHeader kicker={t('kicker')} title={t('title')} intro={t('intro')} />

            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
                <div className="grid gap-10 lg:grid-cols-5">
                    {/* Contact details */}
                    <Reveal className="lg:col-span-2">
                        <div className="flex flex-col gap-5">
                            {items.map((item) => {
                                const Icon = item.icon;
                                const content = (
                                    <div className="flex items-start gap-4 rounded-2xl border border-line bg-ink-card p-6 transition-colors hover:border-brand/40">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                                            <Icon size={20} className="text-brand" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold uppercase tracking-wider text-cream/50">
                                                {item.label}
                                            </div>
                                            <div className="mt-1.5 font-medium text-cream/90">
                                                {item.value}
                                            </div>
                                        </div>
                                    </div>
                                );
                                return item.href ? (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={item.label}>{content}</div>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* Form */}
                    <Reveal delay={0.15} className="lg:col-span-3">
                        <ContactForm />
                    </Reveal>
                </div>

                {/* Map */}
                <Reveal className="mt-10">
                    <div className="overflow-hidden rounded-2xl border border-line">
                        <iframe
                            src={COMPANY.mapsEmbed}
                            title={t('addressLabel')}
                            className="h-[380px] w-full grayscale-[40%] contrast-[0.95]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </Reveal>
            </section>
        </>
    );
}
