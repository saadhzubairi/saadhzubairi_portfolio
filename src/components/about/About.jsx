import "./about.css"
import pic from "../../assets/about.jpg"
import cv from "../../assets/Saad Z.pdf"
import Info from "./Info"

function About(props) {
    return (
        <section className="about section" id="About">
            <h2 className="section__title">About me</h2>
            <span className="section__subtitle">Get to know more</span>
            <div className="about__container container grid">
                <img src={pic} alt="" className="about__img" />
                <div className="about__data">
                    <Info />
                    <p className="about__description">
                        <ul>
                            <li> I’ve been building things using computers since the age of 16</li>
                            <li>I currently work as a Backend Developer at a major private bank</li>
                            <li>I do graphics design and can use the full adobe suite</li>
                            <li>I used to teach SAT English! I still do it on the weekends</li>
                        </ul>
                    </p>

                    <p className="about__description">I am highly self-motivated, always willing to improve and push the boundaries in any way possible. I keep myself up to date with recent technologies and diversify my professional work so I can grow an extensive skillset in different areas.</p>

                    <a href={cv} target="_blank" className="button button--flex">Download CV</a>
                </div>
            </div>
        </section>
    )
}

export default About