import React from 'react';
import educationData from '../../../assets/EDXP_data/education.json';
import { ExternalLink, Linkedin } from 'lucide-react';

const EducationDetails = () => {
    const nyu = educationData.find(edu => edu.institute.includes("New York University"));
    const iba = educationData.find(edu => edu.institute.includes("Institute of Business Administration"));

    const SchoolCard = ({ school }: { school: any }) => {
        if (!school) return null;

        return (
            <div className="bg-white dark:bg-[#020c16] rounded-lg flex flex-col p-6">
                <div className="flex items-start mb-4">
                    <img src={school.logo} alt={`${school.institute} Logo`} className="w-12 h-12 md:w-16 md:h-16 mr-4 rounded-md flex-shrink-0" />
                    <div className="w-full">
                        <h3 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">{school.institute}</h3>
                        <p className="text-md font-medium text-gray-700 dark:text-gray-300">{school.degree}</p>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-x-2 gap-y-1 mt-1">
                            <p className="text-md md:text-lg font-semibold text-gray-700 dark:text-gray-300">{school.session}</p>
                            {school.institute.includes("New York University") && (
                                <div className="h-full flex items-center justify-center">
                                    <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded-md md:rounded-full dark:bg-indigo-900 dark:text-indigo-300 self-start">
                                        Expected
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center mb-6 space-x-4">
                    <a href={school.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <ExternalLink size={14} className="mr-1.5" />
                        Website
                    </a>
                    <a href={school.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                        <Linkedin size={14} className="mr-1.5" />
                        LinkedIn
                    </a>
                </div>

                <div className="space-y-6">
                    {school.moreInfo.map((info: any, index: any) => (
                        <div key={index}>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-md uppercase tracking-wider">{info.Heading}</h4>
                            <div className="flex flex-wrap gap-2">
                                {info.List.map((item: any, i: any) => (
                                    <span key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-md md:rounded-full">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 dark:bg-[#0a101e]">
            <header className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tighter">Education Workbench</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">A detailed look at my academic background.</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SchoolCard school={nyu} />
                <SchoolCard school={iba} />
            </div>
        </div>
    );
};

export default EducationDetails;
