import React, { useEffect, useState } from "react";
import "./qualifications.css";

// Data
import ed_data from "../../assets/EDXP_data/education.json";
import xp_data from "../../assets/EDXP_data/experience.json";
import certs_data from "../../assets/EDXP_data/certificates.json";

// Local components
import Popup from "./PopUp";
import ShopUp from "./ShopUp";

// Icons
import { ExternalLink, X } from "lucide-react";
import CustomDiv from "../CustomDiv";
import TexturedDiv from "../TexturedDiv";

type NullableIndex = number | null;

const Qualifications: React.FC = () => {
    const [openModalIndex, setOpenModalIndex] = useState<NullableIndex>(null);
    const [openModalIndexXp, setOpenModalIndexXp] = useState<NullableIndex>(null);

    const handleOpen = (index: number) => setOpenModalIndex(index);
    const handleClose = () => setOpenModalIndex(null);

    const handleOpenXp = (index: number) => setOpenModalIndexXp(index);
    const handleCloseXp = () => setOpenModalIndexXp(null);

    const [showAlled, setShowAlled] = useState(false);
    const [showAllxp, setShowAllxp] = useState(false);

    const handleShowAlled = () => setShowAlled((v) => !v);
    const handleShowAllxp = () => setShowAllxp((v) => !v);

    const hideXp = [2, 4, 5];
    const hideCert = [2];
    const hideEd = [1, 2];

    return (
        <section className="qualifications section" id="Qual">
            <CustomDiv>
                <div className=""></div>
            </CustomDiv>
            <CustomDiv>
                <h2 className="text-4xl font-bold">Qualifications</h2>
            </CustomDiv>
            <CustomDiv>
                <span className="text-lg text-gray-500">My academic and professional journey</span>
            </CustomDiv>

            <CustomDiv>
                <TexturedDiv className="">
                <div className="">
                <div className="qual__category__heading">
                    <div className="qual__category__sub">
                        <i className="uil uil-graduation-cap qual__icon"></i> Education & Certifications
                    </div>
                    <div className="qual__category__sub qual_showmore_button" onClick={handleShowAlled}>
                        {showAlled ? (
                            <>Show less <i className='bx bx-up-arrow-circle'></i></>
                        ) : (
                            <>Show more <i className='bx bx-down-arrow-circle'></i></>
                        )}
                    </div>
                </div>

                <div className="qual__sections">
                    <div style={{ display: "flex" }}>
                        <div className="qual__content qual__content-active">
                            <div className="qual__content__subPart">
                                {ed_data.map((item: any, index: number) => (
                                    <React.Fragment key={`ed-${index}`}>
                                        <div
                                            className={
                                                showAlled
                                                    ? "qual__data"
                                                    : hideEd.indexOf(index) === -1
                                                        ? "qual__data"
                                                        : "qual__data_hidden"
                                            }
                                            onClick={() => handleOpen(index)}
                                        >
                                            <h3 className="qual__title">{item.degree}</h3>
                                            <div className="qual__subtitle_img__and__text">
                                                <img src={item.logo} alt="" className="qual__subtitle_img" />
                                                <div className="qual__subtitile__section">
                                                    <span className="qual__subtitle">{item.institute}</span>
                                                </div>
                                            </div>
                                            <div className="qual__calendar"><i className="uil uil-schedule"></i>{item.years}</div>
                                            <div className="qual__data_openIcon">
                                                Expand <ExternalLink size={14} />
                                            </div>
                                        </div>

                                        {openModalIndex === index && (
                                            <div className="fixed inset-0 z-[1000] flex items-center justify-center">
                                                <div
                                                    className="absolute inset-0 bg-black/50"
                                                    onClick={handleClose}
                                                    aria-hidden
                                                />
                                                <div
                                                    className="relative css-snwxfu bg-white rounded-2xl border-2 border-dashed p-4 max-w-[80vw]"
                                                    role="dialog"
                                                    aria-modal="true"
                                                >
                                                    <Popup data={item} />
                                                    <button
                                                        aria-label="Close"
                                                        onClick={handleClose}
                                                        className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1 border hover:bg-gray-50"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}

                                {certs_data.map((item: any, index: number) => (
                                    <React.Fragment key={`cert-${index}`}>
                                        <div
                                            className={
                                                showAlled
                                                    ? "qual__data"
                                                    : hideCert.indexOf(index) === -1
                                                        ? "qual__data cert__data"
                                                        : "qual__data_hidden"
                                            }
                                            onClick={() => window.open(item.credentialId, "_blank")}
                                        >
                                            <h3 className="qual__title">{item.name}</h3>
                                            <div className="qual__subtitle_img__and__text">
                                                <img src={item.logo} alt="" className="qual__subtitle_img" />
                                                <div className="qual__subtitile__section">
                                                    <span className="qual__subtitle">{item.institute}</span>
                                                </div>
                                            </div>
                                            <div className="qual__calendar"><i className="uil uil-schedule"></i>{item.issued}</div>
                                            <div className="qual__data_openIcon_cert">
                                                View Credential <ExternalLink size={14} />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="qual__category__heading">
                    <div className="qual__category__sub">
                        <i className="uil uil-briefcase-alt qual__icon"></i> Professional Experience
                    </div>
                    <div className="qual__category__sub qual_showmore_button" onClick={handleShowAllxp}>
                        {showAllxp ? (
                            <>Show less <i className='bx bx-up-arrow-circle'></i></>
                        ) : (
                            <>Show more <i className='bx bx-down-arrow-circle'></i></>
                        )}
                    </div>
                </div>

                <div className="qual__sections">
                    <div style={{ display: "flex" }}>
                        <div className="qual__content qual__content-active">
                            <div className="qual__content__subPart">
                                {xp_data.map((item: any, index: number) => (
                                    <React.Fragment key={`xp-${index}`}>
                                        <div
                                            className={
                                                showAllxp
                                                    ? "qual__data"
                                                    : hideXp.indexOf(index) === -1
                                                        ? "qual__data"
                                                        : "qual__data_hidden"
                                            }
                                            onClick={() => handleOpenXp(index)}
                                        >
                                            <h3 className="qual__title">{item.desg}</h3>
                                            <div className="qual__subtitle_img__and__text">
                                                <img src={item.logo} alt="" className="qual__subtitle_img" />
                                                <div className="qual__subtitile__section">
                                                    <span className="qual__subtitle">{item.company}</span>
                                                </div>
                                            </div>
                                            <div className="qual__calendar"><i className="uil uil-schedule"></i>{item.years}</div>
                                            <div className="qual__data_openIcon_xp">
                                                <ExternalLink size={14} />
                                            </div>
                                        </div>

                                        {openModalIndexXp === index && (
                                            <div className="fixed inset-0 z-[1000] flex items-center justify-center">
                                                <div
                                                    className="absolute inset-0 bg-black/50"
                                                    onClick={handleCloseXp}
                                                    aria-hidden
                                                />
                                                <div
                                                    className="relative css-snwxfu bg-white rounded-2xl border-2 border-dashed p-4 max-w-[80vw]"
                                                    role="dialog"
                                                    aria-modal="true"
                                                >
                                                    <ShopUp data={item} />
                                                    <button
                                                        aria-label="Close"
                                                        onClick={handleCloseXp}
                                                        className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1 border hover:bg-gray-50"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </TexturedDiv>
            </CustomDiv>




            
        </section>
    );
};

export default Qualifications;


