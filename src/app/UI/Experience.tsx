interface ExperienceProps {
    start: string;
    end: string;
    role: string;
    company: string;
    description: string;
    link?: string;
}

const ExternalArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
    </svg>
);

const Experience: React.FC<ExperienceProps> = ({ start, end, role, company, description, link }) => (
    <div className="mb-8 last:mb-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-x-2">
            <div className="flex flex-row items-center gap-x-2">
                <div className="w-[5px] h-[5px] rounded-full bg-accent" />
                <p className="text-xs text-gray-500 font-semibold uppercase">{start} — {end}</p>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-x-2 ml-[13px] mt-2 lg:ml-0 lg:mt-0">
                <h3 className="font-medium text-gray-900">{company}</h3>
                <div className="w-[5px] h-[5px] rounded-full bg-gray-900" />
                <p className="text-gray-900">{role}</p>
                {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${company} (opens in new tab)`} className="text-gray-400 hover:text-accent-ink">
                        <ExternalArrow />
                    </a>
                )}
            </div>
        </div>
        <div className="flex flex-row gap-x-4 mt-3 items-stretch">
            <div className="ml-[2px] w-[2px] shrink-0 bg-accent" />
            <p className="text-gray-700">{description}</p>
        </div>
    </div>
);

const ExperienceRender: React.FC<{ ExperienceData: Record<string, ExperienceProps> }> = ({ ExperienceData }) => (
    <div>
        {Object.entries(ExperienceData).map(([key, value]) => (
            <Experience key={key} {...value} />
        ))}

        <p className="mt-10 text-sm text-gray-600">
            <span className="font-medium text-gray-900">Relevant coursework:</span> Signals &amp; Systems, Probability &amp; Random Processes, Sound &amp; Music Computing, Machine Learning, Optimization Models in Engineering, Designing Information Devices &amp; Systems, Data Structures &amp; Algorithms, Efficient Algorithms &amp; Intractable Problems
        </p>
    </div>
);

export default ExperienceRender;
