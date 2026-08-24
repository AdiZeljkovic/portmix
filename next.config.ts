import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /**
   * Standalone server — obavezno za deploy na Futura server.
   *
   * `next start` ucitava cijeli `node_modules` u RAM: mjereno ~490 MB naspram
   * ~130 MB za standalone na istom sajtu. Uz to Dockerfile pokrece bas
   * `.next/standalone/server.js`; sam config nije dovoljan.
   */
  output: "standalone",
  images: {
    /**
     * ⚠️ AVIF je namjerno iskljucen.
     *
     * 12.8.2026. je AVIF kodiranje oborilo asgklima.com: kontejner na 511 od
     * 512 MB, 99% procesora, Node ubijen poslije 44 sata. Mjereno tada, ista
     * slika: AVIF 93 KB / 2,44 s, WebP 176 KB / 0,70 s — a memorija se
     * poslije kodiranja NE VRACA (sedam sirina: 203 → 298 MB i ostaje).
     *
     * Posao radi nativna biblioteka, pa ga granica hipa ne pokriva. WebP je
     * oko 80 KB veci po slici; sajt radi.
     */
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Client/partner logos are served as SVG; scope the relaxed CSP to
    // just those optimized images.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  /**
   * 🚨 Kompresiju radi Traefik, ne Next — zato je ovdje `false`.
   *
   * Next zna samo gzip. Dok je bio uključen, on bi odgovor spakovao prvi, a
   * Traefik gotov odgovor više ne dira — pa se Brotli nikad nije javio.
   * Izmjereno na produkciji: pravi preglednik (`Accept-Encoding: gzip,
   * deflate, br, zstd`) dobijao je **gzip, 21.811 B**; Brotli se javljao samo
   * ako klijent zatraži isključivo `br`, što nijedan preglednik ne radi.
   *
   * Sa ovim isključenim Traefik komprimuje, i isti odgovor je **16.958 B** —
   * oko 22% manje, na svakoj stranici i svakom posjetiocu.
   *
   * ⚠️ Ako se ovo ikad vrati na `true`, Brotli tiho prestaje raditi: ništa
   * neće puknuti, sajt će samo postati veći. Serverska strana je u
   * `/etc/dokploy/traefik/dynamic/portmix-www.yml`, middleware
   * `portmix-compress`.
   */
  compress: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Belt-and-braces with app/robots.ts for staging deployments.
          ...(process.env.NOINDEX === "1"
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
      {
        // Raw /images assets have no build fingerprint — cache a day, then
        // revalidate (optimized /_next/image responses cache separately).
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // Client logo SVGs are repo-controlled, but serve them inert anyway
        // (the image-optimizer CSP doesn't cover direct /images/... requests).
        source: "/images/:path*.svg",
        headers: [
          { key: "Content-Security-Policy", value: "default-src 'none'; style-src 'unsafe-inline'; sandbox;" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
