import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from './ProjectCard';
import MasonryImageList from './ImageList';
import './portfoliopage.css';

// Import project data
import hoops from '@/assets/portfolio/hoops.json';
import flp from '@/assets/portfolio/nyu-flp-exam-portal.json';
import talenthive from '@/assets/portfolio/talenthive.json';
import halpert from '@/assets/portfolio/halpert.json';
import latex from '@/assets/portfolio/latex.json';
import crickex from '@/assets/portfolio/crickex.json';
import tutor from '@/assets/portfolio/tutor.json';
import topdown from '@/assets/portfolio/topdown.json';
import tetromania from '@/assets/portfolio/tetromania.json';
import hidenseek from '@/assets/portfolio/hidenseek.json';
import pixelcut from '@/assets/portfolio/pixelcut.json';
import sre from '@/assets/portfolio/sre-management-suite.json'

interface TabData {
  id: string;
  label: string;
  mobileLabel: string;
  projects: any[];
}

const tabs: TabData[] = [
  {
    id: 'mostRecent',
    label: 'Most Recent',
    mobileLabel: 'Recent',
    projects: [sre,flp, hoops, talenthive, ],
  },
  {
    id: 'gamedesign',
    label: 'Hobbyist Game Dev',
    mobileLabel: 'Games',
    projects: [pixelcut, tetromania, topdown, hidenseek],
  },
  {
    id: 'earlyCoursework',
    label: 'Early Coursework',
    mobileLabel: 'Course',
    projects: [latex, crickex, tutor, halpert],
  },
  {
    id: 'photography',
    label: 'Photography',
    mobileLabel: 'Photo',
    projects: [],
  },
];

const PortfolioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeTabData = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const activeCount = activeTabData.id === 'photography' ? 'archive' : `${activeTabData.projects.length} pieces`;
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
      className="portfolio-page"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.23, 0.74, 0.19, 1]
      }}
    >
      <section className="portfolio-shell" aria-labelledby="portfolio-title">
        <div className="portfolio-hero">
          <div className="portfolio-kicker" aria-hidden="true">
            <span>Index</span>
            <strong>04</strong>
          </div>

          <div className="portfolio-title-block">
            <p className="portfolio-label">Selected work / experiments / shipped things</p>
            <h1 id="portfolio-title">My Work</h1>
            <p className="portfolio-subtitle">Some interesting projects that kept me occupied.</p>
          </div>

          <div className="portfolio-note">
            <span>Filed under</span>
            <strong>{activeTabData.label}</strong>
            <small>{activeCount}</small>
          </div>
        </div>

        <Tabs value={activeTab} className="portfolio-tabs" onValueChange={setActiveTab}>
          <TabsList
            className="portfolio-tab-list scrollbar-none"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE 10+
            }}
            tabIndex={0}
            aria-label="Project categories"
          >
            {tabs.map((tab, index) => {
              const tabCount = tab.id === 'photography'
                ? 'Archive'
                : `${String(tab.projects.length).padStart(2, '0')} pieces`;

              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="portfolio-tab-trigger"
                >
                  <span className="portfolio-tab-label">{tab.label}</span>
                  <span className="portfolio-tab-card" aria-hidden="true">
                    <span className="portfolio-tab-no">{String(index + 1).padStart(2, '0')}</span>
                    <span className="portfolio-tab-mobile-label">{tab.mobileLabel}</span>
                    <span className="portfolio-tab-meta">{tabCount}</span>
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent className="portfolio-tab-content" key={tab.id} value={tab.id}>
              {tab.id === 'photography' ? (
                <div className="portfolio-gallery portfolio-photo-gallery">
                  <MasonryImageList />
                </div>
              ) : tab.projects.length > 0 ? (
                <motion.div
                  className="portfolio-gallery"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 0.74, 0.19, 1] }}
                >
                  <div className="portfolio-gallery-header">
                    <span>{tab.label}</span>
                    <span>{String(tab.projects.length).padStart(2, '0')} entries</span>
                  </div>
                  <div className="portfolio-card-grid">
                    {tab.projects.map((project, index) => (
                      <motion.div
                        key={index}
                        className="portfolio-card-slot"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 * (index / 2), delay: index * 0.1, ease: [0.23, 0.74, 0.19, 1] }}
                      >
                        <ProjectCard data={project} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="portfolio-empty">Coming Soon</div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </motion.div>
  );
};

export default PortfolioPage;
