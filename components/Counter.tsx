'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

// Animated count-up for stat values like "2017", "8+", "100%", "2".
export default function Counter({
    value,
    className = '',
    duration = 1.8
}: {
    value: string;
    className?: string;
    duration?: number;
}) {
    const match = value.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : '';

    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const reduce = useReducedMotion();
    const [display, setDisplay] = useState(reduce ? target : 0);

    useEffect(() => {
        if (!inView || reduce) {
            if (reduce) setDisplay(target);
            return;
        }
        let raf: number;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - p, 4); // easeOutQuart
            setDisplay(Math.round(eased * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, target, duration, reduce]);

    if (!match) return <span className={className}>{value}</span>;

    return (
        <span ref={ref} className={className}>
            {display}
            {suffix}
        </span>
    );
}
