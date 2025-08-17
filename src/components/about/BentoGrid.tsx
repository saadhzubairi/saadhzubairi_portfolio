import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomDiv from "../CustomDiv";
import { ArrowDownRightFromSquareIcon, X } from "lucide-react";
import EducationDetails from "./details/EducationDetails";
import ExperienceDetails from "./details/ExperienceDetails";
import SkillsDetails from "./details/SkillsDetails";
import skillsData from "../../assets/skills_data/skills.json";
import ResearchDetails from "./details/ResearchDetails";
import researchData from "../../assets/EDXP_data/research.json";
import { Link } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";


function BentoGrid(): JSX.Element {
    const [expandedBox, setExpandedBox] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const expandedBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    useEffect(() => {
        if (expandedBox && isMobile) {
            document.body.style.overflow = 'hidden';
            if (expandedBoxRef.current) {
                expandedBoxRef.current.scrollTo(0, 0);
            }
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [expandedBox, isMobile]);

    const handleBoxClick = (boxId: string) => {
        setExpandedBox(expandedBox === boxId ? null : boxId);
    };

    const boxes = [
        { id: 'education', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', content: <EducationSummary />, details: <EducationDetails /> },
        { id: 'experience', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-3', content: <ExperienceSummary />, details: <ExperienceDetails /> },
        { id: 'skills', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-3', content: <SkillsSummary />, details: <SkillsDetails /> },
        { id: 'research', colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2', content: <ResearchSummary />, details: <ResearchDetails /> },
    ];

    const selectedBox = boxes.find(box => box.id === expandedBox);

    return (
        <section className="section" id="About">
            <CustomDiv>
                <div className=""></div>
            </CustomDiv>
            <CustomDiv>
                <h2 className="text-4xl font-bold">At a glance</h2>
            </CustomDiv>
            <CustomDiv>
                <span className="text-lg text-gray-500">A summary of my skills and experiences</span>
            </CustomDiv>
            <CustomDiv>
                <div className="h-10"></div>
            </CustomDiv>

            <div className="w-full max-w-6xl mx-auto">
                <div className="relative flex items-center justify-center w-full">
                    <div className="grid w-full md:min-h-[560px] grid-cols-1 md:grid-cols-4 md:grid-rows-5 gap-4 bg-neutral-100 dark:bg-gray-900 p-2">
                        {boxes.map(box => (
                            <motion.div
                                key={box.id}
                                layoutId={box.id}
                                className={`${box.colSpan} ${box.rowSpan} rounded-lg flex flex-col border bg-white dark:bg-[#020c16]`}
                                transition={{ type: "tween", duration: 0.4, ease: [0.23, 0.84, 0.07, 0.98] }}
                            >
                                <div className="flex-grow p-4 overflow-hidden">
                                    {box.content}
                                </div>
                                <div onClick={() => handleBoxClick(box.id)} className="rounded-lg text-center flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                                    <ArrowDownRightFromSquareIcon size={10} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedBox && (
                            <motion.div
                                ref={expandedBoxRef}
                                layoutId={selectedBox.id}
                                className={isMobile
                                    ? "fixed inset-0 bg-white dark:bg-[#020c16] z-50 overflow-y-auto"
                                    : "absolute inset-2 bg-white dark:bg-[#020c16] z-10 rounded-lg flex flex-col"
                                }
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: "tween", duration: 0.4, ease: [0.23, 0.84, 0.07, 0.98] }}
                            >
                                {isMobile ? (
                                    <div className="py-14">
                                        {selectedBox.details}
                                        <div
                                            onClick={() => handleBoxClick(selectedBox.id)}
                                            className="sticky bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center z-50"
                                        >
                                            <X size={20} />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-grow p-4 overflow-y-auto">
                                            {selectedBox.details}
                                        </div>
                                        <div onClick={() => handleBoxClick(selectedBox.id)} className="rounded-lg text-center flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-800 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <X size={10} />
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <CustomDiv>
                <div className=""></div>
            </CustomDiv>
        </section>
    );
}

const EducationSummary = () => (
    <section className="bg-white dark:bg-[#020c16] rounded-xl w-full h-full flex flex-col">
        <header className="flex items-center justify-between border-b pb-4 border-gray-200 dark:border-gray-700 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Education</h2>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-center text-sm font-medium py-2 px-4 rounded-lg">
                Expected to graduate in May, 2026
            </div>
        </header>
        <article className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 flex-grow">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg">
                <img src="/EDXP_logos/NYU.png" alt="NYU Logo" className="w-12 h-12 object-contain rounded" />
            </div>
            <div className="flex-grow w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">New York University</h3>
                        <p className="text-md text-gray-600 dark:text-gray-400">Master's in Computer Science</p>
                    </div>
                    <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 mt-2 sm:mt-0">
                        Thesis In Progress
                    </span>
                </div>
            </div>
        </article>
        <div className="flex flex-wrap gap-2 mt-4">
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">Machine Learning Ops</span>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">Deep Learning</span>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">Physiological Signal Processing</span>
        </div>
    </section>
);

const ExperienceSummary = () => (
    <section className="bg-white dark:bg-[#020c16] rounded-xl w-full h-full flex flex-col">
        <header className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Professional Experiences</h2>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">1+ year(s)</span>
        </header>
        <div className="space-y-6 flex-grow">
            <article className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-900 text-white flex items-center justify-center rounded-lg">
                    <img src="/XP_logos/cloaked.png" alt="Cloaked Logo" className="w-6 h-6 object-contain rounded" />
                </div>
                <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            Cloaked, Inc.
                            <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">New York City</span>
                        </h3>
                        <time className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">June 2025 – August 2025</time>
                    </div>
                    <h4 className="text-md font-medium text-indigo-600 dark:text-indigo-400">Software Engineering Intern</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        AI Powered Internal Tooling, Data Scraping, Geotagging, LLM Powered Educational Portal.
                    </p>
                </div>
            </article>
            <hr className="border-gray-100 dark:border-gray-800" />
            <article className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg">
                    <img src="/EDXP_logos/NYU.png" alt="NYU Logo" className="w-10 h-10 object-contain rounded" />
                </div>
                <div className="flex-grow w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                            New York University
                            <span className="text-base font-normal text-gray-500 dark:text-gray-400 ml-2">New York City</span>
                        </h3>
                        <time className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">April 2025 – Present</time>
                    </div>
                    <h4 className="text-md font-medium text-indigo-600 dark:text-indigo-400">Full Stack Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        T3 Stack Web Portals Development, Migrations, Development Support.
                    </p>
                </div>
            </article>
        </div>
    </section>
);


const ResearchSummary = () => (
    <div className="p-4 h-full w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Publications & Research</h2>
        <div className="flex flex-row flex-wrap gap-2">
            {researchData.map((item, index) => (
                <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <Link size={16} className="text-gray-600 dark:text-gray-400" />
                        </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <p className="text-sm">{item.title}</p>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </div>
    </div>
);

const SkillsSummary = () => (
    <div className="p-4 h-full w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Skills</h2>
        <div className="grid grid-cols-6 gap-4">
            {skillsData.flatMap((category: { skills: any; }) => category.skills).slice(0, 18).map((skill: { name: React.Key | null | undefined; logo: string | undefined; }) => (
                <div key={skill.name} className="flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {skill.logo ? (
                        <img src={skill.logo} alt={`${skill.name} Logo`} className="w-8 h-8 object-contain" />
                    ) : (
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md text-xs font-bold text-gray-500 dark:text-gray-400">
                            {typeof skill.name === "string" && skill.name
                                ? skill.name.substring(0, 1)
                                : "?"}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);


export default BentoGrid;


