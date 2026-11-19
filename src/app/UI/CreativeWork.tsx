import Link from "next/link";

type Featured = { title: string; desc: string; tools: string; youtube: string; year?: string };
type Channel = { label: string; desc: string; href: string };
type Other = { title: string; desc: string; href: string };

interface CreativeWorkProps {
    data: { featured: Featured[]; channels: Channel[]; other: Other[] };
}

const CreativeWork: React.FC<CreativeWorkProps> = ({ data }) => (
    <div>
        <div className="grid grid-cols-1 gap-10">
            {data.featured.map((item) => (
                <figure key={item.youtube}>
                    <div className="relative w-full aspect-video bg-gray-100 rounded-sm overflow-hidden">
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/${item.youtube}`}
                            title={item.title}
                            loading="lazy"
                            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <figcaption className="mt-3">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{[item.tools, item.year].filter(Boolean).join(" · ")}</p>
                        <p className="text-gray-700 mt-2">{item.desc}</p>
                    </figcaption>
                </figure>
            ))}
        </div>

        <ul className="mt-12 space-y-4">
            {data.channels.map((c) => (
                <li key={c.href}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-medium text-accent-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                        {c.label} ↗
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
                </li>
            ))}
            <li>
                <Link href="/music" className="font-medium text-accent-ink underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
                    Music Blog ↗
                </Link>
                <p className="text-sm text-gray-600 mt-1">Essays on music, plus what I&apos;m listening to.</p>
            </li>
        </ul>

        {data.other.length > 0 && (
            <div className="mt-10 text-sm text-gray-600">
                <p className="font-medium text-gray-900">Other</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 marker:text-accent">
                    {data.other.map((o) => (
                        <li key={o.href}>
                            <a href={o.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent-ink">{o.title}</a>
                            {": "}{o.desc}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

export default CreativeWork;
