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
    <div id="blurb-wrapper" className="my-10">
      <p className="my-2">I'm currently a junior studying Electrical Engineering &amp; Computer Science and Applied Math. My academic interests are in <TextPop>optimization, digital signal processing, and machine learning.</TextPop></p>
      <p className="my-2">Creatively, I'm passionate about engineering the future of artistic expression and experience. This includes generative AI models, virtual instruments, real-time harmonic systems, and computer-assisted artwork.</p>
      <hr className="my-10 border-[#8080ff30] w-[15%]"/>
      <p className="my-2">Right now, I'm an undergrad researcher @ Berkeley's CNMAT studying <TextPop>neural methods for sound hybridization, particularly through the lens of representation learning and attention</TextPop>. I'm also conducting research @ BAIR on <TextPop> modeling conversations through causal inference of speech behavior and several music-related models </TextPop> (transcription, classification, etc.).</p>
      <p className="my-2">I have industry experience in both big tech and startups, and am always looking for my next technical challenge.</p>
      <hr className="my-10 border-[#8080ff30] w-[15%]"/>
      <p className="text-gray-500 text-sm">Talk [jazz, art, computer science, math, etc.] with me: sidbanerjee[at]berkeley.edu.</p>
      <div className="my-10">
        <TextPop><Link href={"/music"}>→ Music Blog</Link></TextPop>
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
