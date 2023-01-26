import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import getApiUrl from "../controller/utils.js";
import Loader from './Loader'
import cookieReader from '../controller/cookieReader'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

const ReviewTestPage = ({ created, productImage }) => {
    const location = useLocation();
    console.log("Created on review page", created, productImage);
    const navigate = useNavigate();
    const launchTest = () => {
        fetch(getApiUrl + `/api/updatetest?` + new URLSearchParams({
            status: "active",
            id: created && created?.apiRes?.data?._id
        }), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop')
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Status changes", apiRes);



        }).catch((err) => {
            console.log("Error", err);
        })
        navigate('/yourtests')
    }
    return (
        <>
            {true && (<>

                <Card className='reviewTest'>
                    <div className='reviewTest-main'>
                        <Navbar />

                        <Card className='reviewTestBlock'>
                            <div>
                                {!created ? <Loader size={40}  /> : (<>

                                <div className='imageBlock'>
                                {created && created.apiRes.data.featuredImage ?<img src={created && created.apiRes.data.featuredImage} alt="product_image_not_found" />:<HideImageOutlinedIcon/>}
                                    
                                </div>
                                <div className='reviewData'>
                                    <Typography variant='h4'>Review Test</Typography>
                                    <Typography variant='p'>Confirm test configuration</Typography>
                                    {/* <Typography variant='h5'>{location?.data?.testCases[0]?.variants[0]?.variantTitle ?  location?.data?.testCases[0]?.variants[0]?.variantTitle: ""}</Typography> */}
                                    <Typography variant='h5'>{created && created.apiRes.data.productTitle}</Typography>
                                    <div className='reviewMainData'>
                                        <div className='pricingDataReview'>

                                            <Typography variant='p'>Pricing</Typography>
                                            <div>

                                                <div>
                                                    <Typography variant='h5'>Control</Typography>
                                                    <Typography variant='p'>{created.apiRes.currency} {created && created.apiRes.data.productPrice}</Typography>
                                                </div>
                                                <div>
                                                    <Typography variant='h5'>Variations</Typography>
                                                    {/* <Typography variant='p'>{created.apiRes.data.testCases.map(i => i.variants.map(j => (<>${j.variantPrice}, </>)))}</Typography> */}
                                                    <Typography variant='p'>{created && created.apiRes.data.testCases.map(i => i.variants.map(j => (<>{created.apiRes.currency} {j.abVariantPrice}, </>)))}</Typography>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='productDataReview'>
                                            <Typography variant='p'>Product</Typography>
                                            <div>

                                                <Typography variant='h5'>{created && created.apiRes.data.productTitle}</Typography>
                                            </div>

                                        </div>
                                        <div className='trafficSplitDataReview'>
                                            <Typography variant='p'>Traffic Split </Typography>
                                            <div>
                                                {/* <Typography variant='h5'>{location.data.trafficSplit}/{100 - (Number(location.data.trafficSplit) * location.data.testCases.length)}</Typography> */}
                                                {created && (<>    <Typography variant='h5'>{created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length}/{100 - (created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length)}</Typography></>)}
                                            </div>
                                        </div>

                                    </div>
                                    {/* <div className='reviewTestText'>
                                        <Typography variant='p'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</Typography>
                                    </div> */}
                                    <div className='reviewAndLaunchBtns'>
                                        <Button className='launchTestBtn' onClick={() => launchTest()}>Launch</Button>
                                        {/* <div className='scheduleTestBtn'>

                                            <p>Schedule</p>
                                            <Button>Schedule</Button>
                                        </div> */}
                                    </div>
                                </div>
                                </>)}
                            </div>
                        </Card>
                    </div>
                </Card>
            </>)}
        </>
    )
}

export default ReviewTestPage