import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"

const ReviewTestPage = () => {
    return (
        <>
            <Card className='reviewTest'>
                <div className='reviewTest-main'>
                    <Navbar />

                    <Card className='reviewTestBlock'>
                        <div>

                            <div className='imageBlock'>
                                <img src={dummyProductImage} alt="" />
                            </div>
                            <div className='reviewData'>
                                <Typography variant='h4'>Review Test</Typography>
                                <Typography variant='p'>Confirm test configuration</Typography>
                                <Typography variant='h5'>Cat Socks</Typography>
                                <div className='reviewMainData'>
                                    <div className='pricingDataReview'>

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
                                    <div className='productDataReview'>
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

                                </div>
                                <div className='reviewTestText'>
                                    <Typography variant='p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                                </div>
                                <div className='reviewAndLaunchBtns'>
                                    <Button className='launchTestBtn'>Launch</Button>
                                    <div className='scheduleTestBtn'>

                                    <p>Schedule</p>
                                    <Button>Schedule</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default ReviewTestPage