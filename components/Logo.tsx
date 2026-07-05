// SVG recreation of the PortMix SA logo (red wordmark + dark italic tagline).
// Replace with the client's original vector file when available.
export default function Logo({
    className = 'h-9 w-auto',
    light = false
}: {
    className?: string;
    light?: boolean;
}) {
    return (
        <svg
            viewBox="0 0 340 92"
            className={className}
            aria-label="PortMix SA — intérieurs d'exception"
            role="img"
        >
            <text
                x="0"
                y="52"
                fontFamily="var(--font-sora), Arial, sans-serif"
                fontSize="52"
                fontWeight="800"
                fill="#e32526"
                letterSpacing="-1.5"
            >
                PortMix SA
            </text>
            <text
                x="112"
                y="82"
                fontFamily="var(--font-sora), Arial, sans-serif"
                fontSize="24"
                fontWeight="700"
                fontStyle="italic"
                fill={light ? '#f4f0ea' : '#2b2b2b'}
                letterSpacing="-0.5"
            >
                intérieurs d&apos;exception
            </text>
        </svg>
    );
}
