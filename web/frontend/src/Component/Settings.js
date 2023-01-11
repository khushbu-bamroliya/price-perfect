import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { width } from '@mui/system';

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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function Settings() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <h1>Settings / EcoCart Settings</h1>
            <Box sx={{ width: '100%', maxWidth: '800px !important' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="EcoCart Settings" {...a11yProps(0)} />
                        <Tab label="Store Details" {...a11yProps(1)} />
                        <Tab label="User Settings" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box style={{padding: '0'}}>
                        <Typography className='setting-title' variant="h5" gutterBottom >EcoCart Settings</Typography>
                        <Typography className='setting-caption' variant="caption" gutterBottom >Edit how you want EcoCart to function</Typography>
                    
                        <Typography className='setting-subtitle' variant="h6" gutterBottom style={{marginBottom: '35px'}}>Show Widgets on Store</Typography>

                        <Typography className='setting-maintitle' variant="h6" gutterBottom >Show Widget On</Typography>
                        
                        <Typography className='setting-caption' variant="caption" gutterBottom >Select who will pay the carbon offset of your orders</Typography>
                        

                        <FormControl component="fieldset" className='widgets-div'>
                            
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label="PDP Page"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label="Cart Page"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label="Checkout page (For Plus store)"
                                    labelPlacement="end"
                                />
                            </FormGroup>
                        </FormControl>

                        <Box style={{marginTop: '50px'}}>
                            <Typography className='setting-maintitle' variant="h6" gutterBottom>Widget Default</Typography>
                            <Typography className='setting-caption' variant="caption" gutterBottom>Select the default state of your widget</Typography>
                            <div className='two-part'>
                                <Box className='sele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Opt-in</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>The option to offset an order is turned on at checkout</Typography>
                                </Box>
                                <Box className='desele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Opt-in</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>The option to offset an order is turned off at checkout</Typography>
                                </Box>
                            </div>
                        </Box>

                        <Box style={{marginTop: '50px'}}>
                            <Typography className='setting-maintitle' variant="h6" gutterBottom>Payor Option</Typography>
                            <Typography className='setting-caption' variant="caption" gutterBottom>Select who will pay the carbon offset of your orders</Typography>
                            <div className='two-part'>
                                <Box className='sele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Customer Paying</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>Your customers can pay to offset the carbon footprint of their purchase</Typography>
                                </Box>
                                <Box className='desele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Merchant Paying</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>Make the biggest impact by paying to offset every order on behalf of your customers</Typography>
                                </Box>
                            </div>
                        </Box>

                        <Box style={{marginTop: '50px'}}>
                            <Typography className='setting-maintitle' variant="h6" gutterBottom>Calculation</Typography>
                            <Typography className='setting-caption' variant="caption" gutterBottom>Select which option your customer pays</Typography>
                            <div className='two-part'>
                                <Box className='sele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Flat Rate</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>Offer your customers a flat-rate carbon offset amount to opt-in to</Typography>
                                </Box>
                                <Box className='desele'>
                                    <Typography className='setting-subtitle' variant="h6" gutterBottom>Carbon Calculation</Typography>
                                    <Typography className='box-caption' variant="caption" gutterBottom>Calculates each order's carbon footprint and offers exact amount for the customer to opt-in to</Typography>
                                </Box>
                            </div>
                        </Box>

                        <Box style={{marginTop: '50px'}}>
                            <FormGroup>


                                <FormControlLabel
                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                    label="Auto Fulfillment"
                                />
                                <Typography className='' variant="caption" gutterBottom>Enable Shopify to automatically mark the "Carbon Neutral Order" product from EcoCart as fulfilled.</Typography>
                                {/* <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography>Off</Typography>
                                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                    <Typography>On</Typography>
                                </Stack> */}
                            </FormGroup>
                        </Box>

                        <Button variant="contained" style={{ backgroundColor: '#65B1C6', color: '#FFFFFF', borderRadius: '50px', width: '100%', minHeight: '50px', marginTop: '50px' }} className="conferm-butot">Save Changes</Button>

                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h1>Settings / Store Details</h1>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Box>
        </>
    )
}
