import './projectH.css';
import hoops from '../../assets/portfolio/hoops.json';
import talenthive from '../../assets/portfolio/talenthive.json';
import latex from '../../assets/portfolio/latex.json';
import crickex from '../../assets/portfolio/crickex.json';
import tetromania from '../../assets/portfolio/tetromania.json';
import pixelcut from '../../assets/portfolio/pixelcut.json';
import ProjectCard from '../PortfolioPage/ProjectCard';
import topdown from '../../assets/portfolio/topdown.json';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import React from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, PawPrint } from 'lucide-react';
import CustomDiv from '../CustomDiv';
import { Button } from '../ui/button';

// Define the structure of your project data
interface ProjectData {
    id: string;
    image: string;
    name: string;
    titleImg: string;
    subtitle: string;
    techs: string[];
    desc: string;
    sections?: {
        sectionheading: string;
        sectionText: string;
        sectionData: {
            alignment: string;
            image: string;
            text: string;
        }[];
    }[];
    type?: string;
    introText?: string;
    techImg?: string;
    techHead?: string;
    techText?: string;
    structureText?: string;
    links?: string[];
    [key: string]: any; // Allow other properties
}

// Extend Window interface to include ionicons
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                name: string;
            };
        }
    }
}

export const ProjectH: React.FC = () => {
    return (
        <section className="projecth section" id="Featured">
            <CustomDiv>
                <div className=""></div>
            </CustomDiv>
            <CustomDiv>
                <h2 className="text-4xl font-bold">Featured Projects</h2>
            </CustomDiv>
            <CustomDiv>
                <span className="text-lg text-gray-500">A selection of my work</span>
            </CustomDiv>
            <CustomDiv>
                <div className="h-10"></div>
            </CustomDiv>
            <CustomDiv>
                <div className="relative bg-gray-100 dark:bg-gray-800 group">
                    <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full border bg-background p-2 text-foreground hover:bg-accent hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft className="h-6 w-6" />
                    </div>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={false}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        className="swiper_container"
                        modules={[EffectCoverflow, Pagination, Navigation]}
                    >
                        <SwiperSlide>
                            <ProjectCard data={hoops as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={talenthive as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={crickex as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={latex as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={pixelcut as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={tetromania as ProjectData} onH={true} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProjectCard data={topdown as ProjectData} onH={true} />
                        </SwiperSlide>
                    </Swiper>
                    <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full border bg-background p-2 text-foreground hover:bg-accent hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="h-6 w-6" />
                    </div>
                    <div className="slider-controler mt-4 flex items-center justify-center gap-4">
                        <div className="swiper-pagination"></div>
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
                            <PawPrint />  View full Portfolio <ArrowUpRight />
                        </span>
                    </Button>
                </Link>
            </CustomDiv>

        </section>
    );
};
