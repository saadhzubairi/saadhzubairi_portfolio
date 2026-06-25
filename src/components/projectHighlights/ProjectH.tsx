import './projectH.css';
import hoops from '../../assets/portfolio/hoops.json';
import talenthive from '../../assets/portfolio/talenthive.json';
import latex from '../../assets/portfolio/latex.json';
import crickex from '../../assets/portfolio/crickex.json';
import tetromania from '../../assets/portfolio/tetromania.json';
import pixelcut from '../../assets/portfolio/pixelcut.json';
import topdown from '../../assets/portfolio/topdown.json';
import sre from '../../assets/portfolio/sre-management-suite.json';
import flp from '../../assets/portfolio/nyu-flp-exam-portal.json';
import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProjectCard from '@/components/PortfolioPage/ProjectCard';
import '../home/home.css';

const featuredProjects = [
  sre,
  flp,
  hoops,
  talenthive,
  crickex,
  pixelcut,
  tetromania,
  topdown,
  latex,
] as const;

export const ProjectH: React.FC = () => {
  return (
    <section className="home-section home-index-section projecth" id="Featured">
      <div className="home-section-inner">
        <header className="home-section-heading">
          <div>
            <p className="home-section-label">Selected projects / built systems</p>
            <h2>Featured Projects</h2>
          </div>
          <p>A tighter edit of recent applications, experiments, and course-era builds.</p>
        </header>

        <div className="home-section-body">
          <div
            className={cn(
              'grid gap-4 sm:gap-5 home-feature-grid projecth-grid',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id ?? project.title ?? index}
                className="projecth-card-slot"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0.23, 0.74, 0.19, 1], delay: index * 0.06 }}
              >
                <ProjectCard data={project} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="home-section-cta">
          <Link to="/portfolio" className="home-action home-action-primary home-action-wide">
            View full portfolio
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
