'use client';

import { motion, useScroll, useSpring } from 'motion/react';

// Thin red progress line pinned to the top of the viewport.
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

    return (
        <motion.div
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brand"
            style={{ scaleX }}
        />
    );
}
