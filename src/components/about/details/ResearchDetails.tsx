import React from 'react';
import researchData from '../../../assets/EDXP_data/research.json';
import { Link } from 'lucide-react';

const ResearchDetails = () => {
    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 dark:bg-[#0a101e]">
            <header className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Publications & Research</h2>
            </header>
            <div className="space-y-6">
                {researchData.map((item, index) => (
                    <React.Fragment key={index}>
                        <article>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.source}</p>
                                </div>
                                {item.link && (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex-shrink-0 ml-4">
                                        <Link size={20} />
                                    </a>
                                )}
                            </div>
                        </article>
                        {index < researchData.length - 1 && <hr className="border-gray-100 dark:border-gray-800" />}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ResearchDetails;
