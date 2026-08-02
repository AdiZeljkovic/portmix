import Image from 'next/image';

// Client's real logo artwork (public/images/brand). The source file's
// tagline ("intérieurs d'exception") is near-black, which disappears on
// our dark header/footer — on `light` backgrounds we swap in a cream
// recolor of just that layer while the red wordmark stays the original,
// untouched artwork. On non-dark placements we render the source file as-is.
const ASPECT = 1754 / 411;

export default function Logo({
    className = 'h-9 w-auto',
    light = false
}: {
    className?: string;
    light?: boolean;
}) {
    if (!light) {
        return (
            <span className={`relative block ${className}`} style={{ aspectRatio: ASPECT }}>
                <Image
                    src="/images/brand/logo-full.png"
                    alt="PortMix SA — intérieurs d'exception"
                    fill
                    priority
                    sizes="220px"
                    className="object-contain"
                />
            </span>
        );
    }

    return (
        <span className={`relative block ${className}`} style={{ aspectRatio: ASPECT }}>
            <Image
                src="/images/brand/logo-wordmark.png"
                alt="PortMix SA — intérieurs d'exception"
                fill
                priority
                sizes="220px"
                className="object-contain"
            />
            <Image
                src="/images/brand/logo-tagline-cream.png"
                alt=""
                aria-hidden
                fill
                sizes="220px"
                className="object-contain"
            />
        </span>
    );
}
