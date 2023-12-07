import { useEffect, useRef, useState } from "react";
import "./projectPage.css"
import { useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowBack, ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import ScrollDown from "../home/ScrollDown";
import { useNavigate } from 'react-router-dom';
import Slide from '@mui/material/Slide';

/* import data from `../../assets/portfolio/${projectId}.json`
 */

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    bgcolor: 'white',
    border: '2px dashed #fff',
    boxShadow: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const ProjectPage = () => {
    const { projectId } = useParams()

    const [jsonData, setJsonData] = useState({});
    const [img, setImg] = useState("");

    const [open, setOpen] = useState(false);
    const handleOpen = (imgIn) => {
        setChImg(true)
        setImg(imgIn);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    useEffect(() => {

        const images = [];

        const clicker = () => {
            for (let i = 0; i < jsonData.sections.length; i++) {
                for (let j = 0; j < jsonData.sections[i].sectionData.length; j++) {
                    images.push(jsonData.sections[i].sectionData[j].image);
                }
            }
        }
        const fetchData = async () => {
            try {
                const module = await import(`../../assets/portfolio/${projectId}.json`);
                setJsonData(module.default);
                clicker();
                setImages(images);
            } catch (error) {
                console.error('Error importing JSON:', error);
            }
        };
        fetchData();
    }, [jsonData]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const delay = 750; // 2 seconds in milliseconds

        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 50;
            const currentScrollPos = window.scrollY;

            setIsScrolled(currentScrollPos > scrollThreshold);
        };
        window.addEventListener('scroll', handleScroll);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const nav = useNavigate();
    const goBack = () => {
        nav(-1);
    }

    const [images, setImages] = useState([]);

    const [chImg, setChImg] = useState(false)


    const nextImg = () => {
/*         setSlideDirection('left');
        setChImg(!chImg)
 */        var ind = images.findIndex(image => image === img);
        console.log(ind);
        if (ind === (images.length - 1) ) {
        }
        else if(ind === -1){
            setImg(images[0])
        }
        else {
            setImg(images[ind + 1])
        }

    }
    const prevImg = () => {
/*         setSlideDirection('right');
        setChImg(!chImg)
 */        var ind = images.findIndex(image => image === img);
        console.log(ind);
        if (ind === 0 || ind === -1) {
        }
        else {
            setImg(images[ind - 1])
        }

    }


    const containerRef = useRef(null);

    return (
        loading ? <div className="portfolio_circular_progress">
            <div className="portfolio_wrapper">
                <div className="portfolio_container">
                    <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
                </div>
            </div>
        </div>
            :
            <>
                <div className="projectPage_container">
                    {
                        jsonData === null ?
                            <div className="">loading...</div> :
                            <div className="projectPage_wrapper">
                                <div className="projectPage_title">{jsonData.name}</div>
                                <div className="projectPage_subtitle">{jsonData.subtitle}</div>
                                <div className="projectPage_techs">
                                    {jsonData.techs.map(t => (<div className="projectPage_techs_chip">{t}</div>))}
                                </div>
                                <img src={jsonData.titleImg} alt="" onClick={() => handleOpen(jsonData.titleImg)} className="projectPage_titleImage" />

                                <Modal open={open} onClose={handleClose}>
                                    <Fade>
                                        <Box sx={style} ref={containerRef}>
                                            {/* <Slide key={`${img}_${slideDirection}`} direction={slideDirection} in={chImg} container={containerRef.current}> */}
                                            <img src={img} alt="" className="" />
                                            {/* </Slide> */}
                                            <div className="modal_close_button">
                                                <IconButton color="#ffe2e2" onClick={handleClose}>
                                                    <Close />
                                                </IconButton>
                                            </div>
                                            <div className="modal_next_button">
                                                <IconButton color="#ffe2e2" onClick={nextImg}>
                                                    <ArrowRight />
                                                </IconButton>
                                            </div>
                                            <div className="modal_prev_button">
                                                <IconButton color="#ffe2e2" onClick={prevImg}>
                                                    <ArrowLeft />
                                                </IconButton>
                                            </div>
                                        </Box>
                                    </Fade>
                                </Modal>
                                <div className="projectPage_desc">{jsonData.desc}</div>
                                <div className="bottomBody" id="projectPage_bottom">
                                    {

                                        jsonData.sections ?

                                            <>
                                                {jsonData.sections.map(s =>
                                                    <div className="projectPage_section">
                                                        <div className="projectPage_sectionHeading">
                                                            {s.sectionheading}
                                                        </div>
                                                        <div className="projectPage_sectionText">
                                                            {s.sectionText}
                                                        </div>
                                                        <div className="projectPage_sectionPane">
                                                            {
                                                                s.sectionData ?
                                                                    <>
                                                                        {s.sectionData.map(d =>
                                                                            <div className={`projectPage_section_sub ${d.alignment}`}>
                                                                                <div onClick={() => handleOpen(d.image)} className="projectPage_section_subImg">
                                                                                    <img src={d.image} alt="" />
                                                                                </div>
                                                                                <div className="projectPage_section_subText">
                                                                                    {d.text}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                    :
                                                                    <>nothing here</>
                                                            }


                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                            :
                                            <>nothing here</>

                                    }


                                </div>
                            </div>

                    }

                </div >
                <a href="#projectPage_bottom" className={isScrolled ? "Scroll_down_shizzle scroll_down_hide" : "Scroll_down_shizzle "}><ScrollDown hash={"projectPage_bottom"} /></a>
                <div onClick={goBack} className={`projectPage_back_button ${isScrolled ? "scrolled" : ""}`}>
                    <ArrowBack fontSize="0.5rem" />
                    <span>{isScrolled ? null : "GO BACK"}</span>
                </div>
            </>
    )
}

export default ProjectPage