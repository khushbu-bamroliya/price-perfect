import { Alert, Box, Button, Card, Chip, Modal, Snackbar, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import statIcon1 from "./Images/Clock.png"
import statIcon2 from "./Images/Activity.png"
import statIcon3 from "./Images/Graph.png"
import moreIcon from "./Images/more.svg"
import arrowUp from "./Images/arrow-up.png"
import arrowDown from "./Images/arrow-down 2.png"
import TestAnalyticsIcon1 from "./Images/Frame 26.png"
import TestAnalyticsIcon2 from "./Images/Frame 26 2.png"
import TestAnalyticsIcon3 from "./Images/Frame 26 3.png"
import TestAnalyticsIcon4 from "./Images/Frame 26 4.png"
import Navbar from './Navbar'
import getApiUrl from "../controller/utils.js";
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import LinkIcon from "./Images/link-2.png"
import EyeIcon from "./Images/eye.png"
import avatar from "./Images/image.png"
import TrashIcon from "./Images/trash.png"
import Loader from './Loader'
import cookieReader from '../controller/cookieReader'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';


const HomeDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [opens, setOpens] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [allTests, setAllTests] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [testId, setTestId] = useState();
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
    const rows2 = [];
    allTests && allTests.data.map((i) => {
        rows2.push({
            id: i._id,
            status: i.status,
            duration: `${i?.testCases[0]?.variants[0]?.variantPrice}USD`,
            action: i._id,
            product: i.productTitle,
            featuredImage: i.featuredImage
        })
    })
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
                            {params.row.featuredImage ?<img src={params.row.featuredImage} alt='' />:<HideImageOutlinedIcon />}
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
            headerName: 'Test',
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
                return (
                    <div className='actionIcon'>
                        <div onClick={(e) => {e.stopPropagation(); navigate('/managetest', {state:{id:params.row.action}} ) }} ><img src={EyeIcon} alt="" /></div>
                    </div>
                )
            }
        },

    ];
    const getAllTests = async () => {
        setLoading(true)
        fetch(getApiUrl + '/api/getTestCase', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization":"Bearer " + cookieReader('token')
            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                console.log("apiRes.data", apiRes);
                setAllTests(apiRes)
                setLoading(false)
            })
            .catch((error) => {
                setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Internal Server Error")
                setLoading(false)
                console.log("Error", error)
            })
    }
    const handleOpenDeleteModal = (id) => {
        console.log("deleteModal id", id);
        setTestId(id)
        setOpenDeleteModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const deleteTestCase = () => {
        console.log("deleting", testId);
        fetch(getApiUrl + `/api/deleteTestCase/${testId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization":"Bearer " + cookieReader('token')
            
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setOpenDeleteModal(false)
            getAllTests()

        }).catch((err) => {
            console.log("Error", err);
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Internal Server Error")
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
        getAllTests()
        if (location?.state?.message) {
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg(location.state.message)
        } else {
            setOpens(false)
        }

    }, [])
    return (
        <>
            <Card className='homeDashboard'>
                <div className='homeDashboard-main'>

                    <Navbar />

                    <div className='dashboardBlock' >
                        <div className='dashboardTitle'>
                            <Typography className='' variant='p'>
                                Your Dashboard
                            </Typography>
                        </div>
                        <div className="dailyStats">
                            <Card>
                                <div className='dailyStatsBlock1'>
                                    <div>
                                        <Card>

                                            <img src={statIcon3} alt="" width='50px' />
                                        </Card>
                                        <Typography variant='p'>Today’s <span>Visitors</span></Typography>
                                    </div>
                                    <div className='moreIcon'>
                                        <img src={moreIcon} alt="" />
                                    </div>
                                </div>
                                <div className="dailyStatsBlock2">
                                    <div className='dailyStatsBlock2-sub1'>
                                        <Typography variant='h4'> 5,432</Typography>
                                    </div>
                                    <hr />
                                    <div className='dailyStatsBlock2-sub2'>
                                        <Typography variant='p'>Daily change:</Typography>

                                        <div>
                                            <img src={arrowUp} alt="" />

                                            <Typography variant='h4'> 12%</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className='dailyStatsBlock1'>
                                    <div>
                                        <Card>

                                            <img src={statIcon1} alt="" width='50px' />
                                        </Card>
                                        <Typography variant='p'>PricePerfect <span>Revenue</span></Typography>
                                    </div>
                                    <div className='moreIcon'>
                                        <img src={moreIcon} alt="" />
                                    </div>
                                </div>
                                <div className="dailyStatsBlock2 ">
                                    <div className='dailyStatsBlock2-sub1 revenue'>
                                        <Typography variant='h4'>  $3,401.89 </Typography>
                                    </div>
                                    <hr />
                                    <div className='dailyStatsBlock2-sub2'>
                                        <Typography variant='p'>Daily change:</Typography>

                                        <div>
                                            <img src={arrowDown} alt="" />

                                            <Typography variant='h4' className='downArrow'> 20%</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className='dailyStatsBlock1'>
                                    <div>
                                        <Card>

                                            <img src={statIcon2} alt="" width='50px' />
                                        </Card>
                                        <Typography variant='p'>Revenue <span>Change</span></Typography>
                                    </div>
                                    <div className='moreIcon'>
                                        <img src={moreIcon} alt="" />
                                    </div>
                                </div>
                                <div className="dailyStatsBlock2">
                                    <div className='dailyStatsBlock2-sub1 changeRevenue'>
                                        <Typography variant='h4'>+6%</Typography>
                                    </div>
                                    <hr />
                                    <div className='dailyStatsBlock2-sub2'>
                                        <Typography variant='p'>Daily change:</Typography>

                                        <div>
                                            <img src={arrowUp} alt="" />

                                            <Typography variant='h4'> 23%</Typography>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='analyticsSection'>
                
                            <Card className='testAnalytics'>
                                <div>
                                    <Typography variant='h5'>Test Analytics</Typography>
                                    <div className='analyticsBtnGroup'>
                                        <Button><img src={TestAnalyticsIcon1} alt="" /> <p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon2} alt="" /><p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon3} alt="" /><p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon4} alt="" /><p>Lorem ipsum</p></Button>
                                    </div>
                                </div>
                            </Card>
                            <Card className='yourTests'>
                                <div>
                                    <Typography variant='h5'>Your Tests</Typography>
                                </div>
                                <div>
                                    <div className='createTestTable' style={{ height: 360, width: '100%' }}>
                                        {loading ? <Loader size={40} /> : (<>

                                            <DataGrid
                                                rows={rows2}
                                                columns={columns}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                disableColumnMenu
                                                hideFooterSelectedRowCount
                                                onRowClick={(params) => navigate(`/managetest`, {state:{id:params.row.action}})}
                                    
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
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
                <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to delete this test case?..
                        </Typography>
                        <Button onClick={() => deleteTestCase(testId)}> Delete </Button>
                    </Box>
                </Modal>
            </Card>
            <div>{errorfunction()}</div>
        </>
    )
}

export default HomeDashboard