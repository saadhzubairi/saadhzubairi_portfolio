import { useEffect, useState } from "react"
import "./qualifications.css"

import ed_data from "../../assets/EDXP_data/education.json"
import xp_data from "../../assets/EDXP_data/experience.json"
import certs_data from "../../assets/EDXP_data/certificates.json"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade';
import Popup from "./PopUp";
import ShopUp from "./ShopUp";

import { Close } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

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

/* const style_small = {
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
 */
function Qualifications(props) {

    const [openModalIndex, setOpenModalIndex] = useState(null);
    const handleOpen = (index) => { setOpenModalIndex(index); };
    const handleClose = () => { setOpenModalIndex(null); };

    const [openModalIndex_, setOpenModalIndex_] = useState(null);
    const handleOpen_ = (index) => { setOpenModalIndex_(index); };
    const handleClose_ = () => { setOpenModalIndex_(null); };

    const [toggle, setToggle] = useState(1);

    const toggleTab = (n) => {
        setToggle(n);
    }

    const handleScroll = () => {
        /* const element = document.getElementById('Qual');
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offset = rect.top + scrollTop;
        const height = element.offsetHeight;

        // Check if we've scrolled past 10% of the element
        if (scrollTop > offset + height * 0.1) {
            toggleTab(1);
        } else {
            toggleTab(0);
        } */
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="qualifications section" id="Qual">
            <h2 className="section__title">Qualifications</h2>
            <span className="section__subtitle">A glimpse into my journey</span>

            <div className="qual__container container">

                <div className="qual__tabs">
                    <div className={toggle === 1 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(1)}>
                        <i className="uil uil-briefcase-alt qual__icon"></i> Experience
                    </div>
                    <div className={toggle === 0 ? "qual__button qual__active button--flex" : "qual__button button--flex"}
                        onClick={() => toggleTab(0)}>
                        <i className="uil uil-graduation-cap qual__icon"></i> Education & Certifications
                    </div>
                </div>
                <div className="qual__sections">
                    <Box sx={{ display: 'flex' }}>
                        <Fade in={(toggle === 0)}>
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
                                            <div className="qual__data_openIcon">
                                                Expand <OpenInNewIcon fontSize="0.5rem" />
                                            </div>
                                        </div>
                                        <Modal
                                            open={openModalIndex === index}
                                            onClose={handleClose}
                                        >
                                            <Fade in={openModalIndex === index}>
                                                <Box sx={style}>
                                                    <Popup data={item} />
                                                    <div className="modal_close_button">
                                                        <IconButton color="#ffe2e2" onClick={handleClose}>
                                                            <Close />
                                                        </IconButton>
                                                    </div>
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    </>
                                ))}

                                {certs_data.map((item, index) => (
                                    <>
                                        <div className="qual__data cert__data" onClick={() => window.open(item.credentialId, '_blank')}>
                                            <h3 className="qual__title">{item.name}</h3>
                                            <div className="qual__subtitle_img__and__text">
                                                <img src={item.logo} alt="" className="qual__subtitle_img" />
                                                <div className="qual__subtitile__section">
                                                    <span className="qual__subtitle">{item.institute}</span>
                                                </div>
                                            </div>
                                            <div className="qual__calendar"><i class="uil uil-schedule"></i>{item.issued}</div>
                                            <div className="qual__data_openIcon_cert">
                                                View Credential<OpenInNewIcon fontSize="0.5rem" />
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </Fade>
                    </Box>

                    <Box sx={{ display: 'flex' }}>
                        <Fade in={(toggle === 1)}>
                            <div className={toggle === 1 ? "qual__content qual__content-active" : "qual__content qual__content"}>

                                {xp_data.map((item, index) => (
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
                                            <div className="qual__data_openIcon_xp">
                                                <OpenInNewIcon fontSize="0.5rem" />
                                            </div>
                                        </div>
                                        <Modal
                                            open={openModalIndex_ === index}
                                            onClose={handleClose_}
                                        >
                                            <Fade in={openModalIndex_ === index}>
                                                <Box sx={style}>
                                                    {<ShopUp data={item} />}
                                                    <div className="modal_close_button">
                                                        <IconButton color="#ffe2e2" onClick={handleClose_}>
                                                            <Close />
                                                        </IconButton>
                                                    </div>
                                                </Box>
                                            </Fade>
                                        </Modal>
                                    </>
                                ))}

                            </div>
                        </Fade>
                    </Box>
                </div>
            </div>
        </section>
    )
}
export default Qualifications