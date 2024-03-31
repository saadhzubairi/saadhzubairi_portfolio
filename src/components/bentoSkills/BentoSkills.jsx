import React from 'react'
import "./bentoSkills.css"
import generalist_data from "../../assets/skills_data/services.json"
import core_data from "../../assets/skills_data/programming.json"
import db_data from "../../assets/skills_data/databases.json"
import fmts_data from "../../assets/skills_data/frameworksAndStacks.json"
import tools_data from "../../assets/skills_data/tools.json"
import libs_data from "../../assets/skills_data/libsAndEnvs.json"


const highlight = () => {
    return (
        <div className='highlight_bento'>
            <div className="skill_bento_heading">Just a generalist who does...</div>
            <div className="bentoColumn">
                {generalist_data.map((e) =>
                    <>
                        <div className="bentoChipBig">
                            <div className="bentoChipImg"><img src={e.img} alt="" /></div>
                            <div className="bentoChipText">{e.name}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const core = () => {
    return (
        <div className="core_bento">
            <div className="skill_bento_heading">Core Tech</div>
            <div className="skill_bento_subheading">Experienced in:</div>
            <div className="bentoFlex">
                {core_data.map((e) =>
                    <>
                        <div className="bentoChip">
                            <div className="bentoChipHeader">
                                <div className="bentoChipImg"><img src={e.image} alt="" /></div>
                                <div className="bentoChipText">{e.name}</div>
                            </div>
                            <div className="bentoChipBottomText">{e.diff}</div>
                        </div>
                    </>
                )}
                <div className="bentoSeperator" />
                <div className="bentoFlex">
                    {db_data.map((e) =>
                        <>
                            <div className="bentoChip">
                                <div className="bentoChipHeader">
                                    <div className="bentoChipImg"><img src={e.image} alt="" /></div>
                                    <div className="bentoChipText">{e.name}</div>
                                </div>
                                <div className="bentoChipBottomText">{e.diff}</div>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

const frameworksAndStacks = () => {
    return (
        <div className="frameworks_bento">
            <div className="skill_bento_heading">Frameworks & Tech Stacks</div>
            <div className="bentoFlex">
                {fmts_data.map((e) =>
                    <>
                        <div className="bentoCoin">
                            <div className="bentoCoinImg"><img src={e.image} alt="" /></div>
                            <div className="bentoCoinText">{e.name}</div>
                            <div className="bentoCoinBottomText">{e.diff}</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const triad = () => {
    return (
        <div className="frameworks_bento">
            <div className="skill_bento_heading">Tools of the trade</div>
            <div className="bentoFlex">
                {tools_data.map((e) =>
                    <>
                        <div className="bentoCoin">
                            <div className="bentoCoinImg"><img src={e.image} alt="" /></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const libsAndEnvs = () => {
    return (
        <div className="core_bento">
            <div className="skill_bento_heading">Libraries & Environments</div>
            <div className="skill_bento_subheading">Experience with:</div>
            <div className="bentoFlex">
                {libs_data.map((e) =>
                    <>
                        <div className="bentoChip">
                            <div className="bentoChipHeader">
                                <div className="bentoChipImg"><img src={e.image} alt="" /></div>
                                <div className="bentoChipText">{e.name}</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function BentoSkills() {


    return (
        <section className="skills section" id="Skills">
            <h2 className="section__title">Skills</h2>
            <span className="section__subtitle">Following are my technical expertise</span>

            <div className="grid-wrapper">
                <div className="gridbal" id="bal1">{highlight()}
                    <img src="/pics/portfolio.png" alt="" className="highlightImg" />
                </div>
                <div className="gridbal" id="bal2">{core()}
                    <img src="/pics/core.png" alt="" className="coreImg" />
                </div>
                <div className="gridbal" id="bal3">{frameworksAndStacks()}</div>
                <div className="gridbal" id="bal4">{triad()}</div>
                <div className="gridbal" id="bal5">{libsAndEnvs()}</div>
            </div>
        </section>
    )
}

export default BentoSkills







