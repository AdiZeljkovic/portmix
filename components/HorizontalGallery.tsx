'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export type GalleryProject = { title: string; cat: string; image: string };

// Scroll-jacked horizontal gallery: the section pins while projects
// glide sideways. Falls back to a static grid for reduced motion.
export default function HorizontalGallery({
    kicker,
    title,
    cta,
    viewLabel,
    projects
}: {
    kicker: string;
    title: string;
    cta: string;
    viewLabel: string;
    projects: GalleryProject[];
}) {
    const reduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [range, setRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    });
    const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

    useEffect(() => {
        const measure = () => {
            if (!trackRef.current) return;
            setRange(
                Math.max(trackRef.current.scrollWidth - window.innerWidth, 0)
            );
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, [projects.length]);

    const card = (p: GalleryProject) => (
        <Link
            key={p.title}
            href="/realisations"
            data-cursor-label={viewLabel}
            className="group relative block aspect-[3/4] w-[74vw] shrink-0 overflow-hidden rounded-2xl sm:w-[42vw] lg:w-[26vw]"
        >
            <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 74vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                    {p.cat}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold">{p.title}</h3>
            </div>
        </Link>
    );

    // Reduced motion: plain grid, no pinning
    if (reduce) {
        return (
            <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
                <p className="kicker">{kicker}</p>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                    {title}
                </h2>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <div key={p.title}>{card(p)}</div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <div className="mx-auto mb-10 w-full max-w-7xl px-5 lg:px-8">
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <div>
                            <p className="kicker">{kicker}</p>
                            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                                {title}
                            </h2>
                        </div>
                        <Link
                            href="/realisations"
                            className="group inline-flex items-center gap-2 font-semibold text-brand"
                        >
                            {cta}
                            <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>
                    </div>
                </div>

                <motion.div
                    ref={trackRef}
                    style={{ x }}
                    className="flex w-max gap-6 pl-5 pr-5 will-change-transform lg:pl-8"
                >
                    {projects.map(card)}
                </motion.div>

                {/* Progress hint */}
                <div className="mx-auto mt-10 w-full max-w-7xl px-5 lg:px-8">
                    <div className="h-px w-full bg-line">
                        <motion.div
                            style={{ scaleX: scrollYProgress }}
                            className="h-px origin-left bg-brand"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
