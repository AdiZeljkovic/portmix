'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

// Curtain reveal: the image is unmasked bottom-up while zooming out from 1.25x.
export default function ImageReveal({
    src,
    alt,
    sizes,
    className = '',
    delay = 0
}: {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
    delay?: number;
}) {
    const reduce = useReducedMotion();

    return (
        <motion.div
            className={`relative overflow-hidden ${className}`}
            initial={reduce ? false : { clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                className="absolute inset-0"
                initial={reduce ? false : { scale: 1.25 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
            >
                <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
            </motion.div>
        </motion.div>
    );
}
