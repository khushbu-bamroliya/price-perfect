import { Box, Button, Card, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import searchIcon from './Images/search-normal.png';
import moreIcon from "./Images/more.png"
import { DataGrid } from '@mui/x-data-grid';
import LinkIcon from "./Images/link-2.png"
import EyeIcon from "./Images/eye.png"
import avatar from "./Images/image.png"
import TrashIcon from "./Images/trash.png"
import { NavLink } from 'react-router-dom';

const YourTests = () => {
    const pages = ['Active', 'Upcoming', 'Ended', 'Paused'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const rows = [
        { id: 1, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Jon', action: 35, price: "56 USD" },
        { id: 2, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Cersei', action: 42, price: "56 USD" },
        { id: 3, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Jaime', action: 45, price: "56 USD" },
        { id: 4, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Arya', action: 16, price: "56 USD" },
        { id: 5, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Daenerys', action: null, price: "56 USD" },
        { id: 6, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: null, action: 150, price: "56 USD" },
        { id: 7, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Ferrara', action: 44, price: "56 USD" },
        { id: 8, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Rossini', action: 36, price: "56 USD" },
        { id: 9, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Harvey', action: 65, price: "56 USD" },
    ];
    const columns = [
        {
            field: 'images',
            headerName: 'Product',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <div className='tableImages'>
                            <div>
                                <img src={avatar} alt='' />
                            </div>
                        </div>
                        <p className='productID'>
                            {params.row.images}
                        </p>
                    </>
                )
            }
        },


        {
            field: 'Description',
            headerName: 'Test',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'price',
            headerName: 'Status',
            width: 250,
            sortable: false,
            flex: 0.2,

        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 250,
            sortable: false,
            flex: 0.2,

        },
        {
            field: 'action',
            headerName: 'Action',
            type: "number",
            width: 150,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                console.log("params: " + params);
                return (
                    <div className='actionIcon'>
                         <NavLink to="/managetest"><img src={EyeIcon} alt="" /></NavLink> 
                        <img src={LinkIcon} alt="" />
                        <img src={TrashIcon} alt="" />
                    </div>
                )
            }
        },
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 250,
        //     type: 'number',
        //     valueGetter: (params) => console.log("params", params)
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];
    return (
        <>
            <Card className='yourTestsPage'>
                <div className='yourTests-main'>
                    <Navbar />
                    <Card className='yourTestBlock'>
                        <div>
                            <div className='yourTest-Block1'>
                                <Typography variant='h5'>Your Tests</Typography>
                                <Typography variant='p'>Manage your current and past tests </Typography>
                            </div>

                            <Box className='yourTest-Block3' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                            <div className='yourTest-Block2'>
                                <img src={searchIcon} alt="" />
                                <TextField id="outlined-basic" placeholder="search" variant="outlined" />
                                {/* <Button variant="outlined">
                                    <NavLink to="/home">
                                        Next
                                    </NavLink>
                                </Button> */}
                            </div>
                            <Box className='yourTest-Block3' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <img src={moreIcon} alt="" />
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
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </div>
                        <div className='createTestTable' style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableColumnMenu
                            />
                        </div>
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default YourTests