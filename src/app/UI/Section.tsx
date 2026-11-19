import React from "react";

// Collapsible section built on native <details>: open by default, no JS required,
// keyboard/screen-reader accessible out of the box.
const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
    <details id={id} open className="group scroll-mt-16 border-t border-gray-200">
        <summary className="flex items-center justify-between py-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 group-hover:text-gray-900 transition-colors">
                {title}
            </h2>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-gray-400 -rotate-90 group-open:rotate-0 transition-transform duration-200"
                aria-hidden="true"
            >
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </summary>
        <div className="pb-12 pt-2">{children}</div>
    </details>
);

export default Section;
