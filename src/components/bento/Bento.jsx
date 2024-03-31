import React from 'react'
import './bento.css'


const Bento = () => {
    return (
        <section className='section bentoSection'>
            <div className="grid-wrapper">
                <div className="gridbal" id='gridbal1'>Hi, I'm Saad!</div>
                <div className="gridbal" id='gridbal2'>A Full Stack Software Developer and Designer.</div>
                <div className="gridbal" id='gridbal3'><img src="/pics/dalle.png" alt="" className='bentoImg' /></div>
                <div className="gridbal" id='gridbal4'>4</div>
                <div className="gridbal" id='gridbal5'>
                    <div className="touchIconBento">
                        <i class='bx bx-send'></i>
                    </div>
                    <div className="">Let's get in touch!</div>
                </div>
                <div className="gridbal" id='gridbal7'>
                    <div className="">View Portfolio</div>
                    <img src="/pics/portfolio.png" alt="" className='portfolioBentoImage' />
                </div>
                <div className="gridbal" id='gridbal8'>
                    <div className="connectBentoText">Wanna connect?</div>
                    <div className="connectBento">
                        <a href="mailto:saadhzubairi@outlook.com" className="bentoSocialIcon" target="_blank">
                            <i class='bentoSocialIcon bx bxs-envelope'></i>                        </a>

                        <a href="https://www.linkedin.com/in/saadhzubairi/" className="bentoSocialIcon" target="_blank">
                            <i class='bentoSocialIcon bx bxl-linkedin'></i>
                        </a>
                        <a href="https://github.com/saadhzubairi/" className="bentoSocialIcon" target="_blank">
                            <i class='bentoSocialIcon bx bxl-github'></i>
                        </a>
                        <a href="https://discord.com/users/saadhzubairi#1469" className="bentoSocialIcon" target="_blank">
                            <i class='bentoSocialIcon bx bxl-discord-alt'></i>
                        </a>
                    </div>
                </div>
                <a href={`#About`} className="gridbal" id='gridbal9'>
                    <svg
                        width="32px"
                        height="32px"
                        class="home__scroll-mouse"
                        viewBox="0 0 247 390"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "1.5" }}>
                        <path
                            class="wheel"
                            d="M123.359,79.775l0,72.843"
                            style={{ fill: "none", stroke: "#000", strokeWidth: "20px", }}>
                        </path>
                        <path
                            id="mouse"
                            d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
                            style={{ fill: "none", stroke: "#000", strokeWidth: "20px", }}>
                        </path>
                    </svg>
                    <span className="home__scroll-name">
                        Scroll down
                    </span>
                </a>
            </div>
        </section>
    )
}

export default Bento