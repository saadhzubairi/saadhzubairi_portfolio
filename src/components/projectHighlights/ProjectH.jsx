import './projectH.css'
import hoops from "../../assets/portfolio/hoops.json"
import talenthive from "../../assets/portfolio/talenthive.json"
import latex from "../../assets/portfolio/latex.json"
import crickex from "../../assets/portfolio/crickex.json"
import tetromania from "../../assets/portfolio/tetromania.json"
import pixelcut from "../../assets/portfolio/pixelcut.json"
import ProjectCard from '../PortfolioPage/projectCard'
import topdown from "../../assets/portfolio/topdown.json"
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

export const ProjectH = () => {

    return (
        <section className="projecth section">
            <h2 className="section__title">Featured Projects</h2>
            <span className="section__subtitle">Have a look at some of my highlighted projects</span>
            <div className="projectShowcaseFlex ">
                <Swiper
                    effect='coverflow'
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={
                        {
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5
                        }
                    }
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                    }}
                    className='swiper_container'
                    modules={[EffectCoverflow, Pagination, Navigation]}
                >
                    <SwiperSlide>
                        <ProjectCard data={hoops} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={talenthive} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={crickex} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={latex} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={pixelcut} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={tetromania} onH={true} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProjectCard data={topdown} onH={true} />
                    </SwiperSlide>


                    <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                </Swiper>
            </div>
            <div className="portfolio_button_cont ">
                <Link to="/Portfolio">
                    <div className="button button--flex">
                        View Full Portfolio <i class='bx bxs-chevron-right-circle'></i>
                    </div>
                </Link>
            </div>
        </section>
    )
}

/* 
<div className="projectShowcaseFlex ">
                <ProjectCard data={hoops} />
                <ProjectCard data={talenthive} />
                <ProjectCard data={crickex} />
                <ProjectCard data={latex} />
                <ProjectCard data={pixelcut} />
                <ProjectCard data={tetromania} />
            </div>
*/