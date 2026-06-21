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
  CutoutCardPin,
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

  const techs: string[] = (
    Array.isArray(data.stack) && data.stack.length > 0
      ? data.stack
      : [
          ...(data.techStack?.frameworks || []),
          ...(data.techStack?.database || []),
          ...(data.techStack?.tools || []),
        ]
  ).slice(0, 3);

  return (
    <div
      onClick={handleClick}
      className={cn('cursor-pointer h-full', onH ? 'w-80' : '')}
    >
      <CutoutCard className={cn(cutoutCardSurfaceClassName, 'h-full flex flex-col', onH && 'mx-4')}>
        {/* Media — gradient backdrop + faux browser window, mirrors ProjectPage's Banner */}
        <CutoutCardMedia className="aspect-[4/3]">
          <div className="absolute inset-0" style={{ background: gradient }} />

          {/* Screenshot creeps up from the bottom; top of media shows gradient, bottom is clipped */}
          {screenshotSrc && (
            <div className="absolute inset-x-6 top-[28%] -bottom-[10%] overflow-hidden rounded-t-xl shadow-2xl">
              <img
                src={screenshotSrc}
                alt={screenshotAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}

          <CutoutCardOverlay />

          {/* Year label — bottom left with cutout corners */}
          {year && (
            <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-card px-4 py-2.5">
              <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-widest">
                {year}
              </span>
              <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-card" />
              <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-card" />
            </CutoutCardInsetLabel>
          )}

          {/* Tech stack — top right pin with cutout corners */}
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
              <CutoutCorner
                className="absolute top-0 -left-[23px] -rotate-90 text-card"
                size={24}
              />
              <CutoutCorner
                className="absolute right-0 -bottom-[23px] -rotate-90 text-card"
                size={24}
              />
            </CutoutCardPin>
          )}
        </CutoutCardMedia>

        {/* Content */}
        <CutoutCardContent className="flex-1 flex flex-col p-4">
          <motion.div
            animate="show"
            className="contents"
            initial="hidden"
            variants={stagger.container}
          >
            <motion.h3
              className="text-lg font-semibold text-foreground leading-tight"
              variants={stagger.item}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm text-muted-foreground mt-1.5 line-clamp-2"
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
