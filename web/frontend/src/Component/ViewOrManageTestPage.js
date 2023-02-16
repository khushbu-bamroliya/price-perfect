import { Alert, Box, Button, Card, Chip, Collapse, IconButton, Modal, Slider, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import LinkIcon from "./Images/link-2.png"
import copyGrey from "./Images/copyGrey.png";
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import EyeIcon from "./Images/eye.png"
import pauseIcon from "./Images/pause-icon.png"
import editIcon from "./Images/edit-icon.png"
import TrashIcon from "./Images/trash.png"
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import getApiUrl from "../controller/utils.js";
import Loader from './Loader'
import cookieReader from '../controller/cookieReader'
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import closeIcon from "../Component/Images/close-circle.png";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RedImg from './Images/Red.svg';
import BlackImg from './Images/Black.svg';
import BlueImg from './Images/Blue.svg';
import CyanImg from './Images/Cyan.svg';
import GreenImg from './Images/Green.svg';
import GreyImg from './Images/Grey.svg';
import OrangeImg from './Images/Orange.svg';
import PurpleImg from './Images/Purple.svg';
import YellowImg from './Images/Yellow.svg';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as chartTooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//   import faker from 'faker';

const ViewOrManageTestPage = () => {
    const location = useLocation();
    // const {id} = location?.state;
    const testCaseImages = [BlueImg, RedImg, YellowImg, PurpleImg, GreenImg, OrangeImg, GreyImg, BlackImg, CyanImg];
    const [rangevalue, setRangeValue] = useState(10);
    let [activeTests, setActiveTests] = useState(0);
    const [testCases, setTestCases] = useState([]);
    const [control, setControlData] = useState([]);
    const [productVariants, setProductsVariants] = useState([]);
    console.log("Testcases", testCases);
    const [testIdState, setTestIdState] = useState(0);
    console.log("location: " + JSON.stringify(location?.state));
    const [loading, setLoading] = useState({
        delete: false,
        update: false,
        singleTest: false,
        editTest: false
    });
    const [opens, setOpens] = useState(false);
    const [openTestStatusModal, setOpenTestStatusModal] = useState(false);

    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [singleTest, setSingleTest] = useState()
    const [copiedTooltip, setCopiedTooltip] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openViewAnalyticsModal, setOpenViewAnalyticsModal] = React.useState(false);
    const navigate = useNavigate();
    // const { id } = useParams();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const style2 = {
        maxWidth: '741px',
        background: '#FFFFFF',
        borderRadius: '14px',
        padding: '44px 44px 70px 44px',
        outline: 'none',
        position: 'relative',
    };
    const getSingleTest = () => {
        setLoading({ singleTest: true })
        fetch(getApiUrl + `/api/get-single-testcase/${location?.state?.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')

            },
        })
            .then(async (res) => {

                const apiRes = await res.json()
                var temp = 0;
                for (let i = 0; i < apiRes?.data?.testCases.length; i++) {
                    console.log("Hello........", i);
                    // for (let j = 0; j < apiRes?.data?.testCases[i].variants.length; j++) {
                    if (apiRes?.data?.testCases[i]?.status == 'active') {
                        temp = temp + 1
                        console.log("temp", temp);
                    }
                }
                setActiveTests(temp)
                setLoading({ singleTest: false })
                console.log("apiRes.data", apiRes);
                setControlData(apiRes.controlVariants)
                setSingleTest(apiRes)
                setTestCases(apiRes.data.testCases)
            })
            .catch((error) => {
                console.log("Error", error)
                setOpens(true)
                setSnackbarColor('red')
                setsnackbar_msg("Internal Server Error")
                setLoading({ singleTest: false })
            })
    }
    const deleteTestCase = (id) => {
        setLoading({ delete: true })
        console.log("deleting");
        fetch(getApiUrl + `/api/deleteTestCase/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')
            }
        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Deleted", apiRes);
            setLoading({ delete: false })
            setOpens(true)
            setSnackbarColor('#F1F8F5')
            setsnackbar_msg("Test deleted successfully.")
            setOpenDeleteModal(false)
            navigate('/yourtests', { state: { message: "Test deleted successfully" } });

        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while deleting Test")
            console.log("Error", err);
            setLoading({ delete: false })
        })
    }
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    };
    const handleViewAnalyticsModal = () => {
        setOpenViewAnalyticsModal(true)
    };
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);
    const handleCloseViewAnalyticsModal = () => setOpenViewAnalyticsModal(false);
    const handleTestStatusModal = () => setOpenTestStatusModal(false);
    const rows2 = [
        { id: 1, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Jon', Purchases: 35, price: "56 USD" },
        { id: 2, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Cersei', Purchases: 42, price: "56 USD" },
        { id: 3, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Jaime', Purchases: 45, price: "56 USD" },
        { id: 4, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Arya', Purchases: 16, price: "56 USD" },
        { id: 5, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Daenerys', Purchases: null, price: "56 USD" },
        { id: 6, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: null, Purchases: 150, price: "56 USD" },
        { id: 7, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Ferrara', Purchases: 44, price: "56 USD" },
        { id: 8, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Rossini', Purchases: 36, price: "56 USD" },
        { id: 9, test: "Test 1", visitors: "2500 USD", addToCart: 'Lorem ipsum ', revPerVisitor: "$203.34 ", initiateCheckout: 'Harvey', Purchases: 65, price: "56 USD" },
    ];
    const columns = [
        {
            field: 'test',
            headerName: 'Test',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>

                        <p className='productID'>
                            {params.row.test}
                        </p>
                    </>
                )
            }
        },

        {
            field: 'visitors',
            headerName: 'Visitors',
            width: 250,
            sortable: false,
            flex: 0.2,

        },
        {
            field: 'addToCart',
            headerName: 'Add to Cart',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'initiateCheckout',
            headerName: 'Initiate Checkout',
            width: 500,
            sortable: false,
            flex: 0.3
        },
        {
            field: 'Purchases',
            headerName: 'Purchases',
            type: "number",
            width: 150,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <div className='actionIcon'>
                        <img src={EyeIcon} alt="" />
                        <img src={copyGrey} alt="" />
                        <img src={TrashIcon} alt="" />
                    </div>
                )
            }
        },
        {
            field: 'revPerVisitor',
            headerName: 'Rev. Per 100 Visitors',
            width: 250,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <p>
                        {params.row.revPerVisitor}
                    </p>
                )
            }
        },
    ];


    const handleEditTest = (testId) => {
        console.log("OPened");
        setTestIdState(testId);
        setOpenEditTest(true)
        const findTest = testCases.find(i => i.testId === testId);
        setProductsVariants(findTest.variants)
    }

    const updateTestStatus = () => {
        setLoading({ update: true })
        fetch(getApiUrl + `/api/updatealltests?` + new URLSearchParams({
            id: location?.state?.id,
        }), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')

            },

        }).then(async (res) => {
            const apiRes = await res.json();
            console.log("Status changes", apiRes);
            setLoading({ update: false })
            setOpenTestStatusModal(false)
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Test status updated.")
            getSingleTest();

        }).catch((err) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while updating status.")
            console.log("Error", err);
            setLoading({ update: false })
        })
    }
    const handleClose = () => {
        setOpens(false);
    };
    const errorfunction = () => {
        return (<div>
            <Snackbar
                open={opens}
                // sx={{ width: "50%" }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={3000}
                onClose={handleClose}
                className="snack-bar"
            >
                <Alert
                className="snack-bar"
                    variant="filled"
                    onClose={handleClose}
                    // sx={{ bgcolor: '#FFF4F4', color:'#000000', border:'1px solid #E0B3B2' }}
                    sx={{  bgcolor: snackbarColor, color:'#000000', border:'1px solid #95C9B4' }}
                >
                    {snackbar_msg}
                </Alert>
            </Snackbar>
        </div>)
    };
    // const handleCollapse = (e, testId) => {
    //     console.log('e', e);
    //     const foundPair = testCases.find(j => j.testId === testId)
    //     console.log("fountPair", foundPair);
    //     setExpanded(!expanded)
    // }

    // New collapsible table 
    function createData(id, variants, price, compareAtPrice, color, status) {
        return {
            id,
            //   calories,
            price,
            compareAtPrice,
            // protein,
            // price,
            variants,
            color,
            status
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

    function RowDiv(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <div className='cursor controlTest pa-28' onClick={() => setOpen(!open)}>
                    <div className={`arrowIcon ${open ? "openIcon" : "closeIcon"}`}>
                        <ArrowForwardIosIcon fontSize='large' />
                    </div>
                    <div className='flex-row flex-55 p-11'>
                        <img src={testCaseImages[row.id - 1]} alt="" />
                        <div className={`reviewHeading ${open ? "openText" : "closeText"}`}>{row.color ? row.color + " Test" : row.id}</div>
                    </div>
                    <div className={`nameTitle py-10 text-left ${open ? "openW" : "closew"}`}></div>
                    <div className={`flex-55 py-10 nameTitle ${open ? "openW" : "closew"}`}>{row.price}</div>
                    <div className={`flex-55 py-10 nameTitle ${open ? "openW" : "closew"}`}>{row.compareAtPrice}</div>
                    <div className='flex-55 py-10 nameTitle flex-row justify-content-center svg-color'>
                        {row.status === 'active' ? <img src={pauseIcon} className='cursor' alt="" onClick={(e) => { updateOneTestStatus(e,row.id) }} /> : <PlayCircleOutlinedIcon onClick={(e) => { updateOneTestStatus(e,row.id) }} />}
                        <img src={editIcon} className='cursor ml-10' alt="" onClick={() => handleEditTest(row.id)} />
                    </div>

                </div>
                <div>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {row.variants.map((i) => (
                            <div className='variantId' key={i.id}>
                                <div className='variantDeatils flex-55 text-left'></div>
                                <div className='variantDeatils text-left'>
                                    {i.variantTitle}
                                </div>
                                <div className='variantDeatils flex-55'>
                                    {singleTest?.data?.currency} {i.abVariantPrice || i.variantPrice}
                                </div>
                                <div className='variantDeatils flex-55'>
                                    {!i.abVariantComparePrice ? i.abVariantComparePrice : singleTest?.data?.currency + i.abVariantComparePrice}
                                </div>
                                <div className='variantDeatils flex-55'>
                                </div>
                            </div>
                        ))}
                    </Collapse>
                </div>
            </React.Fragment>
        );
    }
    //   Row.propTypes = {
    //     row: PropTypes.shape({
    //       calories: PropTypes.number.isRequired,
    //       carbs: PropTypes.number.isRequired,
    //       fat: PropTypes.number.isRequired,
    //       history: PropTypes.arrayOf(
    //         PropTypes.shape({
    //           amount: PropTypes.number.isRequired,
    //           customerId: PropTypes.string.isRequired,
    //           date: PropTypes.string.isRequired,
    //         }),
    //       ).isRequired,
    //       name: PropTypes.string.isRequired,
    //       price: PropTypes.number.isRequired,
    //       protein: PropTypes.number.isRequired,
    //     }).isRequired,
    //   };

    //   const rows =   [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    //     createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    //     createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    //   ];
    let rows = testCases.map(i => (

        createData(
            i.testId,
            i.variants,
            i.variants.length > 1 ?
                singleTest?.data?.currency + Math.min(...i.variants.map(j => j.abVariantPrice)) + ' - ' + singleTest?.data?.currency + Math.max(...i.variants.map(j => j.abVariantPrice))
                : i.variants.map(j => j.abVariantPrice)
            ,
            i.variants.length > 1 ?
                singleTest?.data?.currency + Math.min(...i.variants.map(j => j.abVariantComparePrice)) + ' - ' + singleTest?.data?.currency + Math.max(...i.variants.map(j => j.abVariantComparePrice))
                : i.variants.map(j => j.abVariantComparePrice)
            ,
            i.color,
            i.status

        )
    ))

console.log("rows", rows)
const addControlData = () => {
    const item = control && createData(
        'Control Test',
         control,
         control.length > 1 ?
                singleTest?.data?.currency + Math.min(...control.map(j => j.variantPrice)) + ' - ' + singleTest?.data?.currency + Math.max(...control.map(j => j.variantPrice))
                : control.map(j => j.variantPrice)
            ,
            control.length > 1 ?
            singleTest?.data?.currency + Math.min(...control.map(j => j.variantComparePrice)) + ' - ' + singleTest?.data?.currency + Math.max(...control.map(j => j.variantComparePrice))
            : control.map(j => j.variantComparePrice)
        ,
        "Control",
        'active'
         )
    // setMyArray([item, ...myArray]);
    rows.unshift(item)
console.log("control item", item)
}
if (testCases.length > 0) {
    addControlData()
}
console.log("control row added", rows)
console.log('ControlData', control);
const rows3 = [];
    // console.log("rows: " + JSON.stringify(rows));
    //   console.log("newTestArray: " + JSON.stringify(newTestArray));
    // const rows = testCases && testCases?.map((i)=>([
    //     [
    //         createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99)
    //     ]
    // ]))
    const [openEditTest, setOpenEditTest] = useState(false);
    const [openEditTrafficSplit, setOpenEditTrafficSplit] = useState(false);
    const handleCloseEditTest = () => {
        const newItems = [...testCases];
        const object = newItems.find(i => i.id === testIdState);
        console.log("object: " + object);
        object.variants = productVariants
        setTestCases(newItems);
        setOpenEditTest(false)
    };
    const handleOpenEditTrafficSplit = () => {

        setOpenEditTrafficSplit(true)
    };
    const handleCloseEditTrafficSplit = () => {

        setOpenEditTrafficSplit(false)
    };
    const onConfirmEdit = () => {
        setLoading({ editTest: true });
        const newItems = [...testCases];
        const object = newItems.find(i => i.id === testIdState);
        console.log("object: " + object);
        object.variants = productVariants
        setTestCases(newItems);
        console.log("onConfirmEdit testcases: " + testCases);
        const updateDuplicateProductData = {
            testCases: testCases,
            databaseId: location?.state?.id
        }
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                "Authorization": "Bearer " + cookieReader('token')
            },
            body: JSON.stringify(updateDuplicateProductData)
        }
        fetch(getApiUrl + '/api/updateduplicateproduct', config).then((res) => { return res.json() }).then(res => {
            console.log("res", res);
            if (res.success === true) {

                setOpens(true)
                setSnackbarColor('#325240')
                setsnackbar_msg(`${res.message}`)
                setLoading({ editTest: false })
            }
            if (res.success === false) {
                setLoading({ editTest: false })
                setOpens(true)
                setSnackbarColor('#325240')
                setsnackbar_msg(`${res.message}`)
            }
            handleCloseEditTest()
        }).catch(err => {
            console.log("error", err);
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Internal Server Error")
            setLoading({ editTest: false })

        })


    }

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
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            sortable: false,
        },
        {
            field: "abVariantComparePrice",
            headerName: "CompareAtPrice",
            minWidth: 100,
            flex: 1,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            sortable: false,
        },
    ];

    const addNewTestCase = () => {
        const productId = singleTest && singleTest?.data?.productId.split('/').pop();

        const productHandle = singleTest && singleTest?.data?.handle.split('/').pop();

        navigate('/createtest/step2', {
            state: {
                currency: singleTest && singleTest?.data?.currency,
                handle: productHandle,
                title: singleTest && singleTest?.data?.productTitle,
                id: productId,
                testCases: testCases && testCases,
                mongoId: singleTest && singleTest?.data?._id,
                trafficSplit: singleTest && singleTest?.data?.trafficSplit * singleTest?.data?.testCases.length

            }
        })
    }

    const updateOneTestStatus = (e,id) => {
        e.stopPropagation();

        console.log("id", id);
        const config = {
            method: 'PUT',
            headers: {
                shop: cookieReader('shop'),
                Authorization: 'Bearer ' + cookieReader('token')
            }
        }
        fetch(getApiUrl + `/api/updateoneteststatus/${id}?` + new URLSearchParams({
            id: location?.state?.id,
        }), config).then((res) => {
            return res.json()
        }).then(res => {
            console.log("Test status updated", res);
            setOpens(true)
            setSnackbarColor('#F1F8F5')
            setsnackbar_msg("Test status updated.")
            getSingleTest()
        }).catch((error) => {
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg("Error while updating status.")
            console.log("error", error);
        })
    }
    const onConfirmTrafficSplit = () => {
        setOpenEditTrafficSplit(false)
    }
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
    const handleChangeSlider = (event, newValue) => {
        setRangeValue(newValue);
    };
    const countActiveTests = () => {
        console.log("for loop");
        if (testCases) {
            console.log("for loop.........");

            for (let i = 0; i < testCases && testCases.length; i++) {
                console.log("testCases[i].status")
                for (let j = 0; j < testCases[i].variants.length; j++) {


                }
                if (testCases[i].status == 'active') {
                    setActiveTests(activeTests + 1)
                }
            }
        }
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        chartTooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },

        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [21, 32, 744, 55, 656, 235, 1006],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: [568, 786, 365, 454, 210, 102, 42, 56, 580],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        if (!location?.state?.id) {

            navigate('/yourtests')
        }

        getSingleTest()
        // countActiveTests();
    }, [activeTests])
    return (
        <>

            <Card className='viewormanage'>
                <div className='viewormanage-main'>
                    <Navbar />
                    <div className='viewormanageBlock'>
                        <div className='viewormanage-testData'>
                            {!singleTest ? <Loader size={40} /> : (<>

                                <Card className='viewormanage-testItem'>
                                    <Typography variant='h5'>{singleTest?.data.productTitle} </Typography>
                                    <div className='viewormanage-flex-div'>
                                        {loading.singleTest ? <Loader size={40} /> : <>

                                            <div className='viewormanage-testItemImage'>
                                                {singleTest?.data?.featuredImage ? <div className='imageWrapper'><img src={singleTest?.data?.featuredImage} alt="" /> </div> : <div className='imageWrapper'><HideImageOutlinedIcon /></div>}
                                            </div>
                                            <div className='viewormanage-testItemData'>
                                                {/* <Typography variant='h5'>{singleTest?.data.productTitle} </Typography> */}
                                                <Typography variant='caption' className='testItemData-head'>Details</Typography>
                                                <div className='border-top mt-8 pt-2'>
                                                    <div className='viewormanage-status'>
                                                        <Typography variant='caption'>Status</Typography>
                                                        <Chip label={`${singleTest.data.status}`} className={`chip_${singleTest.data.status}`} />
                                                    </div>
                                                    <div className='viewormanage-product'>
                                                        <Typography variant='caption'>Product</Typography>
                                                        <Typography variant='p'>{singleTest?.data?.productTitle}</Typography>
                                                    </div>
                                                    <div className='viewormanage-product'>
                                                        <Typography variant='caption'>Active Tests</Typography>
                                                        <Typography variant='p' className="viewormanage-product-pink-f">{activeTests && activeTests}</Typography>
                                                    </div>
                                                    <div className='viewormanage-product'>
                                                        <Typography variant='caption'>Control RPM</Typography>
                                                        <Typography variant='p' className="viewormanage-product-pink-f">{singleTest?.data?.currency} 15.98 {/*(static)*/}</Typography>
                                                    </div>
                                                    <div className='viewormanage-product'>
                                                        <Typography variant='caption'>Traffic Split</Typography>
                                                        <Typography variant='p' className="viewormanage-product-pink-f">{singleTest?.data?.trafficSplit * singleTest?.data?.testCases?.length}/{100 - singleTest.data.trafficSplit * singleTest.data.testCases.length}</Typography>
                                                    </div>
                                                </div>
                                                {/* <Tooltip arrow title={copiedTooltip ? "copied" : null} >

                                            <Button onClick={(e) => {
                                                navigator.clipboard.writeText(singleTest && singleTest?.data.handle)
                                                setCopiedTooltip(true)
                                                setInterval(() => {
                                                    setCopiedTooltip(false)
                                                }, 2000)
                                            }}>Copy Link <img src={LinkIcon} alt="" /></Button>
                                        </Tooltip> */}

                                            </div>
                                        </>}
                                    </div>
                                    <div className='viewormanage-flex-div flex-justify-content align-items-center'>
                                        <Tooltip arrow title={copiedTooltip ? "copied" : null} >
                                            <div className='copy-link-img' onClick={(e) => {
                                                navigator.clipboard.writeText(singleTest && singleTest?.data.handle)
                                                setCopiedTooltip(true)
                                                setInterval(() => {
                                                    setCopiedTooltip(false)
                                                }, 2000)
                                            }}>
                                                <img src={LinkIcon} />
                                                <a href="#">Copy Link</a>
                                            </div>
                                        </Tooltip>
                                        <div className='viewormanage-flex-button'>
                                            <button onClick={(addNewTestCase)} className='secondaryBtn cursor'><span>Edit Traffic Split</span></button>
                                        </div>
                                    </div>
                                </Card>
                                {/* <Card className='viewormanage-reviewData'>
                                    <div className='viewormanage-productDataReview productDataReview'>
                                        <Typography variant='p'>Product</Typography>
                                        <div>

                                            <Typography variant='h5'>{singleTest?.data?.productTitle}</Typography>
                                        </div>
                                    </div>
                                    <div className='trafficSplitDataReview'>
                                        <Typography variant='p'>Traffic Split </Typography>
                                        <div>
                                            <Typography variant='h5'>{singleTest?.data?.trafficSplit * singleTest?.data?.testCases?.length}/{100 - singleTest.data.trafficSplit * singleTest.data.testCases.length}</Typography>
                                        </div>
                                    </div>

                                </Card> */}
                                {/* <div className="viewormanageBtnGroup">
                                    <Button className='pauseTest' onClick={() => setOpenTestStatusModal(true)} >{singleTest?.data?.status === "pending" ? "Resume" : "Pause"} Test </Button>
                                    <div className='deleteTest' onClick={() => handleOpenDeleteModal()}>
                                        <p>Delete Test</p>
                                        <Button>Delete Test</Button>
                                    </div>
                                </div> */}
                            </>)}

                        </div>
                        <Card className='viewormanage-testAnalytics'>
                            <div>
                                <Typography variant='h5'>Test Analytics</Typography>
                                <Button variant="outlined" className='cursor' onClick={handleViewAnalyticsModal} >Expand</Button>
                            </div>
                            <Line options={options} data={data} className={` ${singleTest?.data?.featuredImage ? 'graph-h50' : 'graph-h25'}`} />
                        </Card>
                    </div>
                    <Card className='funnelBreakdown'>
                        <div className='funnel-button-div'>
                            <Typography variant='h5'>All Tests</Typography>
                            <div className='two-buttons'>
                                <Button className='cursor' onClick={addNewTestCase} disabled={singleTest && singleTest.data.testCases.length >= 5 ? true : false}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.66797 10H13.3346" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M10 13.3337V6.66699" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.5013 18.3337H12.5013C16.668 18.3337 18.3346 16.667 18.3346 12.5003V7.50033C18.3346 3.33366 16.668 1.66699 12.5013 1.66699H7.5013C3.33464 1.66699 1.66797 3.33366 1.66797 7.50033V12.5003C1.66797 16.667 3.33464 18.3337 7.5013 18.3337Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Create New Test
                                </Button>
                                <Button className='secondaryBtn cursor' onClick={() => setOpenTestStatusModal(true)}><span>{singleTest?.data?.status === "pending" ? "Resume" : "Pause"} All Tests</span> </Button>
                            </div>
                        </div>
                        <div className='mobileTitle mt-14'>
                            <div className='testCasesWrapper'>
                                <div className='testCasesTitle text-left flex-55'>Title</div>
                                <div className='testCasesTitle text-left'>Variant</div>
                                <div className='testCasesTitle flex-55'>Price</div>
                                <div className='testCasesTitle flex-55'>Compare at price</div>
                                <div className='testCasesTitle flex-55'>Actions</div>
                            </div>
                            <div className='width-fit'>
                                {rows.map((row) => (
                                    <RowDiv key={row.name} row={row} />
                                ))}
                            </div>
                        </div>





                        {/* <div className='funnelBreakdownTable' style={{ height: 400, width: '100%' }}>
                            <Table>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Variant</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Compare at price</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                            {testCases.map(i => (<>
                                <Table>


                                    <TableBody>

                                        <TableRow>

                                            <TableCell onClick={(e) => handleCollapse(e, i.testId)}>Test {i.testId}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>

                                    </TableBody>



                                </Table>
                                <Collapse in={expanded} timeout='auto' unmountOnExit>
                                {i.variants.map(j => (<>

                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>{j.variantTitle}</TableCell>
                                                <TableCell>{j.variantPrice}</TableCell>
                                                <TableCell>{j.variantComparePrice}</TableCell>
                                                <TableCell>Hwerwer</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </>))}
                                </Collapse>
                            </>))}
                        </div> */}
                    </Card>
                    <Card className='funnelBreakdown'>
                        <Typography variant='h5'>Funnel Breakdown by Test</Typography>
                        <div className='funnelBreakdownTable' style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows2}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableColumnMenu
                            />
                        </div>
                    </Card>

                </div>
                {/* <TableRow> */}
                {/* <TableCell onClick={() => setExpanded(!expanded)}>Expand</TableCell> */}

                {/* <TableCell>A</TableCell>
                                        <TableCell>B</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>D</TableCell> */}
                {/* </TableRow> */}
                {/* // View analytics modal */}
                <Modal
                    open={openViewAnalyticsModal}
                    onClose={handleCloseViewAnalyticsModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='modalWrapper'
                >
                    <Box sx={style2} className="">
                        <div className='close-icon'>
                            <img src={closeIcon} alt="" onClick={handleCloseViewAnalyticsModal} />
                        </div>
                        <Line options={options} data={data} />


                    </Box>
                </Modal>


                {/* // Delete test modal */}
                <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="configureTest1">

                        <div className='close-icon'>
                            <img src={closeIcon} alt="" onClick={() => setOpenDeleteModal(false)} />
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to delete this test case?..
                        </Typography>
                        <Button className='deleteTestCaseBtn cursor' onClick={() => deleteTestCase(location?.state?.id)}> {loading.delete ? <Loader size={20} /> : "Delete"} </Button>
                    </Box>
                </Modal>


                {/* // Test status update modal */}
                <Modal
                    open={openTestStatusModal}
                    onClose={handleTestStatusModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="configureTest1">

                        <div className='close-icon'>
                            <img src={closeIcon} alt="" onClick={() => setOpenTestStatusModal(false)} />
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to update this test case?..
                        </Typography>

                        <Button className='deleteTestCaseBtn cursor' onClick={() => updateTestStatus()}> {loading.update ? <Loader size={20} /> : singleTest?.data?.status === "pending" ? "Resume" : "Pause"} </Button>
                    </Box>
                </Modal>

                {/* Edit test cases  */}
                {/* <Modal
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
                            <div style={{ height: '100%', width: '100%' }}>
                                {!testCases ? <Loader size={40} /> : (<>

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
                            <Button className='cursor' onClick={onConfirmEdit}>Confirm</Button>
                        </div>
                    </Box>
                </Modal> */}

                {/*  */}

                <Modal
                    open={openEditTest}
                    //onClose={handleCloseEditTest}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className='modalWrapper'>
                    <Box sx={style2}>
                        <img src={closeIcon} alt="" className='absolutes cursor' onClick={() => handleCloseEditTest()} />
                        <h2 className='configureHeading' id="modal-modal-title">Test Settings</h2>
                        <span className='subProductTitle mb-34' id="modal-modal-description">
                            Set a percentage to adjust all variant prices by.
                        </span>
                        <Card className='MuiPaper-root-modal four-col'>
                            <Box style={{ height: 320, width: 'auto' }}>
                                {!testCases ? <Loader size={40} /> : (<>
                                    <DataGrid
                                        rows={productVariants && productVariants}
                                        columns={originalVariantColumn}
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
                            <button className='reviewLaunchBtn min-240 cursor' onClick={onConfirmEdit}> {loading.editTest ? <Loader size={20} /> : 'Confirm'}  </button>
                        </div>
                    </Box>
                </Modal>

                {/*  */}
                {/* Edit traffic split  */}
                {/* <Modal
                    open={openEditTrafficSplit}
                    //onClose={handleCloseEditTest}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} className="editTest">
                        <img src={closeIcon} alt="" className='closeBtn' onClick={() => handleCloseEditTrafficSplit()} />
                        <Typography id="modal-modal-title" variant="h5" component="h2">
                            Test Settings
                        </Typography>
                     <Typography id="modal-modal-description" variant='p'>
                            Set a percentage to adjust all variant prices by.
                        </Typography> 
                        <Slider valueLabelDisplay='auto' className='rootSlider' marks={rangeSliderMarks} getAriaValueText={rangeSliderValuetext} min={10} max={90} aria-label="Volume" value={rangevalue} onChange={handleChangeSlider} />

                        <div className='confirmBtn'>
                            <Button className='cursor' onClick={onConfirmTrafficSplit}>Confirm</Button>
                        </div>
                    </Box>
                </Modal> */}
                <div>{errorfunction()}</div>
            </Card>

        </>
    )
}

export default ViewOrManageTestPage