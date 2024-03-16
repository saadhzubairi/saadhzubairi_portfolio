import { useEffect } from "react";
import "./info.css"
function Info(props) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show__box');
                }
            });
        }, { threshold: 0.8 }); // Adjust threshold as needed

        const hiddenElements = document.querySelectorAll('.about__box');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="about__info grid">
            <div className={`about__box`} id="box1">
                <i class='bx bx-award about__icon'></i>
                <span className="about__subtitle">IBA Karachi Alumnus, UBL Engineer</span>
            </div>
            <div className={`about__box`} id="box2">
                <i class='bx bxs-component about__icon'></i>
                <span className="about__subtitle">Proficient in Java, JavaScript, Python & C++</span>
            </div>
            <div className={`about__box`} id="box3">
                <i class='bx bx-brush about__icon' ></i>
                <span className="about__subtitle">Skilled in Web, Mobile, and Game Design</span>
            </div>
        </div>
    )
}
export default Info