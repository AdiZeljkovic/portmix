import Image from 'next/image';
import { CLIENTS } from '@/lib/clients';

// Infinite scrolling row of client logos ("trusted by") — same marquee
// mechanics as components/Marquee.tsx, adapted for logo tiles with a text
// fallback for companies whose logo hasn't been sourced yet.
export default function ClientMarquee() {
    const row = (ariaHidden: boolean) => (
        <div aria-hidden={ariaHidden} className="marquee-row">
            {CLIENTS.map((c, i) => (
                <div
                    key={`${c.slug}-${ariaHidden ? 'dup' : 'orig'}-${i}`}
                    className={`mr-6 flex h-16 w-40 shrink-0 items-center justify-center rounded-xl px-5 ${
                        c.logoOnDark ? 'bg-ink' : 'bg-cream/95'
                    }`}
                >
                    {c.logo ? (
                        <Image
                            src={c.logo}
                            alt={c.name}
                            width={140}
                            height={48}
                            className="max-h-9 w-auto object-contain"
                        />
                    ) : (
                        <span className="text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-ink/60">
                            {c.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="marquee overflow-hidden border-y border-line bg-ink-soft py-8">
            <div className="marquee-track flex w-max">
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}
