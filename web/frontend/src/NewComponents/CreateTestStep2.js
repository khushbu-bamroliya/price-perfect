import { Alert, Button, Card, Modal, Slider, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useCallback } from 'react'
import Navbar from './Navbar'
import closeIcon from "./Images/close-circle.png"
import { DataGrid, gridClasses, GridCellEditStopReasons } from '@mui/x-data-grid';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getApiUrl from "../controller/utils.js";
import ArrowIcon from "./Images/Arrow.png";
import AddIcon from "./Images/add-square.png";
import Loader from './Loader';
import cookieReader from '../controller/cookieReader';
import trash from './Images/trash.svg';
import './style.css';


const CreateTestStep2 = ({ objectSent }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const style = {
        maxWidth: '741px',
        background: '#FFFFFF',
        borderRadius: '14px',
        padding: '44px 44px 70px 44px',
        outline: 'none',
        position: 'relative',
    };
    // let tempTestArr = [];
    const { id, title, handle } = useParams();
const [tempTestArr,setTempTestArr] = useState([])

    const [variantRes, setVariantRes] = useState([]);

    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [loading, setLoading] = useState({
        variants: false,
        testCases: false,
    })
    const [disabled, setDisabled] = useState(true)
    const [variantPriceData, setVariantPriceData] = useState("")
    const [variantCompareAtPriceData, setVariantCompareAtPriceData] = useState();
    const [displayTestCasesArray, setDisplayTestCasesArray] = useState([])
    const [productVariants, setProductsVariants] = useState([])
    const [testIdState, setTestIdState] = useState(0);
    let testColors = ['Blue', 'Red', 'Yellow', 'Purple', 'Green', 'Orange', 'Grey', 'Black', 'Brown', 'Cyan']


    console.log("testing testIdState", testIdState);
    const [pricePercent, setPricePercent] = useState("2%");
    const [percentIncDec, setPercentIncDec] = useState("-")

    const [value, setValue] = useState(10);
    const [hideShowBtns, setHideShowBtns] = useState("none")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [openConfigureTest1, setOpenConfigureTest1] = useState(false);
    const handleCloseConfigureTest1 = () => setOpenConfigureTest1(false);

    // configs of clicking manual btn
    const [openManualModal, setOpenManualModal] = useState(false);
    const handleOpenManualModal = () => {
        console.log("apiRes", variantRes);

        const updatedArray = variantRes.data.map((item, index) => {

            return { ...item, "abVariantComparePrice": item.variantComparePrice, "abVariantPrice": item.variantPrice }
            return item;
        })

        setProductsVariants(updatedArray)
        setOpenManualModal(true);
        setOpenConfigureTest1(false)
    };

    const handleCloseManualModal = () => setOpenManualModal(false);

    // configs of clicking auto btn
    const [openByPercentageModal, setOpenByPercentageModal] = useState(false);
    const handleOpenByPercentageModal = () => { setOpenByPercentageModal(true); setOpenConfigureTest1(false) };
    const handleCloseByPercentageModal = () => setOpenByPercentageModal(false);

    // configs of edit test button
    const [openEditTest, setOpenEditTest] = useState(false);

    const handleOpenConfigureTest1 = (testId) => {
        console.log(testId, 'test id from add btn');
        setTestIdState(Number(testId));
        setOpenConfigureTest1(true);
    };
    const handleOpenEditTest = (testId) => {
        console.log("test " + testId);
        setTestIdState(Number(testId))
        const singleTest = [...displayTestCasesArray];
        const foundSingleTest = singleTest.find(item => item.testId === testId);
        console.log("foundSingleTest", foundSingleTest);
        setProductsVariants(foundSingleTest.variants)
        console.log("productsVariants", productVariants);
        setOpenEditTest(true);
        setOpenConfigureTest1(false)

    }
    const handleCloseEditTest = () => {
        const newItems = [...displayTestCasesArray];
        const object = newItems.find(i => i.id === testIdState);
        console.log("object: " + object);
        object.variants = productVariants
        setDisplayTestCasesArray(newItems);
        setOpenEditTest(false)
    };

    console.log("productVariants", productVariants);
    // configs of edit test button
    const [openControlSettings, setOpenControlSettings] = useState(false);
    const handleOpenControlSettings = () => {
        setOpenControlSettings(true); setOpenConfigureTest1(false)

    };
    const handleCloseControlSettings = () => setOpenControlSettings(false);

    let testId = 0;
    console.log("displayTestCasesArray", displayTestCasesArray)
    const totalTests = displayTestCasesArray && displayTestCasesArray.length;

    const onConfirm = () => {
        // setHideShowBtns("flex")
        handleCloseManualModal() || handleCloseByPercentageModal()
        // const newNum = getRandomNumber();
        // console.log("newNum", newNum);
        // const existingItem = displayTestCasesArray.find(item => item.id === newNum);
        // if (!existingItem) {
        //     setDisplayTestCasesArray([
        //         ...displayTestCasesArray, {
        //             testId: newNum-1,
        //             id: newNum-1,
        //             color:testColors[newNum -1],
        //             variants: productVariants
        //         }
        //     ])
        // }
        
        const randNum = (min, max, exclude = []) => {
            let num = Math.floor(Math.random() * (max - min + 1 - exclude.length) + min);
            exclude
              .slice()
              .sort((a, b) => a - b)
              .every((exeption) => exeption <= num && (num++, true));
              return num;
            };
            const getRandomNumber =randNum(1, testColors.length, tempTestArr)
            setDisplayTestCasesArray([
                        ...displayTestCasesArray, {
                            testId: getRandomNumber,
                            id: getRandomNumber,
                            color:testColors[getRandomNumber-1],
                            variants: productVariants
                        }
                    ])
            console.log("randNum(0, testColors.length, tempTestArr)",getRandomNumber);

            setTempTestArr(prev => [...prev, getRandomNumber]);
            setDisabled(false)
            
        }
        console.log("tempTestArr", tempTestArr);

    const onConfirmEdit = () => {
        handleCloseEditTest() || handleCloseControlSettings()
    }

    var apiRes;
    const handleVariants = async () => {
        setLoading({ variants: true })
        let data = {
            productId: `gid://shopify/Product/${location?.state?.id}`
        }

        fetch(getApiUrl + '/api/get-variants', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                'Authorization': 'Bearer ' + cookieReader('token'),
            },
            body: JSON.stringify(data)
        })
            .then(async (res) => {

                apiRes = await res.json()
                console.log("apiRes.data", apiRes.data);

                const updatedArray = apiRes.data.map((item, index) => {

                    return { ...item, "abVariantComparePrice": item.variantComparePrice, "abVariantPrice": item.variantPrice }

                })

                setVariantPriceData(apiRes.data[0].variantPrice)
                setVariantCompareAtPriceData(apiRes.data[0].variantComparePrice)
                setProductsVariants(updatedArray)
                setVariantRes(apiRes)
                setLoading({ variants: false })
            })
            .catch((error) => {
                setLoading({ variants: false })
                console.log("Error", error)
                setSnackbarColor('red')
                setsnackbar_msg("Internal Server Error")
            })
    }
    const cellEditStopManualModal = (params, event) => {

        const objectIndex = productVariants?.findIndex((obj) => obj.id === params.row.id)

        const ObjKeyExists = Object.hasOwn(productVariants[objectIndex], params.field)
        if (ObjKeyExists) {


            const updatedArray = productVariants?.map((item, index) => {

                if (index === objectIndex) {
                    if (params.field === "abVariantComparePrice") {

                        return { ...item, "abVariantComparePrice": event.target.value }
                    }
                    if (params.field === "abVariantPrice") {

                        return { ...item, "abVariantPrice": event.target.value }

                    }
                }
                return item;
            })
            setProductsVariants(updatedArray)
        }
    }

    const controlColumn = [
        {
            field: "variantTitle",
            headerName: "Title",
            minWidth: 80,
            flex: 1,
            editable: false,
            sortable: false,
        },
        {
            field: "variantPrice",
            headerName: "Price",
            minWidth: 120,
            flex: 1,
            editable: false,
            sortable: false,

        },
        {
            field: "variantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 1,
            editable: false,
            sortable: false,

        },
    ];
    const originalVariantColumnTest = [
        {
            field: "variantTitle",
            headerName: "Title",
            editable: false,
            minWidth: 80,
            flex: 1,
            sortable: false,
        },
        {
            field: "sku",
            headerName: "sku",
            editable: false,
            minWidth: 80,
            flex: 0.3,
            sortable: false,
        },
        {
            field: "abVariantPrice",
            headerName: "Price",
            minWidth: 120,
            flex: 0.3,
            editable: true,
            sortable: false,
        },
        {
            field: "abVariantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 0.4,
            editable: true,
            sortable: false,
        }
    ];
    const originalVariantColumn = [
        {
            field: "variantTitle",
            headerName: "Title",
            editable: false,
            minWidth: 80,
            flex: 0.3,
            sortable: false,
        },
        {
            field: "abVariantPrice",
            headerName: "Price",
            minWidth: 120,
            flex: 0.3,
            editable: true,
            sortable: false,
        },
        {
            field: "abVariantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 0.4,
            editable: true,
            sortable: false,
        }
    ];
    const deleteTestCase = id => {
        // tempTestArr.filter(j => j !== id)
        setTempTestArr(prev => prev.filter( j => j !== id))
        setDisplayTestCasesArray(prevItems => prevItems.filter(item => item.id !== id));
        console.log("display test cases length: " + displayTestCasesArray.length);
        if (!displayTestCasesArray.length <= 1) {
            setDisabled(true)
        }
    };

    const reviewAndLaunchBtnFunc = () => {
        setLoading({ testCases: true })
        setDisabled(true)
        const objectToBeSent = {
            trafficSplit: parseInt(Number(value) / Number(totalTests)),
            testCases: displayTestCasesArray,
            currency: location?.state?.currency,
            "productId": `gid://shopify/Product/${location?.state?.id}`,
        }

        let duplicateProductData = {
            "trafficSplit": objectToBeSent.trafficSplit,
            'productId': location?.state?.id,
            'productTitle': location?.state?.title,
            handle: location?.state?.handle,
            "status": "pending",
            objectToBeSent,
            featuredImage: variantRes.data[0].featuredImage,
            productPrice: variantRes.data[0].variantPrice
        }

        fetch(getApiUrl + '/api/createDuplicateProduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')
            },
            body: JSON.stringify(duplicateProductData)
        })
            .then(async (res) => {

                const apiRes = await res.json()

                setLoading({ testCases: false })
                objectSent({ apiRes, controlData: variantRes.data })
                setOpens(true)
                setSnackbarColor('#325240')
                setsnackbar_msg("Test created successfully")
                navigate(`/reviewtest`, { state: { message: "Test created successfully" } })
            })
            .catch((error) => {
                setOpens(true)
                setLoading({ testCases: false })
                setSnackbarColor('red')
                setsnackbar_msg("Test failed")
                console.log("Error", error)
            })
    }
    const percentagePrices = [
        "2%", "3%", "5%", "10%"
    ]

    const onConfirmByPercentage = () => {

        const updatedArray = variantRes && variantRes?.data.map(item => {


            const variantPriceTemp = (item.variantPrice / 100) * pricePercent.replace('%', '')
            const variantComparePriceTemp = (item.variantComparePrice / 100) * pricePercent.replace('%', '')

            console.log("item.variantComparePrice", item.variantComparePrice);
            if (percentIncDec === "+") {

                const variantPriceTempFinal = (Number(item.variantPrice) + variantPriceTemp).toFixed(2)
                const variantComparePriceFinal = (Number(item.variantComparePrice) + variantComparePriceTemp).toFixed(2)
                console.log("final number is:", variantComparePriceFinal);

                return { ...item, "variantPrice": variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "abVariantPrice": variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal }
            } else {
                const variantPriceTempFinal = (Number(item.variantPrice) - variantPriceTemp).toFixed(2)
                const variantComparePriceFinal = (Number(item.variantComparePrice) - variantComparePriceTemp).toFixed(2)

                return { ...item, "variantPrice": variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "abVariantPrice": variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal }

            }
            return item
        })
        setProductsVariants(updatedArray);
        console.log("updatedArray", updatedArray);
        // setDisplayTestCasesArray([
        //     ...displayTestCasesArray,
        //     {
        //         testId: displayTestCasesArray.length + 1,
        //         id: displayTestCasesArray.length + 1,
        //         variants: updatedArray
        //     }])
        const randNum = (min, max, exclude = []) => {
            let num = Math.floor(Math.random() * (max - min + 1 - exclude.length) + min);
            exclude
              .slice()
              .sort((a, b) => a - b)
              .every((exeption) => exeption <= num && (num++, true));
              return num;
            };
            const getRandomNumber =randNum(1, testColors.length, tempTestArr)
            setDisplayTestCasesArray([
                        ...displayTestCasesArray, {
                            testId: getRandomNumber,
                            id: getRandomNumber,
                            color:testColors[getRandomNumber-1],
                            variants: updatedArray
                        }
                    ])
            console.log("randNum(0, testColors.length, tempTestArr)",getRandomNumber);

            setTempTestArr(prev => [...prev, getRandomNumber]);
        console.log("setDisplayTestCasesArray3");
        setDisabled(false)
        handleCloseByPercentageModal();
    }
    console.log("productVariants ******", productVariants);

    const useCreateTestFakeMutation = () => {
        return React.useCallback(
            (user) =>
                new Promise((resolve, reject) =>
                    setTimeout(() => {
                        console.log("user1", user);

                        const objectIndex = productVariants.findIndex(item => item.id === user.id);
                        console.log("objectIndex", objectIndex);
                        const ObjKeyExists = Object.hasOwn(productVariants[objectIndex], "abVariantPrice") && Object.keys(productVariants[objectIndex], "abVariantComparePrice")
                        console.log('ObjKeyExists', ObjKeyExists)

                        if (ObjKeyExists) {
                            console.log("Here we go");
                            let tempArr = [...productVariants]
                            console.log("tempArr = " + tempArr);

                            const updatedArray = tempArr?.map((item, index) => {
                                console.log("updatedArray item", item);
                                console.log("updatedArray index", index);
                                if (index === objectIndex) {
                                    console.log("hello inside object");

                                    console.log("item", user.abVariantComparePrice);

                                    return { ...item, "abVariantComparePrice": user.abVariantComparePrice, "variantComparePrice": user.variantComparePrice, "abVariantPrice": user.abVariantPrice, "variantPrice": user.variantPrice }

                                }
                                return item;

                            })
                            console.log("variants updated", updatedArray);
                            setProductsVariants(updatedArray)
                        }
                        if (!user) {
                            reject(new Error("Error while saving user: name can't be empty."));
                        } else {
                            resolve({ ...user });
                        }
                    }, 200),
                ),
            [productVariants],
        );
    };
    const createTestMutateRow = useCreateTestFakeMutation();
    const createTestProcessRowUpdate = React.useCallback(
        async (newRow) => {
            console.log("newRow", newRow);
            const response = await createTestMutateRow(newRow);
            console.log("response: table " + JSON.stringify(response));
            console.log("response: id " + JSON.stringify(response.id));

            return response;
        },
        [createTestMutateRow],
    );
    const createTestHandleProcessRowUpdateError = React.useCallback((error) => {
        console.log("error: " + error);
    }, []);
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
    const rangeSliderMarks = [
        {
            value: 10,
            label: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L13.9282 9H0.0717969L7 0Z" fill="#F0D9ED" />
                </svg>
                <span>10%</span></div>,
        },
        {
            value: 25,
            label: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L13.9282 9H0.0717969L7 0Z" fill="#F0D9ED" />
                </svg>
                <span>25%</span></div>,
        },
        {
            value: 50,
            label: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L13.9282 9H0.0717969L7 0Z" fill="#F0D9ED" />
                </svg>
                <span>50%</span></div>,
        },
        {
            value: 75,
            label: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0L13.9282 9H0.0717969L7 0Z" fill="#F0D9ED" />
                </svg>
                <span>75%</span></div>,
        },
    ];
    const rangeSliderValuetext = (value) => {
        return `${value}°C`;
    }
    useEffect(() => {
        if (!location?.state?.currency || !location?.state?.handle || !location?.state?.title || !location?.state?.id) {
            navigate('/createtest')
        }
        handleVariants()
    }, [])

    return (
        <div className='bg-linear-gradient'>
            <div className='p-25'>
                <Navbar />
                <Card className='mt-34 p-40 border-radius-14'>
                    <h4 className='headingTitle'>Create Test</h4>
                    <span className='subHeadingTitle'>1. Select your prices to test</span>

                    <div className='mt-34 flex-row align-items-unset gap-30 flex-wrap justify-content-between'>
                        <div onClick={handleOpenControlSettings} className='wrapperControl'>
                            <div className='flex-row padding-one'>
                                <div className='imgWrapper'>
                                    <img src={ArrowIcon} alt="" />
                                </div>
                                <span className='viewControl'>Control</span>
                            </div>

                            {loading.variants ? <Loader size={40} /> : (<>
                                {variantRes && variantRes?.data?.length > 1 ? (<>
                                    <div className='padding'>
                                        <button className='viewPricing mt-40' onClick={handleOpenControlSettings}>View Pricing</button>
                                    </div>
                                </>) : (<div className='mt-22 padding'>
                                    <span className='CompareAtPriceData d-block'>{variantCompareAtPriceData && <>{location?.state?.currency} {variantCompareAtPriceData}</>}</span>
                                    <span className='ComparePrice d-block'>{location?.state?.currency} {variantPriceData}</span>
                                </div>)}
                            </>)}
                        </div>
                        {displayTestCasesArray && displayTestCasesArray.map((item) => (
                            <>
                                <div className='wrapperControl'>
                                    <div class="flex-row padding-one">
                                        <div className='imgWrapper'>
                                            <img src={ArrowIcon} alt="" />
                                        </div>
                                        <span className='viewControl'> {item.color} Test</span>
                                    </div>

                                    {/* {item.variants.length > 1 ?

                                        <span>{location?.state?.currency} {Math.min(...item.variants.map(j => j.abVariantPrice))} - {location?.state?.currency} {Math.max(...item.variants.map(j => j.abVariantPrice))}</span>
                                        :
                                        <span>{location?.state?.currency} {Math.min(...item.variants.map(j => j.abVariantPrice))}</span>
                                    }  */}

                                    <div className='padding mt-40 flex-row align-items-center justify-between'>
                                        <button onClick={() => handleOpenEditTest(item.testId)} className='managePricing mr-37'>
                                            <span className='manageSpan'>Manage Pricing</span>
                                        </button>
                                        <img src={trash} alt="" onClick={() => deleteTestCase(item.id)} />
                                    </div>
                                </div>
                            </>

                        ))}


                        <div onClick={() => displayTestCasesArray && displayTestCasesArray.length < 5 && handleOpenConfigureTest1(displayTestCasesArray && displayTestCasesArray.length > 0 ? displayTestCasesArray.length - 1 : 0)} className="testWrapper">
                            {/* <div onClick={() => handleOpenConfigureTest1(displayTestCasesArray && displayTestCasesArray.length > 0 ? displayTestCasesArray.length - 1 : 0)} style={{ display: displayTestCasesArray && displayTestCasesArray.length === 5 ? 'none' : 'flex' }} > */}

                            <div className='justify-content-center' style={{ display: displayTestCasesArray && displayTestCasesArray.length === 5 ? 'none' : 'flex' }}>
                                <img src={AddIcon} alt="" />
                            </div>
                            {displayTestCasesArray && displayTestCasesArray.length === 5 ? <span className='testHeading'>Test Limit Reached </span> : <span className='testHeading'>Add Test</span>}

                        </div>

                    </div>
                    <div className='mt-52'>
                        <span className='subHeadingTitle mb-22 d-block'> 2. Set your traffic split </span>
                        <Slider valueLabelDisplay='auto' className='rootSlider' marks={rangeSliderMarks} getAriaValueText={rangeSliderValuetext} min={10} max={90} aria-label="Volume" value={value} onChange={handleChange} />

                        <span className='trafficControl'>{displayTestCasesArray.length ? `${value}% of visiting traffic will be split evenly between your ${displayTestCasesArray.length} tests. The remaining ${100 - value}% will be sent to the control.` : `${value}% of visiting traffic will be split evenly between your tests. The remaining  ${100 - value}% will be sent to the control.`}</span>
                        <div className='flex justify-content-center align-items-center mt-153 mb-43'>
                            <button className='reviewLaunchBtn' onClick={reviewAndLaunchBtnFunc} disabled={disabled}>{loading.testCases ? <Loader size={20} /> : displayTestCasesArray.length ? "Review & Publish" : "Review & Launch"}</button>

                        </div>
                    </div>
                </Card>
            </div>


           {/* Configure test  */}
           <Modal
                open={openConfigureTest1}
                onClose={handleCloseConfigureTest1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalWrapper'
            >
                <Box sx={style}>
                    <div className=''>
                        <img className='absolutes cursor' src={closeIcon} alt="" onClick={handleCloseConfigureTest1} />
                        <h2 className='configureHeading' id="modal-modal-title">
                            Configure Test 1
                        </h2>
                        {/* {!variantRes?.data ? <Loader /> : ( */}
                        <>
                            <span className='subProductTitle mb-27' id="modal-modal-description">
                                This product has {variantRes && variantRes?.data?.length === 1 ? `${variantRes && variantRes?.data?.length} variant.` : `${variantRes && variantRes?.data?.length} variants.`}
                            </span>
                            <span className='subProductTitle'>Do you want to set each variant’s price manually or auto adjust by percentage?</span>
                            <div className='mt-33 manuallyBox'>
                                <h3 className='boxTitle'>Gif here showing setting prices manually</h3>
                                <button onClick={handleOpenManualModal} className="primaryBtn cursor">Set Prices Manually</button>
                            </div>
                            <div className='mt-28 percentageBox'>
                                <h3 className='boxTitle'>Gif here showing setting prices by percentage</h3>
                                <button onClick={handleOpenByPercentageModal} className="secondaryBtn cursor">
                                    <span>Adjust by Percentage</span>
                                </button>
                            </div>
                        </>
                        {/* )} */}
                    </div>
                </Box>
            </Modal>
            {/* set price manually modal  */}
            <Modal
                open={openManualModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalWrapper'>
                <Box sx={style}>
                    <img className='absolutes cursor' src={closeIcon} alt="" onClick={handleCloseManualModal} />
                    <h2 className='configureHeading' id="modal-modal-title">
                        Configure Test 1
                    </h2>
                    <span className='subProductTitle mb-34' id="modal-modal-description">
                        Set the price and compare at prices for each of your variants below
                    </span>
                    <Card className='MuiPaper-root-modal'>
                        <Box style={{ height: 320, width: '100%' }}>
                            {!productVariants ? <Loader size={40} /> : (
                            <>
                                <DataGrid
                                    rows={productVariants && productVariants}
                                    columns={originalVariantColumn}
                                    // onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                                    disableColumnMenu
                                    hideFooter={true}
                                    processRowUpdate={createTestProcessRowUpdate}
                                    onProcessRowUpdateError={createTestHandleProcessRowUpdateError}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    sx={{
                                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                    }}
                                />
                            </>
                            )}
                        </Box>
                    </Card>
                    <div className='flex justify-content-center align-items-center mt-53'>
                        <button className='reviewLaunchBtn min-240' onClick={onConfirm}>Confirm</button>
                    </div>
                </Box>
            </Modal>
            {/* set price by percentage modal  */}
            <Modal
                open={openByPercentageModal}
                onClose={handleCloseByPercentageModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalWrapper'
            >
                <Box sx={style}>
                    <img className='absolutes' src={closeIcon} alt="" onClick={handleCloseByPercentageModal} />
                    <h2 className='configureHeading' id="modal-modal-title">
                        Configure Test 1
                    </h2>
                    <span className='subProductTitle mb-27' id="modal-modal-description">
                        Set a percentage to adjust all variant prices by.
                    </span>
                    <div className='pricingBox'>
                        <h4 className='pricingTitle'>Which direction do you want to adjust pricing? </h4>
                        <div>
                            <div className='mobile-btn'>
                                <button className={`cursor btnPading mr-32 ${percentIncDec === '-' && "is-active"}`} onClick={() => setPercentIncDec('-')}><span>Decrease Price</span></button>
                                <button className={`cursor btnPading ${percentIncDec === '+' && "is-active"}`} onClick={() => setPercentIncDec('+')} 
                                >
                                    <span>Increase Price</span></button>
                            </div>
                        </div>
                            <h4 className='pricingTitle mt-53 mb-28'>By how much?</h4>
                        <div className='flex-row justify-content-center mobile'>
                            {percentagePrices.map(i => (<>
                                    <button  className={`cursor btnPading mr-12 ${pricePercent === i && "is-active"}`} onClick={() => setPricePercent(i)} ><span>{i}</span></button>
                            </>))}
                                <TextField type="number" className={`cursor false`} placeholder='Another amount in %' onChange={(e) => setPricePercent(e.target.value)} />
                        </div>
                    </div>
                    <div className='btnWrapper'>
                        <button className='reviewLaunchBtn' onClick={onConfirmByPercentage}>Confirm</button>
                    </div>
                </Box>
            </Modal>
            {/* Control edit test  modal  */}
            <Modal
                open={openEditTest}
                //onClose={handleCloseEditTest}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalWrapper'
            >
             <Box sx={style} >
                    <img className='absolutes cursor' src={closeIcon} alt="" onClick={() => handleCloseEditTest()} />
                    <h2 className='configureHeading' id="modal-modal-title">Test Settings</h2>
                    <span className='subProductTitle mb-34' id="modal-modal-description">
                        Set a percentage to adjust all variant prices by.
                    </span>
                    <Card className='MuiPaper-root-modal four-col'>
                        <Box style={{ height: 320, width: '100%' }}>
                            {!productVariants ? <Loader size={40} /> : (<>
                                <DataGrid
                                    rows={productVariants && productVariants}
                                    columns={originalVariantColumnTest}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    // onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                                    disableColumnMenu
                                    hideFooter={true}
                                    processRowUpdate={createTestProcessRowUpdate}
                                    onProcessRowUpdateError={createTestHandleProcessRowUpdateError}
                                    experimentalFeatures={{ newEditingApi: true }}
                                    sx={{
                                        [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                        [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                        {
                                            outline: "none",
                                        },
                                    }}
                                />
                            </>)}
                        </Box>
                    </Card>
                    <div className='flex justify-content-center align-items-center mt-53'>
                        <button className='reviewLaunchBtn min-240' onClick={onConfirmEdit}>Confirm</button>
                    </div>
                </Box>
            </Modal>
            {/* Control settings  modal  */}
            <Modal
                open={openControlSettings}
                onClose={handleCloseControlSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modalWrapper'
            >
                <Box sx={style}>
                    <img className='absolutes cursor' src={closeIcon} alt="" onClick={handleCloseControlSettings} />
                    <h2 className='configureHeading' id="modal-modal-title">
                        Control Settings
                    </h2>
                    <span className='subProductTitle mb-27' id="modal-modal-description">
                        Here are the current settings for this product on your store, They cannot be changed within PricePerfect. The prices below will be used as the control for your testing
                    </span>
                    <Card className='MuiPaper-root-modal four-col'>
                        <Box style={{ height: 320, width: '100%' }}>
                            <DataGrid
                                rows={variantRes && variantRes.data}
                                columns={controlColumn}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
                                hideFooter={true}
                                onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                                sx={{
                                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
                                    {
                                        outline: "none",
                                    },
                                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                                    {
                                        outline: "none",
                                    },
                                }}
                            />
                        </Box>
                    </Card>
                        <div className='flex justify-content-center align-items-center mt-53'>
                            <button className='reviewLaunchBtn min-240' onClick={onConfirmEdit}>Confirm</button>
                        </div>
                </Box>
            </Modal>
            <div>{errorfunction()}</div>
        </div>
    )
}

export default CreateTestStep2