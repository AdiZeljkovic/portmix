import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'PortMix SA',
        short_name: 'PortMix',
        description:
            "Portes, armoires et dressings sur mesure en Suisse romande — intérieurs d'exception depuis 2017.",
        start_url: '/',
        display: 'browser',
        background_color: '#1d1a17',
        theme_color: '#1d1a17',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }]
    };
}
