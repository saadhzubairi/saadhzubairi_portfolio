import "./about.css"
import pic from "../../assets/about.jpg"
import cv from "../../assets/Saad Z.pdf"
import Info from "./Info"

function About(props) {
    return (
        <section className="about section" id="About">
            <h2 className="section__title">About me</h2>
            <span className="section__subtitle">My introduction</span>
            <div className="about__container container grid">
                <img src={pic} alt="" className="about__img" />
                <div className="about__data">
                    <Info />
                    <p className="about__description">A crazy developer, i have tons of experience and my clients are always happy with my work, im sure you will like my work too!! Stay tuned for more projects coming soon.</p>

                    <a href={cv} target="_blank" className="button button--flex">Download CV</a>

                </div>
            </div>
        </section>
    )
}

export default About