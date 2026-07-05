'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
    useReducedMotion
} from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Magnetic from './Magnetic';

function MaskedLine({
    text,
    delay,
    className = ''
}: {
    text: string;
    delay: number;
    className?: string;
}) {
    return (
        <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
            <motion.span
                className={`block will-change-transform ${className}`}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {text}
            </motion.span>
        </span>
    );
}

export default function Hero() {
    const t = useTranslations('hero');
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();

    // Parallax on scroll
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '24%']);
    const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);

    // Cursor spotlight
    const mx = useMotionValue(50);
    const my = useMotionValue(40);
    const smx = useSpring(mx, { stiffness: 60, damping: 20 });
    const smy = useSpring(my, { stiffness: 60, damping: 20 });

    const spotlight = useTransform(
        [smx, smy],
        ([x, y]) =>
            `radial-gradient(560px circle at ${x}% ${y}%, rgba(227,37,38,0.14), transparent 65%)`
    );

    const onMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set(((e.clientX - rect.left) / rect.width) * 100);
        my.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    return (
        <section
            ref={ref}
            onMouseMove={onMove}
            className="relative flex min-h-[100svh] items-center overflow-hidden"
        >
            {/* Parallax + slow Ken Burns background */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
                <div className={`absolute inset-0 ${reduce ? '' : 'kenburns'}`}>
                    <Image
                        src="/images/placeholders/hero.jpg"
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/25" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-ink to-transparent" />
                {/* Cursor spotlight */}
                {!reduce && (
                    <motion.div className="absolute inset-0" style={{ background: spotlight }} />
                )}
            </motion.div>

            <motion.div
                style={{ opacity: fade, y: textY }}
                className="mx-auto w-full max-w-7xl px-5 pt-20 lg:px-8"
            >
                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="kicker flex items-center gap-3"
                >
                    <motion.span
                        initial={reduce ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block h-px w-12 origin-left bg-brand"
                    />
                    {t('kicker')}
                </motion.p>

                <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
                    {reduce ? (
                        <>
                            {t('titleLine1')}
                            <br />
                            <span className="text-brand">{t('titleLine2')}</span>
                        </>
                    ) : (
                        <>
                            <MaskedLine text={t('titleLine1')} delay={0.35} />
                            <MaskedLine
                                text={t('titleLine2')}
                                delay={0.5}
                                className="text-shimmer"
                            />
                        </>
                    )}
                </h1>

                <motion.p
                    initial={reduce ? false : { opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.75 }}
                    className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80"
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-10 flex flex-wrap gap-4"
                >
                    <Magnetic>
                        <Link
                            href="/realisations"
                            className="group flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-dark"
                        >
                            {t('ctaRealisations')}
                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </Magnetic>
                    <Magnetic>
                        <Link
                            href="/contact"
                            className="block rounded-full border border-cream/25 px-7 py-3.5 font-semibold text-cream backdrop-blur-sm transition-colors hover:border-brand hover:text-brand"
                        >
                            {t('ctaShowroom')}
                        </Link>
                    </Magnetic>
                </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-[0.3em] text-cream/50">
                    {t('scroll')}
                    <ChevronDown size={16} className="animate-bounce" />
                </div>
            </motion.div>
        </section>
    );
}
