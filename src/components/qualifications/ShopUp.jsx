import React from 'react'
import "./popup.css"
import LanguageIcon from '@mui/icons-material/Language';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const ShopUp = ({ data }) => {
    return (
        <div className="popup__container">
            <div className="popup__wrapper">
                <div className="popup__top">
                    <div className="popup__heading">{data.desg}</div>
                </div>
                <div className="popup__bottom">
                    <div className="popup__bl">
                        <div className="popup__logo__text">
                            <div className="popup__logo"><img src={data.logo} alt="" /></div>
                            <div className="popup__text">{data.company}</div>
                        </div>
                        <div className="popup__links">
                            <a href={data.website} className="webLink">
                                <LanguageIcon fontSize='0.5rem' /> Website
                            </a>

                            <a href={data.linkedIn} className="webLink">
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
                            <div className="pop__section__heading">Time worked</div>
                            <div className="pop__section__session">{data.years}</div>
                        </div>

                        <div className="popup__section">
                            <div className="pop__section__heading">Description</div>
                            <div className="pop__section__content">{data.desc}</div>
                        </div>

                        <div className="popup__section">
                            <div className="pop__section__heading">Responsibilities & more details</div>
                            <div className="pop__section__content">
                                <ul className='pop__list'>
                                    {data.resps.map(i => <li>{i}</li>)}
                                </ul>
                            </div>
                        </div>

                        <div className="popup__pills">
                            {data.skills.map(skill => (
                                <div className="popup__pill">{skill}</div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopUp