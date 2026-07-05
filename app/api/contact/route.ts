import { NextResponse } from 'next/server';

// TODO (phase 2): send the message to info@portmix.ch via Resend or SMTP.
// For now the endpoint validates the payload and logs it server-side.
export async function POST(request: Request) {
    let data: Record<string, unknown>;
    try {
        data = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { name, email, message } = data;
    if (
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof message !== 'string' || !message.trim()
    ) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('[contact] New message:', { name, email, phone: data.phone, message });

    return NextResponse.json({ ok: true });
}
