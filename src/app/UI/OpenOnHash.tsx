'use client'

import { useEffect } from "react";

// Ensures a collapsed <details> section opens when navigated to via an in-page
// anchor (nav click, or a deep link like /#research on load).
export default function OpenOnHash() {
    useEffect(() => {
        const open = (hash: string) => {
            const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
            if (el instanceof HTMLDetailsElement) el.open = true;
        };

        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element).closest('a[href^="#"]');
            if (a) open(a.getAttribute("href")!);
        };

        open(window.location.hash);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);

    return null;
}
