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
    foundedYear: 2017
} as const;

// Team members. `roleKey` maps to about.role* translations.
// `photo` stays null until real photos arrive — a monogram avatar is shown instead.
export type TeamMember = {
    name: string;
    roleKey:
        | 'roleFounder'
        | 'roleCommercial'
        | 'roleProjectLead'
        | 'roleAssistant'
        | 'roleClientCare'
        | 'roleInstallLead'
        | 'roleArchitect';
    photo: string | null;
    placeholder?: boolean; // reserved seat, no person yet
};

export const TEAM: TeamMember[] = [
    { name: 'Nasuf Biljibani', roleKey: 'roleFounder', photo: null },
    { name: 'Michael Maglio', roleKey: 'roleCommercial', photo: null },
    { name: 'Laurent Nombret', roleKey: 'roleProjectLead', photo: null },
    { name: 'Damien Canipel', roleKey: 'roleProjectLead', photo: null },
    { name: 'Nassem Ait-Khelifa', roleKey: 'roleProjectLead', photo: null },
    { name: 'Daniel Murgia', roleKey: 'roleAssistant', photo: null },
    { name: 'Ensara Biljibani', roleKey: 'roleClientCare', photo: null },
    { name: 'Tiago Sousa Ferreira', roleKey: 'roleInstallLead', photo: null },
    { name: '', roleKey: 'roleArchitect', photo: null, placeholder: true }
];
