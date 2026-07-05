'use client';

import { motion, useReducedMotion } from 'motion/react';

// Word-by-word masked reveal for headings. Each word slides up from
// behind an invisible line, staggered.
export default function AnimatedText({
    text,
    className = '',
    delay = 0,
    once = true
}: {
    text: string;
    className?: string;
    delay?: number;
    once?: boolean;
}) {
    const reduce = useReducedMotion();
    const words = text.split(' ');

    if (reduce) return <span className={className}>{text}</span>;

    return (
        <span className={className} aria-label={text}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    aria-hidden
                    className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
                >
                    <motion.span
                        className="inline-block will-change-transform"
                        initial={{ y: '110%', rotate: 4 }}
                        whileInView={{ y: '0%', rotate: 0 }}
                        viewport={{ once, margin: '-60px' }}
                        transition={{
                            duration: 0.75,
                            delay: delay + i * 0.06,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
        </span>
    );
}
