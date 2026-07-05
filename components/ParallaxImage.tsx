'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

// Image drifts slower than its frame while scrolling (inner parallax).
export default function ParallaxImage({
    src,
    alt,
    sizes,
    className = ''
}: {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
                <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
            </motion.div>
        </div>
    );
}
