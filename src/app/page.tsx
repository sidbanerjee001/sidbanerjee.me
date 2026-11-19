import fs from "fs";
import path from "path";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

import TextPop from "./UI/TextPop";
import Section from "./UI/Section";
import GithubIcon from "./UI/GithubIcon";
import LinkedInIcon from "./UI/LinkedInIcon";
import ResearchRender from "./UI/Research";
import CreativeWork from "./UI/CreativeWork";
import ExperienceRender from "./UI/Experience";
import Writing from "./UI/Writing";
import OpenOnHash from "./UI/OpenOnHash";

import profileImage from "./Img/profile.jpg";

import ExperienceData from "./Data/Experiences.json";
import ProjectData from "./Data/Projects.json";
import ResearchData from "./Data/Research.json";

// Drop a PDF at public/cv.pdf and the CV link appears automatically.
const HAS_CV = fs.existsSync(path.join(process.cwd(), "public/cv.pdf"));

const NAV = [
    { id: "research", label: "research" },
    { id: "work", label: "creative work" },
    { id: "experience", label: "experience" },
    { id: "writing", label: "writing" },
];

const About = () => (
    <div className="space-y-4 text-gray-800">
        <p>
            I&apos;m a senior at UC Berkeley studying Electrical Engineering &amp; Computer Science, working at the intersection of{" "}
            <TextPop>digital signal processing</TextPop>, <TextPop>music information retrieval</TextPop>, and <TextPop>machine learning</TextPop>.
        </p>
        <p>
            I'm excited about using data and machine learning as a means of &ldquo;crunching musical data&rdquo;:
            revealing hidden structures in music and powering human-centric composition tools. I conduct research at CNMAT and BAIR,
            and teach recitations for ELENG 66 (Signal Processing &amp; Applied Linear Algebra).
        </p>
        <p>
            I also make music and art: synthesis instruments in Max, audio-reactive visuals in TouchDesigner,
            and productions in Ableton that blend electronic/hyperpop, cloud rap, and jazz.
        </p>
        <p className="text-sm text-gray-600 pt-2">
            Contact: sidbanerjee[at]berkeley.edu
        </p>
    </div>
);

export default function Home() {
    return (
        <div className="max-w-3xl mx-auto px-6">
            <header className="pt-20 pb-10 flex flex-row items-end justify-between gap-6">
                <div>
                    <h1 className="font-medium text-2xl text-gray-900">Sid Banerjee</h1>
                    <p className="mt-3 text-gray-800">
                        Musician &amp; engineer working on audio ML, DSP, and interactive music systems.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">EECS @ UC Berkeley · Class of 2027</p>
                    <div className="mt-5 flex flex-row items-center gap-x-4">
                        {HAS_CV && (
                            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
                               className="py-[3px] px-4 border-[1.5px] border-black text-sm transition hover:text-accent-ink hover:border-accent">
                                CV
                            </a>
                        )}
                        <a href="https://github.com/sidbanerjee001" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GithubIcon />
                        </a>
                        <a href="https://www.linkedin.com/in/sidbanerjee00/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon />
                        </a>
                    </div>
                </div>
                <div className="w-[125px] h-[125px] shrink-0 relative overflow-hidden rounded-sm">
                    <Image
                        src={profileImage}
                        alt="Sid Banerjee"
                        width={250}
                        height={150}
                        className="object-cover scale-[150%]"
                        quality={90}
                        priority
                    />
                </div>
            </header>

            <nav className="sticky top-0 z-10 -mx-6 px-6 py-3 bg-white/90 backdrop-blur border-b border-gray-200">
                <ul className="flex flex-row flex-wrap gap-x-6 gap-y-1 text-sm">
                    {NAV.map((n) => (
                        <li key={n.id}>
                            <a href={`#${n.id}`} className="text-gray-600 hover:text-gray-900 underline-offset-[5px] decoration-2 decoration-accent/60 hover:underline">
                                {n.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            <section id="about" className="py-10">
                <About />
            </section>

            <Section id="research" title="Research">
                <ResearchRender ResearchData={ResearchData} />
            </Section>

            <Section id="work" title="Selected Creative Work & Projects">
                <CreativeWork data={ProjectData} />
            </Section>

            <Section id="experience" title="Experience">
                <ExperienceRender ExperienceData={ExperienceData} />
            </Section>

            <Section id="writing" title="Writing">
                <Writing />
            </Section>

            <footer className="py-12 border-t border-gray-200 text-xs text-gray-500">
                © {new Date().getFullYear()} Sid Banerjee
            </footer>
        </div>
    );
}
