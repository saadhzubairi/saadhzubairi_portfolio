import React from 'react';
import skillsData from '../../../assets/skills_data/skills.json';

const SkillsDetails = () => {
    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 dark:bg-[#0a101e]">
            <header className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-700 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">Skills Workbench</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1">A detailed look at my technical skills.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                {skillsData.map(category => (
                    <div key={category.category}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">{category.category}</h3>
                        <div className="flex flex-wrap gap-3">
                            {category.skills.map(skill => (
                                <div key={skill.name} className="flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 space-x-2">
                                    {skill.logo ? (
                                        <img src={skill.logo} alt={`${skill.name} Logo`} className="w-6 h-6 object-contain" />
                                    ) : (
                                        <div className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md text-xs font-bold text-gray-500 dark:text-gray-400">
                                            {skill.name.substring(0, 1)}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className={`w-2 h-2 rounded-full ml-1 ${i < skill.level ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsDetails;
