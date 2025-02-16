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
import ProjectPreviewRender from "./UI/ProjectPreview";

const About = () => {

  return (
    <div id="blurb-wrapper" className="my-10">
      <p className="my-2">I'm currently a sophomore studying Electrical Engineering &amp; Computer Science and Applied Math. My academic interests are in <TextPop>optimization, signal processing, stochastic modeling &amp; machine learning, and numerical analysis.</TextPop></p>
      <p className="my-2">Creatively, I'm passionate about engineering the future of artistic expression and experience. This includes generative AI models, virtual instrument, real-time feedback systems, and computer-assisted artwork.</p>
      <hr className="my-10 border-[#8080ff30] w-[15%]"/>
      <p className="my-2">Right now, I'm conducting research on multimodal maps (conceptual and probabalistic) between text clusters (i.e. word embeddings) and music clusters. I'm developing a clustering paradigm for sound via handcrafted features and autoencoders.</p>
      <p className="my-2">I'll be working at Amazon this summer as a Software Development Intern; I hope to build a career in software engineering and transition into R&D for generative AI and creative ML.</p>
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
    { name: 'projects', value: 'projects' }
  ]

  const tabsMap = new Map([
    ["about", <About/>],
    ["experience", <ExperienceRender ExperienceData={ExperienceData}/>],
    ["projects", <ProjectPreviewRender data={ProjectData}/>]
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
            <h2 className="text-sm text-gray-400 mt-2">Currently @ Berkeley studying: EECS, Math, Audio Tech.</h2>
          </div>
          <div className="w-[125px] h-[125px] relative overflow-hidden rounded-sm mx-5 lg:mx-0">
            <Image
              src={profileImage}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="lg:scale-[110%] scale-[150%]"
              quality={100}
              unoptimized={false}
            />
          </div>
        </div>

        <hr/>

        <div id="tabs" className="my-10 flex flex-row items-center">
          {tabs.map((data, index) => (
            <div key={index} className="mr-10">
              <button onClick={() => setCurrentTab(data.value)}>
                <p className={currentTab != data.value ? `text-gray-400 relative after:bg-[#8080ff]/50 after:absolute after:h-[3px] after:w-0 after:bottom-[-0.5px] after:left-0 hover:after:w-full after:transition-all after:duration-300` : `underline underline-offset-[4px] decoration-[3px] decoration-[#8080ff]/50`}>{data.name}</p>
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
