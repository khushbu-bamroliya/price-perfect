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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
//   import faker from 'faker';

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
            duration: `${i?.testCases[0]?.variants[0]?.variantPrice}${" "+i?.currency}`,
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
                        <div className={`tableImages ${params.row.images ? "imagesIcontable" : "HideIcontable"}`}>
                            <div className={`${params.row.images ? "imageParamstable" : "hideIconParamstable"}`}>
                                {params.row.featuredImage ? <img src={params.row.featuredImage} alt='' /> : <HideImageOutlinedIcon />}
                            </div>
                        </div>
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
            field: 'duration',
            headerName: 'Rev. Per 100 Visitors',
            width: 250,
            sortable: false,
            flex: 0.2,
            align:'center',
            headerAlign:'center'

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            sortable: false,
            flex: 0.2,
            align:'center',
            headerAlign:'center',
            renderCell: (params) => (<>
                <Chip className={`chip_${params.row.status}`} label={params.row.status} />
            </>)
        },
        {
            field: 'action',
            headerName: 'Action',
            type: "number",
            width: 150,
            sortable: false,
            flex: 0.2,
            align:'center',
            headerAlign:'center',
            renderCell: (params) => {
                return (
                    <div className='actionIcon'>
                        <><img src={EyeIcon} alt="" onClick={(e) => { e.stopPropagation(); navigate('/managetest', { state: { id: params.row.action } }) }} /></>
                        {/* <div onClick={(e) => {e.stopPropagation(); navigate('/managetest', {state:{id:params.row.action}} ) }} ><img src={EyeIcon} alt="" /></div> */}
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
                "Authorization": "Bearer " + cookieReader('token')
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
                "Authorization": "Bearer " + cookieReader('token')

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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data:  [21,32,744,55,656,235,1006],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [568,786,365,454,210,102,42],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
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
                            <h2 className='homeTitle'>
                                Your Dashboard
                            </h2>
                        </div>
                        <div className="dailyStats">
                            <Card>
                                <div className='dailyStatsBlock1'>
                                    <div>
                                        <Card>
                                            <img src={statIcon3} alt="" width='50px' />
                                        </Card>
                                        <Typography variant='p'>Today???s <span>Visitors</span></Typography>
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
                                        <Typography variant='h4'>  Rs. 3,401.89 </Typography>
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
                                    <h4 className='yourTestsTitle mb-36 ml-0'>Test Analytics</h4>
                                    <Line options={options} data={data} />
                                    <div className='analyticsBtnGroup'>
                                        <Button><img src={TestAnalyticsIcon1} alt="" /> <p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon2} alt="" /><p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon3} alt="" /><p>Lorem ipsum</p></Button>
                                        <Button><img src={TestAnalyticsIcon4} alt="" /><p>Lorem ipsum</p></Button>
                                    </div>
                                </div>
                            </Card>
                            <Card className='yourTests'>
                                    <h4 className='yourTestsTitle'>Your Tests:</h4>
                                <div>
                                    <div className='createTestTable dashboardTable mt-0'>
                                        {loading ? <Loader size={40} /> : (<>
                                            <DataGrid
                                                rows={rows2}
                                                columns={columns}
                                                pageSize={10}
                                                rowsPerPageOptions={[10]}
                                                disableColumnMenu
                                                hideFooterSelectedRowCount
                                                onRowClick={(params) => navigate(`/managetest`, { state: { id: params.row.action } })}
                                                className='pagenate-page table-height'
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