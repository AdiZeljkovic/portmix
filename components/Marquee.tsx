// Infinite scrolling text band. Content is duplicated for a seamless loop;
// animation is pure CSS (see .marquee-track in globals.css).
export default function Marquee({ items }: { items: string[] }) {
    const row = (ariaHidden: boolean) => (
        <div aria-hidden={ariaHidden} className="marquee-row">
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-8 pr-8">
                    <span className="font-display text-4xl font-extrabold uppercase tracking-tight text-cream/90 sm:text-6xl">
                        {item}
                    </span>
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand" />
                </span>
            ))}
        </div>
    );

    return (
        <div className="marquee overflow-hidden border-y border-line bg-ink-soft py-7">
            <div className="marquee-track flex w-max">
                {row(false)}
                {row(true)}
            </div>
        </div>
    );
}
