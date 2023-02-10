import { Alert, Box, Button, Card, Collapse, IconButton, Snackbar, TableBody, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import dummyProductImage from "./Images/home-trophy.png"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import getApiUrl from "../controller/utils.js";
import Loader from './Loader'
import cookieReader from '../controller/cookieReader'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowIcon from "./Images/Arrow.png";
import rightArrow from './Images/arrow-right.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RedImg from './Images/Red.svg';
import BlackImg from './Images/Black.svg';
import BlueImg from './Images/Blue.svg';
import CyanImg from './Images/Cyan.svg';
import GreenImg from './Images/Green.svg';
import GreyImg from './Images/Grey.svg';
import OrangeImg from './Images/Orange.svg';
import PurpleImg from './Images/Purple.svg';
import YellowImg from './Images/Yellow.svg';

const ReviewTestPage = ({ created, productImage }) => {
    const location = useLocation();
    const testCaseImages = [BlueImg, RedImg,YellowImg, PurpleImg, GreenImg, OrangeImg, GreyImg, BlackImg, CyanImg ];
    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    console.log("Created on review page", created, productImage);
    const testCases = created?.apiRes?.data?.testCases
    const navigate = useNavigate();
    const launchTest = () => {
        fetch(getApiUrl + `/api/updatealltests?` + new URLSearchParams({
            status: "active",
            id: created && created?.apiRes?.data?._id
        }), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')

            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Status changes", apiRes);
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Test launched successfully")


            navigate('/yourtests', { state: { message: 'Test launched successfully' } })
        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while launching test")
            console.log("Error", err);
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
    function createData(id, variants, price, compareAtPrice, color) {
        return {
            id,
            //   calories,
            price,
            compareAtPrice,
            // protein,
            // price,
            variants,
            color
            //   history: [
            //     {
            //       date: '2020-01-05',
            //       customerId: '11091700',
            //       amount: 3,
            //     },
            //     {
            //       date: '2020-01-02',
            //       customerId: 'Anonymous',
            //       amount: 1,
            //     },
            //   ],
        };
    }

    const rows = testCases.map(i => (
        createData(
            i.testId,
            i.variants,
            i.variants.length > 1 ?
                Math.min(...i.variants.map(j => j.abVariantPrice)) + ' - ' + Math.max(...i.variants.map(j => j.abVariantPrice))
                : i.variants.map(j => j.abVariantPrice)
            ,
            i.variants.length > 1 ?
                Math.min(...i.variants.map(j => j.abVariantComparePrice)) + ' - ' + Math.max(...i.variants.map(j => j.abVariantComparePrice))
                : i.variants.map(j => j.abVariantComparePrice)
            ,
            i.color

        )
    ))
    // function Row(props) {
    //     const { row } = props;
    //     console.log("row", row);
    //     const [open, setOpen] = React.useState(false);

    //     return (
    //         <React.Fragment>
    //             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
    //                 <TableCell>
    //                     <IconButton
    //                         aria-label="expand row"
    //                         size="small"
    //                         onClick={() => setOpen(!open)}
    //                     >
    //                         {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    //                     </IconButton>  
    //                     <img src={ArrowIcon} alt="" />
    //                      {row.color}
    //                 </TableCell>
    //                 <TableCell align="right">
    //                     {/* {row.name} */}
    //                 </TableCell>
    //                 {/* <TableCell align="right">{row.calories}</TableCell> */}
    //                 <TableCell align="right">{row.price}</TableCell>
    //                 <TableCell align="right">{row.compareAtPrice}</TableCell>
    //                 {/* <TableCell align="right">{row.protein}</TableCell> */}
    //                 {/* <TableCell align="right">
    //                     <img src={pauseIcon} alt="" />
    //                     <img src={editIcon} alt="" onClick={() => handleEditTest(row.name)} />
    //                 </TableCell> */}

    //             </TableRow>
    //             <TableRow>
    //                 <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
    //                     <Collapse in={open} timeout="auto" unmountOnExit>
    //                         <Box sx={{ margin: 1 }}>
    //                             {/* <Typography variant="h6" gutterBottom component="div">
    //                   History
    //                 </Typography> */}
    //                             <Table>
    //                                 {/* <TableHead>
    //                     <TableRow>
    //                       <TableCell></TableCell>
    //                       <TableCell>Customer</TableCell>
    //                       <TableCell align="right">Amount</TableCell>
    //                       <TableCell align="right">Total price ($)</TableCell>
    //                     </TableRow>
    //                   </TableHead> */}
    //                                 <TableBody>
    //                                     {row.variants.map((i) => (
    //                                         <TableRow key={i.id}>
    //                                             <TableCell component="td" align="right">

    //                                             </TableCell>
    //                                             <TableCell component="td" align="right">
    //                                                 {i.variantTitle}
    //                                             </TableCell>
    //                                             <TableCell component="td" align="right">
    //                                                 {i.abVariantPrice}
    //                                             </TableCell>
    //                                             <TableCell component="td" align="right">
    //                                                 {!i.abVariantComparePrice ? i.abVariantComparePrice : i.abVariantComparePrice}
    //                                             </TableCell>


    //                                             {/* <TableCell>{historyRow.customerId}</TableCell>
    //                         <TableCell align="right">{historyRow.amount}</TableCell>
    //                         <TableCell align="right">
    //                           {Math.round(historyRow.amount * row.price * 100) / 100}
    //                         </TableCell> */}
    //                                         </TableRow>
    //                                     ))}
    //                                 </TableBody>
    //                             </Table>
    //                         </Box>
    //                     </Collapse>
    //                 </TableCell>
    //             </TableRow>
    //         </React.Fragment>
    //     );
    // }
    function Div(props) {
        const { row } = props;
        console.log("row", row);
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <div className='cursor controlTest' onClick={() => setOpen(!open)}>
                    <div className={`arrowIcon ${open ? "openIcon" : "closeIcon"}`}>
                        <ArrowForwardIosIcon fontSize='large' />
                    </div>
                    <div className='flex-row justify-content-center flex-1 p-11'>
                        <img width="21px" height="21px" src={testCaseImages[row.id - 1 ]} alt="" />
                        <div className={`reviewHeading ${open ? "openText" : "closeText"}`}>{row.color} Test</div>
                    </div>
                    <div className='nameTitle'>{/* {row.name} */}</div>
                    <div className='nameTitle'>{row.price}</div>
                    <div className='nameTitle'>{row.compareAtPrice}</div>
                </div>
                <div>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {row.variants.map((i) => (
                            <div className='variantId' key={i.id}>
                                <div className='variantDeatils'></div>
                                <div className='variantDeatils after'>{i.variantTitle}</div>
                                <div className='variantDeatils bold'>{i.abVariantPrice}</div>
                                <div className='variantDeatils'>{!i.abVariantComparePrice ? i.abVariantComparePrice : i.abVariantComparePrice}</div>
                            </div>
                        ))}
                    </Collapse>
                </div>
            </React.Fragment>
        );
    }
    useEffect(() => {
        if (location?.state?.message) {
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg(location.state.message)
        } else {
            setOpens(false)
        }
        if (!location?.state) {
            navigate('/yourtests')
        }
    }, [])
    return (
        <>
            {true && (
                <>
                    <div className='bg-linear-gradient'>
                        <div className='p-25'>
                            <Navbar />
                            <Card className='mt-34 pt-24 pb-74 py-40 border-radius-14'>
                                <div className='arrowWrapper'>
                                    <img src={rightArrow} />
                                </div>
                                <div className='flex-row gap-70 align-items-unset flex-crea'>
                                    {!created ? <Loader size={40} /> : (<>
                                        <div className='createdImgWrapper w-50'>
                                            {created && created.apiRes.data.featuredImage ? <img src={created && created.apiRes.data.featuredImage} alt="product_image_not_found" /> : <HideImageOutlinedIcon />}
                                        </div>
                                        <div className={`w-50 ${testCases && testCases.length > 1 ? "w-full" : ""}`}>
                                            <h2 className='configureHeading'>Review Test</h2>
                                            <span className='subProductTitle mb-34'>Confirm test configuration</span>
                                            <div className='flex-row justify-content-between-dk mb-20'>
                                                <h3 className='catTitle'>{created && created.apiRes.data.productTitle}</h3>

                                                {created && created?.apiRes?.data?.testCases.length > 1 && (<>

                                                    <div className='flex-row'>
                                                        <span className='pricingHeading mb-0 mr-9'>Traffic Split:</span>
                                                        <div>
                                                            {created && (<><h6 className='ControlPrice ml-0'>{created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length}/{100 - (created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length)}</h6></>)}
                                                        </div>
                                                    </div>
                                                </>)}

                                            </div>
                                            {testCases && testCases.length > 1 ? (<>
                                                <div className='mobileTitle'>
                                                    <div className='testCasesWrapper'>
                                                        <div className='testCasesTitle'>Title</div>
                                                        <div className='testCasesTitle'>Variant</div>
                                                        <div className='testCasesTitle'>Price</div>
                                                        <div className='testCasesTitle'>Compare at price</div>
                                                    </div>
                                                    <div className='width-fit'>
                                                        {rows.map((row) => (
                                                            <Div key={row.name} row={row} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='mt-76'>
                                                    <button className='launchBtn cursor' onClick={() => launchTest()}>Launch</button>
                                                    <button className='secondaryBtn cursor scheduleBtn'><span>Schedule</span></button>

                                                </div>
                                            </>) : (<>
                                                {/* changing */}
                                                <div className='pricingWrapper'>
                                                    <div className='pricingBoxs'>
                                                        <span className='pricingHeading'>Pricing</span>
                                                        <div className='ControlWrapper'>
                                                            <div className='flex-row'>
                                                                <h5 className='ControlHeading'>Control</h5>
                                                                <h6 className='ControlPrice'>{created.apiRes.currency} {created && created.apiRes.data.productPrice}</h6>
                                                            </div>
                                                            <div className='ml-16 flex-row variations'>
                                                                <h5 className='ControlHeading'>Variations</h5>
                                                                {created && created.apiRes.data.testCases.map(i => i.variants.map(j => (<h6 className='ControlPrice'>{created.apiRes.currency} {j.abVariantPrice}</h6>)))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div>
                                                    <Typography variant='p'>Product</Typography>
                                                    <Typography variant='h5'>{created && created.apiRes.data.productTitle}</Typography>
                                                </div> */}
                                                    <div className='pl-42 border-Traffic ml-50'>
                                                        <span className='pricingHeading'>Traffic Split</span>
                                                        <div>
                                                            {created && (<><h6 className='ControlPrice ml-0'>{created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length}/{100 - (created.apiRes.data.trafficSplit * created.apiRes.data.testCases.length)}</h6></>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='simplyPara'>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                                </p>
                                                <div className='mt-76'>
                                                    <button className='launchBtn cursor' onClick={() => launchTest()}>Launch</button>
                                                    <button className='secondaryBtn cursor scheduleBtn'><span>Schedule</span></button>
                                                </div>
                                                {/* changing  */}
                                            </>)}
                                        </div>
                                    </>)}
                                </div>
                            </Card>
                        </div>
                        <div>{errorfunction()}</div>
                    </div>
                </>)}
        </>
    )
}

export default ReviewTestPage