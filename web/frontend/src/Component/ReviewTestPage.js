import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"

const ReviewTestPage = ({created, productImage}) => {
    console.log("Created on review page", created);
    return (
        <>
        {created && (<>

            <Card className='reviewTest'>
                <div className='reviewTest-main'>
                    <Navbar />

                    <Card className='reviewTestBlock'>
                        <div>

                            <div className='imageBlock'>
                                <img src={productImage} alt="product_image" />
                            </div>
                            <div className='reviewData'>
                                <Typography variant='h4'>Review Test</Typography>
                                <Typography variant='p'>Confirm test configuration</Typography>
                                <Typography variant='h5'>{created.productTitle}</Typography>
                                <div className='reviewMainData'>
                                    <div className='pricingDataReview'>

                                        <Typography variant='p'>Pricing</Typography>
                                        <div>

                                            <div>
                                                <Typography variant='h5'>Control</Typography>
                                                <Typography variant='p'>${created.controlData[0].variantPrice}</Typography>
                                            </div>
                                            <div>
                                                <Typography variant='h5'>Variations</Typography>
                                                <Typography variant='p'>{created.apiRes2.data.testCases.map(i => i.variants.map(j => (<>${j.variantPrice}, </>)))}</Typography>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='productDataReview'>
                                        <Typography variant='p'>Product</Typography>
                                        <div>

                                            <Typography variant='h5'>{created.productTitle}</Typography>
                                        </div>

                                    </div>
                                    <div className='trafficSplitDataReview'>
                                        <Typography variant='p'>Traffic Split </Typography>
                                        <div>
                                            <Typography variant='h5'>{created.apiRes2.data.trafficSplit}/{100-(created.apiRes2.data.trafficSplit*created.apiRes2.data.testCases.length)}</Typography>
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
        </>)}
        </>
    )
}

export default ReviewTestPage