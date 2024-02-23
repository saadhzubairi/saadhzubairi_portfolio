import { useState } from "react";
import Data from "./Data"
import ScrollDown from "./ScrollDown"
import Social from "./Social"
import "./home.css"
import CircularProgress from '@mui/material/CircularProgress';

function Home(props) {
    const [imgLoadingFull, setImageLoadingFull] = useState(true);

    const handleImgLoad = () => {
        setImageLoadingFull(false)
    }
    
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