import React from 'react';
import experienceData from '../../../assets/EDXP_data/experience.json';
import { ExternalLink, Linkedin, ChevronsRight } from 'lucide-react';

const ExperienceDetails = () => {
    const fullDetailExperiences = experienceData.slice(0, 4);
    const compactExperiences = experienceData.slice(4);

    const FullDetailCard = ({ exp }: { exp: any }) => (
        <div className="bg-white dark:bg-[#020c16] rounded-lg p-6 flex flex-col">
            <div className="flex items-start mb-4">
                <img src={exp.logo} alt={`${exp.company} Logo`} className="w-16 h-16 mr-4 rounded-md flex-shrink-0" />
                <div className="w-full">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{exp.company}</h3>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{exp.desg}</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{exp.years}</p>
                </div>
            </div>
            <div className="flex items-center mb-4 space-x-4">
                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    <ExternalLink size={14} className="mr-1.5" />
                    Website
                </a>
                <a href={exp.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    <Linkedin size={14} className="mr-1.5" />
                    LinkedIn
                </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{exp.desc}</p>
            <ul className="space-y-2 mb-4">
                {exp.resps.map((resp: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <ChevronsRight size={16} className="mr-2 mt-0.5 flex-shrink-0 text-indigo-500" />
                        {resp}
                    </li>
                ))}
            </ul>
            <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill: string, i: number) => (
                    <span key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
                ))}
            </div>
        </div>
    );

    const CompactCard = ({ exp }: { exp: any }) => (
        <div className="bg-white dark:bg-[#020c16] rounded-lg p-4 flex flex-col">
            <div className="flex items-center mb-3">
                <img src={exp.logo} alt={`${exp.company} Logo`} className="w-10 h-10 mr-3 rounded-md flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-900 dark:text-gray-100">{exp.company}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.desg}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{exp.years}</p>
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((skill: string, i: number) => (
                    <span key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">{skill}</span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 dark:bg-[#0a101e]">
            <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter">Experience Workbench</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">A detailed look at my professional background.</p>
            </header>
            <div className="space-y-4">
                <div className="space-y-4">
                    {fullDetailExperiences.map((exp, i) => <FullDetailCard key={i} exp={exp} />)}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">Additional Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {compactExperiences.map((exp, i) => <CompactCard key={i} exp={exp} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceDetails;
