import React from 'react'
import "./popup.css"
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Close } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

const Popup = ({ data }) => {
    return (
        <div className="popup__container">
            <div className="popup__wrapper">
                <div className="popup__top">
                    <div className="popup__heading">{data.degree}</div>
                    <div className="popup__grade">{data.cgpa}</div>
                </div>
                <div className="popup__bottom">
                    <div className="popup__bl">
                        <div className="popup__logo__text">
                            <div className="popup__logo"><img src={data.logo} alt="" /></div>
                            <div className="popup__text">{data.institute}</div>
                        </div>
                        <div className="popup__links">
                            <a href={data.website} target='_blank' className="webLink">
                                <LanguageIcon fontSize='0.5rem' /> Website
                            </a>

                            <a href={data.linkedIn} target='_blank' className="webLink">
                                <LinkedInIcon fontSize='0.5rem' /> LinkedIn
                            </a>

                        </div>
                        <div className="popup__about">
                            <div className="popup__about__heading">About</div>
                            <div className="popup__about__text">{data.about}</div>
                        </div>
                    </div>
                    <div className="popup__br">
                        <div className="popup__section">
                            <div className="pop__section__heading">Session Attended</div>
                            <div className="pop__section__session">{data.session}</div>
                        </div>
                        {data.moreInfo.map(item => (
                            <div className="popup__section">
                                <div className="pop__section__heading">{item.Heading}</div>
                                <div className="pop__section__content">
                                    <ul className='pop__list'>
                                        {item.List.map(i => <li>{i}</li>)}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup