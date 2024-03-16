import './projectH.css'


import hoops from "../../assets/portfolio/hoops.json"
import talenthive from "../../assets/portfolio/talenthive.json"
import latex from "../../assets/portfolio/latex.json"
import crickex from "../../assets/portfolio/crickex.json"
import tetromania from "../../assets/portfolio/tetromania.json"
import pixelcut from "../../assets/portfolio/pixelcut.json"
import ProjectCard from '../PortfolioPage/projectCard'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const ProjectH = () => {

    /* useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('bdOn');
                }
            });
        }, { threshold: 1 });

        const hiddenElements = document.querySelectorAll('.blurDown');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []); */

    return (
        <section className="projecth section">
            <h2 className="section__title">Featured Projects</h2>
            <span className="section__subtitle">Have a look at some of my highlighted projects</span>
            <div className="projectShowcaseFlex ">
                <div className="" id='pjc1'>
                    <ProjectCard data={hoops} />
                </div>
                <div className="" id='pjc2'>
                    <ProjectCard data={talenthive} />
                </div>
                <div className="" id='pjc3'>
                    <ProjectCard data={crickex} />
                </div>
                <div className="" id='pjc4'>
                    <ProjectCard data={latex} />
                </div>
                <div className="" id='pjc5'>
                    <ProjectCard data={pixelcut} />
                </div>
                <div className="" id='pjc6'>
                    <ProjectCard data={tetromania} />
                </div>
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
