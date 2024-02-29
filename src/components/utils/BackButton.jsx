import React, { useEffect, useState } from 'react'
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import "./backbutton.css"

const BackButton = () => {
    const nav = useNavigate();
    const goBack = () => {
        nav(-1);
    }

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 50;
            const currentScrollPos = window.scrollY;

            setIsScrolled(currentScrollPos > scrollThreshold);
        };
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <div className="backButtonContainer">
            <div className="backButtonWrapper">
                <div onClick={goBack} className={`projectPage_back_button ${isScrolled ? "scrolled" : ""}`}>
                    <ArrowBack fontSize="0.5rem" />
                    <span className={`go_back_text ${isScrolled ? "scrolled" : ""}`}>GO BACK</span>
                </div>
            </div>
        </div>
    )
}

export default BackButton