import { Alert, Box, Button, Card, Chip, IconButton, Menu, MenuItem, Modal, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import searchIcon from './Images/search-normal.png';
import moreIcon from "./Images/more.png"
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import LinkIcon from "./Images/link-2.png"
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

  const [opens, setOpens] = useState(false);
  const [snackbar_msg, setsnackbar_msg] = useState("");
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
    const rows = [
        { id: 1, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Jon', action: 35, price: "56 USD", },
        { id: 2, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Cersei', action: 42, price: "56 USD", },
        { id: 3, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Jaime', action: 45, price: "56 USD", },
        { id: 4, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Arya', action: 16, price: "56 USD", },
        { id: 5, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Daenerys', action: null, price: "56 USD", },
        { id: 6, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: null, action: 150, price: "56 USD", },
        { id: 7, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Ferrara', action: 44, price: "56 USD", },
        { id: 8, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Rossini', action: 36, price: "56 USD", },
        { id: 9, images: "#987546", duration: "2500 USD", Description: 'Lorem ipsum ', Product: 'Harvey', action: 65, price: "56 USD", },
    ];
    const columns = [
        {
            field: 'featuredImage',
            headerName: 'Image',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <div className='tableImages'>
                            <div>
                            {params.row.featuredImage ? <img src={params.row.featuredImage } alt='' />:<HideImageOutlinedIcon/> }
                            
                                
                            </div>
                        </div>
                        <p className='productID'>
                        </p>
                    </>
                )
            }
        },


        {
            field: 'product',
            headerName: 'Test Product',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => (<>
                <Chip className={`chip_${params.row.status}`} label={params.row.status} />
            </>)
        },
        {
            field: 'duration',
            headerName: 'Price',
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
                // console.log("params: " + params.row.action);
                return (
                    <div className='actionIcon'>
                        <NavLink to={`/managetest/${params.row.action}`} onClick={(e) => e.stopPropagation()} ><img src={EyeIcon} alt="" /></NavLink>
                        <Tooltip title={copiedTooltip ? "copied" : null }  arrow>

                        <img src={LinkIcon} alt="" onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(params.row.handle)
                            setCopiedTooltip(true)
                            setInterval(() => {
                            setCopiedTooltip(false)

                            },2000)
                        }}
                        />
                        </Tooltip>
                        <img src={TrashIcon} alt="" onClick={(event) => handleOpenDeleteModal(event, params.row.id)} />
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
    // const columns = [
    //     {
    //         field: 'images',
    //         headerName: 'Product',
    //         width: 250,
    //         sortable: false,
    //         flex: 0.3,
    //         renderCell: (params) => {
    //             return (
    //                 <>
    //                     <div className='tableImages'>
    //                         <div>
    //                             <img src={avatar} alt='' />
    //                         </div>
    //                     </div>
    //                     <p className='productID'>
    //                         {params.row.images}
    //                     </p>
    //                 </>
    //             )
    //         }
    //     },


    //     {
    //         field: 'Description',
    //         headerName: 'Test',
    //         width: 500,
    //         sortable: false,
    //         flex: 0.3
    //     },
    //     {
    //         field: 'price',
    //         headerName: 'Status',
    //         width: 250,
    //         sortable: false,
    //         flex: 0.2,

    //     },
    //     {
    //         field: 'duration',
    //         headerName: 'Duration',
    //         width: 250,
    //         sortable: false,
    //         flex: 0.2,

    //     },
    //     {
    //         field: 'action',
    //         headerName: 'Action',
    //         type: "number",
    //         width: 150,
    //         sortable: false,
    //         flex: 0.2,
    //         renderCell: (params) => {
    //             console.log("params: " + params);
    //             return (
    //                 <div className='actionIcon'>
    //                      <NavLink to="/managetest"><img src={EyeIcon} alt="" /></NavLink> 
    //                     <img src={LinkIcon} alt="" />
    //                     <img src={TrashIcon} alt="" />
    //                 </div>
    //             )
    //         }
    //     },
    //     // {
    //     //     field: 'fullName',
    //     //     headerName: 'Full name',
    //     //     description: 'This column has a value getter and is not sortable.',
    //     //     sortable: false,
    //     //     width: 250,
    //     //     type: 'number',
    //     //     valueGetter: (params) => console.log("params", params)
    //     //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
    //     // },
    // ];
    allTests && allTests.data.map((i) => {
        rows2.push({
            id: i._id,
            status: i.status,
            duration: `${i.currency} ${i?.testCases[0]?.variants[0]?.variantPrice}`,
            action: i._id,
            product: i.productTitle,
            featuredImage: i.featuredImage,
            handle: i.handle
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
                'shop': cookieReader('shop')
            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                console.log("apiRes.data", apiRes);
                setAllTests(apiRes)
            })
            .catch((error) => console.log("Error", error))
    }
    const deleteTestCase = () => {
        setLoading(true)
        console.log("deleting");
        fetch(getApiUrl + `/api/deleteTestCase/${testId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop')
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setLoading(false)
            setOpenDeleteModal(false)
            setOpens(true)
            setsnackbar_msg("Test deleted successfully")
            getAllTests()

        }).catch((err) => {
            setOpens(true)
            setsnackbar_msg("Error in deleting test")
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
              sx={{ width: "50%", bgcolor: "#325240" }}
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
        }else{
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
                                <Typography variant='h5'>Your Tests</Typography>
                                <Typography variant='p'>Manage your current and past tests </Typography>
                            </div>

                            <Box className='yourTest-Block3' sx={{ flexGrow: 1, display: "flex" }}>
                                {/* {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))} */}
                                <Button disabled
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                    All Tests
                                    </Button>
                                {/* <Typography variant='p' sx={{ my: 2, display: 'block' }}>All Tests</Typography> */}
                            </Box>
                            <div className='yourTest-Block2'>
                                <img src={searchIcon} alt="" />
                                <TextField id="outlined-basic" placeholder="search" variant="outlined" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
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
                            {!allTests ? <Loader size={40} /> : (<>

                                <DataGrid
                                    className='pagenate-page'
                                    rows={rows2}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    disableColumnMenu={true}
                                    onRowClick={(params) => navigate(`/managetest/${params.row.action}`)}
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

                                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography> */}
                                <div className='close-icon'>
                                    <img src={closeIcon} alt="" onClick={() => setOpenDeleteModal(false)} />
                                </div>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Are you sure you want to delete this test case?
                                </Typography>
                                <Button className='deleteTestCaseBtn' onClick={() => deleteTestCase(testId)}> {loading ? <Loader size={30}/>: "Delete"} </Button>

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