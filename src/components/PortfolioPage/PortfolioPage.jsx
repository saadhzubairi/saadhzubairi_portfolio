import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from '@mui/material/Typography';
import hoops from "../../assets/portfolio/hoops.json"
import "./portfoliopage.css"
import ProjectCard from "./projectCard";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="portfolio_tabpane"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (

    <div className="portfolio_wrapper">
      <div className="portfolio_container">
        <div className="portfolio_heading">Portfolio</div>
        <div className="portfolio_subText">HAVE A LOOK AT MY PAST WORK</div>
        <div className="portfolio_body">
          <Box sx={{
            width: '90%',
            textAlign: "centre",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignItems: "center"
          }}>

            <Box
              sx={
                {
                  backgroundColor: "transparent",
                  width: "90%",
                  textAlign: "centre",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center"
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
                      backgroundColor: "#bbb",
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
                      margin: "0.15rem 0.5rem", // Adjust margin for better spacing
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
              <ProjectCard data={hoops} />
              <ProjectCard data={hoops} />
              <ProjectCard data={hoops} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
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
              Item Seven
            </CustomTabPanel>

          </Box>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
