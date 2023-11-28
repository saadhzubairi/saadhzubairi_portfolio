import { useState } from "react"
import "./qualifications.css"

import ed_data from "../../assets/EDXP_data/education.json"
import xp_data from "../../assets/EDXP_data/experience.json"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade';
import Popup from "./PopUp";
import ShopUp from "./ShopUp";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px dashed #fff',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
};

function Qualifications(props) {

    const [openModalIndex, setOpenModalIndex] = useState(null);
    const handleOpen = (index) => {setOpenModalIndex(index);};
    const handleClose = () => {setOpenModalIndex(null);};
    
    const [openModalIndex_, setOpenModalIndex_] = useState(null);
    const handleOpen_ = (index) => {setOpenModalIndex_(index);};
    const handleClose_ = () => {setOpenModalIndex_(null);};

    const [toggle, setToggle] = useState(0);

    const toggleTab = (n) => {
        setToggle(n);
    }

    return (
        <section className="qualifications section" id="Qual">
            <h2 className="section__title">Qualifications</h2>
            <span className="section__subtitle">A glimpse into my journey</span>

            <div className="qual__container container">

                <div className="qual__tabs">
                    <div className={toggle === 0 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(0)}>
                        <i className="uil uil-graduation-cap qual__icon"></i> Education
                    </div>
                    <div className={toggle === 1 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(1)}>
                        <i className="uil uil-briefcase-alt qual__icon"></i> Experience
                    </div>
                </div>

                <div className="qual__sections">
                    <div className={toggle === 0 ? "qual__content qual__content-active" : "qual__content qual__content"}>
                        {ed_data.map((item, index) => (
                            <>
                                <div className="qual__data" onClick={() => handleOpen(index)}>
                                    <h3 className="qual__title">{item.degree}</h3>
                                    <div className="qual__subtitle_img__and__text">
                                        <img src={item.logo} alt="" className="qual__subtitle_img" />
                                        <div className="qual__subtitile__section">
                                            <span className="qual__subtitle">{item.institute}</span>
                                        </div>
                                    </div>
                                    <div className="qual__calendar"><i class="uil uil-schedule"></i>{item.years}</div>
                                </div>
                                <Modal
                                    open={openModalIndex === index}
                                    onClose={handleClose}
                                >
                                    <Fade in={openModalIndex === index}>
                                        <Box sx={style}>
                                            <Popup data={item} />
                                        </Box>
                                    </Fade>
                                </Modal>
                            </>
                        ))}
                    </div>

                    <div className={toggle === 1 ? "qual__content qual__content-active" : "qual__content qual__content"}>

                        {xp_data.map((item,index) => (
                            <>
                                <div className="qual__data" onClick={() => handleOpen_(index)} >
                                    <h3 className="qual__title">{item.desg}</h3>
                                    <div className="qual__subtitle_img__and__text">
                                        <img src={item.logo} alt="" className="qual__subtitle_img" />
                                        <div className="qual__subtitile__section">
                                            <span className="qual__subtitle">{item.company}</span>
                                        </div>
                                    </div>
                                    <div className="qual__calendar"><i class="uil uil-schedule"></i>{item.years}</div>
                                </div>
                                <Modal
                                    open={openModalIndex_ === index}
                                    onClose={handleClose_}
                                >
                                    <Fade in={openModalIndex_ === index}>
                                        <Box sx={style}>
                                            {<ShopUp data={item}/>}
                                        </Box>
                                    </Fade>
                                </Modal>
                            </>
                        ))}

                    </div>
                </div>

            </div>

        </section>
    )
}
export default Qualifications