import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Posluživanje panela koji je zaposleni napravio.
 *
 * 🚨 IME SE PROVJERAVA UZORKOM, NE „čišćenjem". Ovo je jedina ruta koja
 * čita fajl po imenu iz adrese; `../` u imenu bi inače značio čitanje bilo
 * čega sa diska. Dozvoljeno je isključivo ono što sami pravimo:
 * osamnaest heksadecimalnih znakova i `.jpg`. Sve drugo je 404 — bez poruke
 * koja bi odala postoji li fajl.
 *
 * ⚠️ Zaglavlje keša je `immutable` jer je ime nasumično i sadržaj se nikad
 * ne mijenja. Mail klijenti sliku povlače pri svakom otvaranju poruke; bez
 * ovoga bi je vukli iznova godinama.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DIR = process.env.SIGNATURA_DIR ?? '/app/uploads/signatura';
const IME = /^[0-9a-f]{18}\.jpg$/;

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ ime: string }> }
) {
    const { ime } = await params;
    if (!IME.test(ime)) return new NextResponse(null, { status: 404 });

    try {
        const buf = await readFile(join(DIR, ime));
        return new NextResponse(new Uint8Array(buf), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': String(buf.length),
                'Cache-Control': 'public, max-age=31536000, immutable',
                /* Panel je slika u tuđem potpisu — nema razloga da je iko ugrađuje. */
                'X-Content-Type-Options': 'nosniff'
            }
        });
    } catch {
        return new NextResponse(null, { status: 404 });
    }
}
