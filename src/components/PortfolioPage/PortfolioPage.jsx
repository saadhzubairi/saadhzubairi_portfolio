import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from '@mui/material/Typography';
import "./portfoliopage.css"
import ProjectCard from "./projectCard";
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import hoops from "../../assets/portfolio/hoops.json"
import talenthive from "../../assets/portfolio/talenthive.json"
import halpert from "../../assets/portfolio/halpert.json"
import MasonryImageList from "./ImageList";
import { useParams } from 'react-router-dom'



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, []);

  return (
    loading ?
      <></>
      :
      <div
        className="portfolio_tabpane"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3rem" }}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Fade in={!loading}>
              <Typography>{children}</Typography>
            </Fade>
          </Box>
        )}
      </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PortfolioPage = () => {
  const [value, setValue] = useState(0);

  const { ind } = useParams();

  useEffect(() => {
    if (ind === "" || ind === undefined || ind === null) {

    }
    else {
      setValue(parseInt(ind))
    }
  }, [ind])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 300; // 2 seconds in milliseconds

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    loading ?
      <div className="portfolio_circular_progress">
        <div className="portfolio_wrapper">
          <div className="portfolio_container">
            <CircularProgress style={{ height: "5rem", width: "5rem", color: "#333" }} />
          </div>
        </div>
      </div>
      :
      <div className="portfolio_wrapper">
        <div className="portfolio_container">
          <div className="portfolio_heading">Portfolio</div>
          <div className="portfolio_subText">HAVE A LOOK AT MY WORK</div>
          <div className="portfolio_body">
            <Box sx={{
              width: '90%',
              textAlign: "centre",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>

              <Box
                sx={
                  {
                    backgroundColor: "transparent",
                    width: "95%",
                    textAlign: "centre",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }
                }
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  TabIndicatorProps={
                    {
                      sx: {
                        backgroundColor: "transparent",
                        textAlign: "centre",
                      },

                    }
                  }
                  classes={{ scrollButtons: "custom-scroll-buttons" }}
                  sx={
                    {
                      "& .Mui-selected": {
                        backgroundColor: "#4b4b4b",
                        color: "white",
                      },
                      "& .Mui-selected:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                      "& .MuiTab-root": {
                        margin: "0rem 0.5rem", // Adjust margin for better spacing
                        color: "black",
                        transition: "300ms",
                        background: "#eee",
                        borderRadius: "0.5rem",
                        "&:hover": {
                          backgroundColor: "#999",
                          color: "white",
                          borderRadius: "1rem",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#444",
                          color: "white",
                          borderTopRightRadius: "1rem",
                          borderTopLeftRadius: "1rem",
                          borderBottom: "0rem"
                        },
                        "& .MuiTabs-scrollButtons": {
                          display: "flex",
                        },
                      },
                    }
                  }
                >
                  <Tab label="Web"            {...a11yProps(0)} />
                  <Tab label="Mobile"         {...a11yProps(1)} />
                  <Tab label="Desktop"        {...a11yProps(2)} />
                  <Tab label="UI/UX"          {...a11yProps(3)} />
                  <Tab label="Game Design"    {...a11yProps(4)} />
                  <Tab label="Graphic Design" {...a11yProps(5)} />
                  <Tab label="Photography"    {...a11yProps(6)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <ProjectCard data={hoops} />
                <ProjectCard data={talenthive} />
                <ProjectCard data={halpert} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ProjectCard data={talenthive} />
                <ProjectCard data={hoops} />
                <ProjectCard data={talenthive} />
                <ProjectCard data={halpert} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <ProjectCard data={talenthive} />
                <ProjectCard data={halpert} />
                <ProjectCard data={talenthive} />
                <ProjectCard data={hoops} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                Item Four
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                Item Five
              </CustomTabPanel>
              <CustomTabPanel value={value} index={5}>
                Item Six
              </CustomTabPanel>
              <CustomTabPanel value={value} index={6}>
                <MasonryImageList />
              </CustomTabPanel>

            </Box>
          </div>
        </div>

      </div>

  );
};

export default PortfolioPage;
