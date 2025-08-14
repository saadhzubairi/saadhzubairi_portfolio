import React from 'react';
import "./popup.css";
import { Globe, Linkedin } from 'lucide-react';

interface ShopUpProps {
  data: any;
}

const ShopUp: React.FC<ShopUpProps> = ({ data }) => {
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
                  {data.resps.map((i: string, idx: number) => <li key={idx}>{i}</li>)}
                </ul>
              </div>
            </div>
            <div className="popup__pills">
              {data.skills.map((skill: string, idx: number) => (
                <div className="popup__pill" key={idx}>{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopUp;


