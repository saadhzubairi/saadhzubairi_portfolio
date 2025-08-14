import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// Using a minimal data shape to keep JSON types flexible during migration

interface ProjectCardProps {
  // Allow any shape for now; we only require a few fields below
  // to avoid strict typing issues with various JSON structures
  data: any;
  onH?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, onH = false }) => {
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);

  const handleImgLoad = () => {
    setImgLoading(false);
  };

  const handleClick = () => {
    const route = data.type === "game" 
      ? `/Portfolio/Project/Game/${data.id}`
      : `/Portfolio/Project/${data.id}`;
    navigate(route);
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        group cursor-pointer overflow-hidden transition-all duration-300
        hover:shadow-xl dark:hover:shadow-gray-800 rounded-lg border
        ${onH ? 'flex-row max-w-5xl' : 'flex-col max-w-md'}
        bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50
      `}
    >
      <div className={`
        flex ${onH ? 'flex-row gap-6 p-6' : 'flex-col'}
        w-full transition-all duration-300
      `}>
        {/* Right Section with Description */}
        <div className={`
          flex flex-col justify-between gap-4
          ${onH ? 'w-1/2 order-2' : 'order-2 p-6'}
        `}>
          <p className="text-muted-foreground">
            {data.desc}
          </p>
          <Button 
            variant="ghost" 
            className="group-hover:bg-primary group-hover:text-primary-foreground w-fit"
          >
            check it out!
          </Button>
        </div>

        {/* Left Section with Image and Title */}
        <div className={`
          flex flex-col
          ${onH ? 'w-1/2 order-1' : 'order-1'}
        `}>
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            {imgLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="loading-spinner w-8 h-8 border-2" />
              </div>
            )}
            <img
              src={data.image}
              alt={data.name}
              className={`
                w-full h-full object-cover transition-all duration-500
                group-hover:scale-105
                ${imgLoading ? 'opacity-0' : 'opacity-100'}
              `}
              onLoad={handleImgLoad}
            />
          </div>

          <div className={`
            flex flex-col gap-1
            ${onH ? 'mt-4' : 'p-6 pt-4'}
          `}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg text-foreground">
                {data.name}
              </h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 group-hover:text-primary"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
