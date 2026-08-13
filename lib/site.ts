// Single source of truth for the site origin. Strips a trailing slash so a
// deploy env value like "https://www.portmix.ch/" can't produce "//de" URLs.
export const BASE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.portmix.ch'
).replace(/\/$/, '');
