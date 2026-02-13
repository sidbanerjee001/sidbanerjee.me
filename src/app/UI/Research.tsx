import Link from "next/link";

import { useRouter } from "next/navigation";

interface ResearchProps {
    title: string;
    preprint_link?: string | null;
    journal_link?: string | null;
    description: string;
    conference_submissions?: string | null;
} 

interface ResearchRenderProps {
    ResearchData: Object;
}

const Research: React.FC<ResearchProps> = ({title, preprint_link, journal_link, description, conference_submissions}) => {
    const router = useRouter();
    return(
        <div id="research-item" className="mb-[30px]">
            <div id="research-header" className="flex items-start flex-col">
                <h1 className="text-sm font-semibold">{title}</h1>
            </div>
            <div id="research-content" className="flex flex-row mt-[12px] items-stretch">
                <div id="research-description">
                    <p className="text-sm text-gray-500">
                        {description}   
                    </p>
                    {conference_submissions && (
                        <p className="text-xs text-gray-400 mt-2 italic">
                            Conference Submissions: {conference_submissions}
                        </p>
                    )}
                    <div className="flex flex-row items-end justify-end mt-[12px]">
                        {preprint_link && (
                            <>
                                <button className="py-[2px] px-6 border-[1.5px] border-black text-xs transition hover:text-accent hover:border-accent" onClick={() => router.push(preprint_link)}>Paper Link</button>
                            </>
                        )}
                        {journal_link && (
                            <>
                                <button className="py-[3px] px-8 border-[1.5px] border-black text-sm transition hover:text-accent hover:border-accent" onClick={() => router.push(journal_link)}>Publication</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResearchRender: React.FC<ResearchRenderProps> = ({ResearchData}) => {
    return (
        <div>
            {Object.entries(ResearchData).map(([key, value]) => (
                <Research
                    key={key}
                    title={value.title}    
                    preprint_link={value.preprint_link}
                    journal_link={value.journal_link}
                    description={value.description}
                    conference_submissions={value.conference_submissions}
                />
            ))}

            <hr className="my-[12px] border-[#8080ff30]"/>
        </div>
    );
}

export default ResearchRender;