# Deploy — portmix.ch

Klijent: **Nasuf Biljibani** · domena **portmix.ch** (Cloudflare)
Server: Futura VPS (Dokploy + Traefik, HTTPS preko Let's Encrypta)

## Šta je ovo

Statički marketinški sajt u Next.js-u sa `next-intl`. **Nema bazu**, nema
uploade, nema pozadinske poslove. Sve što servira dolazi iz slike, pa
redeploy ne može izgubiti podatke.

Jezici: **de, en, fr, it** (`messages/*.json`).
Podrazumijevani jezik i preusmjeravanje rješava `proxy.ts` (next-intl
middleware), pa gol `/` uvijek završi na jeziku — zdravstvena provjera zato
gađa `/en`, ne `/`.

Stranice: naslovna, `services`, `realisations`, `a-propos`, `contact`.

## Env varijable

**Nijedna nije obavezna.** Sajt radi bez ijedne tajne.

⚠️ Kad se doda prva `NEXT_PUBLIC_*`, mora ući u `Dockerfile` **prije**
`npm run build` — te varijable se peku u build, runtime ih ne vidi.

## Servis i port

| | |
|---|---|
| servis | `portmix-web` |
| interni port | `3000` |
| domena | `portmix.ch` (+ `www.portmix.ch`) |

Portovi se **ne** mapiraju na host — Traefik se spaja preko
`dokploy-network`. Oznake za rutiranje dopisuje Dokploy kad se domena podesi
u njegovom sučelju; u repou ih nema.

## Memorija

`mem_limit: 384m` uz `NODE_OPTIONS=--max-old-space-size=256`.

⚠️ Granica kontejnera je namjerno **iznad** kape za hip: obrada slika troši
**nativnu** memoriju koju ta kapa ne pokriva. AVIF je iz istog razloga
isključen u `next.config.ts` — 12.8.2026. je oborio sestrinski sajt
(asgklima.com) u OOM poslije 44 sata rada.

## Zdravstvena provjera

Compose ima `healthcheck` na `/en`. Bez njega Docker ne razlikuje „radi" od
„stoji a ne odgovara", pa oboren sajt izgleda kao živ.

FuturaOS uz to provjerava domenu spolja svakih 5 minuta i, ako padne dva puta
zaredom, sam pokuša dignuti kontejner i javi na Telegram.

## 🚨 Pošta ide preko Microsoft 365 — DNS zapisi se NE DIRAJU

`portmix.ch` koristi Microsoft 365 za mail. Ovi zapisi u Cloudflareu moraju
ostati netaknuti; brisanje bilo kojeg obara klijentu poštu:

```
MX    portmix.ch          portmix-ch.mail.protection.outlook.com
TXT   portmix.ch          v=spf1 include:spf.protection.outlook.com -all
TXT   portmix.ch          MS=ms57891872            (potvrda domene za M365)
TXT   portmix.ch          google-site-verification=…
TXT   _dmarc.portmix.ch   v=DMARC1;p=quarantine
CNAME autodiscover        autodiscover.outlook.com
NS    _domainkey          ns11/ns12.infomaniak.ch
```

⚠️ Hosting je namjerno na **Gratis** paketu bez mailova. Uključivanje mailova
kroz FuturaOS bi upisalo NAŠ MX i SPF i **prekinulo im poštu**.

## 📌 Zapamćeno sa prvog deploya

- Apex je imao **dva** `A` zapisa (stari hosting). FuturaOS mijenja samo prvi,
  pa je drugi ostao i sajt bi radio otprilike svaki drugi put — obrisan ručno.
- `npm ci` je padao: `@swc/helpers` nije bio usaglašen jer `next` prikiva
  0.5.15, a `next-intl` traži ≥0.5.17. Riješeno brisanjem `node_modules` i
  locka pa čistim `npm install`. `npm install --package-lock-only` NIJE
  dovoljan — zadrži staru verziju iz postojećeg `node_modules`.
- Dokploy app je prebačen sa `nixpacks` na `dockerfile` da koristi Dockerfile
  iz ovog repoa (standalone). Rezultat: **45 MB** umjesto ~500 MB.
- Granica memorije se u Dokployu upisuje **u bajtima** (384 MB = 402653184).

## Prvi deploy

1. Dokploy → nova aplikacija, izvor: `github.com/AdiZeljkovic/portmix`,
   grana `main`, tip **Docker Compose**.
2. Domene: `portmix.ch` i `www.portmix.ch`, HTTPS uključen.
3. U Cloudflareu `A` zapis na IP servera, **proxy isključen** (siva kapa) —
   inače Let's Encrypt ne može potvrditi domenu.
4. Deploy, pa provjeriti da `https://portmix.ch` vraća 200 i da SSL važi.
