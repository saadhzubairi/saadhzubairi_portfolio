import React, { useState } from "react";
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
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

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
                <div className="h-20"></div>
            </CustomDiv>

            <CustomDiv>
                <TexturedDiv className="">
                    <div className="">
                        <div className="flex flex-row justify-between item-center">
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

                        <div className="">
                            <div style={{ display: "flex" }}>
                                <div className="">
                                    <div className="flex flex-wrap">
                                        {ed_data.map((item: any, index: number) => (
                                            <React.Fragment key={`ed-${index}`}>
                                                <div
                                                    className={"qual__data"}
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
                                            </React.Fragment>
                                        ))}

                                        {certs_data.map((item: any, index: number) => (
                                            <React.Fragment key={`cert-${index}`}>
                                                <div
                                                    className={"qual__data"}
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

                        <div className="flex flex-row justify-between item-center">
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
                                                    className={"qual__data"}
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
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TexturedDiv>
            </CustomDiv>

            {/* Education & Certifications Dialog (pure shadcn, minimal styling) */}
            <Dialog open={openModalIndex !== null} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
                {openModalIndex !== null && (
                    <DialogContent className="sm:max-w-[80vw] max-w-[90vw] max-h-[80vh] overflow-y-auto">
                        <div className="relative">
                            <pre className="text-sm whitespace-pre-wrap break-words">
{JSON.stringify(ed_data[openModalIndex], null, 2)}
                            </pre>
                            <DialogClose asChild>
                                <button
                                    aria-label="Close"
                                    className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1 border hover:bg-gray-50"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                )}
            </Dialog>

            {/* Experience Dialog (pure shadcn, minimal styling) */}
            <Dialog open={openModalIndexXp !== null} onOpenChange={(isOpen) => { if (!isOpen) handleCloseXp(); }}>
                {openModalIndexXp !== null && (
                    <DialogContent className="sm:max-w-[80vw] max-w-[90vw] max-h-[80vh] overflow-y-auto">
                        <div className="relative">
                            <pre className="text-sm whitespace-pre-wrap break-words">
{JSON.stringify(xp_data[openModalIndexXp], null, 2)}
                            </pre>
                            <DialogClose asChild>
                                <button
                                    aria-label="Close"
                                    className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1 border hover:bg-gray-50"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </section>
    );
};

export default Qualifications;