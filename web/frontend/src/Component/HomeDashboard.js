import { Box, Button, Card, Chip, Modal, Typography } from '@mui/material'
import React, { useState,useEffect } from 'react'
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
import { DataGrid } from '@mui/x-data-grid'
import { NavLink } from 'react-router-dom'
import LinkIcon from "./Images/link-2.png"
import EyeIcon from "./Images/eye.png"
import avatar from "./Images/image.png"
import TrashIcon from "./Images/trash.png"

const HomeDashboard = () => {
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
                                <img src={params.row.featuredImage} alt='' />
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
                // console.log("params: " + params.row.action);
                return (
                    <div className='actionIcon'>
                        <NavLink to={`/managetest/${params.row.action}`}><img src={EyeIcon} alt="" /></NavLink>
                        <img src={LinkIcon} alt="" />
                        <img src={TrashIcon} alt="" onClick={() => handleOpenDeleteModal(params.row.id)} />
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
    const getAllTests = async () => {



        fetch(getApiUrl + '/api/getTestCase', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                console.log("apiRes.data", apiRes);
                setAllTests(apiRes)
            })
            .catch((error) => console.log("Error", error))
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
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setOpenDeleteModal(false)
            getAllTests()
            
        }).catch((err) => {
            console.log("Error", err);
        })
    }
    useEffect(() => {
        getAllTests()
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

                                            <img src={statIcon3} alt="" />
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

                                            <img src={statIcon1} alt="" />
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

                                            <img src={statIcon2} alt="" />
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
                            {/* <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid className="test" item xs={3} sm={6} md={3} key={index}>
                                    <p>xs=2</p>
                                </Grid>
                            ))}
                        </Grid> */}

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
                                    <div className='createTestTable' style={{ height: 400, width: '100%' }}>

                                        <DataGrid
                                            rows={rows2}
                                            columns={columns}
                                            pageSize={50}
                                            rowsPerPageOptions={[50]}
                                            disableColumnMenu
                                        />

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
                                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography> */}
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Are you sure you want to delete this test case?..
                                </Typography>
                                <Button onClick={() => deleteTestCase(testId)}> Delete </Button>
                            </Box>
                        </Modal>
            </Card>

        </>
    )
}

export default HomeDashboard