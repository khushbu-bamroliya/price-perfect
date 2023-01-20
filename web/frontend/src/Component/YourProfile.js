import { Card, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import ProfileBackground from "./Images/ProfileBackground.png";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import ProfileSettingsTab from "./ProfileSettingsTab";
import Profile_logo from "./Images/Profile_logo.png";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const YourProfile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Card className="profile">
        <div className="profile-main">
          <Navbar />
          <Card className="profileBlock">
            <div className="main_profile_img">
              <div>
                <img
                  className="ProfileBackgroundImg"
                  src={ProfileBackground}
                  alt=""
                />
              </div>
              <img className="proflie_pic" src={Profile_logo} />
            </div>
            <div className="profileData">
              <div className="userDetails">
                <Typography variant="h4">Alexander</Typography>
                <div>
                  <Typography variant="p">New York City</Typography>
                  <br />
                </div>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet consectetur. Amet duis malesuada
                  enim nisi. Id vel et augue morbi est lorem platea
                  pellentesque. Tristique cursus nisl ultrices ut in dui. Enim.
                </Typography>
              </div>
              <div className="onProfileStatistics">
                <div className="main_toda_rev">
                  <div>
                    <Typography variant="p">
                      Today's <span>Visitors</span>
                    </Typography>
                    <Typography variant="h5"> 5,432 </Typography>
                  </div>
                </div>
                <div className="main_toda_rev">
                  <div>
                    <Typography variant="p">
                      Test <span>Revenue</span>
                    </Typography>
                    <Typography variant="h5"> $3,401.89 </Typography>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="settings">
            <Typography variant="h5">Settings</Typography>
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                className="settingsTab"
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  aria-label="basic tabs example"
                >
                  <Tab
                    className="singleTab"
                    label="My Details"
                    {...a11yProps(0)}
                  />
                  <Tab
                    className="singleTab"
                    label="Profile"
                    {...a11yProps(1)}
                  />
                  <Tab
                    className="singleTab"
                    label="Password"
                    {...a11yProps(2)}
                  />
                  <Tab
                    className="singleTab"
                    label="Billing"
                    {...a11yProps(3)}
                  />
                  <Tab
                    className="singleTab"
                    label="Notifications"
                    {...a11yProps(4)}
                  />
                  <Tab
                    className="singleTab"
                    label="Integration"
                    {...a11yProps(5)}
                  />
                  <Tab className="singleTab" label="API" {...a11yProps(6)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <ProfileSettingsTab />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={4}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={5}>
                Item Three
              </TabPanel>
              <TabPanel value={value} index={6}>
                Item Threef
              </TabPanel>
            </Box>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default YourProfile;
