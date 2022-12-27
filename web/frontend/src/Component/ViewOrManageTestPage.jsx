import { Button, Card, Chip, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"
import LinkIcon from "./Images/link-2.png"
import { DataGrid } from '@mui/x-data-grid'
import EyeIcon from "./Images/eye.png"
import avatar from "./Images/image.png"
import TrashIcon from "./Images/trash.png"
const ViewOrManageTestPage = () => {
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
                console.log("params: " + params);
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
    return (
        <>
            <Card className='viewormanage'>
                <div className='viewormanage-main'>
                    <Navbar />
                    <div className='viewormanageBlock'>
                        <div className='viewormanage-testData'>


                            <Card className='viewormanage-testItem'>
                                <div className='viewormanage-testItemImage'>
                                    <img src={dummyProductImage} alt="" />
                                </div>
                                <div className='viewormanage-testItemData'>
                                    <Typography variant='h5'>Cat Socks Test </Typography>
                                    <Button>Copy Link <img src={LinkIcon} /></Button>
                                    <div>
                                        <div className='viewormanage-status'>
                                            <Typography variant='p'>Status</Typography>
                                            <Chip label="Active" />
                                        </div>
                                        <div className='viewormanage-product'>
                                            <Typography variant='p'>Product</Typography>
                                            <Typography variant='p'>Cat Socks</Typography>

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
                                            <Typography variant='p'>$10</Typography>
                                        </div>
                                        <div>
                                            <Typography variant='h5'>Variations</Typography>
                                            <Typography variant='p'>$13, $17, $20 </Typography>
                                        </div>

                                    </div>
                                </div>
                                <div className='viewormanage-productDataReview productDataReview'>
                                    <Typography variant='p'>Product</Typography>
                                    <div>

                                        <Typography variant='h5'>Cat Socks</Typography>
                                    </div>

                                </div>
                                <div className='trafficSplitDataReview'>
                                    <Typography variant='p'>Traffic Split </Typography>
                                    <div>
                                        <Typography variant='h5'>50/50</Typography>
                                    </div>
                                </div>

                            </Card>
                            <div className="viewormanageBtnGroup">
                                <Button className='pauseTest'>Pause Test </Button>
                                <div className='deleteTest'>
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
            </Card>
        </>
    )
}

export default ViewOrManageTestPage