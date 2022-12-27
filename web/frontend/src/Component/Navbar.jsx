import { BottomNavigation, BottomNavigationAction, Card, Typography } from '@mui/material';
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import logo from "../../src/Component/Images/Group 48.png"
// import "../../Styles/MUI_CSS/Nav.css"
import arrowDown from "../../src/Component/Images/arrow-down.png"
import avatar from "../../src/Component/Images/image.png"
import home from "../../src/Component/Images/home.png"
import note from "../../src/Component/Images/note-favorite.png"
import { useState } from 'react';

const Navbar = () => {
    const [value, setValue] = useState(0);
    return (
        <>
            <Card className='navMain'>
                <div className='navBlock1'>

                    <img src={logo} alt="" />
                </div>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    className="navBlock2"
                >
                    <BottomNavigationAction label=<div className='menuItem menuColor'><img src={home}/><span>Home</span></div> />
                    <BottomNavigationAction label=<div className='menuItem'><img src={note}/><span>Your Tests</span></div> />
                    <BottomNavigationAction label=<div className='menuItem'><img src={note}/><span>Create Test</span></div>  />
                </BottomNavigation>

                <div className='navBlock3'>
                    <div>
                        <img src={avatar} alt="" />
                    </div>
                    <Typography variant='p'>Alexander</Typography>
                    <img src={arrowDown} alt="" />
                </div>
            </Card>
        </>
    )
}

export default Navbar