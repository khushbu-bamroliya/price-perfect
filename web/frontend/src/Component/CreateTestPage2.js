import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
// import "../../Styles/MUI_CSS/CreateTest.css"
import search from "../../src/Component/Images/search-normal.png"
import { DataGrid } from '@mui/x-data-grid';
import selectPriceTestIcon from "../../src/Component/Images/Arrow.png"
import addTestCases from "../../src/Component/Images/add-square.png"

const CreateTestPage2 = () => {

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