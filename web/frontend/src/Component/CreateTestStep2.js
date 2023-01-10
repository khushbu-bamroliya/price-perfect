import { Button, Card, Modal, Slider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import Navbar from './Navbar'
import closeIcon from "./Images/close-circle.png"
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getApiUrl from "../controller/utils.js";
import ArrowIcon from "./Images/arrow.png";
import AddIcon from "./Images/add-square.png";

const CreateTestStep2 = ({ objectSent }) => {
    const navigate = useNavigate()
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
    // var variantPriceData;
    // var variantCompareAtPriceData;
    const { id, title, handle } = useParams();
    
    var editableArrayData = [];
    // Display variants state
    const [variantRes, setVariantRes] = useState([]);

    const [variantPriceData, setVariantPriceData] = useState("")
    const [variantCompareAtPriceData, setVariantCompareAtPriceData] = useState();
    let [displayTestCasesArray, setDisplayTestCasesArray] = useState([])
    const [productVariants, setProductsVariants] = useState([])
    const [testIdState, setTestIdState] = useState();
    const [displayFinalVariantsArray, setDisplayFinalVariantsArray] = useState([]);



    const [pricePercent, setPricePercent] = useState("11");
    const [percentIncDec, setPercentIncDec] = useState("")

    const [value, setValue] = useState(10);
    const [hideShowBtns, setHideShowBtns] = useState("none")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log("range slider value:", value)
    // configs of configure test 
    const [openConfigureTest1, setOpenConfigureTest1] = useState(false);
    const handleOpenConfigureTest1 = () => {

        setOpenConfigureTest1(true)

    };
    const handleCloseConfigureTest1 = () => setOpenConfigureTest1(false);

    // configs of clicking manual btn
    const [openManualModal, setOpenManualModal] = useState(false);
    const handleOpenManualModal = () => { setOpenManualModal(true); setOpenConfigureTest1(false) };
    const handleCloseManualModal = () => setOpenManualModal(false);

    // configs of clicking auto btn
    const [openByPercentageModal, setOpenByPercentageModal] = useState(false);
    const handleOpenByPercentageModal = () => { setOpenByPercentageModal(true); setOpenConfigureTest1(false) };
    const handleCloseByPercentageModal = () => setOpenByPercentageModal(false);


    // configs of edit test button
    const [openEditTest, setOpenEditTest] = useState(false);
    const handleOpenEditTest = (testId) => {
        setTestIdState(testId)
        setOpenEditTest(true);
        setOpenConfigureTest1(false)
        const singleTest = displayTestCasesArray.find(item => item.testId === testId)

        console.log("setTestIdState", testIdState);
    }
    const handleCloseEditTest = () => {
        if (displayTestCasesArray) {
            console.log("Change test");
            displayTestCasesArray[testIdState - 1] = {
                id: testIdState,
                testId: testIdState,
                variants: productVariants
            }
        }
        // displayTestCasesArray && displayTestCasesArray[testIdState - 1].variants = productVariants
        setOpenEditTest(false)


    };


    // configs of edit test button
    const [openControlSettings, setOpenControlSettings] = useState(false);
    const handleOpenControlSettings = () => {
        setOpenControlSettings(true); setOpenConfigureTest1(false)

        // const disp = objectToBeSent.testCases && objectToBeSent.testCases.map(i => i?.variants.map((j) => displayFinalVariantsArray.push({
        //     id: j.id,
        //     abVariantComparePrice:j.abVariantComparePrice,
        //     abVariantPrice:j.abVariantPrice,
        //     productId:j.productId,
        //     variantComparePrice:j.variantComparePrice,
        //     variantPrice:j.variantPrice,
        //     variantTitle:j.variantTitle
        // })))

    };
    const handleCloseControlSettings = () => setOpenControlSettings(false);

    let testId = 0;
    console.log("displayTestCasesArray", displayTestCasesArray)
    const totalTests = displayTestCasesArray && displayTestCasesArray.length;
    console.log("Total number of tests", totalTests)

    // displayTestCasesArray.push({
    //     testId:displayTestCasesArray.length+1,
    //     id: productVariants[0].id,
    //     abVariantPrice: productVariants[0].abVariantPrice,
    //     abVariantComparePrice: productVariants[0].abVariantComparePrice,
    //     productId:productVariants[0].productId,
    //     variantComparePrice:productVariants[0].variantComparePrice,
    //     variantPrice:productVariants[0].variantPrice,
    //     variantTitle:productVariants[0].variantTitle,
    // })

    const onConfirm = () => {
        setHideShowBtns("flex")
        handleCloseManualModal() || handleCloseByPercentageModal()

        displayTestCasesArray.push({
            testId: displayTestCasesArray.length + 1,
            id: displayTestCasesArray.length + 1,

            variants: productVariants
        })


    }

    const objectToBeSent = {
        trafficSplit: value / totalTests,
        testCases: displayTestCasesArray,
        "productId": `gid://shopify/Product/${id}`,
        
    }

    console.log("Object to be sent", objectToBeSent);
    console.log("Split by percentage", value / totalTests);
    console.log("displayFinalVariantsArray", displayFinalVariantsArray && displayFinalVariantsArray);

    const onConfirmEdit = () => {
        handleCloseEditTest() || handleCloseControlSettings()
        // const object = displayTestCasesArray.findIndex(obj => obj.testId === editVariantId);

    }

    function btns() {
        return (<div className='afterConfirmBtns' style={{ display: hideShowBtns }}>
            <Button onClick={handleOpenControlSettings} className='afterConfirmControlBtn'>Control</Button>
            <div className='afterConfirmTesteditBtn'>
                <p>Test edit</p>
                <Button onClick={handleOpenEditTest}>Test edit</Button>
            </div>
        </div>)
    }

    const rows = [
        displayTestCasesArray.map(i =>
            [
                {
                    id: i.testId,
                    variantTitle: i.variants.map((j) => {
                        return j.variantTitle
                    }),
                    abVariantPrice: i.variants.map((j) => {
                        return j.abVariantPrice
                    }),
                    abVariantComparePrice: i.variants.map((j) => {
                        return j.abVariantComparePrice
                    }),

                }
            ]

        )
    ];

    const rowssss = [
        { id: 1, price: '$5600 ', title: 'Jon --', compareAtPrice: "$4000" },
        { id: 2, price: '$5600 ', title: 'Cersei', compareAtPrice: "$4000" },
    ];
    var apiRes;
    const handleVariants = async () => {


        let data = {
            productId: `gid://shopify/Product/${id}`
        }

        fetch(getApiUrl + '/api/get-variants', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(async (res) => {

                apiRes = await res.json()
                console.log("apiRes.data", apiRes.data);

                const updatedArray = apiRes.data.map((item, index) => {



                    return { ...item, "abVariantComparePrice": item.variantComparePrice, "abVariantPrice": item.variantPrice }



                    return item;

                })

                setVariantPriceData(apiRes.data[0].variantPrice)
                setVariantCompareAtPriceData(apiRes.data[0].variantComparePrice)
                setProductsVariants(updatedArray)
                setVariantRes(apiRes)
            })
            .catch((error) => console.log("Error", error))
    }
    const cellEditStopManualModal = (params, event) => {

        const objectIndex = productVariants?.findIndex((obj) => obj.id === params.row.id)

        const ObjKeyExists = Object.hasOwn(productVariants[objectIndex], params.field)
        if (ObjKeyExists) {


            const updatedArray = productVariants?.map((item, index) => {
                console.log("item", item);
                if (index === objectIndex) {
                    // setEditVariantId(item.testId)
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
            console.log("Updated array cellEditStopManualModal", updatedArray);
        }
    }
    console.log("Variants res =====>", variantRes && variantRes.data);



    // productVariants && productVariants?.forEach((item) => {
    //     originalVariantArray.push({
    //         id: item.variant_id,
    //         title: item.variantTitle,
    //         variantPrice: item.variantPrice,
    //         variantComparePrice: item.variantComparePrice
    //     })
    // })
    console.log("productVariants", productVariants && productVariants);



    const originalVariantColumn = [
        // { field: "id", headerName: "Emp ID", minWidth: 120, flex: 1 },
        {
            field: "variantTitle",
            headerName: "Title",
            minWidth: 80,
            flex: 1,
            editable: true,
        },
        {
            field: "abVariantPrice",
            headerName: "Price",
            minWidth: 120,
            flex: 1,
            editable: true,

        },
        {
            field: "abVariantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 1,
            editable: true,

        },
    ];

    const controlcolumns = [

        {
            field: 'variantTitle',
            headerName: 'Title',
            width: 250,
            sortable: false,
            flex: 0.5,

            renderCell: (params) => {
                return (<>
                    <>
                        {params.row.variants.map((role, index) => (
                            <>

                                <>{role.variantTitle}</><br />
                            </>
                        ))}
                    </>
                </>)



            }
        },


        {
            field: 'abVariantPrice',
            headerName: 'Price',
            width: 500,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.variants.map((role, index) => (
                            <>{role.abVariantPrice}<br /></>
                        ))}
                    </>
                )
            }

        },
        {
            field: 'abVariantComparePrice',
            headerName: 'Compare at price',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.variants.map((role, index) => (
                            <>{role.abVariantComparePrice}<br /></>
                        ))}
                    </>
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
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];


    console.log("New Array updated of productVariants", productVariants);
    const reviewAndLaunchBtnFunc = () => {
        let duplicateProductData = {
            'productId': id,
            'productTitle': title,
            handle:handle,
            objectToBeSent,
        
        }

        fetch(getApiUrl + '/api/createDuplicateProduct', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(duplicateProductData)
        })
            .then(async (res) => {
                // console.log("Duplicate product id: " + res.data.productDuplicate.newProduct.id);

                const apiRes = await res.json()
                console.log("apiRes: " + JSON.stringify(apiRes));
                // console.log("Data sent", apiRes.data.data.productDuplicate.newProduct.id);
                // const duplicateProductId = apiRes.data.data.productDuplicate.newProduct.id;
                // const duplicateVariants = apiRes.data.data.productDuplicate.newProduct.variants.node || apiRes.data.data.productDuplicate.newProduct.variants.nodes
                let data = {
                    "trafficSplit": objectToBeSent.trafficSplit,
                    "testCases": objectToBeSent.testCases,
                    "productId": objectToBeSent.productId,
                    // duplicateProductId,
                    // duplicateVariants

                }
            
                fetch(getApiUrl + '/api/createTestCase', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(async (res2) => {

                        const apiRes2 = await res2.json()
                        console.log("Data sent:", apiRes2);
                        objectSent(apiRes)
                        navigate(`/reviewtest`);


                    })
                    .catch((error) => console.log("Error", error))

            })
            .catch((error) => console.log("Error", error))

        
    }
    const percentagePrices = [
        "2%", "3%", "5%", "10%", "Another Amount"
    ]

    console.log("pricePercent", pricePercent);
    const onConfirmByPercentage = () => {
        console.log("percentIncDec", percentIncDec);
        console.log("Hello", variantRes);
        const updatedArray = variantRes && variantRes?.data.map(item => {
            console.log("original productVariants from percentage", variantRes);

            const variantPriceTemp = (item.variantPrice / 100) * pricePercent.replace('%', '')
            const variantComparePriceTemp = (item.variantComparePrice / 100) * pricePercent.replace('%', '')
            console.log("variantPriceTemp", variantPriceTemp);
            console.log("calculated variant price temp", variantComparePriceTemp);
            if (percentIncDec === "+") {

                const variantPriceTempFinal = Math.round(Number(item.variantPrice) + variantPriceTemp)
                const variantComparePriceFinal = Math.round(Number(item.variantComparePrice) + variantComparePriceTemp)
                // console.log("final number is:", final);
                console.log("final number is temp2:", variantPriceTempFinal);
                return { ...item, "variantPrice": variantPriceTempFinal, "abVariantPrice": variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal }
            } else {
                const variantPriceTempFinal = Math.round(Number(item.variantPrice) - variantPriceTemp)
                const variantComparePriceFinal = Math.round(Number(item.variantComparePrice) - variantComparePriceTemp)
                // console.log("final number is:", final);
                console.log("final number is temp2:", variantPriceTempFinal);
                return { ...item, "variantPrice": variantPriceTempFinal, "abVariantPrice": variantPriceTempFinal, "variantComparePrice": variantComparePriceFinal, "abVariantComparePrice": variantComparePriceFinal }

            }
            return item
        })
        console.log("Hello again", updatedArray);
        setProductsVariants(updatedArray)
        displayTestCasesArray.push({
            testId: displayTestCasesArray.length + 1,
            id: displayTestCasesArray.length + 1,

            variants: updatedArray
        })
        handleCloseByPercentageModal()
    }
    useEffect(() => {
        handleVariants()
    }, [])
    const data = "Hello data passed"
    return (
        <>
            <Card className='createTestStep2'>
                <div className='createTestStep2-main'>
                    <Navbar />
                    {/* <Button onClick={() => objectSent(objectToBeSent)}>Test</Button> */}
                    <Card className='createTestStep2Block'>
                        <Typography variant='h4'>Create Test</Typography>
                        <Typography variant='p'>1. Select your prices to test</Typography><br />
                        {/* <><ol><li> Select your prices to test</li></ol></> */}
                        {/* <span  >
                            <div onClick={handleOpenControlSettings}>

                                <p>variantPriceData:{variantPriceData}</p>
                                <p>variantCompareAtPriceData:{variantCompareAtPriceData}</p><br />
                            </div>
                            {displayTestCasesArray && displayTestCasesArray.map((item) => (<>
                                <div onClick={() => handleOpenEditTest(item.testId)}>

                                    <p>variantPriceData:{item.variants[0].abVariantPrice}</p>
                                    <p>variantCompareAtPriceData:{item.variants[0].abVariantComparePrice}</p><br />
                                </div>
                            </>))}
                        </span><br />
                        <Button onClick={handleOpenConfigureTest1}>
                            Add Test
                        </Button><br /> */}


                        <div className='add-test-wrapper'>
                            <div className='control-wrapper' onClick={handleOpenControlSettings}>
                                <div className='control-box'>
                                    <div className='icon-wrapper'>
                                        <img src={ArrowIcon} alt="" />
                                    </div>
                                    <span className='box-title'>Control</span>
                                </div>
                                <span className='box-price'>{variantCompareAtPriceData && <>${variantCompareAtPriceData}</>}</span>
                                <span className='box-prices'>${variantPriceData}</span>
                            </div>
                            {displayTestCasesArray && displayTestCasesArray.map((item) => (<>

                                <div className='control-wrapper' onClick={() => handleOpenEditTest(item.testId)}>
                                    <div className='control-box'>
                                        <div className='icon-wrapper'>
                                            <img src={ArrowIcon} alt="" />
                                        </div>
                                        <span className='box-title'>Test {item.testId}</span>
                                    </div>
                                    <span className='box-price'> {variantCompareAtPriceData && <>${variantCompareAtPriceData}</>} - ${item.variants[0].abVariantComparePrice}</span>
                                    <span className='box-prices'>${variantPriceData} - ${item.variants[0].abVariantPrice}</span>
                                </div>
                            </>))}

                            <div className='add-wrapper' onClick={handleOpenConfigureTest1} style={{ display: displayTestCasesArray && displayTestCasesArray.length === 10 ? 'none' : 'flex' }} >
                                <div className='add-icon'>
                                    <img src={AddIcon} alt="" />
                                </div>
                                <span className='add-test'>Add Test</span>
                            </div>
                            {/* <div className='add-wrapper'>
                                    <div className='add-icon'>
                                        <img src={AddIcon} alt="" />
                                    </div>
                                    <span className='add-test'>Add Test</span>
                                </div>
                                <div className='add-wrapper'>
                                    <div className='add-icon'>
                                        <img src={AddIcon} alt="" />
                                    </div>
                                    <span className='add-test'>Add Test</span>
                                </div> */}
                        </div>

                        <Typography variant='p'> 2. Set your traffic split </Typography>
                        <Slider className="trafficSlider" valueLabelDisplay='auto' min={10} max={90} aria-label="Volume" value={value} onChange={handleChange} />
                        <Typography variant='p' className='trafficSplitInfo'> {displayTestCasesArray.length && `${value}% of visiting traffic will be split evenly between your ${displayTestCasesArray.length} tests. The remaining ${100 - value}% will be sent to the control.`}</Typography>
                        <div>
                            {/* {btns()} */}
                            <Button onClick={reviewAndLaunchBtnFunc} className='step2completed'>Review & Launch</Button>

                            {/* <Button  className='step2completed' onClick={handleVariants}>jash</Button> */}
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
                    <Typography id="modal-modal-description" variant='p'>
                        This product has 5 variants.
                    </Typography><br /><br />
                    <Typography variant='p'>Do you want to set each variant’s price manually or auto adjust by percentage? </Typography>
                    <div className='setManuallyBlock'>
                        <Typography variant='p'>Gif here showing setting prices manually</Typography>
                        <Button onClick={handleOpenManualModal} >Set Prices Manually</Button>
                    </div>
                    <div className='setAutoBlock'>
                        <Typography variant='p'>Gif here showing setting prices by percentage</Typography>

                        <div className='btn_adjust'>

                            <p>Adjust by Percentage</p>
                            <Button onClick={handleOpenByPercentageModal}></Button>
                        </div>

                    </div>
                </Box>
            </Modal>

            {/* set price manually modal  */}
            <Modal
                open={openManualModal}
                onClose={handleCloseManualModal}
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
                            <DataGrid
                                rows={productVariants}
                                columns={originalVariantColumn}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
                                onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                            />
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
                            <Button onClick={() => setPercentIncDec('-')} >Decrease Price </Button>
                            <div className='increasePriceBtn' onClick={() => setPercentIncDec('+')} >

                                <p>Increase Price</p>
                                <Button>Increase Price</Button>
                            </div>
                        </div>
                        <span>

                            <Typography variant='h5'>By how much? </Typography>
                        </span>
                        <div className='percentageBtnGroup'>
                            {percentagePrices.map(i => (<>

                                <div>
                                    <p>{i}</p>
                                    <Button onClick={() => setPricePercent(i)} >{i}</Button>
                                </div>
                            </>))}

                            {/* <Button>3&</Button>
                            <Button>5%</Button>
                            <Button>10%</Button>
                            <Button>Other Amount</Button> */}
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
                onClose={handleCloseEditTest}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="editTest">
                    <img src={closeIcon} alt="" className='closeBtn' onClick={handleCloseEditTest} />
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Test Settings
                    </Typography>
                    <Typography id="modal-modal-description" variant='p'>
                        Set a percentage to adjust all variant prices by.
                    </Typography>
                    <div className='controlTable'>
                        <div style={{ height: '100%', }}>
                            <DataGrid
                                rows={displayTestCasesArray && displayTestCasesArray[testIdState - 1]?.variants}
                                columns={originalVariantColumn}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
                                onCellEditStop={(params, event) => { cellEditStopManualModal(params, event) }}
                            />
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
                        {/* <div style={{ height: '100%', }}>
                            <DataGrid
                                rows={displayTestCasesArray && displayTestCasesArray}
                                columns={controlcolumns}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
                            />
                        </div> */}

                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Compare at Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayTestCasesArray && displayTestCasesArray.map((row) => (
                                    <TableRow
                                        key={row.testId}
                                    >

                                        <TableCell align="right">{row.variants.map((i) => (<>
                                            <>{i.variantTitle}</><br />
                                        </>))
                                        }</TableCell>
                                        <TableCell align="right">{row.variants.map((i) => (<>
                                            <>{i.variantPrice}</><br />
                                        </>))
                                        }</TableCell>
                                        <TableCell align="right">{row.variants.map((i) => (<>
                                            <>{i.variantComparePrice}</><br />
                                        </>))
                                        }</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className='confirmBtn'>
                        <Button onClick={onConfirmEdit}>Confirm</Button>
                    </div>
                </Box>
            </Modal>



        </>
    )
}

export default CreateTestStep2