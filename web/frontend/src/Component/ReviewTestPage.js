import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

const ReviewTestPage = ({ created, productImage }) => {
    const location = useLocation();
    console.log("Created on review page", created,location);
    const navigate = useNavigate();
    const launchTest = () => {
        navigate('/yourtests')
    }
    return (
        <>
            {location && (<>

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
                                    <Typography variant='h5'>{location.data.testCases[0].variants[0].variantTitle}</Typography>
                                    <div className='reviewMainData'>
                                        <div className='pricingDataReview'>

                                            <Typography variant='p'>Pricing</Typography>
                                            <div>

                                                <div>
                                                    <Typography variant='h5'>Control</Typography>
                                                    <Typography variant='p'>${location.data.testCases[0].variants[0].variantPrice}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5'>Variations</Typography>
                                                    {/* <Typography variant='p'>{created.apiRes.data.testCases.map(i => i.variants.map(j => (<>${j.variantPrice}, </>)))}</Typography> */}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='productDataReview'>
                                            <Typography variant='p'>Product</Typography>
                                            <div>

                                                <Typography variant='h5'>{location.data.testCases[0].variants[0].variantTitle}</Typography>
                                            </div>

                                        </div>
                                        <div className='trafficSplitDataReview'>
                                            <Typography variant='p'>Traffic Split </Typography>
                                            <div>
                                                <Typography variant='h5'>{location.data.trafficSplit}/{100 - (Number(location.data.trafficSplit) * location.data.testCases.length)}</Typography>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className='reviewTestText'>
                                        <Typography variant='p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                                    </div> */}
                                    <div className='reviewAndLaunchBtns'>
                                        <Button className='launchTestBtn' onClick={()=>launchTest}>Launch</Button>
                                        {/* <div className='scheduleTestBtn'>

                                            <p>Schedule</p>
                                            <Button>Schedule</Button>
                                        </div> */}
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