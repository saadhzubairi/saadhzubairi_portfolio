/* import { useState } from "react"; */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Data from "./Data"
import ScrollDown from "./ScrollDown"
import Social from "./Social"
import "./home.css"
/* import CircularProgress from '@mui/material/CircularProgress'; */

function Home(props) {
    return (
        <section className="home section" id="Home">
            <div className="home__container container grid">
                <div className="home__content grid">
                    <Social />
                    <div className="home__img"></div>
                    <Data />
                </div>
                <ScrollDown hash={"About"} />
            </div>
        </section>
    )
}
export default Home