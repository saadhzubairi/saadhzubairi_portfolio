import "./header.css"
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const [toggle, setToggle] = useState(false);

    const location = useLocation();
    const [hash, setHash] = useState('');

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (hash && location.pathname === '/') {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [hash, location]);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    return (
        <>
            <header className="header">
                <nav className="nav container">
                    <a href="/" className="nav__logo">Saad</a>

                    <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>

                        <ul className="nav__list grid">

                            <li className="nav__item">
                                <Link to="/#Home" className="nav__link active-link" onClick={() => setHash('Home')}>
                                    <i className="uil uil-estate nav__icon"></i> Home
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="/#About" className="nav__link" onClick={() => setHash('About')} >
                                    <i className="uil uil-user nav__icon"></i> About
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="/#Qual" className="nav__link" onClick={() => setHash('Qual')} >
                                    <i className="uil uil-briefcase-alt nav__icon"></i>Qualifications
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link
                                    to="/#Skills"
                                    className="nav__link"
                                    onClick={() => setHash('Skills')}
                                >
                                    <i className="uil uil-file-alt nav__icon"></i> Skills
                                </Link>
                            </li>

                            <li className="nav__item">
                                <Link to="/#Contact" className="nav__link" onClick={() => setHash('Contact')}>
                                    <i className="uil uil-message nav__icon"></i> Connect
                                </Link>
                            </li>

                            <li className="portfolio_button" id="">
                                <Link to="/Portfolio" className="portfolio_link" id="">
                                    <i className="uil uil-scenery nav__icon"></i> Portfolio
                                </Link>
                            </li>

                        </ul>
                        <i className="uil uil-times nav__close" onClick={() => setToggle(!toggle)}></i>
                    </div>

                    <div className="nav__toggle" onClick={() => setToggle(!toggle)}>
                        <i className="uil uil-apps"></i>
                    </div>

                </nav>
            </header>

            <div className="header_for_phone">
                <a href="/" className="nav__logo button_on_mobilenav"><i class='bx bxs-home'></i> Home</a>
                <div className="menu button_on_mobilenav" onClick={toggleMenu}>More <i class='bx bx-menu-alt-right' ></i></div>

            </div>
            <div className={`menu_panel_for_phone ${menuOpen ? "opened" : "closed"}`}>
                <Link to="/#About" className="menu_panel_phone_nav_link" onClick={() => { setMenuOpen(prevState => !prevState); setHash('About') }}>
                    <i className="uil uil-user"></i> About
                </Link>
                <Link to="/#Qual" className="menu_panel_phone_nav_link" onClick={() => { setMenuOpen(prevState => !prevState); setHash('Qual') }}>
                    <i className="uil uil-briefcase-alt"></i>Qualifications
                </Link>
                <Link to="/#Skills" className="menu_panel_phone_nav_link" onClick={() => { setMenuOpen(prevState => !prevState); setHash('Skills') }}>
                    <i className="uil uil-file-alt"></i> Skills
                </Link>
                <Link to="/#Contact" className="menu_panel_phone_nav_link" onClick={() => { setMenuOpen(prevState => !prevState); setHash('Contact') }}>
                    <i className="uil uil-message"></i> Connect
                </Link>
                <Link to="/Portfolio" className="menu_panel_phone_nav_link" id="" onClick={() => { setMenuOpen(prevState => !prevState); }}>
                    <i className="uil uil-scenery"></i> Portfolio
                </Link>
            </div >

            <div className={`menu_panel_for_phone_backdrop ${menuOpen ? "opened" : "closed"}`} onClick={toggleMenu}></div>
        </>
    )
}
export default Header