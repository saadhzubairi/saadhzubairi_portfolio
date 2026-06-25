import { type ReactNode, useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroAtAGlance from './HeroAtAGlance';
import ToolsOfTrade from '../skills/ToolsOfTrade';
import ThesisSpotlight from '../thesis/ThesisSpotlight';
import '../home/home.css';

type AboutStackBlockProps = {
  children: ReactNode;
  index: number;
  isLast?: boolean;
};

const AboutStackBlock = ({ children, index, isLast = false }: AboutStackBlockProps) => {
  const blockRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.68, 1], isLast ? [1, 1, 1] : [1, 1, 0.08]);
  const scale = useTransform(scrollYProgress, [0, 0.72, 1], isLast ? [1, 1, 1] : [1, 0.992, 0.965]);
  const y = useTransform(scrollYProgress, [0, 1], isLast ? [0, 0] : [0, -30]);
  const blur = useTransform(scrollYProgress, [0, 0.7, 1], isLast ? [0, 0, 0] : [0, 0, 14]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section ref={blockRef} className="home-about-block">
      <div className="home-about-block-inner">
        <motion.div
          className="home-about-layer"
          style={
            reduceMotion
              ? { zIndex: index + 1 }
              : {
                filter,
                opacity,
                scale,
                y,
                zIndex: index + 1,
              }
          }
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="home-section home-index-section home-about-section" id="About">
      <div className="home-section-inner">
        <div className="home-section-body home-about-body">
          <AboutStackBlock index={0}>
            <div className="home-about-module home-about-overview">
              <header className="home-section-heading home-section-heading-solo home-about-heading">
                <div className="home-about-module home-about-overview">
                  <div>
                    <p className="home-section-label">About / background / capabilities</p>
                    <h2>About</h2>
                  </div>
                </div>
              </header>

              <div className="home-about-intro home-about-intro-copy">
                <p className="home-about-paragraph">
                  I&apos;m a software engineer working across product, systems, and
                  applied research, currently building clinical trial supply-chain
                  software at Prognosis. My background spans startups, fintech,
                  healthcare, and academia, and I&apos;m most at home on technical
                  problems where solid engineering has clear real-world impact.
                </p>
              </div>
            </div>
          </AboutStackBlock>

          <AboutStackBlock index={1}>
            <HeroAtAGlance embedded />
          </AboutStackBlock>

          <AboutStackBlock index={2}>
            <ToolsOfTrade embedded />
          </AboutStackBlock>

          <AboutStackBlock index={3} isLast>
            <ThesisSpotlight embedded />
          </AboutStackBlock>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
