import { Box, Button, Card, Chip, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import LinkIcon from "./Images/link-2.png"
import { DataGrid } from '@mui/x-data-grid'
import EyeIcon from "./Images/eye.png"
import TrashIcon from "./Images/trash.png"
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import getApiUrl from "../controller/utils.js";

const ViewOrManageTestPage = () => {
    const [singleTest, setSingleTest] = useState()
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
const navigate = useNavigate();
    const {id} = useParams();
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
    
        fetch(getApiUrl + `/api/get-single-testcase/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                console.log("apiRes.data", apiRes);
                setSingleTest(apiRes)
            
            })
            .catch((error) => console.log("Error", error))
    }
    const deleteTestCase = (id) => {
        console.log("deleting");
        fetch(getApiUrl + `/api/deleteTestCase/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setOpenDeleteModal(false)
            navigate('/yourtests');
            
        }).catch((err) => {
            console.log("Error", err);
        })
    }
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const rows = [
        { id: 1, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Jon', Purchases: 35, price: "56 USD" },
        { id: 2, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Cersei', Purchases: 42, price: "56 USD" },
        { id: 3, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Jaime', Purchases: 45, price: "56 USD" },
        { id: 4, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Arya', Purchases: 16, price: "56 USD" },
        { id: 5, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Daenerys', Purchases: null, price: "56 USD" },
        { id: 6, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: null, Purchases: 150, price: "56 USD" },
        { id: 7, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Ferrara', Purchases: 44, price: "56 USD" },
        { id: 8, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Rossini', Purchases: 36, price: "56 USD" },
        { id: 9, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ',revPerVisitor:"$203.34 ", initiateCheckout: 'Harvey', Purchases: 65, price: "56 USD" },
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

    const updateTestStatus = () =>{
        fetch(getApiUrl + `/api/updatetest?`+new URLSearchParams({
            status:"pending",
            id:id
        }), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Status changes", apiRes);
        
            getSingleTest()
            
        }).catch((err) => {
            console.log("Error", err);
        })
    }
    useEffect(() => {
        getSingleTest()
    },[])
    return (
        <>
        {singleTest && (<>

            <Card className='viewormanage'>
                <div className='viewormanage-main'>
                    <Navbar />
                    <div className='viewormanageBlock'>
                        <div className='viewormanage-testData'>


                            <Card className='viewormanage-testItem'>
                                <div className='viewormanage-testItemImage'>
                                    <img src={singleTest.data.featuredImage} alt="" />
                                </div>
                                <div className='viewormanage-testItemData'>
                                    <Typography variant='h5'>{singleTest.data.productTitle} </Typography>
                                    <Button>Copy Link <img src={LinkIcon} alt=""/></Button>
                                    <div>
                                        <div className='viewormanage-status'>
                                            <Typography variant='p'>Status</Typography>
                                         <Chip label={`${singleTest.data.status}`} /> 
                                        </div>
                                        <div className='viewormanage-product'>
                                            <Typography variant='p'>Product</Typography>
                                            <Typography variant='p'>{singleTest.data.productTitle}</Typography>

                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <Card className='viewormanage-reviewData'>
                                <div className='viewormanage-pricingDataReview pricingDataReview'>

                                    <Typography variant='p'>Pricing</Typography>
                                    <div>

                                        <div>
                                            <Typography variant='h5'>Control</Typography>
                                            <Typography variant='p'>${singleTest.data.productPrice}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant='h5'>Variations</Typography>
                                            {singleTest.data.testCases.map(i => i.variants.map(j => (<Typography variant='p'>{j.abVariantPrice},</Typography>)))}
                                        
                                        </div>

                                    </div>
                                </div>
                                <div className='viewormanage-productDataReview productDataReview'>
                                    <Typography variant='p'>Product</Typography>
                                    <div>

                                        <Typography variant='h5'>{singleTest.data.productTitle}</Typography>
                                    </div>

                                </div>
                                <div className='trafficSplitDataReview'>
                                    <Typography variant='p'>Traffic Split </Typography>
                                    <div>
                                        <Typography variant='h5'>{singleTest.data.trafficSplit}</Typography>
                                    </div>
                                </div>

                            </Card>
                            <div className="viewormanageBtnGroup">
                                <Button className='pauseTest' onClick={() => updateTestStatus()} >Pause Test </Button>
                                <div className='deleteTest' onClick={() => handleOpenDeleteModal()}>
                                    <p>Delete Test</p>
                                    <Button>Delete Test</Button>
                                </div>
                            </div>
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
                                <Button onClick={() => deleteTestCase(id)}> Delete </Button>
                            </Box>
                        </Modal>
            </Card>
        </>)}
        </>
    )
}

export default ViewOrManageTestPage