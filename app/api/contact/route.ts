import { NextResponse } from 'next/server';

// Delivery: set RESEND_API_KEY (+ optionally CONTACT_EMAIL_TO/FROM) in the
// deploy environment and messages are emailed via Resend; without it the
// endpoint just logs, so the site works in every environment.
const EMAIL_TO = process.env.CONTACT_EMAIL_TO ?? 'info@portmix.ch';
const EMAIL_FROM = process.env.CONTACT_EMAIL_FROM ?? 'PortMix Site <onboarding@resend.dev>';

const MAX = { name: 200, email: 254, phone: 50, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Per-IP sliding window: 5 requests / 10 min. In-memory is enough for the
// single PM2 process this runs on.
const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    if (hits.size > 10_000) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
        }
    }
    return recent.length > WINDOW_LIMIT;
}

function clean(value: string, max: number): string {
    // eslint-disable-next-line no-control-regex
    return value.replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

export async function POST(request: Request) {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (rateLimited(ip)) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    let data: Record<string, unknown>;
    try {
        data = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Honeypot: real users never fill the hidden "company" field. Pretend
    // success so bots don't learn they were filtered.
    if (typeof data.company === 'string' && data.company.trim()) {
        return NextResponse.json({ ok: true });
    }

    const { name, email, message } = data;
    if (
        typeof name !== 'string' || !name.trim() || name.length > MAX.name ||
        typeof email !== 'string' || !EMAIL_RE.test(email.trim()) || email.length > MAX.email ||
        typeof message !== 'string' || !message.trim() || message.length > MAX.message
    ) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const phone =
        typeof data.phone === 'string' ? clean(data.phone, MAX.phone) : '';

    const entry = {
        name: clean(name, MAX.name),
        email: clean(email, MAX.email),
        phone,
        // keep newlines in the email body, but not in the log line
        message: message.trim().slice(0, MAX.message)
    };

    if (process.env.RESEND_API_KEY) {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: EMAIL_FROM,
                to: [EMAIL_TO],
                reply_to: entry.email,
                subject: `Nouveau message du site — ${entry.name}`,
                text: [
                    `Nom: ${entry.name}`,
                    `E-mail: ${entry.email}`,
                    entry.phone ? `Téléphone: ${entry.phone}` : null,
                    '',
                    entry.message
                ]
                    .filter((line) => line !== null)
                    .join('\n')
            })
        });
        if (!res.ok) {
            console.error('[contact] Resend failed:', res.status, clean(await res.text(), 500));
            return NextResponse.json({ error: 'Delivery failed' }, { status: 502 });
        }
    } else {
        console.log('[contact] New message:', {
            ...entry,
            message: clean(entry.message, 500)
        });
    }

    return NextResponse.json({ ok: true });
}
