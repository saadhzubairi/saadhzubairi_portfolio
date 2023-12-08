import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade';
import { Close } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MasonryImageList() {

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

    return (
        <Box sx={{ width: "100%", height: "100%", overflowY: 'scroll' }}>
            <ImageList variant="masonry" cols={cols} gap={8}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            loading="lazy"
                            onClick={() => { setModImg(item.img); setOpen(true) }}
                            className='photography_portfolio_image'
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="modal_preview_image_photography_container">
                    <img src={modImg} alt="" className="modal_image_preview_photography" />
                </div>
            </Modal>
        </Box>
    );
}

const itemData = [
    {
        img: '/pics/2023-11-30_18-42-16.jpg',
    },
    { img: "/pics/1626543738.jpg" },
    { img: "/pics/1626544343.jpg" },
    { img: "/pics/1626544470.jpg" },
    { img: "/pics/1626544526.jpg" },
    { img: "/pics/1626575243.jpg" },
    { img: "/pics/1630613661.jpg" },
    { img: "/pics/1632910125.jpg" },
    { img: "/pics/1632910159.jpg" },
    { img: "/pics/1632910189.jpg" },
    { img: "/pics/1632910264.jpg" },
    { img: "/pics/1632910322.jpg" },
    { img: "/pics/1632910356.jpg" },
    { img: "/pics/1649518078.jpg" },
    { img: "/pics/20190728224648__MG_9659.JPG" },
    { img: "/pics/20190812013053_IMG_0098.JPG" },
    { img: "/pics/20200324_221655.jpg" },
    { img: "/pics/20201217_214424-01.jpeg" },
    { img: "/pics/2023-11-30_18-42-16.jpg" },
    { img: "/pics/IMG_20190924_155228.jpg" },
    { img: "/pics/IMG_20191010_180114_386.jpg" },
    { img: "/pics/IMG_20191031_154741.jpg" },
    { img: "/pics/IMG_20200107_173121.jpg" },
    { img: "/pics/IMG_20200109_175223.jpg" },
    { img: "/pics/IMG_20200116_125636.jpg" },
    { img: "/pics/IMG_20200217_081649_1.jpg" },
    { img: "/pics/IMG_20200227_094923 (1).jpg" },
    { img: "/pics/IMG_20200630_182524.jpg" },
    { img: "/pics/IMG_20200921_082337.jpg" },
    { img: "/pics/IMG_20200921_143126.jpg" },
    { img: "/pics/IMG_20210209_081518.jpg" },
    { img: "/pics/IMG_20210209_082031.jpg" },
    { img: "/pics/IMG_20210927_131951-01.jpeg" },
    { img: "/pics/IMG_20210927_132429-01.jpeg" },
    { img: "/pics/IMG_20210929_142042-01.jpeg" },
    { img: "/pics/IMG_20210929_142125-01.jpeg" },
    { img: "/pics/IMG_20210929_142230-01.jpeg" },
    { img: "/pics/IMG_20220418_104245.jpg" },
    { img: "/pics/PXL_20220813_224758319.NIGHT.jpg" },
    { img: "/pics/PXL_20220814_100807432.jpg" },
    { img: "/pics/PXL_20220912_092838749.jpg" },
    { img: "/pics/PXL_20220929_131258263~2.jpg" },
    { img: "/pics/PXL_20221008_133207593-01.jpeg" },
    { img: "/pics/PXL_20221107_120006963-01.jpeg" },
    { img: "/pics/PXL_20221128_030445683-01.jpeg" },
    { img: "/pics/PXL_20230109_122609967~3.jpg" },
    { img: "/pics/PXL_20230118_131607240~2.jpg" },
    { img: "/pics/PXL_20230124_135503554.NIGHT.jpg" },
    { img: "/pics/PXL_20230206_150644319.NIGHT.jpg" },
    { img: "/pics/PXL_20230210_142157674-01.jpeg" },
    { img: "/pics/PXL_20230223_140816650~2-01.jpeg" },
    { img: "/pics/PXL_20230310_131742176~2.jpg" },
    { img: "/pics/PXL_20230316_083101642-01.jpeg" },
    { img: "/pics/PXL_20230320_133429846-01.jpeg" },
    { img: "/pics/PXL_20230404_100914816~2.jpg" },
    { img: "/pics/PXL_20230509_132905548.jpg" },
    { img: "/pics/PXL_20230523_095353720~2.jpg" },
    { img: "/pics/PXL_20230529_142952704-01.jpeg" },
    { img: "/pics/PXL_20230615_143445743~2.jpg" },
    { img: "/pics/PXL_20230706_143421217-01.jpeg" },
    { img: "/pics/PXL_20230714_033252896-01.jpeg" },
    { img: "/pics/PXL_20230724_070535823.jpg" },
    { img: "/pics/PXL_20230916_134755380.jpg" },
    { img: "/pics/PXL_20230920_115554635~2.jpg" },
    { img: "/pics/PXL_20230920_115629894.jpg" },
    { img: "/pics/PXL_20231004_035057336~2.jpg" },
    { img: "/pics/PXL_20231009_121754871~2.jpg" },
    { img: "/pics/PXL_20231014_052930609 (1).jpg" },
    { img: "/pics/PXL_20231023_121219453~2.jpg" },
    { img: "/pics/PXL_20231031_123101664.jpg" },
    { img: "/pics/PXL_20231108_094249141.jpg" },
    { img: "/pics/PXL_20231113_122534075.jpg" },
    { img: "/pics/PXL_20231115_012759252.jpg" }
];