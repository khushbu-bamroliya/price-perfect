import { Alert, Box, Button, Card, Chip, Modal, Snackbar, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import LinkIcon from "./Images/link-2.png"
import { DataGrid } from '@mui/x-data-grid'
import EyeIcon from "./Images/eye.png"
import TrashIcon from "./Images/trash.png"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import getApiUrl from "../controller/utils.js";
import Loader from './Loader'
import cookieReader from '../controller/cookieReader'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import closeIcon from "../Component/Images/close-circle.png"

const ViewOrManageTestPage = () => {
    const location = useLocation();
    // const {id} = location?.state;
    const [id, setId] = useState();


    console.log("location: " + JSON.stringify(location?.state));
    const [loading, setLoading] = useState(false);
    const [opens, setOpens] = useState(false);
    const [openTestStatusModal, setOpenTestStatusModal] = useState(false);

    const [snackbar_msg, setsnackbar_msg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [singleTest, setSingleTest] = useState()
    const [copiedTooltip, setCopiedTooltip] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const navigate = useNavigate();
    // const { id } = useParams();
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
    const getSingleTest = () => {

        fetch(getApiUrl + `/api/get-single-testcase/${location?.state?.id}`, {
            method: 'GET',
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
                setSingleTest(apiRes)

            })
            .catch((error) => {
                console.log("Error", error)
                setOpens(true)
                setSnackbarColor('red')
                setsnackbar_msg("Internal Server Error")
                setLoading(false)
        })
    }
    const deleteTestCase = (id) => {
        setLoading(true)
        console.log("deleting");
        fetch(getApiUrl + `/api/deleteTestCase/${id}`, {
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
            setLoading(false)
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Test deleted successfully.")
            setOpenDeleteModal(false)
            navigate('/yourtests', { state: { message: "Test deleted successfully" } });

        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while deleting Test")
            console.log("Error", err);
            setLoading(false)
        })
    }
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleTestStatusModal = () => setOpenTestStatusModal(false);
    const rows = [
        { id: 1, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Jon', Purchases: 35, price: "56 USD" },
        { id: 2, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Cersei', Purchases: 42, price: "56 USD" },
        { id: 3, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Jaime', Purchases: 45, price: "56 USD" },
        { id: 4, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Arya', Purchases: 16, price: "56 USD" },
        { id: 5, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Daenerys', Purchases: null, price: "56 USD" },
        { id: 6, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: null, Purchases: 150, price: "56 USD" },
        { id: 7, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Ferrara', Purchases: 44, price: "56 USD" },
        { id: 8, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Rossini', Purchases: 36, price: "56 USD" },
        { id: 9, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Harvey', Purchases: 65, price: "56 USD" },
    ];
    const columns = [
        {
            field: 'test',
            headerName: 'Test',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>

                        <p className='productID'>
                            {params.row.test}
                        </p>
                    </>
                )
            }
        },

        {
            field: 'visitors',
            headerName: 'Visitors',
            width: 250,
            sortable: false,
            flex: 0.2,

        },
        {
            field: 'addToCart',
            headerName: 'Add to Cart',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'initiateCheckout',
            headerName: 'Initiate Checkout',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'Purchases',
            headerName: 'Purchases',
            type: "number",
            width: 150,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <div className='actionIcon'>
                        <img src={EyeIcon} alt="" />
                        <img src={LinkIcon} alt="" />
                        <img src={TrashIcon} alt="" />
                    </div>
                )
            }
        },
        {
            field: 'revPerVisitor',
            headerName: 'Rev. Per 100 Visitors',
            width: 250,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.revPerVisitor}
                    </p>
                )
            }
        },
    ];

    const updateTestStatus = () => {
        setLoading(true)
        fetch(getApiUrl + `/api/updatetest?` + new URLSearchParams({
            id: location?.state?.id
        }), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization":"Bearer " + cookieReader('token')

            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Status changes", apiRes);
            setLoading(false)
            setOpenTestStatusModal(false)
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Test status updated.")
            getSingleTest()

        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while updating status.")
            console.log("Error", err);
            setLoading(false)
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
        if (!location?.state?.id) {
    
            navigate('/yourtests')
        }
        getSingleTest()

    }, [])
    return (
        <>

                <Card className='viewormanage'>
                    <div className='viewormanage-main'>
                        <Navbar />
                        <div className='viewormanageBlock'>
                            <div className='viewormanage-testData'>
                                {!singleTest ? <Loader size={40} /> : (<>

                                    <Card className='viewormanage-testItem'>
                                        <div className='viewormanage-testItemImage'>
                                            {singleTest?.data?.featuredImage ? <img src={singleTest?.data?.featuredImage} alt="" /> : <HideImageOutlinedIcon />}

                                        </div>
                                        <div className='viewormanage-testItemData'>
                                            <Typography variant='h5'>{singleTest?.data.productTitle} </Typography>
                                            <Tooltip arrow title={copiedTooltip ? "copied" : null} >

                                                <Button onClick={(e) => {
                                                    navigator.clipboard.writeText(singleTest && singleTest?.data.handle)
                                                    setCopiedTooltip(true)
                                                    setInterval(() => {
                                                        setCopiedTooltip(false)
                                                    }, 2000)
                                                }}>Copy Link <img src={LinkIcon} alt="" /></Button>
                                            </Tooltip>
                                            <div>
                                                <div className='viewormanage-status'>
                                                    <Typography variant='p'>Status</Typography>
                                                    <Chip label={`${singleTest.data.status}`} />
                                                </div>
                                                <div className='viewormanage-product'>
                                                    <Typography variant='p'>Product</Typography>
                                                    <Typography variant='p'>{singleTest?.data?.productTitle}</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className='viewormanage-reviewData'>
                                        <div className='viewormanage-productDataReview productDataReview'>
                                            <Typography variant='p'>Product</Typography>
                                            <div>

                                                <Typography variant='h5'>{singleTest?.data?.productTitle}</Typography>
                                            </div>
                                        </div>
                                        <div className='trafficSplitDataReview'>
                                            <Typography variant='p'>Traffic Split </Typography>
                                            <div>
                                                <Typography variant='h5'>{singleTest?.data?.trafficSplit * singleTest?.data?.testCases?.length}/{100 - singleTest.data.trafficSplit * singleTest.data.testCases.length}</Typography>
                                            </div>
                                        </div>

                                    </Card>
                                    <div className="viewormanageBtnGroup">
                                        <Button className='pauseTest' onClick={() => setOpenTestStatusModal(true)} >{ singleTest?.data?.status === "pending" ? "Resume" : "Pause" } Test </Button>
                                        <div className='deleteTest' onClick={() => handleOpenDeleteModal()}>
                                            <p>Delete Test</p>
                                            <Button>Delete Test</Button>
                                        </div>
                                    </div>
                                </>)}

                            </div>
                            <Card className='viewormanage-testAnalytics'>
                                <div>
                                    <Typography variant='h5'>Test Analytics</Typography>
                                    <Button variant="outlined">Expand</Button>
                                </div>
                            </Card>
                        </div>
                        <Card className='funnelBreakdown'>
                            <Typography variant='h5'>Funnel Breakdown by Test</Typography>
                            <div className='funnelBreakdownTable' style={{ height: 400, width: '100%' }}>
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
                                    
                    {/* // Delete test modal */}
                    <Modal
                        open={openDeleteModal}
                        onClose={handleTestStatusModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className="configureTest1">
                    
                                <div className='close-icon'>
                                    <img src={closeIcon} alt="" onClick={() => setOpenDeleteModal(false)} />
                                </div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to delete this test case?..
                            </Typography>
                            <Button className='deleteTestCaseBtn' onClick={() => deleteTestCase(location?.state?.id)}> {loading ? <Loader size={20}/> :"Delete"} </Button>
                        </Box>
                    </Modal>


                    {/* // Test status update modal */}
                    <Modal
                        open={openTestStatusModal}
                        onClose={handleCloseDeleteModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} className="configureTest1">
                        
                                <div className='close-icon'>
                                    <img src={closeIcon} alt="" onClick={() => setOpenTestStatusModal(false)} />
                                </div>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Are you sure you want to update this test case?..
                            </Typography>
                        
                            <Button className='deleteTestCaseBtn' onClick={() => updateTestStatus()}> {loading ? <Loader size={20}/> :singleTest?.data?.status === "pending" ? "Resume" : "Pause"} </Button>
                        </Box>
                    </Modal>
                    <div>{errorfunction()}</div>
                </Card>
        
        </>
    )
}

export default ViewOrManageTestPage