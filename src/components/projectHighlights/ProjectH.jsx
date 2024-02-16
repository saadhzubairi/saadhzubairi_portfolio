import './projectH.css'


import hoops from "../../assets/portfolio/hoops.json"
import talenthive from "../../assets/portfolio/talenthive.json"
import latex from "../../assets/portfolio/latex.json"
import crickex from "../../assets/portfolio/crickex.json"
import tetromania from "../../assets/portfolio/tetromania.json"
import pixelcut from "../../assets/portfolio/pixelcut.json"
import ProjectCard from '../PortfolioPage/projectCard'
import { Link } from 'react-router-dom'

export const ProjectH = () => {

    return (
        <section className="projecth section">
            <h2 className="section__title">Featured Projects</h2>
            <span className="section__subtitle">Have a look at some of my highlighted projects</span>
            <div className="projectShowcaseFlex">
                <ProjectCard data={hoops} />
                <ProjectCard data={talenthive} />
                <ProjectCard data={crickex} />
                <ProjectCard data={latex} />
                <ProjectCard data={pixelcut} />
                <ProjectCard data={tetromania} />
            </div>
            <div className="portfolio_button_cont">
                <Link to="/Portfolio">
                    <div className="portfolio_button highlight_portfolio_button">
                        View Full Portfolio <i class='bx bxs-chevron-right-circle'></i>
                    </div>
                </Link>
            </div>
        </section>
    )
}
