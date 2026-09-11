import { NextResponse } from 'next/server';
import { mkdir, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';

/**
 * Panel potpisa koji zaposleni sam napravi.
 *
 * 🚨 ZAŠTO OVO POSTOJI. Tri riječi su UNUTAR slike i moraju ostati: Outlook
 * ne može tekst preko slike, a ne prikazuje ni ugrađene (`data:`) slike.
 * Dakle svaka kombinacija fotografije i riječi mora postati nova slika na
 * nekoj adresi. Studio je složi u pregledniku i pošalje ovdje.
 *
 * ⚠️ Server NIKAD ne vidi korisnikovu originalnu fotografiju — samo gotov
 * panel od tačno 800×908 koji je canvas već sastavio. Zato ovdje nema
 * obrade slike ni jedne nove zavisnosti; ima samo provjera.
 *
 * ⚠️ `sharp` se NAMJERNO ne koristi. Nije prava zavisnost ovog projekta nego
 * dolazi posredno kroz Next — oslanjati se na to znači da nadogradnja Nexta
 * jednog dana tiho obori ovu rutu.
 *
 * ⚠️ Stranica studija je JAVNA. Zato je ruta uska koliko može biti a da radi:
 *   · zaglavlje datoteke se ČITA, ne vjeruje mu se na riječ,
 *   · dimenzije moraju biti tačno 800×908 — sve drugo nije naš panel,
 *   · ime pravimo mi, nasumično; korisnik ne bira putanju,
 *   · 10 snimanja po IP-u na sat,
 *   · tvrda granica broja fajlova. To nije sitnica: 10.9.2026. je pun disk
 *     oborio produkcijsku bazu, a ovo piše na isti disk.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Mora se poklapati sa PANEL_W/PANEL_H u studiju. */
const W = 800;
const H = 908;

/** Canvas na kvalitetu 0,9 daje 150–400 kB; 3 MB je četverostruka rezerva. */
const MAX_BYTES = 3 * 1024 * 1024;
const MAX_FAJLOVA = 4000;
const PROZOR_MS = 60 * 60 * 1000;
const PO_PROZORU = 10;

const DIR = process.env.SIGNATURA_DIR ?? '/app/uploads/signatura';

const udari = new Map<string, number[]>();

function preblizu(ip: string): boolean {
    const sada = Date.now();
    const skoro = (udari.get(ip) ?? []).filter((t) => sada - t < PROZOR_MS);
    skoro.push(sada);
    udari.set(ip, skoro);
    if (udari.size > 10_000) {
        for (const [k, t] of udari) if (t.every((x) => sada - x >= PROZOR_MS)) udari.delete(k);
    }
    return skoro.length > PO_PROZORU;
}

/**
 * ⚠️ Traefik NE šalje `X-Forwarded-For`; prava adresa dolazi kroz
 * `CF-Connecting-IP`. Bez ovoga bi svi posjetioci dijelili jedno
 * ograničenje — mjereno na klijentskim sajtovima.
 */
function adresa(req: Request): string {
    const h = req.headers;
    return (
        h.get('cf-connecting-ip') ||
        h.get('x-real-ip') ||
        (h.get('x-forwarded-for') || '').split(',')[0].trim() ||
        'nepoznat'
    );
}

/**
 * Dimenzije iz samog JPEG-a.
 *
 * Prolazi kroz oznake dok ne nađe SOF (početak kadra) i čita visinu pa
 * širinu. Vraća `null` za sve što nije ispravan JPEG — a to je i poenta:
 * ime datoteke i `Content-Type` koje šalje preglednik ne dokazuju ništa.
 */
function jpegDimenzije(b: Buffer): { w: number; h: number } | null {
    if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
    let i = 2;
    while (i + 3 < b.length) {
        if (b[i] !== 0xff) return null;
        const oznaka = b[i + 1];
        /* Bez tijela: RSTn, SOI, EOI, TEM */
        if ((oznaka >= 0xd0 && oznaka <= 0xd9) || oznaka === 0x01) { i += 2; continue; }
        const duzina = b.readUInt16BE(i + 2);
        if (duzina < 2) return null;
        const jeSof =
            (oznaka >= 0xc0 && oznaka <= 0xc3) ||
            (oznaka >= 0xc5 && oznaka <= 0xc7) ||
            (oznaka >= 0xc9 && oznaka <= 0xcb) ||
            (oznaka >= 0xcd && oznaka <= 0xcf);
        if (jeSof) {
            if (i + 9 > b.length) return null;
            return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        }
        i += 2 + duzina;
    }
    return null;
}

export async function POST(req: Request) {
    const ip = adresa(req);
    if (preblizu(ip)) {
        return NextResponse.json({ greska: 'Previše pokušaja. Pokušaj za sat vremena.' }, { status: 429 });
    }

    if (Number(req.headers.get('content-length') ?? 0) > MAX_BYTES) {
        return NextResponse.json({ greska: 'Slika je prevelika.' }, { status: 413 });
    }

    let slika: Buffer;
    try {
        const fd = await req.formData();
        const f = fd.get('slika');
        if (!(f instanceof Blob)) throw new Error('nema polja');
        if (f.size > MAX_BYTES) throw new Error('preveliko');
        slika = Buffer.from(await f.arrayBuffer());
    } catch {
        return NextResponse.json({ greska: 'Neispravan zahtjev.' }, { status: 400 });
    }

    const d = jpegDimenzije(slika);
    if (!d) {
        return NextResponse.json({ greska: 'Datoteka nije JPEG slika.' }, { status: 415 });
    }
    if (d.w !== W || d.h !== H) {
        return NextResponse.json(
            { greska: `Panel mora biti ${W}×${H}, a stigao je ${d.w}×${d.h}.` },
            { status: 422 }
        );
    }

    try {
        await mkdir(DIR, { recursive: true });
        const koliko = (await readdir(DIR)).filter((n) => n.endsWith('.jpg')).length;
        if (koliko >= MAX_FAJLOVA) {
            console.error('[signatura] granica od', MAX_FAJLOVA, 'panela dosegnuta — ne snimam');
            return NextResponse.json({ greska: 'Pohrana je puna. Javite se administratoru.' }, { status: 507 });
        }
        const ime = randomBytes(9).toString('hex') + '.jpg';
        await writeFile(join(DIR, ime), slika);
        console.log('[signatura] snimljen panel', ime, Math.round(slika.length / 1024) + ' kB');
        return NextResponse.json({ url: `/api/signatura/panel/${ime}` });
    } catch (e) {
        console.error('[signatura] snimanje nije prošlo:', (e as Error).message);
        return NextResponse.json({ greska: 'Snimanje nije prošlo.' }, { status: 500 });
    }
}
