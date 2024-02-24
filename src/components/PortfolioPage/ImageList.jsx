import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade';
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} sx={{
                    color: '#333333', // Change color to your desired color
                    height: 8, // Change thickness to your desired thickness
                }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography color="text.secondary">
                    {`${Math.round(props.value,)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export function LinearWithValueLabel() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);
}

export default function MasonryImageList() {

    const [imgLoadingFull, setImageLoadingFull] = React.useState(true);

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesLG = useMediaQuery(theme.breakpoints.up('lg'));

    let cols;
    if (matchesXS) {
        cols = 2;
    } else if (matchesSM) {
        cols = 3;
    } else if (matchesMD) {
        cols = 4;
    } else if (matchesLG) {
        cols = 5;
    } else {
        cols = 5;
    }

    const [modImg, setModImg] = React.useState();
    const [open, setOpen] = React.useState();

    const handleClose = () => {
        setOpen(false)
    }

    const containerRef = React.useRef(null);

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100%',
        bgcolor: 'transparent',
    };

    const nextImg = () => {
        setImageLoadingFull(true)
        const currentIndex = itemData.indexOf(modImg);
        if (currentIndex === (itemData.length - 1)) {
            setModImg(itemData[0]);
        }
        else {
            setModImg(itemData[currentIndex + 1]);
        }
    }
    const prevImg = () => {
        setImageLoadingFull(true)
        const currentIndex = itemData.indexOf(modImg);
        if (currentIndex === 0) {
            setModImg(itemData[itemData.length - 1]);
        }
        else {
            setModImg(itemData[currentIndex - 1]);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'ArrowLeft') {
            prevImg();
        } else if (event.key === 'ArrowRight') {
            nextImg();
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    });

    const [imagesLoaded, setImagesLoaded] = React.useState(0);

    const [allImgsLoaded, setAllImgsLoaded] = React.useState(false)

    const isAllLoaded = () => {
        setAllImgsLoaded(prevState => !prevState)
    }

    const [val, setVal] = React.useState(0);

    const updateLoadeds = () => {
        // Increment the count of loaded images
        setImagesLoaded(prevCount => prevCount + 1);

        // Calculate the loaded percentage
        const loadedPercentage = ((imagesLoaded + 1) / itemData.length) * 100;
        setVal(loadedPercentage);

        // Check if all images are loaded
        if (loadedPercentage > 90) {
            isAllLoaded();
        }
    };

    const handleImgLoad = () => {
        // Call updateLoadeds function only if the image is not already loaded
        if (!allImgsLoaded) {
            updateLoadeds();
        }
    };

    return (
        <>
            <div className="masonry_image_pane_container">
                <div className={`masonry_image_loading_bar ${allImgsLoaded ? "loaded" : "loading"}`}>
                    <LinearProgressWithLabel value={val} />
                </div>

                <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={cols} gap={8}>
                        {itemData.map((item) => (
                            <ImageListItem key={item}>
                                <img
                                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item}?w=248&fit=crop&auto=format`}
                                    alt='~'
                                    onClick={() => { setModImg(item); setOpen(true) }}
                                    className='photography_portfolio_image'
                                    onLoad={updateLoadeds}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>


                    <Modal open={open} onClose={handleClose}>
                        <Fade in={open}>
                            <Box sx={style} ref={containerRef}>
                                {imgLoadingFull ? <CircularProgress sx={{ color: "#fff" }} /> : null}
                                <Fade in={!imgLoadingFull}>
                                    <img src={modImg} alt=""
                                        className="photography_portfolio_modal_image"
                                        onLoad={handleImgLoad}
                                        style={{ display: imgLoadingFull ? 'none' : 'block' }} />
                                </Fade>
                                <div className="modal_close_button">
                                    <IconButton color="#ffe2e2" onClick={handleClose}>
                                        <Close />
                                    </IconButton>
                                </div>
                                <div className="modal_next_button_gallery">
                                    <IconButton color="#ffe2e2" onClick={nextImg}>
                                        <ArrowRight />
                                    </IconButton>
                                </div>
                                <div className="modal_prev_button_gallery">
                                    <IconButton color="#ffe2e2" onClick={prevImg}>
                                        <ArrowLeft />
                                    </IconButton>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </Box >
            </div>
        </>
    );
}

const itemData = [
    '/pics/2023-11-30_18-42-16.jpg',
    "/pics/1626543738.jpg",
    "/pics/1626544343.jpg",
    "/pics/1626544470.jpg",
    "/pics/1626544526.jpg",
    "/pics/1626575243.jpg",
    "/pics/1630613661.jpg",
    "/pics/1632910125.jpg",
    "/pics/1632910159.jpg",
    "/pics/1632910189.jpg",
    "/pics/1632910264.jpg",
    "/pics/1632910322.jpg",
    "/pics/1632910356.jpg",
    "/pics/1649518078.jpg",
    "/pics/20190728224648__MG_9659.JPG",
    "/pics/20190812013053_IMG_0098.JPG",
    "/pics/20200324_221655.jpg",
    "/pics/20201217_214424-01.jpeg",
    "/pics/2023-11-30_18-42-16.jpg",
    "/pics/IMG_20190924_155228.jpg",
    "/pics/IMG_20191010_180114_386.jpg",
    "/pics/IMG_20191031_154741.jpg",
    "/pics/IMG_20200107_173121.jpg",
    "/pics/IMG_20200109_175223.jpg",
    "/pics/IMG_20200116_125636.jpg",
    "/pics/IMG_20200217_081649_1.jpg",
    "/pics/IMG_20200227_094923 (1).jpg",
    "/pics/IMG_20200630_182524.jpg",
    "/pics/IMG_20200921_082337.jpg",
    "/pics/IMG_20200921_143126.jpg",
    "/pics/IMG_20210209_081518.jpg",
    "/pics/IMG_20210209_082031.jpg",
    "/pics/IMG_20210927_131951-01.jpeg",
    "/pics/IMG_20210927_132429-01.jpeg",
    "/pics/IMG_20210929_142042-01.jpeg",
    "/pics/IMG_20210929_142125-01.jpeg",
    "/pics/IMG_20210929_142230-01.jpeg",
    "/pics/IMG_20220418_104245.jpg",
    "/pics/PXL_20220813_224758319.NIGHT.jpg",
    "/pics/PXL_20220814_100807432.jpg",
    "/pics/PXL_20220912_092838749.jpg",
    "/pics/PXL_20220929_131258263~2.jpg",
    "/pics/PXL_20221008_133207593-01.jpeg",
    "/pics/PXL_20221107_120006963-01.jpeg",
    "/pics/PXL_20221128_030445683-01.jpeg",
    "/pics/PXL_20230109_122609967~3.jpg",
    "/pics/PXL_20230118_131607240~2.jpg",
    "/pics/PXL_20230124_135503554.NIGHT.jpg",
    "/pics/PXL_20230206_150644319.NIGHT.jpg",
    "/pics/PXL_20230210_142157674-01.jpeg",
    "/pics/PXL_20230223_140816650~2-01.jpeg",
    "/pics/PXL_20230310_131742176~2.jpg",
    "/pics/PXL_20230316_083101642-01.jpeg",
    "/pics/PXL_20230320_133429846-01.jpeg",
    "/pics/PXL_20230404_100914816~2.jpg",
    "/pics/PXL_20230509_132905548.jpg",
    "/pics/PXL_20230523_095353720~2.jpg",
    "/pics/PXL_20230529_142952704-01.jpeg",
    "/pics/PXL_20230615_143445743~2.jpg",
    "/pics/PXL_20230706_143421217-01.jpeg",
    "/pics/PXL_20230714_033252896-01.jpeg",
    "/pics/PXL_20230724_070535823.jpg",
    "/pics/PXL_20230916_134755380.jpg",
    "/pics/PXL_20230920_115554635~2.jpg",
    "/pics/PXL_20230920_115629894.jpg",
    "/pics/PXL_20231004_035057336~2.jpg",
    "/pics/PXL_20231009_121754871~2.jpg",
    "/pics/PXL_20231014_052930609 (1).jpg",
    "/pics/PXL_20231023_121219453~2.jpg",
    "/pics/PXL_20231031_123101664.jpg",
    "/pics/PXL_20231108_094249141.jpg",
    "/pics/PXL_20231113_122534075.jpg",
    "/pics/PXL_20231115_012759252.jpg",
];