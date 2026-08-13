# PortMix — Next.js standalone
#
# Gradjeno po `DEPLOY-UPUTE-ZA-AI.md` (Futura server: Dokploy + Traefik).
# Sajt je staticki marketinski, bez baze i bez migracija.

FROM node:22-slim AS build
WORKDIR /app

# Prvo samo manifest — sloj sa zavisnostima se kesira dok se one ne promijene.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# ⚠️ NEXT_PUBLIC_* se PEKU u build, pa moraju stajati prije `npm run build`.
# Ovaj sajt ih trenutno nema; kad se doda prvi, ide ovdje kao ARG/ENV.
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
# Kapa za JS hip. Ne pokriva nativnu memoriju (npr. obrada slika) — zato je
# `mem_limit` u composeu izdasniji od ovog broja, a ne jednak.
ENV NODE_OPTIONS=--max-old-space-size=256

# Standalone nosi svoje module; `static` i `public` se kopiraju rucno jer ih
# Next namjerno ne pakuje u standalone izlaz.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Ne radi kao root — slika `node` vec ima korisnika `node`.
USER node

EXPOSE 3000
# ⚠️ Server MORA slusati na 0.0.0.0 (HOSTNAME gore) — vezan na 127.0.0.1
# kontejner je nedostupan Traefiku.
CMD ["node", "server.js"]
