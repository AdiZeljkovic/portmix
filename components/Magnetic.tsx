'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// Magnetic hover: the wrapped element is gently pulled toward the cursor.
export default function Magnetic({
    children,
    strength = 0.35
}: {
    children: React.ReactNode;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onMove = (e: React.MouseEvent) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
    };

    const onLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
