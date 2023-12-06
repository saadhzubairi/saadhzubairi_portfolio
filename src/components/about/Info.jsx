function Info(props) {
    return (
        <div className="about__info grid">
            <div className="about__box">
                <i class='bx bx-award about__icon'></i>
                <h3 className="about__title">Education</h3>
                <span className="about__subtitle">IBA Karachi Alumnus, UBL Engineer</span>
            </div>
            <div className="about__box">
                <i class='bx bxs-component about__icon'></i>
                <h3 className="about__title">Technical</h3>
                <span className="about__subtitle">Proficient in Java, JavaScript, Python, C++</span>
            </div>
            <div className="about__box">
                <i class='bx bx-brush about__icon' ></i>
                <h3 className="about__title">Creative</h3>
                <span className="about__subtitle">Skilled in Adobe apps, UX design</span>
            </div>
        </div>
    )
}
export default Info