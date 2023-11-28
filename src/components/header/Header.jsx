import { useState } from "react"
import "./header.css"

function Header(props) {
    const [toggle, setToggle] = useState(false);

    return (
        <header className="header">
            <nav className="nav container">
                <a href="index.html" className="nav__logo">Saad</a>

                <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>

                    <ul className="nav__list grid">

                        <li className="nav__item">
                            <a href="/#Home" className="nav__link active-link">
                                <i className="uil uil-estate nav__icon"></i> Home
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="/#About" className="nav__link">
                                <i className="uil uil-user nav__icon"></i> About
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="/#Skills" className="nav__link">
                                <i className="uil uil-file-alt nav__icon"></i> Skills
                            </a>
                        </li>

                        <li className="nav__item">
                            <a href="/#Qual" className="nav__link">
                                <i className="uil uil-briefcase-alt nav__icon"></i>Qualifications
                            </a>
                        </li>


                        <li className="nav__item">
                            <a href="/#Contact" className="nav__link">
                                <i className="uil uil-message nav__icon"></i> Contact
                            </a>
                        </li>

                        <li className="nav__item ">
                            <a href="/Portfolio" className="nav__link">
                                <i className="uil uil-scenery nav__icon"></i> Portfolio
                            </a>
                        </li>

                    </ul>
                    <i className="uil uil-times nav__close" onClick={() => setToggle(!toggle)}></i>
                </div>

                <div className="nav__toggle" onClick={() => setToggle(!toggle)}>
                    <i className="uil uil-apps"></i>
                </div>

            </nav>
        </header>
    )
}
export default Header