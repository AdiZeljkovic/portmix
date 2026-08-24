import Image from 'next/image';

// Red "PortMix" wordmark only (public/images/brand/logo.png) — the client
// dropped the tagline from the on-site logo. Transparent PNG, tightly
// cropped from the supplied signature artwork.
const ASPECT = 1815 / 384;

export default function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
    return (
        <span className={`relative block ${className}`} style={{ aspectRatio: ASPECT }}>
            <Image
                src="/images/brand/logo.png"
                alt="PortMix SA"
                fill
                priority
                sizes="220px"
                className="object-contain"
            />
        </span>
    );
}
