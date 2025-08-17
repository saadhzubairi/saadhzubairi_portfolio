import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  data: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);

  const handleImgLoad = () => {
    setImgLoading(false);
  };

  const handleClick = () => {
    const route = data.type === 'game' ? `/portfolio/project/game/${data.id}` : `/portfolio/project/${data.id}`;
    navigate(route);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="group cursor-pointer h-full"
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden rounded-sm border shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-800 dark:hover:shadow-gray-700/50 h-full flex flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          {imgLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
          <img
            src={data.heroImage.src}
            alt={data.heroImage.alt}
            className={`h-full w-full object-cover transition-opacity duration-500 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImgLoad}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">{data.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{data.subtitle}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{data.desc}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            {data.techStack?.frameworks?.slice(0, 3).map((tech: string, index: number) => (
              <div key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {tech}
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
