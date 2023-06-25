import "./skills.css"
import Frontend from "./Frontend"
import Backend from "./Backend"
function Skills(props) {
    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">My Skills</h2>
            <span className="section__subtitle">My technical expertise</span>
            <div className="skills__container container grid">
                <Frontend />
                <Backend />
                <Backend />
                <Backend />
            </div>
        </section>
    )
}
export default Skills