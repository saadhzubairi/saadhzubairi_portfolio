import "./skills.css"
import Programming from "./Auto"
import data_one from "../../assets/programming.json"
import data_two from "../../assets/frameworks.json"

function Skills(props) {
    return (
        <section className="skills section" id="skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">Following are my technical expertise</span>
            <div className="skills__container container grid">
                <Programming data={data_one}/>
                <Programming data={data_two}/>
                <Programming data={data_one}/>
                <Programming data={data_one}/>
            </div>
        </section>
    )
}
export default Skills