'use client';

import { useRef } from 'react';

// Subtle 3D tilt following the cursor. Falls back to static on touch /
// reduced-motion (hover styles simply never fire).
export default function TiltCard({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `rotateY(${px * 8}deg) rotateX(${py * -8}deg) translateZ(8px)`;
    };

    const onLeave = () => {
        if (ref.current) ref.current.style.transform = '';
    };

    return (
        <div className="tilt-wrap h-full">
            <div
                ref={ref}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className={`tilt-card h-full ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
