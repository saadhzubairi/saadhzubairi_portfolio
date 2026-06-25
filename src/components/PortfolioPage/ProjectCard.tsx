import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CutoutCard,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardContent,
  CutoutCorner,
  CutoutCardInsetLabel,
  cutoutCardSurfaceClassName,
  useCutoutContentStaggerVariants,
} from '@/components/ui/cutout-card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  data: any;
  onH?: boolean;
}

const FALLBACK_GRADIENT = 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)';

const ProjectCard: React.FC<ProjectCardProps> = ({ data, onH = false }) => {
  const navigate = useNavigate();
  const stagger = useCutoutContentStaggerVariants();

  const handleClick = () => {
    const route = data.type === 'game' ? `/portfolio/project/game/${data.id}` : `/portfolio/project/${data.id}`;
    navigate(route);
  };

  const title: string = data.title || data.name || '';
  const subtitle: string = data.tagline || data.subtitle || '';
  const screenshotSrc: string =
    data.banner?.screenshot?.src || data.heroImage?.src || data.image || '';
  const screenshotAlt: string =
    data.banner?.screenshot?.alt || data.heroImage?.alt || title;
  const gradient: string = data.banner?.gradient || FALLBACK_GRADIENT;
  const year: string = data.year || '';

  return (
    <div
      onClick={handleClick}
      className={cn('project-card cursor-pointer h-full', onH ? 'w-84' : '')}
    >
      <CutoutCard className={cn(cutoutCardSurfaceClassName, 'project-card-surface h-full flex flex-col', onH && 'mx-4')}>
        {/* Media — gradient backdrop + faux browser window, mirrors ProjectPage's Banner */}
        <CutoutCardMedia className="project-card-media">
          <div className="absolute inset-0" style={{ background: gradient }} />

          <div className="project-card-title-band">
            <motion.h3 className="project-card-media-title" variants={stagger.item}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 0.74, 0.19, 1] }}
            >
              {title}
            </motion.h3>
          </div>

          {screenshotSrc && (
            <motion.div
              initial={{ opacity: 0, y: 122 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 0.74, 0.19, 1] }}
              className="project-card-shot">
              <img
                src={screenshotSrc}
                alt={screenshotAlt}
                className="project-card-shot-image"
              />
            </motion.div>
          )}

          <CutoutCardOverlay />

          {/* Year label — bottom left with cutout corners */}
          {year && (
            <CutoutCardInsetLabel className="project-card-year-chip bottom-0 left-0 rounded-tr-[20px] bg-card px-4 py-2.5">
              <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-widest">
                {year}
              </span>
              <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-card" />
              <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-card" />
            </CutoutCardInsetLabel>
          )}
        </CutoutCardMedia>

        {/* Content */}
        <CutoutCardContent className="project-card-content flex flex-col p-4">
          <motion.div
            animate="show"
            className="contents"
            initial="hidden"
            variants={stagger.container}
          >
            <motion.p
              className="text-sm text-muted-foreground line-clamp-3"
              variants={stagger.item}
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </CutoutCardContent>
      </CutoutCard>
    </div>
  );
};

export default ProjectCard;
