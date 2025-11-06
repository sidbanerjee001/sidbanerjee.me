'use client'

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';

import TextPop from "./UI/TextPop";
import ExperienceRender from "./UI/Experience";
import GithubIcon from "./UI/GithubIcon";

import profileImage from './Img/profile.jpg';
import { useRouter } from "next/navigation";
import WritingIcon from "./UI/LinkedInIcon";

import ExperienceData from './Data/Experiences.json';
import ProjectData from './Data/Projects.json';
import NotesData from './Data/Notes.json';

import ProjectPreviewRender from "./UI/ProjectPreview";
import NotesPreviewRender from "./UI/NotesPreview";

const About = () => {

  return (
    <div id="blurb-wrapper" className="my-10 text-sm">
    <p className="my-4">
      I'm currently a junior studying Electrical Engineering &amp; Computer Science and Applied Math. 
      My academic interests are in <TextPop>digital signal processing, acoustics, NLP, and machine learning.</TextPop>
    </p>

    <p className="my-4">
      I'm broadly interested in multimodal AI/ML research (particularly in acoustics and generative music), 
      forward deployed engineering, and technical/product management.
    </p>

    <p className="my-4">
      Right now, I'm conducting research @ BAIR on <Link 
        href="http://got-duplex.github.io/" 
        target="_blank" 
        className="inline-flex items-center text-gray-500 hover:text-gray-400 transition"
      >
        <span className="underline decoration-[#8080ff]"><TextPop>conversational behavior modeling</TextPop></span>
      
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3 ml-1">
          <path 
            fillRule="evenodd" 
            d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z" 
            clipRule="evenodd" 
          />
        </svg>
      </Link> through predictive transformer models and dynamic Graph of Thought generation, and @ CNMAT on <TextPop>deep learning methods for signal reconstruction</TextPop>. I'm also on course staff of 
      EECS16A (Signal Processing &amp; Applied Linear Algebra).
    </p>

    <hr className="my-5 border-[#8080ff30] w-[10%]" />

    <p className="text-gray-500 text-sm">
      Talk [jazz, art, computer science, math, etc.] with me: sidbanerjee[at]berkeley.edu.
    </p>

    <div className="my-5">
      <TextPop><Link href="/music">→ Music Blog</Link></TextPop>
    </div>
  </div>
  );
}

export default function Home() {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState('about');

  const tabs = [
    { name: 'about', value: 'about' },
    { name: 'experience', value: 'experience' },
    { name: 'projects', value: 'projects' },
    { name: 'notes', value: 'notes'}
  ]

  const tabsMap = new Map([
    ["about", <About/>],
    ["experience", <ExperienceRender ExperienceData={ExperienceData}/>],
    ["projects", <ProjectPreviewRender data={ProjectData}/>],
    ["notes", <NotesPreviewRender data={NotesData}/>]
  ])

  return (
    <>
      <div id="full-wrapper" className="w-[80%] lg:w-[50%] m-auto my-24">
        <div id="header-wrapper" className="my-10 flex flex-row items-end justify-between">
          <div>
            <div className="flex flex-row">
              <h1 className="font-medium text-xl">Sid Banerjee</h1>
              <div id="social-buttons-wrapper" className="flex flex-row justify-end gap-x-4 mx-4">
                <button onClick={() => router.push("https://github.com/sidbanerjee001")}>
                  <GithubIcon/>
                </button>
                <button onClick={() => router.push("https://www.linkedin.com/in/sidbanerjee00/")}>
                  <WritingIcon/>
                </button>
              </div>
            </div>
            <h2 className="text-md mt-6"><TextPop>Musician</TextPop> and <TextPop>Engineer</TextPop>, in the Media Arts &amp; Technology</h2>
            <h2 className="text-sm text-gray-400 mt-2">Currently @ Berkeley studying EECS & Applied Math.</h2>
          </div>
          <div className="w-[125px] h-[125px] relative overflow-hidden rounded-sm mx-5 lg:mx-0">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={250}
              height={150}
              className="object-cover lg:scale-[150%] scale-[150%]"
              quality={90}
              priority
            />
          </div>
        </div>

        <hr/>

        <div id="tabs" className="my-10 flex flex-row items-center">
          {tabs.map((data, index) => (
            <div key={index} className="mr-10">
              <button onClick={() => setCurrentTab(data.value)}>
                <p className={currentTab != data.value ? `text-gray-400 relative after:bg-[#8080ff]/50 after:absolute after:h-[3px] after:w-0 after:bottom-[-1px] after:left-0 hover:after:w-full after:transition-all after:duration-300` : `underline underline-offset-[4.5px] decoration-[3px] decoration-[#8080ff]/50`}>{data.name}</p>
              </button>
            </div>
          ))}
        </div>

        <div id="content-wrapper" className="mt-8">
          {tabsMap.get(currentTab) || <p>No content here...</p>}
        </div>
      </div>
    </>
  );
}
