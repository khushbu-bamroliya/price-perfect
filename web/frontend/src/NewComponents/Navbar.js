
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from "./Images/Group 48.png";
import YourTestIcon from "./Images/task-square.png"
import CreateTestIcon from "./Images/note-favorite.png"
import avatarIcon from "./Images/image.png"
import arrowDown from "./Images/arrow-down.png"
import moreIcon from "./Images/more.svg"
import { NavLink } from 'react-router-dom';
import { handleGoogleLogout } from '../controller/handleGoogleSignIn';
import homeIcon from "./Images/home.png"
import  priceperfactimg from './Images/Main_logo.png';
import Home from './Images/home.svg';
import HomeStroke from './Images/home-stroke.svg';
import Note from './Images/note-favorite.svg';
import NoteStroke from './Images/note-favorite-stroke.svg';
import Task from './Images/task-square.svg';
import TaskStroke from './Images/task-square-stroke.svg';

const Navbar = () => {

    const pages = [

        <div className='navIcons'><NavLink to="/homeDashboard">
            <div className='colored'>
                <img className='absolute' src={Home} />
                <img className='stroke' src={HomeStroke} />
            </div>
            <span>Home</span></NavLink></div>,
        <div className='navIcons'><NavLink to="/yourtests">
            <div className='colored'>
                <img className='absolute' src={Task} />
                <img className='stroke' src={TaskStroke} />
            </div>
            <span>Your Tests </span></NavLink></div>,
        <div className='navIcons'><NavLink to="/createtest">
            <div className='colored'>
                <img className='absolute' src={Note} />
                <img className='stroke' src={NoteStroke} />
            </div>
            <span>Create Test</span></NavLink></div>,

    ];

    const settings = [

        <Button> <NavLink to="/profile">Profile</NavLink> </Button>,
        <Button onClick={() => handleGoogleLogout()}> <NavLink to="#">Logout</NavLink> </Button>,


    ];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (window.location.href.includes("createtest")) {
        console.log("Match found");
    }
    console.log(
        'jhgjhg', window.location.href.indexOf('/createtest')
    );
    return (
        <>
            <div className="navbar">
                <AppBar position="static">
                    <Container maxWidth="xl" sx={{ padding: "21px 24px", }}>
                        <Toolbar disableGutters sx={{ minHeight: "unset !important", }}>
                    
                            <div>
                                <img src={priceperfactimg} alt="" />
                            </div>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <img className='moreIconNav' src={moreIcon} alt="" />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            <Box className='NavCenterBtn' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "center" } }}>
                                {pages.map((page) => (
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }} className="navRightBlock">

                                    <IconButton className='NavRight' onClick={handleOpenUserMenu}>
                                        <Avatar className='avaratIcon' alt="Remy Sharp" src={avatarIcon} sx={{ width: "38px", height: "38px", }} />
                                        <Typography variant='p'>Alaxander</Typography>
                                        <img src={arrowDown} alt="" />
                                    </IconButton>
                    
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </>
    )
}

export default Navbar;