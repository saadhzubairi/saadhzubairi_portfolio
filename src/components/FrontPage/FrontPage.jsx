import React, { useEffect, useRef, useState } from 'react'
import Home from '../home/Home'
import About from '../about/About'
import Skills from '../skills/Skills'
import Qualifications from '../qualifications/Qualifications'
import Connect from '../connect/Connect'
import CircularProgress from '@mui/material/CircularProgress';
import { ProjectH } from '../projectHighlights/ProjectH'
import "./FrontPage.css"


const FrontPage = () => {
    const [bool, setBool] = useState(false);

    useEffect(() => {
        setBool(true);
    }, [])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = 50; // 2 seconds in milliseconds

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                console.log(entry);
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // TODO: scroll to the next section
                } else {
                    entry.target.classList.remove('show');
                }
            });
        }, { threshold: 0.3 }); // Adjust threshold as needed

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);


    return (
        loading ?
            <div className="portfolio_circular_progress">
                <div className="portfolio_wrapper">
                    <div className="portfolio_container">
                        <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
                    </div>
                </div>
            </div>
            :
            <div  >
                <div className="hidden">
                    <Home />
                </div>
                <div className="hidden">
                    <About />
                </div>
                <div className="hidden">
                    <ProjectH />
                </div>
                <div className="hidden">
                    <Qualifications />
                </div>
                <div className="hidden">
                    <Skills />
                </div>
                <div className="hidden">
                    <Connect page={0} />
                </div>
            </div>
    )
}

export default FrontPage