import { Alert, Box, Button, Card, Chip, IconButton, Menu, MenuItem, Modal, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import searchIcon from './Images/search-normal.png';
import moreIcon from "./Images/more.png"
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import LinkIcon from "./Images/link-2.png"
import copyGrey from "./Images/copyGrey.png";
import EyeIcon from "./Images/eye.png"
import avatar from "./Images/image.png"
import TrashIcon from "./Images/trash.png"
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import getApiUrl from "../controller/utils.js";
import Loader from './Loader';
import cookieReader from '../controller/cookieReader';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import closeIcon from "../Component/Images/close-circle.png"


const YourTests = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const pages = ['Active', 'Upcoming', 'Ended', 'Paused'];
    const location = useLocation()
    const navigate = useNavigate()

    // const [activeTests, setActiveTests] = useState(false);
    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [loading, setLoading] = useState(false)
    const [copiedTooltip, setCopiedTooltip] = useState(false)
    const [searchData, setSearchData] = useState("");
    console.log("searchData", searchData);
    const [allTests, setAllTests] = useState();
    const [testId, setTestId] = useState();
    console.log("allTests", allTests);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = (event, id) => {
        event.stopPropagation();
        console.log("deleteModal id", id);
        setTestId(id)
        setOpenDeleteModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const rows2 = []
    const columns = [
        {
            field: 'featuredImage',
            headerName: 'Product',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <div className='tableImages'>
                            <div>
                                {params.row.featuredImage ? <img src={params.row.featuredImage} alt='' /> : <HideImageOutlinedIcon />}
                            </div>
                        </div>
                        <p className='productID'>
                        {params.row.product}
                        </p>
                    </>
                )
            }
        },
        {
            field: 'activeTests',
            headerName: 'Active Tests',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'controlRPM',
            headerName: 'ControlRPM',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'bestRPM',
            headerName: 'BestRPM',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'bestvscontrol',
            headerName: 'BestRPM vs Control',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        // {
        //     field: 'product',
        //     headerName: 'Test Product',
        //     width: 500,
        //     sortable: false,
        //     flex: 0.3
        // },
        // {
        //     field: 'status',
        //     headerName: 'Status',
        //     width: 250,
        //     sortable: false,
        //     flex: 0.2,
        //     renderCell: (params) => (<>
        //         <Chip className={`chip_${params.row.status}`} label={params.row.status} />
        //     </>)
        // },
        // {
        //     field: 'duration',
        //     headerName: 'Price',
        //     width: 250,
        //     sortable: false,
        //     flex: 0.2,

        // },
        {
            field: 'action',
            headerName: 'Action',
            type: "number",
            width: 150,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <div className='actionIcon'>
                        <><img src={EyeIcon} alt="" onClick={(e) => {
                            e.stopPropagation();
                            navigate('/managetest', {
                                state: {
                                    id: params.row.action,
                                }
                            })
                        }}
                        /></>
                        {/* <div onClick={(e) => {e.stopPropagation(); navigate('/managetest', {state:{id:params.row.action}} ) }} ><img src={EyeIcon} alt="" /></div> */}
                        <Tooltip title={copiedTooltip ? "copied" : null} arrow>
                            <img src={copyGrey} alt="" onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(params.row.handle)
                                setCopiedTooltip(true)
                                setInterval(() => {
                                    setCopiedTooltip(false)
                                }, 2000)
                            }}
                            />
                        </Tooltip>
                        <img src={TrashIcon} alt="" onClick={(event) => handleOpenDeleteModal(event, params.row.id)} />
                    </div>
                )
            }
        },
    ];
    allTests && allTests.data.map((i) => {
        rows2.push({
            id: i._id,
            status: i.status,
            duration: `${i.currency} ${i?.testCases[0]?.variants[0]?.variantPrice}`,
            action: i._id,
            product: i.productTitle,
            featuredImage: i.featuredImage,
            handle: i.handle,
            activeTests:i.activeTests,
            bestRPM:'-',
            controlRPM:'-',
            bestvscontrol:'-',
        })
    }

    )
    const getAllTests = async () => {

        fetch(getApiUrl + '/api/getTestCase?' + new URLSearchParams({
            search: searchData
        }), {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')
            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                console.log("apiRes.data", apiRes);
                setAllTests(apiRes)

                // var temp = 0;
                // for (let i = 0; i < apiRes?.data.length; i++) {
                    
                    // for (let j = 0; j < apiRes?.data[i]?.testCases.length; j++) {
                    //     // console.log("Hello........", j);
                    //     // for (let j = 0; j < apiRes?.data?.testCases[i].variants.length; j++) {
                    //     if (apiRes?.data[i]?.testCases[i]?.status == 'active') {
                    //         temp = temp + 1
                    //         console.log("temp", temp);
                    //     }
                    // }
                //     setActiveTests(temp)
                // }

            })
            .catch((error) => {
                console.log("Error", error)
                setOpens(true)
                setSnackbarColor('red')
                setsnackbar_msg("Server error")
                setLoading('false')
            })
    }
    const deleteTestCase = () => {
        setLoading(true)
        console.log("deleting", testId);
        fetch(getApiUrl + `/api/deleteTestCase/${testId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')

            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setLoading(false)
            setOpenDeleteModal(false)
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Test deleted successfully")
            getAllTests()

        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error in deleting test")
            setLoading(false)
            console.log("Error", err);
        })
    }
    const handleClose = () => {
        setOpens(false);
    };
    const errorfunction = () => {
        return (<div>
            <Snackbar
                open={opens}
                sx={{ width: "50%" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    sx={{ width: "50%", bgcolor: snackbarColor }}
                >
                    {snackbar_msg}
                </Alert>
            </Snackbar>
        </div>)

    };

    useEffect(() => {
        if (location?.state?.message) {
            setOpens(true)
            setsnackbar_msg(location.state.message)
        } else {
            setOpens(false)
        }
        getAllTests()
    }, [searchData])
    return (
        <>
            <Card className='yourTestsPage'>
                <div className='yourTests-main'>
                    <Navbar />
                    <Card className='yourTestBlock'>
                        <div>
                            <div className='yourTest-Block1'>
                                <Typography variant='h5'>Tests By Product</Typography>
                                <Typography variant='p'>Manage your current and past tests </Typography>
                            </div>

                            <Box className='yourTest-Block3' sx={{ flexGrow: 1, display: "flex" }}>

                                <Button disabled
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    All Tests
                                </Button>
                            </Box>
                            <div className='yourTest-Block2'>
                                <img src={searchIcon} alt="" />
                                <TextField id="outlined-basic" placeholder="search" variant="outlined" value={searchData} onChange={(e) => setSearchData(e.target.value)} />

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
                            {!allTests ? <Loader size={40} /> : (<>

                                <DataGrid
                                    className='pagenate-page'
                                    rows={rows2}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableColumnMenu={true}
                                    // onRowClick={(params) => navigate(`/managetest/${params.row.action}`,{state:{id:params.row.action}})}
                                    onRowClick={(params) => navigate(`/managetest`, { state: { id: params.row.action } })}
                                    sx={{
                                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                    }}
                                />
                            </>)}

                        </div>

                        <Modal
                            open={openDeleteModal}
                            onClose={handleCloseDeleteModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style} className="configureTest1">
                                <div className='close-icon'>
                                    <img src={closeIcon} alt="" onClick={() => setOpenDeleteModal(false)} />
                                </div>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Are you sure you want to delete this test case?
                                </Typography>
                                <Button className='deleteTestCaseBtn' onClick={() => deleteTestCase(testId)}> {loading ? <Loader size={20} /> : "Delete"} </Button>

                            </Box>
                        </Modal>
                    </Card>
                </div>
                <div>{errorfunction()}</div>
            </Card>
        </>
    )
}

export default YourTests