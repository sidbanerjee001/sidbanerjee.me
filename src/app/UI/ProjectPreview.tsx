'use client'

import { useRouter } from "next/navigation";

interface ProjectPreviewProps {
    title: string,
    desc: string,
    link: string
}

interface ProjectPreviewRenderProps {
    data: Object;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({title, desc, link}) => {
    const router = useRouter();

    return (
        <div>
            <div id="header-wrapper" className="flex flex-row items-center gap-x-2">
                <div>
                    <svg viewBox="0 0 512 512" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-down-right</title> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="add" fill="#000000" transform="translate(106.666667, 64.000000)"> <polygon id="Shape" points="320 234.666667 192 362.666667 161.706667 332.373333 238.293333 256 -1.42108547e-14 256 -1.42108547e-14 0 42.6666667 0 42.6666667 213.333333 238.293333 213.333333 161.706667 136.96 192 106.666667"> </polygon> </g> </g> </g></svg>
                </div>
                <div>
                    <h1 className="text-lg font-medium">{title}</h1>
                </div>
            </div>

            <div id="content-wrapper" className="flex flex-row items-end justify-between mt-4">
                <div className="w-[70%]">
                    <p className="text-sm text-gray-400">{desc}</p>
                </div>
                <div>
                    <button className="py-[3px] px-8 border-[1.5px] border-black text-sm transition hover:text-accent hover:border-accent" onClick={() => router.push(link)}>View</button>
                </div>
            </div>

            <hr className="my-8"/>
        </div>
    );
}

const ProjectPreviewRender: React.FC<ProjectPreviewRenderProps> = ({data}) => {
    return (
        <div>
            {Object.entries(data).map(([key, value]) => (
                <ProjectPreview
                    key={key}
                    title={value.title}
                    desc={value.desc}
                    link={value.link}
                />
            ))}
        </div>
    );
}

export default ProjectPreviewRender;