import './projectH.css';
import hoops from '../../assets/portfolio/hoops.json';
import talenthive from '../../assets/portfolio/talenthive.json';
import latex from '../../assets/portfolio/latex.json';
import crickex from '../../assets/portfolio/crickex.json';
import tetromania from '../../assets/portfolio/tetromania.json';
import pixelcut from '../../assets/portfolio/pixelcut.json';
import topdown from '../../assets/portfolio/topdown.json';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, PawPrint } from 'lucide-react';
import CustomDiv from '../CustomDiv';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardContent,
  CutoutCorner,
  CutoutCardInsetLabel,
  CutoutCardPin,
  cutoutCardSurfaceClassName,
  useCutoutContentStaggerVariants,
} from '@/components/ui/cutout-card';

const FALLBACK_GRADIENT = 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)';

interface FeaturedTileProps {
  data: any;
  variant?: 'hero' | 'default';
  index?: number;
}

const FeaturedTile: React.FC<FeaturedTileProps> = ({ data, variant = 'default', index = 0 }) => {
  const navigate = useNavigate();
  const stagger = useCutoutContentStaggerVariants();

  const handleClick = () => {
    const route = data.type === 'game' ? `/portfolio/project/game/${data.id}` : `/portfolio/project/${data.id}`;
    navigate(route);
  };

  const title: string = data.title || data.name || '';
  const subtitle: string = data.tagline || data.subtitle || '';
  const screenshotSrc: string = data.banner?.screenshot?.src || data.heroImage?.src || data.image || '';
  const screenshotAlt: string = data.banner?.screenshot?.alt || data.heroImage?.alt || title;
  const gradient: string = data.banner?.gradient || FALLBACK_GRADIENT;
  const year: string = data.year || '';

  const isHero = variant === 'hero';

  const techs: string[] = (
    Array.isArray(data.stack) && data.stack.length > 0
      ? data.stack
      : [
          ...(data.techStack?.frameworks || []),
          ...(data.techStack?.database || []),
          ...(data.techStack?.tools || []),
        ]
  ).slice(0, isHero ? 4 : 3);

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.23, 0.74, 0.19, 1], delay: index * 0.06 }}
    >
      <CutoutCard className={cn(cutoutCardSurfaceClassName, 'h-full flex flex-col')}>
        <CutoutCardMedia className="relative flex-1 min-h-0">
          <div className="absolute inset-0" style={{ background: gradient }} />

          {screenshotSrc && (
            <div
              className={cn(
                'absolute overflow-hidden rounded-t-xl shadow-2xl',
                isHero
                  ? 'inset-x-8 sm:inset-x-12 top-[22%] -bottom-[8%]'
                  : 'inset-x-5 sm:inset-x-6 top-[28%] -bottom-[10%]'
              )}
            >
              <img
                src={screenshotSrc}
                alt={screenshotAlt}
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/cutout:scale-[1.04]"
              />
            </div>
          )}

          <CutoutCardOverlay />

          {year && (
            <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-card px-4 py-2.5">
              <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-widest">
                {year}
              </span>
              <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-card" />
              <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-card" />
            </CutoutCardInsetLabel>
          )}

          {techs.length > 0 && (
            <CutoutCardPin className="top-0 right-0 rounded-bl-[16px] bg-card px-3 py-2 shadow-sm ring-1 ring-border/30">
              <div className="flex items-center gap-1">
                {techs.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold text-muted-foreground tracking-wide"
                  >
                    {tech}
                    {i < techs.length - 1 && <span className="text-border ml-1">·</span>}
                  </span>
                ))}
              </div>
              <CutoutCorner className="absolute top-0 -left-[23px] -rotate-90 text-card" size={24} />
              <CutoutCorner className="absolute right-0 -bottom-[23px] -rotate-90 text-card" size={24} />
            </CutoutCardPin>
          )}
        </CutoutCardMedia>

        <CutoutCardContent className={cn('flex-shrink-0', isHero ? 'p-5 sm:p-6' : 'p-4')}>
          <motion.div
            animate="show"
            className="contents"
            initial="hidden"
            variants={stagger.container}
          >
            <motion.h3
              className={cn(
                'font-semibold text-foreground leading-tight',
                isHero ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'
              )}
              variants={stagger.item}
            >
              {title}
            </motion.h3>
            {subtitle && (
              <motion.p
                className={cn(
                  'text-muted-foreground line-clamp-2',
                  isHero ? 'text-sm sm:text-base mt-2' : 'text-sm mt-1.5'
                )}
                variants={stagger.item}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        </CutoutCardContent>
      </CutoutCard>
    </motion.div>
  );
};

export const ProjectH: React.FC = () => {
  return (
    <section className="projecth section" id="Featured">
      <CustomDiv>
        <div className=""></div>
      </CustomDiv>
      <CustomDiv>
        <h2 className="text-6xl font-thin text-black dark:text-gray-100">Featured Projects</h2>
      </CustomDiv>
      <CustomDiv>
        <span className="text-lg text-gray-500">A selection of my work</span>
      </CustomDiv>
      <CustomDiv>
        <div className="h-10"></div>
      </CustomDiv>

      <CustomDiv>
        <div
          className={cn(
            'grid gap-4 sm:gap-5',
            // mobile / tablet — straightforward 1- / 2-col stack, fixed heights
            'grid-cols-1 sm:grid-cols-2 auto-rows-[20rem]',
            // desktop — 12 col jagged bento
            'lg:grid-cols-12 lg:auto-rows-[15rem]'
          )}
        >
          {/* Row 1–2 left: Hero (Hoops) — 7 cols × 2 rows */}
          <div className="row-span-2 sm:col-span-2 lg:col-span-7 h-full">
            <FeaturedTile data={hoops} variant="hero" index={0} />
          </div>

          {/* Row 1 right — Talent Hive */}
          <div className="lg:col-span-5">
            <FeaturedTile data={talenthive} index={1} />
          </div>

          {/* Row 2 right — Crick-Ex */}
          <div className="lg:col-span-5">
            <FeaturedTile data={crickex} index={2} />
          </div>

          {/* Row 3 left — PixelCut (wide) */}
          <div className="sm:col-span-2 lg:col-span-7">
            <FeaturedTile data={pixelcut} index={3} />
          </div>

          {/* Row 3 right — LaTeX */}
          <div className="lg:col-span-5">
            <FeaturedTile data={latex} index={4} />
          </div>

          {/* Row 4 left — Tetromania (narrow side flips) */}
          <div className="lg:col-span-5">
            <FeaturedTile data={tetromania} index={5} />
          </div>

          {/* Row 4 right — Top Down (wide) */}
          <div className="sm:col-span-2 lg:col-span-7">
            <FeaturedTile data={topdown} index={6} />
          </div>
        </div>
      </CustomDiv>

      <CustomDiv>
        <div className="h-10"></div>
      </CustomDiv>
      <CustomDiv className="flex items-center justify-center">
        <Link to="/portfolio">
          <Button className="h-12 px-12 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white cursor-pointer">
            <span className="flex items-center gap-2">
              <PawPrint /> View full Portfolio <ArrowUpRight />
            </span>
          </Button>
        </Link>
      </CustomDiv>
    </section>
  );
};
