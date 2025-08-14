export interface ProjectData {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  type?: "game" | "web" | "mobile" | "desktop" | "uiux";
  introText: string;
  image: string;
  techHead: string;
  techText: string;
  techImg: string;
  structureText: string;
  structureImg?: string;
  assetText: string;
  assetFull?: boolean;
  assets: string[];
  screenshots: string[];
  youtubeLink: string;
  lessonsLearned: string;
  links: string;
}

export interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}
