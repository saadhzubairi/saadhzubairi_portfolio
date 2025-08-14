import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./ProjectCard";
import MasonryImageList from "./ImageList";
import "./portfoliopage.css";

// Import project data
import hoops from "@/assets/portfolio/hoops.json";
import talenthive from "@/assets/portfolio/talenthive.json";
import halpert from "@/assets/portfolio/halpert.json";
import credx from "@/assets/portfolio/credx.json";
import latex from "@/assets/portfolio/latex.json";
import crickex from "@/assets/portfolio/crickex.json";
import tutor from "@/assets/portfolio/tutor.json";
import topdown from "@/assets/portfolio/topdown.json";
import tetromania from "@/assets/portfolio/tetromania.json";
import hidenseek from "@/assets/portfolio/hidenseek.json";
import pixelcut from "@/assets/portfolio/pixelcut.json";

interface TabData {
  id: string;
  label: string;
  content: React.ReactNode;
}

const tabs: TabData[] = [
  {
    id: "web",
    label: "Web",
    content: (
      <>
        <ProjectCard data={hoops} />
        <ProjectCard data={talenthive} />
        <ProjectCard data={halpert} />
      </>
    ),
  },
  {
    id: "mobile",
    label: "Mobile",
    content: "Coming Soon",
  },
  {
    id: "desktop",
    label: "Desktop",
    content: (
      <>
        <ProjectCard data={latex} />
        <ProjectCard data={crickex} />
        <ProjectCard data={tutor} />
      </>
    ),
  },
  {
    id: "uiux",
    label: "UI/UX",
    content: <ProjectCard data={credx} />,
  },
  {
    id: "gamedesign",
    label: "Game Design",
    content: (
      <>
        <ProjectCard data={pixelcut} />
        <ProjectCard data={tetromania} />
        <ProjectCard data={topdown} />
        <ProjectCard data={hidenseek} />
      </>
    ),
  },
  {
    id: "photography",
    label: "Photography",
    content: "coming soon",
  },
];

const PortfolioPage: React.FC = () => {
  const { ind } = useParams();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ind && !isNaN(parseInt(ind))) {
      const index = parseInt(ind);
      if (index >= 0 && index < tabs.length) {
        setActiveTab(tabs[index].id);
      }
    }
  }, [ind]);

  useEffect(() => {
    const delay = 300;
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="portfolio_circular_progress">
        <div className="portfolio_wrapper">
          <div className="portfolio_container">
            <div className="loading-spinner" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio_wrapper">
      <div className="portfolio_container">
        <div className="portfolio_heading">Portfolio</div>
        <div className="portfolio_subText">HAVE A LOOK AT MY WORK</div>
        <div className="portfolio_body">
          <Tabs
            defaultValue={activeTab}
            className="w-[90%] flex flex-col items-center"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="mt-6 flex flex-col items-center gap-12"
              >
                {tab.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
