import "./portfoliopage.css"
import React from 'react'
import { useNavigate } from "react-router-dom"

const ProjectCard = ({ data }) => {
    const navigate = useNavigate();

    const onClickFun = () => {
        navigate(`/Portfolio/${data.id}`)
    }

    return (
        <div className="pcard_wrapper" onClick={onClickFun}>
            <div className="pcard_pane">
                <div className="pcard_pane_right">
                    <div className="pcard_desc">{data.desc}</div>
                    <div className="pcard_checkout_button">check it out!</div>
                </div>
                <div className="pcard_pane_left">
                    <div className="pcard_img_cont">
                        <img src={data.image} className="pcard_img" />
                    </div>
                    <div className="pcard_pane_left_bottom">
                        <div className="pcard_title">{data.name}</div>
                        <div className="pcard_subtitle">{data.subtitle}</div>
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