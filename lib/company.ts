export const COMPANY = {
    name: 'PortMix SA',
    tagline: "intérieurs d'exception",
    email: 'info@portmix.ch',
    phone: '+41 21 611 12 14',
    phoneHref: 'tel:+41216111214',
    address: 'Route des Toches 3, 1026 Echandens',
    mapsUrl: 'https://maps.google.com/?q=Route+des+Toches+3,+1026+Echandens',
    mapsEmbed:
        'https://www.google.com/maps?q=Route+des+Toches+3,+1026+Echandens&output=embed',
    foundedYear: 2017,
    // Structured fields for schema.org (see components/StructuredData.tsx)
    street: 'Route des Toches 3',
    postalCode: '1026',
    city: 'Echandens',
    region: 'Vaud',
    country: 'CH'
} as const;

// Organizational chart, exactly as supplied by the client (first names and
// spellings preserved). Role keys map to about.role* translations; the
// department name is a brand and stays untranslated across locales.
export type OrgPerson = {
    name: string;
    roleKey:
        | 'roleGm'
        | 'roleDesignSales'
        | 'roleTechDev'
        | 'roleAdmin'
        | 'roleFinance'
        | 'rolePm'
        | 'roleInstall'
        | 'roleInterior'
        | 'roleInteriorJr';
    badgeKey?: 'orgInstallers';
};

export type OrgBranch = {
    head: OrgPerson;
    members: OrgPerson[];
    department?: { name: string; members: OrgPerson[] };
};

export const ORG: { lead: OrgPerson; branches: OrgBranch[] } = {
    lead: { name: 'Nasuf', roleKey: 'roleGm' },
    branches: [
        {
            head: { name: 'Elma', roleKey: 'roleDesignSales' },
            members: [
                { name: 'Kenan', roleKey: 'roleAdmin' },
                { name: 'Enes', roleKey: 'roleFinance' }
            ]
        },
        {
            head: { name: 'Naseem', roleKey: 'roleTechDev' },
            members: [
                { name: 'Damien', roleKey: 'rolePm' },
                { name: 'Laurent', roleKey: 'rolePm' },
                { name: 'Ajla', roleKey: 'rolePm' },
                { name: 'Tarik', roleKey: 'rolePm' },
                { name: 'Tiago', roleKey: 'roleInstall', badgeKey: 'orgInstallers' }
            ],
            department: {
                name: 'Studio PortMix',
                members: [
                    { name: 'Ensara', roleKey: 'roleInteriorJr' },
                    { name: 'Elyna', roleKey: 'roleInterior' }
                ]
            }
        }
    ]
};
