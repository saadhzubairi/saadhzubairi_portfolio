import { useState } from "react"
import "./qualifications.css"
import IBA from "../../assets/EDXP_logos/IBA.png"
import FHGS from "../../assets/EDXP_logos/FHGS.png"
import GDSC from "../../assets/EDXP_logos/GDSC.jpeg"

function Qualifications(props) {
    const [toggle, setToggle] = useState(0);

    const toggleTab = (n) => {
        setToggle(n);
    }

    return (
        <section className="qualifications section" id="qualifications">
            <h2 className="section__title">Qualifications</h2>
            <span className="section__subtitle">A glimpse into my journey</span>

            <div className="qual__container container">

                <div className="qual__tabs">
                    <div className={toggle === 0 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(0)}>
                        <i className="uil uil-graduation-cap qual__icon"></i> Education
                    </div>
                    <div className={toggle === 1 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(1)}>
                        <i className="uil uil-briefcase-alt qual__icon"></i> Experience
                    </div>
                </div>

                <div className="qual__sections">
                    <div className={toggle === 0 ? "qual__content qual__content-active" : "qual__content qual__content"}>

                        <div className="qual__data">
                            <div>
                                <h3 className="qual__title">BSc. Computer Science</h3>
                                <div className="qual__subtitle_img__and__text">
                                    <img src={IBA} alt="" className="qual__subtitle_img" />
                                    <span className="qual__subtitle">Institute Of Business Administration, Karachi</span>
                                </div>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2019 - 2023</div>
                            </div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                        </div>

                        <div className="qual__data">
                            <div className="qual__whitespace"></div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                            <div>
                                <h3 className="qual__title">Intermediate, Pre-Engineering</h3>
                                <div className="qual__subtitle_img__and__text">
                                    <img src={GDSC} alt="" className="qual__subtitle_img" />
                                    <span className="qual__subtitle">Govt. Degree College, Gulshan-e-Iqbal</span>
                                </div>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2016 - 2018</div>
                            </div>
                        </div>

                        <div className="qual__data">
                            <div>
                                <h3 className="qual__title">Matriculation</h3>
                                <div className="qual__subtitle_img__and__text">
                                    <img src={FHGS} alt="" className="qual__subtitle_img" />
                                    <span className="qual__subtitle">Falconhouse Grammar School</span>
                                </div>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2019 - 2023</div>
                            </div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                        </div>
                    </div>


                    <div className={toggle === 1 ? "qual__content qual__content-active" : "qual__content qual__content"}>

                        <div className="qual__data">
                            <div>
                                <h3 className="qual__title">LALA</h3>
                                <span className="qual__subtitle">Institute of Business Administration, Karachi</span>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2019 - 2023</div>
                            </div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                        </div>

                        <div className="qual__data">
                            <div className="qual__whitespace"></div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                            <div>
                                <h3 className="qual__title">LALA</h3>
                                <span className="qual__subtitle">Institute of Business Administration, Karachi</span>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2019 - 2023</div>
                            </div>
                        </div>

                        <div className="qual__data">
                            <div>
                                <h3 className="qual__title">LALA</h3>
                                <span className="qual__subtitle">Institute of Business Administration, Karachi</span>
                                <div className="qual__calendar"><i class="uil uil-schedule"></i>2019 - 2023</div>
                            </div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                        </div>

                        <div className="qual__data">
                            <div className="qual__whitespace"></div>
                            <div className="qual__whitespace">
                                <span className="qual__rounder"></span>
                                <span className="qual__line"></span>
                            </div>
                            <div>
                                <h3 className="qual__title">LALA</h3>
                                <span className="qual__subtitle">Institute of Business Administration, Karachi</span>
                                <div className="qual__calendar"><i className="uil uil- qual__icon"></i>2019 - 2023</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </section>
    )
}
export default Qualifications