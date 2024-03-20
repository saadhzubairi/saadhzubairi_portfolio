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
        setImageLoadingFull(true)
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

    const [lastUpdateTimestamp, setLastUpdateTimestamp] = React.useState(Date.now());
    const [imagesLoaded, setImagesLoaded] = React.useState(0);
    const [allImgsLoaded, setAllImgsLoaded] = React.useState(false)
    const [val, setVal] = React.useState(0);

    const isAllLoaded = () => {
        setAllImgsLoaded(true)
    }

    const updateLoadeds = () => {
        setImagesLoaded(prevCount => prevCount + 1);
        const loadedPercentage = ((imagesLoaded + 1) / itemData.length) * 100;
        setVal(loadedPercentage);
    };

    const handleImgLoad = () => {
        if (!allImgsLoaded) {
            updateLoadeds();
        }
    };

    const handleImgLoadingFull = () => {
        setImageLoadingFull(!imgLoadingFull)
    }

    const checkUpdateTimeout = () => {
        const currentTime = Date.now();
        if (currentTime - lastUpdateTimestamp > 1500) {
            const newVal = Math.min(val + 1, 100); // Increase val by 1, but not beyond 100
            setVal(newVal);
        }
    };

    React.useEffect(() => {
        const timeoutId = setTimeout(checkUpdateTimeout, 25); // Check every 100ms
        return () => clearTimeout(timeoutId);
    }, [val, lastUpdateTimestamp]);

    React.useEffect(() => {
        const timeoutId = setTimeout(checkUpdateTimeout, 1500);
        return () => clearTimeout(timeoutId);
    }, [val]);

    React.useEffect(() => {
        setLastUpdateTimestamp(Date.now());
    }, [imagesLoaded]);

    React.useEffect(() => {
        if (val > 99) {
            isAllLoaded();
        }
    })

    return (
        <>
            <div className="masonry_image_pane_container">
                <div className={`masonry_image_loading_bar ${allImgsLoaded ? "loaded" : "loading"}`}>
                    <LinearProgressWithLabel value={val} />
                </div>

                <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={cols} gap={8}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.id}>
                                <img
                                    srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.src}?w=248&fit=crop&auto=format`}
                                    alt='~'
                                    onClick={() => { setModImg(item.src); setOpen(true) }}
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
                                        onLoad={handleImgLoadingFull}
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
    { id: "1", src: '/pics/2023-11-30_18-42-16.jpg' },
    { id: "2", src: "/pics/1626543738.jpg" },
    { id: "3", src: "/pics/1626544343.jpg" },
    { id: "4", src: "/pics/1626544470.jpg" },
    { id: "5", src: "/pics/1626544526.jpg" },
    { id: "6", src: "/pics/1626575243.jpg" },
    { id: "7", src: "/pics/1630613661.jpg" },
    { id: "8", src: "/pics/1632910125.jpg" },
    { id: "9", src: "/pics/1632910159.jpg" },
    { id: "10", src: "/pics/1632910189.jpg" },
    { id: "11", src: "/pics/1632910264.jpg" },
    { id: "12", src: "/pics/1632910322.jpg" },
    { id: "13", src: "/pics/1632910356.jpg" },
    { id: "14", src: "/pics/1649518078.jpg" },
    { id: "15", src: "/pics/20190728224648__MG_9659.JPG" },
    { id: "16", src: "/pics/20190812013053_IMG_0098.JPG" },
    { id: "17", src: "/pics/20200324_221655.jpg" },
    { id: "18", src: "/pics/20201217_214424-01.jpeg" },
    { id: "19", src: "/pics/2023-11-30_18-42-16.jpg" },
    { id: "20", src: "/pics/IMG_20190924_155228.jpg" },
    { id: "21", src: "/pics/IMG_20191010_180114_386.jpg" },
    { id: "22", src: "/pics/IMG_20191031_154741.jpg" },
    { id: "23", src: "/pics/IMG_20200107_173121.jpg" },
    { id: "24", src: "/pics/IMG_20200109_175223.jpg" },
    { id: "25", src: "/pics/IMG_20200116_125636.jpg" },
    { id: "26", src: "/pics/IMG_20200217_081649_1.jpg" },
    { id: "27", src: "/pics/IMG_20200227_094923 (1).jpg" },
    { id: "28", src: "/pics/IMG_20200630_182524.jpg" },
    { id: "29", src: "/pics/IMG_20200921_082337.jpg" },
    { id: "30", src: "/pics/IMG_20200921_143126.jpg" },
    { id: "31", src: "/pics/IMG_20210209_081518.jpg" },
    { id: "32", src: "/pics/IMG_20210209_082031.jpg" },
    { id: "33", src: "/pics/IMG_20210927_131951-01.jpeg" },
    { id: "34", src: "/pics/IMG_20210927_132429-01.jpeg" },
    { id: "35", src: "/pics/IMG_20210929_142042-01.jpeg" },
    { id: "36", src: "/pics/IMG_20210929_142125-01.jpeg" },
    { id: "37", src: "/pics/IMG_20210929_142230-01.jpeg" },
    { id: "38", src: "/pics/IMG_20220418_104245.jpg" },
    { id: "39", src: "/pics/PXL_20220813_224758319.NIGHT.jpg" },
    { id: "40", src: "/pics/PXL_20220814_100807432.jpg" },
    { id: "41", src: "/pics/PXL_20220912_092838749.jpg" },
    { id: "42", src: "/pics/PXL_20220929_131258263~2.jpg" },
    { id: "43", src: "/pics/PXL_20221008_133207593-01.jpeg" },
    { id: "44", src: "/pics/PXL_20221107_120006963-01.jpeg" },
    { id: "45", src: "/pics/PXL_20221128_030445683-01.jpeg" },
    { id: "46", src: "/pics/PXL_20230109_122609967~3.jpg" },
    { id: "47", src: "/pics/PXL_20230118_131607240~2.jpg" },
    { id: "48", src: "/pics/PXL_20230124_135503554.NIGHT.jpg" },
    { id: "49", src: "/pics/PXL_20230206_150644319.NIGHT.jpg" },
    { id: "50", src: "/pics/PXL_20230210_142157674-01.jpeg" },
    { id: "51", src: "/pics/PXL_20230223_140816650~2-01.jpeg" },
    { id: "52", src: "/pics/PXL_20230310_131742176~2.jpg" },
    { id: "53", src: "/pics/PXL_20230316_083101642-01.jpeg" },
    { id: "54", src: "/pics/PXL_20230320_133429846-01.jpeg" },
    { id: "55", src: "/pics/PXL_20230404_100914816~2.jpg" },
    { id: "56", src: "/pics/PXL_20230509_132905548.jpg" },
    { id: "57", src: "/pics/PXL_20230523_095353720~2.jpg" },
    { id: "58", src: "/pics/PXL_20230529_142952704-01.jpeg" },
    { id: "59", src: "/pics/PXL_20230615_143445743~2.jpg" },
    { id: "60", src: "/pics/PXL_20230706_143421217-01.jpeg" },
    { id: "61", src: "/pics/PXL_20230714_033252896-01.jpeg" },
    { id: "62", src: "/pics/PXL_20230724_070535823.jpg" },
    { id: "63", src: "/pics/PXL_20230916_134755380.jpg" },
    { id: "64", src: "/pics/PXL_20230920_115554635~2.jpg" },
    { id: "65", src: "/pics/PXL_20230920_115629894.jpg" },
    { id: "66", src: "/pics/PXL_20231004_035057336~2.jpg" },
    { id: "67", src: "/pics/PXL_20231009_121754871~2.jpg" },
    { id: "68", src: "/pics/PXL_20231014_052930609 (1).jpg" },
    { id: "69", src: "/pics/PXL_20231023_121219453~2.jpg" },
    { id: "70", src: "/pics/PXL_20231031_123101664.jpg" },
    { id: "71", src: "/pics/PXL_20231108_094249141.jpg" },
    { id: "72", src: "/pics/PXL_20231113_122534075.jpg" },
    { id: "73", src: "/pics/PXL_20231115_012759252.jpg" },
];