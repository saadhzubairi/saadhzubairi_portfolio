import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photoFiles = [
    "PXL_20231127_150502403.jpg",
    "PXL_20231115_012759252.jpg",
    "PXL_20231113_122534075.jpg",
    "PXL_20231108_094249141.jpg",
    "PXL_20231031_123101664.jpg",
    "PXL_20231023_121219453~2.jpg",
    "PXL_20231014_052930609 (1).jpg",
    "PXL_20231009_121754871~2.jpg",
    "PXL_20231004_035057336~2.jpg",
    "PXL_20230920_115629894.jpg",
    "PXL_20230920_115554635~2.jpg",
    "PXL_20230916_134755380.jpg",
    "PXL_20230724_070535823.jpg",
    "PXL_20230714_033252896-01.jpeg",
    "PXL_20230706_143421217-01.jpeg",
    "PXL_20230615_143445743~2.jpg",
    "PXL_20230529_142952704-01.jpeg",
    "PXL_20230523_095353720~2.jpg",
    "PXL_20230509_132905548.jpg",
    "PXL_20230404_100914816~2.jpg",
    "PXL_20230320_133429846-01.jpeg",
    "PXL_20230316_083101642-01.jpeg",
    "PXL_20230310_131742176~2.jpg",
    "PXL_20230223_140816650~2-01.jpeg",
    "PXL_20230210_142157674-01.jpeg",
    "PXL_20230206_150644319.NIGHT.jpg",
    "PXL_20230124_135503554.NIGHT.jpg",
    "PXL_20230118_131607240~2.jpg",
    "PXL_20230109_122609967~3.jpg",
    "PXL_20221128_030445683-01.jpeg",
    "PXL_20221107_120006963-01.jpeg",
    "PXL_20221008_133207593-01.jpeg",
    "PXL_20220929_131258263~2.jpg",
    "PXL_20220912_092838749.jpg",
    "PXL_20220814_100807432.jpg",
    "PXL_20220813_224758319.NIGHT.jpg",
    "IMG_20220418_104245.jpg",
    "IMG_20210929_142230-01.jpeg",
    "IMG_20210929_142125-01.jpeg",
    "IMG_20210929_142042-01.jpeg",
    "IMG_20210927_132429-01.jpeg",
    "IMG_20210927_131951-01.jpeg",
    "IMG_20210209_082031.jpg",
    "IMG_20210209_081518.jpg",
    "IMG_20200921_143126.jpg",
    "IMG_20200921_082337.jpg",
    "IMG_20200630_182524.jpg",
    "IMG_20200227_094923 (1).jpg",
    "IMG_20200217_081649_1.jpg",
    "IMG_20200116_125636.jpg",
    "IMG_20200109_175223.jpg",
    "IMG_20200107_173121.jpg",
    "IMG_20191031_154741.jpg",
    "IMG_20191010_180114_386.jpg",
    "IMG_20190924_155228.jpg",
    "2023-11-30_18-42-16.jpg",
    "20201217_214424-01.jpeg",
    "20200324_221655.jpg",
    "20190812013053_IMG_0098.JPG",
    "20190728224648__MG_9659.JPG",
    "1649518078.jpg",
    "1632910356.jpg",
    "1632910322.jpg",
    "1632910264.jpg",
    "1632910189.jpg",
    "1632910159.jpg",
    "1632910125.jpg",
    "1630613661.jpg",
    "1626575243.jpg",
    "1626544526.jpg",
    "1626544470.jpg",
    "1626544343.jpg",
    "1626543738.jpg",
];

// --- Lightbox gallery overlay ---
const Lightbox = ({
    index,
    onClose,
    onPrev,
    onNext,
    total,
}: {
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    total: number;
}) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowLeft") onPrev();
            else if (e.key === "ArrowRight") onNext();
        },
        [onClose, onPrev, onNext],
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const file = photoFiles[index];
    const src = `/pics/${encodeURIComponent(file)}`;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
                <X size={20} className="text-white" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
                {index + 1} / {total}
            </span>

            {/* Prev arrow */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
                <ChevronLeft size={24} className="text-white" />
            </button>

            {/* Image */}
            <motion.img
                key={file}
                src={src}
                alt=""
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
            />

            {/* Next arrow */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
                <ChevronRight size={24} className="text-white" />
            </button>
        </motion.div>
    );
};

// --- Main gallery ---
const MasonryImageList: React.FC = () => {
    const [cols, setCols] = useState(3);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        const updateCols = () => {
            const w = window.innerWidth;
            if (w < 640) setCols(2);
            else if (w < 1024) setCols(3);
            else setCols(4);
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);

    const openLightbox = (i: number) => setLightboxIndex(i);
    const closeLightbox = () => setLightboxIndex(null);
    const goPrev = useCallback(
        () => setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + photoFiles.length) % photoFiles.length)),
        [],
    );
    const goNext = useCallback(
        () => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % photoFiles.length)),
        [],
    );

    return (
        <>
            <Box sx={{ width: "100%", pt: 2 }}>
                <ImageList variant="masonry" cols={cols} gap={8}>
                    {photoFiles.map((file, i) => (
                        <ImageListItem
                            key={file}
                            onClick={() => openLightbox(i)}
                            sx={{ cursor: "pointer", "&:hover img": { opacity: 0.85 } }}
                        >
                            <img
                                src={`/pics/${encodeURIComponent(file)}`}
                                alt={file.replace(/\.[^.]+$/, "").replace(/[_~-]/g, " ")}
                                loading="lazy"
                                style={{
                                    borderRadius: 8,
                                    display: "block",
                                    width: "100%",
                                    transition: "opacity 0.2s",
                                }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        index={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={goPrev}
                        onNext={goNext}
                        total={photoFiles.length}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default MasonryImageList;
