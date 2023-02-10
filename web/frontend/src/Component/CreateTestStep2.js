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

const CreateTestStep2 = ({ objectSent }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '741px',
        height: '644px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { id, title, handle } = useParams();


    const [variantRes, setVariantRes] = useState([]);

  const [opens, setOpens] = useState(false);
  const [snackbar_msg, setsnackbar_msg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [variantPriceData, setVariantPriceData] = useState("")
    const [variantCompareAtPriceData, setVariantCompareAtPriceData] = useState();
    const [displayTestCasesArray, setDisplayTestCasesArray] = useState([])
    const [productVariants, setProductsVariants] = useState([])
    const [testIdState, setTestIdState] = useState(0);


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
        setHideShowBtns("flex")
        handleCloseManualModal() || handleCloseByPercentageModal()

        setDisplayTestCasesArray([
            ...displayTestCasesArray, {
                testId: displayTestCasesArray.length + 1,
                id: displayTestCasesArray.length + 1,
                variants: productVariants
            }
        ])
        setDisabled(false)
    
    }

    const onConfirmEdit = () => {
        handleCloseEditTest() || handleCloseControlSettings()
    }

    var apiRes;
    const handleVariants = async () => {
setLoading(true)
        let data = {
            productId: `gid://shopify/Product/${id}`
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
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
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
    const originalVariantColumn = [
        {
            field: "variantTitle",
            headerName: "Title",
            minWidth: 80,
            flex: 1,
            editable: false,
            sortable: false,
        },
        {
            field: "abVariantPrice",
            headerName: "Price",
            minWidth: 120,
            flex: 1,
            editable: true,
            sortable: false,
        },
        {
            field: "abVariantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 1,
            editable: true,
            sortable: false,
        },
    ];

    const reviewAndLaunchBtnFunc = () => {
        setLoading(true)
        setDisabled(true)
        const objectToBeSent = {
            trafficSplit: parseInt(Number(value) / Number(totalTests)),
            testCases: displayTestCasesArray,
            currency:location?.state?.currency,
            "productId": `gid://shopify/Product/${id}`,
        }

        let duplicateProductData = {
            "trafficSplit": objectToBeSent.trafficSplit,
            'productId': id,
            'productTitle': title,
            handle: handle,
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
                "Authorization":"Bearer " + cookieReader('token')
            },
            body: JSON.stringify(duplicateProductData)
        })
            .then(async (res) => {

                const apiRes = await res.json()
            
                setLoading(false)
                objectSent({ apiRes, controlData: variantRes.data })
                setOpens(true)
                setSnackbarColor('#325240')
                setsnackbar_msg("Test created successfully")
                navigate(`/reviewtest`, {state:{message: "Test created successfully"}})
            })
            .catch((error) => {
                setOpens(true)
                setLoading(false)
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
                
                return { ...item, "variantPrice":  variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "abVariantPrice":   variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal }
            } else {
                const variantPriceTempFinal = (Number(item.variantPrice) - variantPriceTemp).toFixed(2)
                const variantComparePriceFinal = (Number(item.variantComparePrice) - variantComparePriceTemp).toFixed(2)
        
                return { ...item, "variantPrice":  variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "abVariantPrice":  variantPriceTempFinal === '0.00' ? null : variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal === '0.00' ? null : variantComparePriceFinal }

            }
            return item
        })
        setProductsVariants(updatedArray);
        console.log("updatedArray", updatedArray);
        setDisplayTestCasesArray([
            ...displayTestCasesArray,
            {
                testId: displayTestCasesArray.length + 1,
                id: displayTestCasesArray.length + 1,
                variants: updatedArray
            }])

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
        //   label: <div><img src={ArrowIcon} alt="" /><p>10%</p></div>,
          label: '10%',
        },
        {
          value: 25,
          label: '25%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 75,
          label: '75%',
        },
      ];
      const rangeSliderValuetext = (value) => {
        return `${value}°C`;
      }
    useEffect(() => {
        if (!location?.state?.currency) {
            navigate('/createtest')
        }
        handleVariants()
    }, [])

    return (
        <>
            <Card className='createTestStep2'>
                <div className='createTestStep2-main'>
                    <Navbar />
                    <Card className='createTestStep2Block'>
                        <Typography variant='h4'>Create Test</Typography>
                        <Typography variant='p'>1. Select your prices to test</Typography><br />
            
                        <div className='add-test-wrapper'>
                            <div className='control-wrapper' onClick={handleOpenControlSettings}>
                                <>

                                    <div className='control-box'>
                                        <div className='icon-wrapper'>
                                            <img src={ArrowIcon} alt="" />
                                        </div>
                                        <span className='box-title'>Control</span>
                                    </div>

                                    {loading ? <Loader size={40} /> : (<>
                                        <span className='box-price'>{variantCompareAtPriceData && <>{location?.state?.currency} {variantCompareAtPriceData}</>}</span>
                                        <span className='box-prices'>{location?.state?.currency} {variantPriceData}</span>
                                    </>)}
                                </>
                            </div>
                            {displayTestCasesArray && displayTestCasesArray.map((item) => (<>

                                <div className='control-wrapper' onClick={() => handleOpenEditTest(item.testId)}>
                                    <div className='control-box'>
                                        <div className='icon-wrapper'>
                                            <img src={ArrowIcon} alt="" />
                                        </div>
                                        <span className='box-title'>Test {item.testId}</span>
                                    </div>
                                    {item.variants.length > 1 ?

                                        <span className='box-prices'>{location?.state?.currency} {Math.min(...item.variants.map(j => j.abVariantPrice))} - {location?.state?.currency} {Math.max(...item.variants.map(j => j.abVariantPrice))}</span>
                                        :
                                        <span className='box-prices'>{location?.state?.currency} {Math.min(...item.variants.map(j => j.abVariantPrice))}</span>
                                    }
                                </div>
                            </>))}

                            <div className='add-wrapper' onClick={() => handleOpenConfigureTest1(displayTestCasesArray && displayTestCasesArray.length > 0 ? displayTestCasesArray.length - 1 : 0)} style={{ display: displayTestCasesArray && displayTestCasesArray.length === 10 ? 'none' : 'flex' }} >
                                <div className='add-icon'>
                                    <img src={AddIcon} alt="" />
                                </div>
                                <span className='add-test'>Add Test</span>
                            </div>
                        
                        </div>

                        <Typography variant='p'> 2. Set your traffic split </Typography>
                        
                        <Slider className="trafficSlider" valueLabelDisplay='auto' marks={rangeSliderMarks} getAriaValueText={rangeSliderValuetext} min={10} max={90} aria-label="Volume" value={value} onChange={handleChange} />
                        
                        <Typography variant='p' className='trafficSplitInfo'> {displayTestCasesArray.length ? `${value}% of visiting traffic will be split evenly between your ${displayTestCasesArray.length} tests. The remaining ${100 - value}% will be sent to the control.` : `${value}% of visiting traffic will be split evenly between your tests. The remaining  ${100 - value}% will be sent to the control.`}</Typography>
                        <div>
                            <Button onClick={reviewAndLaunchBtnFunc} disabled={disabled} className='step2completed'>{loading ? <Loader size={20} /> :  displayTestCasesArray.length?"Review & Publish": "Review & Launch"}</Button>
                
                        </div>
                    </Card>
                </div>
            </Card>


            {/* Configure test  */}
            <Modal
                open={openConfigureTest1}
                onClose={handleCloseConfigureTest1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="configureTest1">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={handleCloseConfigureTest1} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Configure Test 1
                    </Typography>
                    {!variantRes?.data ? <Loader/>:(<>

                    <Typography id="modal-modal-description" variant='p'>
                        This product has {variantRes && variantRes?.data?.length === 1 ? `${variantRes && variantRes?.data?.length} variant.` :`${variantRes && variantRes?.data?.length} variants.`} 
                    </Typography>
                    <Typography variant='p'>Do you want to set each variant’s price manually or auto adjust by percentage? </Typography>
                    <div className='setManuallyBlock'>
                        <Typography variant='p'>Gif here showing setting prices manually</Typography>
                        <Button onClick={handleOpenManualModal} >Set Prices Manually</Button>
                    </div>
                    <div className='setAutoBlock'>
                        <Typography variant='p'>Gif here showing setting prices by percentage</Typography>

                        <div className='btn_adjust'>

                            <Button onClick={handleOpenByPercentageModal}>Adjust by Percentage</Button>
                        </div>

                    </div>
                    </>)}
                </Box>
            </Modal>

            {/* set price manually modal  */}
            <Modal
                open={openManualModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
        
            >
                <Box sx={style} className="manualmodal">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={handleCloseManualModal} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Configure Test 1
                    </Typography>
                    <Typography id="modal-modal-description" variant='p'>
                        Set the price and compare at prices for each of your variants below
                    </Typography>

                    <Card className='manualModalTable'>
                        <div style={{ height: '100%', width: '100%' }}>
                            {!productVariants ? <Loader size={40} /> : (<>
                                <DataGrid
                                    rows={productVariants && productVariants}
                                    columns={originalVariantColumn}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    // onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                                    disableColumnMenu
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
                        </div>
                    </Card>
                    <div>

                        <Button onClick={onConfirm}>Confirm</Button>
                    </div>
                </Box>
            </Modal>

            {/* set price by percentage modal  */}
            <Modal
                open={openByPercentageModal}
                onClose={handleCloseByPercentageModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="byPercentage">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={handleCloseByPercentageModal} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Configure Test 1
                    </Typography>
                    <Typography id="modal-modal-description" variant='p'>
                        Set a percentage to adjust all variant prices by.
                    </Typography>
                    <div className='byPercentageDirection'>
                        <Typography variant='h5'>Which direction do you want to adjust pricing? </Typography>
                        <div className='inc-dec-btn-group'>
                            <div className={`increasePriceBtn ${percentIncDec === '-' && "is-active"} `} onClick={() => setPercentIncDec('-')} >
                                <p>Decrease Price</p>
                                <Button>Decrease Price</Button>
                            </div>
                            <div className={`increasePriceBtn ${percentIncDec === '+' && "is-active"} `} onClick={() => setPercentIncDec('+')} >
                                <p>Increase Price</p>
                                <Button>Increase Price</Button>
                            </div>
                        </div>
                        <span>
                            <Typography variant='h5'>By how much? </Typography>
                        </span>
                        <div className='percentageBtnGroup'>
                            {percentagePrices.map(i => (<>

                                <div className={`increasePriceBtn ${pricePercent === i && "is-active"} `}>

                                    <p>{i}</p>
                                    <Button onClick={() => setPricePercent(i)} >{i}</Button>
                                </div>
                            </>))}
                            <div className='anotherAmount'>
                                <TextField type="number" placeholder='Another amount in %' onChange={(e) => setPricePercent(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className='confirmBtn'>
                        <Button onClick={onConfirmByPercentage}>Confirm</Button>
                    </div>
                </Box>
            </Modal>

            {/* Control edit test  modal  */}
            <Modal
                open={openEditTest}
                //onClose={handleCloseEditTest}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="editTest">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={() => handleCloseEditTest()} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Test Settings
                    </Typography>
                    <Typography id="modal-modal-description" variant='p'>
                        Set a percentage to adjust all variant prices by.
                    </Typography>
                    <div className='controlTable'>
                        <div style={{ height: '100%', }}>
                            {!productVariants ? <Loader size={40} /> : (<>

                                <DataGrid
                                    rows={productVariants && productVariants}
                                    columns={originalVariantColumn}
                                    pageSize={6}
                                    rowsPerPageOptions={[6]}
                                    // onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                                    disableColumnMenu
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
                        </div>
                    </div>

                    <div className='confirmBtn'>
                        <Button onClick={onConfirmEdit}>Confirm</Button>
                    </div>
                </Box>
            </Modal>

            {/* Control settings  modal  */}
            <Modal
                open={openControlSettings}
                onClose={handleCloseControlSettings}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="controlSettings">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={handleCloseControlSettings} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Control Settings
                    </Typography>
                    <Typography id="modal-modal-description" variant='p'>
                        Here are the current settings for this product on your store, They cannot be changed within PricePerfect. The prices below will be used as the control for your testing
                    </Typography>
                    <div className='controlTable' style={{ overflowY: 'auto' }}>
                        <div style={{ height: '100%', }}>
                            <DataGrid
                                rows={variantRes && variantRes.data}
                                columns={controlColumn}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
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
                        </div>
                    </div>

                </Box>
            </Modal>
            <div>{errorfunction()}</div>
        </>
    )
}

export default CreateTestStep2