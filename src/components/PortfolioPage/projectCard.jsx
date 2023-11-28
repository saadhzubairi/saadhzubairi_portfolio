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
            <div className="pcard_container">
                <div className="pcard_pane">
                    <div className="pcard_pane_left">
                        <img src={data.image} className="pcard_img" />
                        <div className="pcard_title">{data.title}</div>
                        <div className="pcard_subtitle">{data.subtitle}</div>
                    </div>
                    <div className="pcard_pane_right">
                        <div className="pcard_desc">{data.desc}</div>
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