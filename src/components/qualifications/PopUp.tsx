import React from 'react';
import "./popup.css";
import { Globe, Linkedin } from 'lucide-react';

interface PopupProps {
  data: any;
}

const Popup: React.FC<PopupProps> = ({ data }) => {
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
              <a href={data.website} target='_blank' className="webLink" rel="noreferrer">
                <Globe className='h-4 w-4' /> Website
              </a>
              <a href={data.linkedIn} target='_blank' className="webLink" rel="noreferrer">
                <Linkedin className='h-4 w-4' /> LinkedIn
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
            {data.moreInfo.map((item: any, idx: number) => (
              <div className="popup__section" key={idx}>
                <div className="pop__section__heading">{item.Heading}</div>
                <div className="pop__section__content">
                  <ul className='pop__list'>
                    {item.List.map((i: string, j: number) => <li key={j}>{i}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;


