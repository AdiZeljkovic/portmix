// Companies PortMix SA has worked with (general contractors, developers,
// architecture firms). Logos are sourced from each company's own official
// site — `logo: null` means none was found yet; the UI falls back to a
// text badge in that case rather than fabricating a placeholder image.
//
// `logoOnDark` marks logos supplied as white/reversed artwork with no
// background — these need a dark tile instead of the default light one,
// or they render invisible.
export type Client = {
    name: string;
    slug: string;
    logo: string | null;
    logoOnDark?: boolean;
};

export const CLIENTS: Client[] = [
    { name: 'Integra SA', slug: 'integra-sa', logo: null },
    { name: 'Induni & Cie SA', slug: 'induni-cie-sa', logo: '/images/clients/induni-cie-sa.jpg' },
    { name: 'ALPENDA', slug: 'alpenda', logo: '/images/clients/alpenda.svg' },
    {
        name: 'Implenia Suisse SA',
        slug: 'implenia-suisse-sa',
        logo: '/images/clients/implenia-suisse-sa.webp',
        logoOnDark: true
    },
    { name: 'HRS Real Estate SA', slug: 'hrs-real-estate-sa', logo: '/images/clients/hrs-real-estate-sa.jpg' },
    {
        name: 'Frame Entreprise Générale',
        slug: 'frame-entreprise-generale',
        logo: '/images/clients/frame-entreprise-generale.png'
    },
    { name: 'TASQ Sàrl', slug: 'tasq-sarl', logo: '/images/clients/tasq-sarl.svg' },
    {
        name: 'Losinger Marazzi SA',
        slug: 'losinger-marazzi-sa',
        logo: '/images/clients/losinger-marazzi-sa.svg'
    },
    { name: 'Complex Bau AG', slug: 'complex-bau-ag', logo: '/images/clients/complex-bau-ag.jpg' },
    { name: 'ISG Schweiz AG', slug: 'isg-schweiz-ag', logo: '/images/clients/isg-schweiz-ag.jpg' },
    {
        name: 'Bat-Mann Constructeur',
        slug: 'bat-mann-constructeur',
        logo: '/images/clients/bat-mann-constructeur.jpg'
    },
    { name: 'BEG SA', slug: 'beg-sa', logo: '/images/clients/beg-sa.jpg' },
    { name: 'Swissroc', slug: 'swissroc', logo: '/images/clients/swissroc.png' },
    { name: 'OCS', slug: 'ocs', logo: null },
    { name: 'Labac Architecture', slug: 'labac-architecture', logo: '/images/clients/labac-architecture.svg' },
    { name: 'Bernard Nicod', slug: 'bernard-nicod', logo: '/images/clients/bernard-nicod.jpg' },
    { name: 'Villvert SA', slug: 'vilvert', logo: '/images/clients/vilvert.png' },
    { name: 'Bâtie', slug: 'batie', logo: null },
    { name: 'CSC', slug: 'csc', logo: '/images/clients/csc.png' },
    { name: 'Salchegger Sàrl', slug: 'salchegger-sarl', logo: '/images/clients/salchegger-sarl.png' },
    { name: 'EDIFEA', slug: 'edifea', logo: '/images/clients/edifea.png' },
    {
        name: 'Jaccaud Spicher Architectes Associés',
        slug: 'jaccaud-spicher-architectes-associes',
        logo: '/images/clients/jaccaud-spicher-architectes-associes.svg'
    },
    { name: 'Puma Construction', slug: 'puma-construction', logo: null },
    { name: 'Halter SA', slug: 'halter-sa', logo: '/images/clients/halter-sa.png' },
    { name: 'Porr Suisse AG', slug: 'porr-suisse-ag', logo: '/images/clients/porr-suisse-ag.svg' },
    {
        name: 'Marti Construction SA',
        slug: 'marti-construction-sa',
        logo: '/images/clients/marti-construction-sa.svg'
    },
    { name: 'Pizzera-Poletti SA', slug: 'pizzera-poletti-sa', logo: '/images/clients/pizzera-poletti-sa.svg' },
    { name: 'PP Integra SA', slug: 'pp-integra-sa', logo: '/images/clients/pp-integra-sa.png' },
    { name: 'NewMind', slug: 'newmind', logo: '/images/clients/newmind.svg', logoOnDark: true },
    { name: 'Gottaz', slug: 'gottaz', logo: null },
    { name: 'Own Concept Sàrl', slug: 'own-concept-sarl', logo: '/images/clients/own-concept-sarl.png' },
    {
        name: 'Atelier Zéro SA',
        slug: 'atelier-zero-sa',
        logo: '/images/clients/atelier-zero-sa.svg',
        logoOnDark: true
    },
    { name: 'Bosredon SA', slug: 'bosredon-sa', logo: '/images/clients/bosredon-sa.svg' },
    { name: 'Legato EG', slug: 'legato-eg', logo: '/images/clients/legato-eg.png' },
    { name: 'Louis Vuitton', slug: 'louis-vuitton', logo: '/images/clients/louis-vuitton.svg' }
];

export function getClient(name: string | null): Client | null {
    if (!name) return null;
    return CLIENTS.find((c) => c.name === name) ?? null;
}
