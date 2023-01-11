import * as React from 'react';
import Settings from './Settings';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MiniLogo from '../assets/MiniLogo.png';
import Cloud from '../assets/Cloud.png';
import Tree from '../assets/Tree.png';
import Bulb from '../assets/Bulb.png';
import Car from '../assets/Car.png';
import Fan from '../assets/Fan.png';
import Graph from '../assets/Graph.png';
import Graph2 from '../assets/Graph2.png';
import Graph3 from '../assets/Graph3.png';
import Person from '../assets/HiddenPerson.png';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Dashboard() {
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }} className="dashboard-box">
            <Tabs className='hiooi'
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
                style={{  backgroundColor: '#0A2647' }}
            >
                <img src={MiniLogo} className="small-logo-blue" />
                
                <Tab label="Home" {...a11yProps(0)} style={{  color: '#FFFFFF' }} />
                <Tab label="Settings" {...a11yProps(1)} style={{ color: '#FFFFFF' }} />

            </Tabs>
            <TabPanel value={value} index={1} style={{ width: '100%', padding: '30px 26px' }} className="dash-panel">
                <Box>
                    <Typography className='head-ttl' variant="h5" gutterBottom>Hello User!</Typography>
                    <Typography className='head-desc' variant="caption" gutterBottom>See what's happened with your sustainability efforts in the last 30 days</Typography>
                </Box><hr></hr>
                <Box>
                    <Typography className='head-ttl' variant="h5" gutterBottom>Welcome to EcoPackables!</Typography>
                    <Typography className='head-desc2' variant="caption" gutterBottom>Please complete and review these resources before activating EcoPackables on your storefront.</Typography>
                    <Typography className='head-desc' variant="caption" gutterBottom>Questions? <a href='#'>Contact Customer Support</a></Typography>
                </Box>
                <Box className='main-date-div'>

                </Box>
                <Box className='main-icon-div'>
                    <Box className='icon-div'>
                        <div className='sub-div'>
                            <img src={Cloud}></img>
                        </div>
                        <Typography className='icon-head' variant="h6" gutterBottom>2lbs of CO2</Typography>
                        <Typography className='icon-desc' variant="caption" gutterBottom>CO2 emissions</Typography>
                    </Box>
                    <Box className='icon-div'>
                        <div className='sub-div'>
                            <img src={Tree}></img>
                        </div>
                        <Typography className='icon-head' variant="h6" gutterBottom>01</Typography>
                        <Typography className='icon-desc' variant="caption" gutterBottom>Trees</Typography>
                    </Box>
                    <Box className='icon-div'>
                        <div className='sub-div'>
                            <img src={Bulb}></img>
                        </div>
                        <Typography className='icon-head' variant="h6" gutterBottom>1.5</Typography>
                        <Typography className='icon-desc' variant="caption" gutterBottom>Light bulbs powered</Typography>
                    </Box>
                    <Box className='icon-div'>
                        <div className='sub-div'>
                            <img src={Car}></img>
                        </div>
                        <Typography className='icon-head' variant="h6" gutterBottom>03</Typography>
                        <Typography className='icon-desc' variant="caption" gutterBottom>Miles driven</Typography>
                    </Box>
                    <Box className='icon-div'>
                        <div className='sub-div'>
                            <img src={Fan}></img>
                        </div>
                        <Typography className='icon-head' variant="h6" gutterBottom>1ft of ice</Typography>
                        <Typography className='icon-desc' variant="caption" gutterBottom>Ice saved</Typography>
                    </Box>
                </Box>

                <Box style={{ display: 'flex', flexWrap: 'wrap', marginTop: '50px', maxWidth: '1210px', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.05)', borderRadius: '8px', padding: '40px' }} className="graph-div1">
                    <div style={{ width: '70%' }} className="first-div">
                        <Typography variant="h6" gutterBottom>Total Emissions</Typography>
                    </div>
                    <div style={{ width: '15%' }} className="second-div">
                        <Typography variant="caption" gutterBottom>Offset Carbon</Typography>
                    </div>
                    <div style={{ width: '15%' }} className="third-div">
                        <Typography variant="caption" gutterBottom>Total Carbon</Typography>
                    </div>
                    <img src={Graph} style={{ width: '100%' }}></img>
                </Box>

                <Box style={{ width: '100%', maxWidth: '1190px', marginTop: '50px', display: 'flex' }} className="mrg-graph">
                    <Box style={{ display: 'flex', flexWrap: 'wrap', width: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.05)', borderRadius: '8px', padding: '40px' }} className="graph-div2">
                        <div style={{ width: '40%' }} className="first-div">
                            <Typography variant="h6" gutterBottom>Adoption Rate</Typography>
                        </div>
                        <div style={{ width: '30%', textAlign: 'right' }} className="second-div">
                            <Typography variant="caption" gutterBottom>EcoPackables Orders</Typography>
                        </div>
                        <div style={{ width: '30%', textAlign: 'right' }} className="third-div">
                            <Typography variant="caption" gutterBottom>Total Orders</Typography>
                        </div>
                        <img src={Graph2} style={{ width: '100%' }}></img>
                    </Box>
                    <Box style={{ display: 'flex', flexWrap: 'wrap', width: '50%', backgroundColor: '#FFFFFF', boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.05)', borderRadius: '8px', padding: '40px' }} className="graph-div3">
                        <div style={{ width: '40%' }} className="first-div">
                            <Typography variant="h6" gutterBottom>Donations Raised</Typography>
                        </div>
                        <div style={{ width: '30%', textAlign: 'right' }} className="second-div">
                            <Typography variant="caption" gutterBottom>Offset Carbon</Typography>
                        </div>
                        <div style={{ width: '30%', textAlign: 'right' }} className="third-div">
                            <Typography variant="caption" gutterBottom>Total Carbon</Typography>
                        </div>
                        <img src={Graph3} style={{ width: '100%' }}></img>
                    </Box>
                </Box>

                <Box className='person-flex'>
                <Box style={{ backgroundColor: '#FFFFFF', border: '5px solid rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} className="person-div">
                    <Box style={{ backgroundImage: `url(${Person})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
                        <Typography variant="h6" gutterBottom>About EcoCart’s Offsetting Projects</Typography>
                        <Typography variant="caption" gutterBottom>We work with a global network of verified carbon offsetting projects that meet every brand’s story.</Typography>
                        <a href="#">Contact Customer Support</a>
                        {/* <img src={Person} /> */}
                    </Box>
                </Box>
                <Box style={{ backgroundColor: '#FFFFFF', border: '5px solid rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} className="person-div">
                    <Box style={{ backgroundImage: `url(${Person})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
                        <Typography variant="h6" gutterBottom>About EcoCart’s Offsetting Projects</Typography>
                        <Typography variant="caption" gutterBottom>We work with a global network of verified carbon offsetting projects that meet every brand’s story.</Typography>
                        <a href="#">Contact Customer Support</a>
                        {/* <img src={Person} /> */}
                    </Box>
                </Box>
                <Box style={{ backgroundColor: '#FFFFFF', border: '5px solid rgba(0, 0, 0, 0.05)', borderRadius: '10px' }} className="person-div">
                    <Box style={{ backgroundImage: `url(${Person})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', }}>
                        <Typography variant="h6" gutterBottom>About EcoCart’s Offsetting Projects</Typography>
                        <Typography variant="caption" gutterBottom>We work with a global network of verified carbon offsetting projects that meet every brand’s story.</Typography>
                        <a href="#">Contact Customer Support</a>
                        {/* <img src={Person} /> */}
                    </Box>
                </Box>
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ margin: '0 auto'}}>
                <Settings />
            </TabPanel>

        </Box>
    );
}