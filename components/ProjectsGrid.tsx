'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import { getClient } from '@/lib/clients';
import type { Project } from '@/lib/projects';

// Grid of project cards. Each card shows the client company's logo (or a
// text fallback badge until a logo is sourced) rather than a photo of the
// building — we don't have rights to real site photos for these projects.
export default function ProjectsGrid({
    projects,
    initialCount = 9,
    step = 9,
    loadMoreLabel
}: {
    projects: Project[];
    initialCount?: number;
    step?: number;
    loadMoreLabel?: string;
}) {
    const [count, setCount] = useState(initialCount);
    const visible = projects.slice(0, count);

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((project, i) => {
                    const client = getClient(project.company);
                    return (
                        <Reveal key={`${project.name}-${i}`} delay={(i % 3) * 0.08}>
                            <TiltCard className="flex h-full flex-col rounded-2xl border border-line bg-ink-card p-6">
                                <div
                                    className={`flex h-20 items-center justify-center rounded-xl p-4 ${
                                        client?.logoOnDark ? 'bg-ink-fixed' : 'bg-cream-fixed/95'
                                    }`}
                                >
                                    {client?.logo ? (
                                        <Image
                                            src={client.logo}
                                            alt={client.name}
                                            width={160}
                                            height={56}
                                            className="max-h-11 w-auto object-contain"
                                        />
                                    ) : (
                                        <span className="text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-ink-fixed/60">
                                            {client?.name ?? '—'}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-5">
                                    <h3 className="font-display text-lg font-bold">{project.name}</h3>
                                    {client && (
                                        <p className="mt-1 text-xs uppercase tracking-wider text-brand">
                                            {client.name}
                                        </p>
                                    )}
                                </div>
                            </TiltCard>
                        </Reveal>
                    );
                })}
            </div>

            {loadMoreLabel && count < projects.length && (
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => setCount((c) => c + step)}
                        className="rounded-full border border-cream/25 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:border-brand hover:text-brand"
                    >
                        {loadMoreLabel}
                    </button>
                </div>
            )}
        </>
    );
}
