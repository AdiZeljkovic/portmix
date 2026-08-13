'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';

// Buttery smooth scrolling. The wrapper always renders so the server-rendered
// DOM is never torn down after hydration; for users preferring reduced motion
// the lenis instance is simply stopped and native scrolling takes over.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        const apply = () => {
            const lenis = lenisRef.current?.lenis;
            if (!lenis) return;
            if (mq.matches) lenis.stop();
            else lenis.start();
        };
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    return (
        <ReactLenis root ref={lenisRef} options={{ lerp: 0.09, wheelMultiplier: 1.05 }}>
            {children}
        </ReactLenis>
    );
}
