import React, { useEffect, useState } from 'react'
import Home from '../home/Home'
import About from '../about/About'
import Skills from '../skills/Skills'
import Qualifications from '../qualifications/Qualifications'
import Connect from '../connect/Connect'
import CircularProgress from '@mui/material/CircularProgress';
import { ProjectH } from '../projectHighlights/ProjectH'


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
            <div>
                <Home />
                <About />
                <ProjectH />
                <Qualifications />
                <Skills />
                <Connect page={0} />
            </div>
    )
}

export default FrontPage