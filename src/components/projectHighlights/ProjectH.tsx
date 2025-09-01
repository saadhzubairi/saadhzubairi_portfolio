import './projectH.css';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../PortfolioPage/ProjectCard';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ArrowUpRight, ChevronLeft, ChevronRight, PawPrint } from 'lucide-react';
import CustomDiv from '../CustomDiv';
import { Button } from '../ui/button';

const projectIds = ['flp', 'supportsphere', 'hoops', 'talenthive', 'crickex', 'latex', 'pixelcut', 'tetromania', 'topdown'];

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
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectPromises = projectIds.map(id => import(`../../assets/portfolio/${id}.json`));
            const loadedProjects = await Promise.all(projectPromises);
            setProjects(loadedProjects.map(p => p.default));
        };

        fetchProjects();
    }, []);

    if (projects.length === 0) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return (
        <section className="min-h-screen flex flex-col" id="Featured">
            <CustomDiv>
                <div className="h-24"></div>
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

            <div className="relative group">
                <div className="mx-20 absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full border bg-background p-2 text-foreground hover:bg-accent hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft className="h-6 w-6" />
                </div>
                <CustomDiv>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 0,
                        }}
                        pagination={{ el: '', clickable: false }}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        className="swiper_container"
                        modules={[EffectCoverflow, Pagination, Navigation]}
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <ProjectCard data={project} onH={true} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CustomDiv>
                <div className="swiper-button-next-custom mx-20 absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer rounded-full border bg-background p-2 text-foreground hover:bg-accent hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-6 w-6" />
                </div>
                <div className="slider-controler mt-4 flex items-center justify-center gap-4">
                    <div className="swiper-pagination"></div>
                </div>
            </div>

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
