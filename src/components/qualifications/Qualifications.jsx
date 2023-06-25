import "./qualifications.css"

function Qualifications(props) {
    return (
        <section className="qualifications section" id="qualifications">

            <h2 className="section__title">Qualifications</h2>
            <span className="section__subtitle">A glimpse into my personal journey</span>

            <div className="qualification__container container">

                <div className="qualification__tabs">
                    <div className="qualification__button button--flex">
                        <i className="uil uil-graduation-cap qualification__icon"></i>{"  "}Education
                    </div>

                    <div className="qualification__button button--flex">
                        <i className="uil uil-briefcase qualification__icon"></i>{"  "}Experience
                    </div>
                </div>

                <div className="qualification__sections">
                    {/* ONE PART OF YOUR QUAL, COPU THIOS */}
                    <div className="qualification__content-active">
                        <div className="qualification__data">
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                            <div>
                                <h3 className="qualification__title">Bachelor in Computer Science</h3>
                                <span className="qualification__subtitle">Institute of Bdawg, khi</span>
                                <div className="qualification__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2021 - Present
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* ONE PART OF YOUR QUAL, COPU THIOS */}
                    <div className="qualification__content-active">

                        <div className="qualification__data">
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                            
                            <div>
                                <h3 className="qualification__title">Bachelor in Computer Science</h3>
                                <span className="qualification__subtitle">Institute of Bdawg, khi</span>
                                <div className="qualification__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2021 - Present
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="qualification__content-active">
                        <div className="qualification__data">
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                            <div>
                                <h3 className="qualification__title">Bachelor in Computer Science</h3>
                                <span className="qualification__subtitle">Institute of Bdawg, khi</span>
                                <div className="qualification__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2021 - Present
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="qualification__content-active">
                        <div className="qualification__data">
                            <span className="qualification__rounder"></span>
                            <span className="qualification__line"></span>
                            <div>
                                <h3 className="qualification__title">Bachelor in Computer Science</h3>
                                <span className="qualification__subtitle">Institute of Bdawg, khi</span>
                                <div className="qualification__calendar">
                                    <i className="uil uil-calendar-alt"></i> 2021 - Present
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}
export default Qualifications