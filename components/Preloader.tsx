'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// Cinematic intro: logo wordmark reveals behind a mask, a red line draws,
// then the curtain lifts. Plays once per browser session.
export default function Preloader() {
    const reduce = useReducedMotion();
    const [show, setShow] = useState<boolean | null>(null);

    useEffect(() => {
        if (sessionStorage.getItem('pm-intro') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShow(false);
            return;
        }
        sessionStorage.setItem('pm-intro', '1');
        setShow(true);
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            setShow(false);
            document.body.style.overflow = '';
        }, 1600);
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, []);

    if (reduce) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden py-1">
                            <motion.div
                                initial={{ y: '110%' }}
                                animate={{ y: '0%' }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Image
                                    src="/images/brand/logo.png"
                                    alt="PortMix SA"
                                    width={302}
                                    height={64}
                                    priority
                                    className="h-12 w-auto sm:h-16"
                                />
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-5 h-px w-full origin-left bg-brand"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
