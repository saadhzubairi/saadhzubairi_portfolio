import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from './ProjectCard';
import './portfoliopage.css';

// Import project data
import hoops from '@/assets/portfolio/hoops.json';
import talenthive from '@/assets/portfolio/talenthive.json';
import halpert from '@/assets/portfolio/halpert.json';
import latex from '@/assets/portfolio/latex.json';
import crickex from '@/assets/portfolio/crickex.json';
import tutor from '@/assets/portfolio/tutor.json';
import topdown from '@/assets/portfolio/topdown.json';
import tetromania from '@/assets/portfolio/tetromania.json';
import hidenseek from '@/assets/portfolio/hidenseek.json';
import pixelcut from '@/assets/portfolio/pixelcut.json';
import CustomDiv from '../CustomDiv';
import TexturedSpacer from '../TexturedSpacer';

interface TabData {
  id: string;
  label: string;
  projects: any[];
}

const tabs: TabData[] = [
  {
    id: 'mostRecent',
    label: 'Most Recent',
    projects: [hoops, talenthive],
  },
  {
    id: 'gamedesign',
    label: 'Hobbyist Game Dev',
    projects: [pixelcut, tetromania, topdown, hidenseek],
  },
  {
    id: 'earlyCoursework',
    label: 'Early Coursework',
    projects: [latex, crickex, tutor, halpert],
  },
  {
    id: 'photography',
    label: 'Photography',
    projects: [],
  },
];

const PortfolioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  /* const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ind && !isNaN(parseInt(ind))) {
      const index = parseInt(ind);
      if (index >= 0 && index < tabs.length) {
        setActiveTab(tabs[index].id);
      }
    }
  }, [ind]);

  useEffect(() => {
    const delay = 100;
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  } */

  return (
    <motion.div
      className="w-full py-12"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.23, 0.74, 0.19, 1]
      }}
    >
      <CustomDiv>
        <div className="h-10"></div>
      </CustomDiv>
      <CustomDiv>
        <div className="h-10"></div>
      </CustomDiv>
      <CustomDiv>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">My Work</h1>
        </div>
      </CustomDiv>
      <CustomDiv>
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Some interesting projects that kept me occupied</p>
        </div>
      </CustomDiv>
      <TexturedSpacer height={24} />
      <CustomDiv>
        <div className="h-4"></div>
      </CustomDiv>
      <CustomDiv>
        <Tabs defaultValue={activeTab} className="" onValueChange={setActiveTab}>
          <TabsList
            className="flex flex-row sm:justify-center justify-start gap-2 h-12 overflow-x-auto mx-4 scrollbar-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE 10+
            }}
            tabIndex={0}
            aria-label="Project categories"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground p-2 hover:bg-primary/50 hover:text-primary-foreground transition-all duration-300"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              {tab.projects.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 gap-8 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 0.74, 0.19, 1] }}
                >
                  {tab.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 * (index / 2), delay: index * 0.1, ease: [0.23, 0.74, 0.19, 1] }}
                    >
                      <ProjectCard data={project} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="pt-10 text-center text-muted-foreground">Coming Soon</div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CustomDiv>
      <CustomDiv>
        <div className="h-4"></div>
      </CustomDiv>
      <TexturedSpacer height={24} />
    </motion.div>
  );
};

export default PortfolioPage;
