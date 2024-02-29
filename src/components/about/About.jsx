import "./about.css"
import pic from "../../assets/about.jpg"
import cv from "../../assets/Saad Z.pdf"
import Info from "./Info"
import { useEffect } from "react";

function About(props) {

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('colored');
                } else {
                    entry.target.classList.remove('colored');
                }
            });
        }, { threshold: 0.7 }); 

        const hiddenElements = document.querySelectorAll('.grey');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);
    
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('brOn');
                } else {
                    entry.target.classList.remove('brOn');
                }
            });
        }, { threshold:  0.2}); 

        const hiddenElements = document.querySelectorAll('.blurRight');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <section className="about section" id="About">
            <h2 className="section__title">About me</h2>
            <span className="section__subtitle">Get to know more</span>
            <div className="about__container container grid">
                <img src={pic} alt="" className="about__img grey" />
                <div className="about__data">
                    <Info />
                    <p className="about__description blurRight">I am highly self-motivated, always willing to improve and push the boundaries in any way possible. I keep myself up to date with recent technologies and diversify my professional work so I can grow an extensive skillset in different areas.</p>
                    <a href={cv} target="_blank" className="button button--flex blurRight" id="cv_button">Download CV</a>
                </div>
            </div>
        </section>
    )
}

export default About