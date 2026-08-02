import Image from 'next/image';

// Client's final logo artwork (public/images/brand/logo.png): red "PortMix"
// wordmark with a white tagline, supplied ready for the site's dark
// header/footer backgrounds — rendered as-is, no recolored layers needed.
const ASPECT = 1754 / 411;

export default function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
    return (
        <span className={`relative block ${className}`} style={{ aspectRatio: ASPECT }}>
            <Image
                src="/images/brand/logo.png"
                alt="PortMix SA — intérieurs d'exception"
                fill
                priority
                sizes="220px"
                className="object-contain"
            />
        </span>
    );
}
