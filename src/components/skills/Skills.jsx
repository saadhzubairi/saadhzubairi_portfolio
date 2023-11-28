import "./skills.css"
import Programming from "./Auto"
import data from "../../assets/skills_data/services.json"
import data_one from "../../assets/skills_data/programming.json"
import data_two from "../../assets/skills_data/frameworks.json"
import data_three from "../../assets/skills_data/backend.json"
import data_four from "../../assets/skills_data/tools.json"
import Services from "./Services"

function Skills(props) {
    return (
        <section className="skills section" id="Skills">
            <h2 className="section__title">Skills</h2>
            <span className="section_subtitle">Following are my technical expertise</span>
            <Services data={data} />
            <div className="skills__container container grid">
                <Programming header={"Programming"} data={data_one} />
                <Programming header={"Frameworks"} data={data_two} />
                <Programming header={"Environments & Databases"} data={data_three} />
                <Programming header={"Tools & Services"} data={data_four} />
            </div>
        </section>
    )
}
export default Skills