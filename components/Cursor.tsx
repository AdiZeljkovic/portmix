'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// Custom cursor: red dot + trailing ring. Over elements with
// [data-cursor-label] the ring grows into a labelled badge (e.g. "Voir").
// Desktop pointers only; the native cursor stays visible for safety.
export default function Cursor() {
    const [enabled, setEnabled] = useState(false);
    const [label, setLabel] = useState<string | null>(null);
    const [pressed, setPressed] = useState(false);

    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
    const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

    useEffect(() => {
        const fine = window.matchMedia('(pointer: fine)').matches;
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || reduce) return;
        setEnabled(true);

        const onMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor-label]');
            setLabel(target?.dataset.cursorLabel ?? null);
        };
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);

        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
        };
    }, [x, y]);

    if (!enabled) return null;

    return (
        <>
            {/* Dot */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-brand"
                style={{ x, y, translateX: '-50%', translateY: '-50%' }}
            />
            {/* Trailing ring / label badge */}
            <motion.div
                className={`pointer-events-none fixed left-0 top-0 z-[94] flex items-center justify-center rounded-full ${
                    label ? 'bg-brand' : 'border border-brand/60'
                }`}
                style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
                animate={{
                    width: label ? 76 : pressed ? 22 : 34,
                    height: label ? 76 : pressed ? 22 : 34
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
                {label && (
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        {label}
                    </span>
                )}
            </motion.div>
        </>
    );
}
