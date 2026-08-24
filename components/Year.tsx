'use client';

import { useEffect, useState } from 'react';

// The footer is statically generated, so a bare new Date() would bake the
// build year forever; this corrects itself on the client after mount.
export default function Year() {
    const [year, setYear] = useState(2026);
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
    return <span suppressHydrationWarning>{year}</span>;
}
