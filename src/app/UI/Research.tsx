type AudioClip = { label: string; src: string };

interface ResearchProps {
    title: string;
    description: string;
    year?: string;
    venue?: string;
    authors?: string;
    preprint_link?: string | null;
    journal_link?: string | null;
    notes_link?: string | null;
    conference_submissions?: string | null;
    audio?: AudioClip[];
}

const ME = "Siddharth Banerjee";

const linkClass = "py-[3px] px-5 border-[1.5px] border-black text-xs transition hover:text-accent-ink hover:border-accent";

const Authors = ({ authors }: { authors: string }) => {
    const parts = authors.split(ME);
    return (
        <p className="text-xs text-gray-500 mt-2">
            {parts.map((part, i) => (
                <span key={i}>
                    {part}
                    {i < parts.length - 1 && <strong className="font-semibold text-gray-900">{ME}</strong>}
                </span>
            ))}
        </p>
    );
};

const Research: React.FC<ResearchProps> = ({ title, description, year, venue, authors, preprint_link, journal_link, notes_link, conference_submissions, audio }) => (
    <article className="mb-12 last:mb-0">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {(year || venue) && (
            <p className="text-xs text-gray-500 mt-1">{[venue, year].filter(Boolean).join(" · ")}</p>
        )}
        {authors && <Authors authors={authors} />}
        <p className="text-gray-700 mt-3">{description}</p>
        {conference_submissions && (
            <p className="text-xs text-gray-500 mt-2 italic">Submitted to {conference_submissions}</p>
        )}

        {audio && audio.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {audio.map((clip) => (
                    <div key={clip.src}>
                        <p className="text-xs text-gray-500 mb-1">{clip.label}</p>
                        <audio controls preload="none" src={clip.src} className="w-full h-8" />
                    </div>
                ))}
            </div>
        )}

        <div className="flex flex-row flex-wrap mt-4 gap-2">
            {notes_link && <a href={notes_link} className={linkClass}>Write-up</a>}
            {preprint_link && <a href={preprint_link} target="_blank" rel="noopener noreferrer" className={linkClass}>Paper</a>}
            {journal_link && <a href={journal_link} target="_blank" rel="noopener noreferrer" className={linkClass}>Publication</a>}
        </div>
    </article>
);

const ResearchRender: React.FC<{ ResearchData: Record<string, ResearchProps> }> = ({ ResearchData }) => (
    <div>
        {Object.entries(ResearchData).map(([key, value]) => (
            <Research key={key} {...value} />
        ))}
    </div>
);

export default ResearchRender;
