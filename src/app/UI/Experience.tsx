import Link from "next/link";

interface ExperienceProps {
    start: string;
    end: string;
    role: string;
    company: string;
    description: string;
    link: string;
} 

interface ExperienceRenderProps {
    ExperienceData: Object;
}

const Experience: React.FC<ExperienceProps> = ({start, end, role, company, description, link}) => {
    return(
        <div id="role-experience" className="mb-[30px]">
            <div id="r-e-header" className="flex lg:items-center items-start flex-col lg:flex-row lg:gap-x-[8px]">
                <div className="flex flex-row items-center gap-x-[8px]">
                    <div className="aspect-square w-[5px] h-[5px] rounded-full bg-accent"></div>
                    <h1 className="text-xs text-gray-400 font-semibold upper">{start} — {end}</h1>
                </div>
                <div className="flex flex-row items-center gap-x-[8px] mx-[13px] mt-2 lg:mx-0 lg:mt-0">
                    <h1 className="text-sm text-black font-medium">{company}</h1>
                    <div className="aspect-square w-[5px] h-[5px] rounded-full bg-black"></div>
                    <h1 className="text-sm text-black font-normal">{role}</h1>
                    <Link href={link}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#999999" className="size-4"> 
                        <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" clipRule="evenodd" />
                    </svg>
                    </Link>
                </div>
            </div>
            <div id="r-e-content" className="flex flex-row gap-x-[16px] mt-[12px] items-stretch">
                <div id="r-e-vline" className="ml-[2px] w-[2px] bg-accent"></div>
                <div id="r-e-p">
                    <p className="text-sm text-black">
                        {description}   
                    </p>
                </div>
            </div>
        </div>
    );
}

const ExperienceRender: React.FC<ExperienceRenderProps> = ({ExperienceData}) => {
    return (
        <div>
            {Object.entries(ExperienceData).map(([key, value]) => (
                <Experience
                    key={key}
                    start={value.start}    
                    end={value.end}
                    role={value.role}
                    company={value.company}
                    description={value.description}
                    link={value.link}
                />
            ))}

            <hr className="my-10 border-[#8080ff30] w-[15%]"/>

            <div id="classes-wrapper">
                <p className="text-sm text-gray-500">Relevant Coursework: Data Structures &amp; Algorithms, Efficient Algorithms &amp; Intractable Problems, Signals &amp; Systems, Probability &amp; Random Processes, Sound &amp; Music Computing, Designing Information Devices &amp; Systems</p>
            </div>
        </div>
    );
}

export default ExperienceRender;