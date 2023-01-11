import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
// import "../../Styles/MUI_CSS/CreateTest.css"
import search from "../../src/Component/Images/search-normal.png"
import { DataGrid } from '@mui/x-data-grid';
import selectPriceTestIcon from "../../src/Component/Images/Arrow.png"
import addTestCases from "../../src/Component/Images/add-square.png"

const CreateTestPage2 = () => {
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 250,
            sortable: false,
        },
        {
            field: 'Product',
            headerName: 'Product',
            width: 250,
            sortable: false,
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 250,
            sortable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            sortable: false,
        },
        {
            field: 'action',
            headerName: 'action',
            type: 'number',
            width: 250,
            sortable: false,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            type: 'number',
            valueGetter: (params) =>
                `${params.row.Product || ''} ${params.row.Description || ''}`,
        },
    ];


    const rows = [
        { id: 1, Description: 'Snow', Product: 'Jon', action: 35, status: "Active" },
        { id: 2, Description: 'Lannister', Product: 'Cersei', action: 42, status: "Active" },
        { id: 3, Description: 'Lannister', Product: 'Jaime', action: 45, status: "Active" },
        { id: 4, Description: 'Stark', Product: 'Arya', action: 16, status: "Active" },
        { id: 5, Description: 'Targaryen', Product: 'Daenerys', action: null, status: "Active" },
        { id: 6, Description: 'Melisandre', Product: null, action: 150, status: "Active" },
        { id: 7, Description: 'Clifford', Product: 'Ferrara', action: 44, status: "Active" },
        { id: 8, Description: 'Frances', Product: 'Rossini', action: 36, status: "Active" },
        { id: 9, Description: 'Roxie', Product: 'Harvey', action: 65, status: "Active" },
    ];
    return (
        <>
            <Card className='createTestPage'>
                <div className='nav'>

                    <Navbar />
                </div>
                <Card className='createTestMain'>
                    <div className='createTestHead'>

                        <div className='createTestBlock1'>

                            <CardContent>
                                <Typography variant='h5' className='createTestTitle'>Create Test</Typography>

                                <Typography variant='p' className='chooseProd'>
                                    1. Select your prices to test
                                </Typography>

                                <div className='testCases'>
                                    <Card className='testCaseYes'>
                                        <div className='testCaseBlock1'>

                                            <Card className='testCaseIcon'>
                                                <img src={selectPriceTestIcon} alt="" />
                                            </Card>
                                            <Typography variant='p'>
                                                Control
                                            </Typography>
                                        </div>
                                        <div className='testCaseBlock2'>
                                            <Typography variant='h5'>
                                                $28.00
                                            </Typography>
                                            <Typography variant='h5'>
                                                $19.99
                                            </Typography>
                                        </div>
                                    </Card>
                                    <div className='testCaseNo'>
                                        <img src={addTestCases} alt="" />
                                        <Typography variant='h5'>Add Test</Typography>
                                    </div>
                                    <div className='testCaseNo'>
                                        <img src={addTestCases} alt="" />
                                        <Typography variant='h5'>Add Test</Typography>
                                    </div>
                                    <div className='testCaseNo'>
                                        <img src={addTestCases} alt="" />
                                        <Typography variant='h5'>Add Test</Typography>
                                    </div>
                                </div>
                                {/* <Typography variant='p' className='chooseProd'> Choose a product to test</Typography> */}
                                <Typography variant='p' className='trafficSplitTittle'>2. Set your traffic split</Typography><br />
                                <div className='trafficSplitInfo'>

                                <Typography variant='p'>10% of visiting traffic will be split evenly between your 3 tests. The remaining 90% will be sent to the control.</Typography>
                                </div>
                                <Button variant="contained" className='ReviewLaunchBtn'> <span>
                                Review & Launch
                                </span></Button>
                            </CardContent>
                        </div>
                        {/* <div className='createTestBlock2'>
                            <img src={search} alt="" />
                            <TextField fullWidth id="fullWidth" placeholder="Search " />
                            <Button variant="outlined"><span>Next</span></Button>
                        </div> */}
                    </div>
                    {/* <div style={{ height: 400, width: '100%' }} className="dataTable">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div> */}

                </Card>
            </Card>
        </>
    )
}

export default CreateTestPage2