
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




const Navbar = () => {

    const pages = [

        <div className='navIcons'><NavLink to="/homeDashboard">
            <svg className='colored' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.0943 7.3425L13.0901 2.53916C11.9168 1.60416 10.0835 1.595 8.91929 2.53L2.91513 7.3425C2.05346 8.03 1.53096 9.405 1.7143 10.4867L2.8693 17.3983C3.13513 18.9475 4.5743 20.1667 6.1418 20.1667H15.8585C17.4076 20.1667 18.8743 18.92 19.1401 17.3892L20.2951 10.4775C20.4601 9.405 19.9376 8.03 19.0943 7.3425ZM11.6876 16.5C11.6876 16.8758 11.376 17.1875 11.0001 17.1875C10.6243 17.1875 10.3126 16.8758 10.3126 16.5V13.75C10.3126 13.3742 10.6243 13.0625 11.0001 13.0625C11.376 13.0625 11.6876 13.3742 11.6876 13.75V16.5Z" fill="url(#paint0_linear_252_15328)" />
                <defs>
                    <linearGradient id="paint0_linear_252_15328" x1="-3.78474" y1="1.83331" x2="25.6826" y2="7.37111" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                </defs>
            </svg><span>Home</span></NavLink></div>,
        <div className='navIcons'><NavLink to="/yourtests">
            <svg className='colored' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.841 1.83325H7.15933C3.82266 1.83325 1.8335 3.82242 1.8335 7.15909V14.8408C1.8335 18.1774 3.82266 20.1666 7.15933 20.1666H14.841C18.1777 20.1666 20.1668 18.1774 20.1668 14.8408V7.15909C20.1668 3.82242 18.1777 1.83325 14.841 1.83325ZM9.13933 13.6583L7.07683 15.7208C6.93933 15.8583 6.76516 15.9224 6.591 15.9224C6.41683 15.9224 6.2335 15.8583 6.10516 15.7208L5.41766 15.0333C5.14266 14.7674 5.14266 14.3274 5.41766 14.0616C5.6835 13.7958 6.11433 13.7958 6.38933 14.0616L6.591 14.2633L8.16766 12.6866C8.4335 12.4208 8.86433 12.4208 9.13933 12.6866C9.40516 12.9524 9.40516 13.3924 9.13933 13.6583ZM9.13933 7.24159L7.07683 9.30409C6.93933 9.44159 6.76516 9.50575 6.591 9.50575C6.41683 9.50575 6.2335 9.44159 6.10516 9.30409L5.41766 8.61659C5.14266 8.35075 5.14266 7.91075 5.41766 7.64492C5.6835 7.37909 6.11433 7.37909 6.38933 7.64492L6.591 7.84659L8.16766 6.26992C8.4335 6.00409 8.86433 6.00409 9.13933 6.26992C9.40516 6.53575 9.40516 6.97575 9.13933 7.24159ZM16.0968 15.2349H11.2843C10.9085 15.2349 10.5968 14.9233 10.5968 14.5474C10.5968 14.1716 10.9085 13.8599 11.2843 13.8599H16.0968C16.4818 13.8599 16.7843 14.1716 16.7843 14.5474C16.7843 14.9233 16.4818 15.2349 16.0968 15.2349ZM16.0968 8.81825H11.2843C10.9085 8.81825 10.5968 8.50659 10.5968 8.13075C10.5968 7.75492 10.9085 7.44325 11.2843 7.44325H16.0968C16.4818 7.44325 16.7843 7.75492 16.7843 8.13075C16.7843 8.50659 16.4818 8.81825 16.0968 8.81825Z" fill="url(#paint0_linear_252_15891)" />
                <defs>
                    <linearGradient id="paint0_linear_252_15891" x1="-3.53687" y1="1.83325" x2="25.4667" y2="7.19199" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                </defs>
            </svg>
            <span>Your Tests</span></NavLink></div>,
        <div className='navIcons'><NavLink to="/createtest">
            <svg className='colored' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.104 3.20825V1.83325C7.104 1.45742 6.79234 1.14575 6.4165 1.14575C6.04067 1.14575 5.729 1.45742 5.729 1.83325V3.26325C5.95817 3.23575 6.169 3.20825 6.4165 3.20825H7.104Z" fill="url(#paint0_linear_252_15649)" />
                <path d="M14.4375 3.26325V1.83325C14.4375 1.45742 14.1258 1.14575 13.75 1.14575C13.3742 1.14575 13.0625 1.45742 13.0625 1.83325V3.20825H13.75C13.9975 3.20825 14.2083 3.23575 14.4375 3.26325Z" fill="url(#paint1_linear_252_15649)" />
                <path d="M19.516 13.7224C18.8102 13.1633 17.921 12.8333 16.9585 12.8333C15.996 12.8333 15.0885 13.1724 14.3827 13.7408C13.4293 14.4924 12.8335 15.6658 12.8335 16.9583C12.8335 17.7283 13.0535 18.4708 13.4293 19.0758C13.7227 19.5524 14.0985 19.9741 14.5477 20.2949C15.226 20.7899 16.051 21.0833 16.9585 21.0833C18.0035 21.0833 18.9477 20.6983 19.6718 20.0566C19.9927 19.7908 20.2677 19.4608 20.4877 19.0849C20.8635 18.4708 21.0835 17.7283 21.0835 16.9583C21.0835 15.6474 20.4693 14.4741 19.516 13.7224ZM16.9585 18.9199C16.9585 17.8383 16.0785 16.9583 14.9968 16.9583C16.0785 16.9583 16.9585 16.0783 16.9585 14.9966C16.9585 16.0783 17.8385 16.9583 18.9202 16.9583C17.8385 16.9583 16.9585 17.8383 16.9585 18.9199Z" fill="url(#paint2_linear_252_15649)" />
                <path d="M14.4377 3.26325V4.58325C14.4377 4.95909 14.126 5.27075 13.7502 5.27075C13.3743 5.27075 13.0627 4.95909 13.0627 4.58325V3.20825H7.10433V4.58325C7.10433 4.95909 6.79266 5.27075 6.41683 5.27075C6.041 5.27075 5.72933 4.95909 5.72933 4.58325V3.26325C3.02516 3.51075 1.8335 5.25242 1.8335 7.79159V15.5833C1.8335 18.3333 3.2085 20.1666 6.41683 20.1666H10.2027C10.8993 20.1666 11.3668 19.3874 11.1927 18.7091C11.0643 18.2141 11.0002 17.7008 11.0002 17.1874C11.0002 15.2808 11.8527 13.5208 13.3285 12.3566C14.401 11.4858 15.776 10.9999 17.1877 10.9999H17.2243C17.8018 10.9999 18.3335 10.5783 18.3335 10.0008V7.79159C18.3335 5.25242 17.1418 3.51075 14.4377 3.26325ZM8.25016 15.3541H6.41683C6.041 15.3541 5.72933 15.0424 5.72933 14.6666C5.72933 14.2908 6.041 13.9791 6.41683 13.9791H8.25016C8.626 13.9791 8.93766 14.2908 8.93766 14.6666C8.93766 15.0424 8.626 15.3541 8.25016 15.3541ZM11.0002 10.7708H6.41683C6.041 10.7708 5.72933 10.4591 5.72933 10.0833C5.72933 9.70742 6.041 9.39575 6.41683 9.39575H11.0002C11.376 9.39575 11.6877 9.70742 11.6877 10.0833C11.6877 10.4591 11.376 10.7708 11.0002 10.7708Z" fill="url(#paint3_linear_252_15649)" />
                <defs>
                    <linearGradient id="paint0_linear_252_15649" x1="5.32623" y1="1.14575" x2="7.54383" y2="1.41181" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_252_15649" x1="12.6597" y1="1.14575" x2="14.8773" y2="1.41181" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_252_15649" x1="10.4168" y1="12.8333" x2="23.4684" y2="15.2447" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                    <linearGradient id="paint3_linear_252_15649" x1="-2.99984" y1="3.20825" x2="23.1494" y2="7.90904" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8FD2" />
                        <stop offset="1" stop-color="#F42272" />
                    </linearGradient>
                </defs>
            </svg>

            <span>Create Test</span></NavLink></div>,

    ];
//     setTimeout(() => {
//         var element = document.getElementById("create");
// console.log("element", element);
//         if (window.location.href.indexOf("createtest2") > -1) {
//             element.classList.add("activated");
//         }else{
//               element.classList.remove("activated");
    
//           }
//     },200)
    const settings = [

    <Button> <NavLink to="/profile">Profile</NavLink> </Button>,
    <Button onClick={() => handleGoogleLogout()}> <NavLink to="#">Logout</NavLink> </Button>,
    // <Button> <NavLink to="/managetest">View/Manage Test</NavLink> </Button>,
    // <Button onClick={() => handleGoogleLogout()}> Logout </Button>,

    ];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        // navigate('/profile')
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
// if (window.location.href.indexOf('/createtest')) {
//     console.log("Hello");
// }
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
                            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                            {/* <img className='logo' src={logo} alt="" /> */}
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
                                    {/* <MenuIcon /> */}
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
                                
                                <Tooltip title="Open settings" sx={{ padding: 0 }}>
                                    <IconButton className='NavRight' onClick={handleOpenUserMenu}>
                                        <Avatar className='avaratIcon' alt="Remy Sharp" src={avatarIcon} sx={{ width: "38px", height: "38px", }} />
                                        <Typography variant='p'>Alaxander</Typography>
                                        <img src={arrowDown} alt="" />
                                    </IconButton>
                                </Tooltip>
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