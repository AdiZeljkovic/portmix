import { notFound } from 'next/navigation';

// Catch-all inside the [locale] segment: any unknown path under a valid
// locale renders the localized not-found page (next-intl pattern).
export default function CatchAllPage() {
    notFound();
}
