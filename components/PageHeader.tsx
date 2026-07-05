import Reveal from './Reveal';
import AnimatedText from './AnimatedText';

// Shared hero strip for subpages: kicker + big animated title + optional intro.
export default function PageHeader({
    kicker,
    title,
    intro
}: {
    kicker: string;
    title: string;
    intro?: string;
}) {
    return (
        <section className="border-b border-line bg-ink-soft pb-16 pt-40 lg:pb-24 lg:pt-48">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal>
                    <p className="kicker flex items-center gap-3">
                        <span className="inline-block h-px w-12 bg-brand" />
                        {kicker}
                    </p>
                </Reveal>
                <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                    {title.split('\n').map((line, i) => (
                        <AnimatedText key={i} text={line} delay={0.1 + i * 0.15} className="block" />
                    ))}
                </h1>
                {intro && (
                    <Reveal delay={0.35}>
                        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/75">
                            {intro}
                        </p>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
