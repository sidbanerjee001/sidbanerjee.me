'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import TextPop from "../UI/TextPop";
import MarkdownRenderer from "../UI/MarkdownRenderer";

import MusicBlogData from "../Data/MusicBlog.json";

const MusicPage = () => {
    const router = useRouter();

    const [currentTab, setCurrentTab] = useState('latest');

    const tabs = [
        { name: 'latest', value: 'Latest' },
        { name: 'note', value: 'Note' },
        { name: 'now playing', value: 'Now Playing' }
    ]
    
    return (
        <>
            <div id="full-wrapper" className="w-[80%] lg:w-[50%] m-auto my-24">
                <button onClick={() => router.push("https://sidbanerjee.me")}>
                    <svg viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 12H4m0 0l6-6m-6 6l6 6"></path> </g></svg>
                </button>
                <div id="header-wrapper" className="my-8 flex flex-row items-end justify-between">
                    <div>
                        <div className="flex flex-row">
                        <h1 className="font-medium text-xl">Music Space</h1>
                        </div>
                        <h2 className="text-sm mt-2">A repository for my thoughts and ideas on various musical things. Also a list of my current rotation, some production stuff, and (maybe) research documentation.</h2>
                        <div className="my-4">
                            <Link href={"https://open.spotify.com/playlist/41uoEiG93P0bAVKOmokVVu?si=e6a826aa391c49c6"}className="text-xs text-gray-400 underline">Spotify playlist of stuff I like right now.</Link>
                        </div>
                    </div>
                </div>

                <hr/>

                <div id="tabs" className="my-10 flex flex-row items-center">
                    {tabs.map((data, index) => (
                        <div key={index} className="mr-10">
                        <button onClick={() => setCurrentTab(data.name)}>
                            <p className={currentTab != data.name ? `text-gray-400 relative after:bg-[#8080ff]/50 after:absolute after:h-[3px] after:w-0 after:bottom-[-1px] after:left-0 hover:after:w-full after:transition-all after:duration-300` : `underline underline-offset-[4.5px] decoration-[3px] decoration-[#8080ff]/50`}>{data.name}</p>
                        </button>
                        </div>
                    ))}
                </div>

                <div id="content-wrapper">
                    <MarkdownRenderer
                        content={MusicBlogData[currentTab as keyof typeof MusicBlogData] ?? "No content here."}
                        classes={"text-sm"}
                    />
                </div>
            </div>
        </>
    );
}

export default MusicPage;