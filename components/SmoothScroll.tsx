'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

// Buttery smooth scrolling. Disabled for users preferring reduced motion.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }, []);

    if (!enabled) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1.05 }}>
            {children}
        </ReactLenis>
    );
}
