import "./portfoliopage.css"
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircularProgress from '@mui/material/CircularProgress';

const ProjectCard = ({ data, onH }) => {
    const navigate = useNavigate();
    const [imgLoadingFull, setImageLoadingFull] = useState(true);

    const handleImgLoad = () => {
        setImageLoadingFull(false)
    }

    const onClickFun = () => {
        if (data.type === "game") {
            navigate(`/Portfolio/Project/Game/${data.id}`)
        }
        else {
            navigate(`/Portfolio/Project/${data.id}`)
        }
    }

    return (
        <div className="pcard_wrapper" onClick={onClickFun}>
            <div className="pcard_pane">
                <div className={onH ? "pcard_pane_rightH" : "pcard_pane_right"}>
                    <div className="pcard_desc">{data.desc}</div>
                    <div className="pcard_checkout_button">check it out!</div>
                </div>
                <div className={onH ? "pcard_pane_leftH" : "pcard_pane_left"}>
                    <div className="pcard_img_cont">
                        {imgLoadingFull ? <CircularProgress sx={{ color: "#666" }} /> : null}
                        <img
                            src={data.image}
                            className="pcard_img"
                            onLoad={handleImgLoad}
                            style={{ display: imgLoadingFull ? 'none' : 'block' }}
                        />
                    </div>
                    <div className="pcard_pane_left_bottom">
                        <div className="pcard_title">{data.name}</div>
                        <div className="pcard_subtitle">{data.subtitle}</div>
                        <div className="pcard_openIcon">
                            OPEN<OpenInNewIcon fontSize="0.5rem" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}



export default ProjectCard

/* 
        <img src={data.image} alt="" />
        <div className="">{data.title}</div>
        <div className="">{data.subtitle}</div>
        <div className="">{data.desc}</div>    
*/