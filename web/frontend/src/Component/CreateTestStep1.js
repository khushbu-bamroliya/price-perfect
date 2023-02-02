import { Alert, Button, Card, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import searchIcon from './Images/search-normal.png';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import addTestCases from "./Images/add-circle.png"
import { useNavigate } from 'react-router-dom';
import getApiUrl from "../controller/utils.js";
import Loader from './Loader';
import cookieReader from '../controller/cookieReader';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';

const CreateTestPage = ({ shop, getProductImage }) => {
    const navigate = useNavigate();
    console.log("shop from CreateTestPage", shop);

    const [productsData, setProductsData] = useState();
    const [loading, setLoading] = useState(false);
    const [searchProduct, setSearchProduct] = useState("");

    //Pagination
    const [nextPageCursor, setNextPageCursor] = useState(null);
    const [prevPageCursor, setPrevPageCursor] = useState(null);

    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const rows = []
    productsData &&
        productsData.products.forEach((item) => {
            rows.push({
                id: item.id,
                images: item.image,
                title: item.title,
                description: item.description && item.description,
                price: item.currency + " " + item.price,
                handle: item.handle
            });
        });

    const createTestStep1Completed = (id, title, handle, imgSrc) => {
        const productId = id.split('/').pop();
        console.log("title link", title);
        const productHandle = handle.split('/').pop();
        console.log("title link", handle);
        const productTitle = title.split('/').pop();
        console.log("productId: " + productId);
        getProductImage(imgSrc)
        navigate(`/createtest2/${productHandle}/${productId}/${productTitle}`, { state: { currency: productsData.products[0].currency } })
    }
    const columns = [
        {
            field: 'images',
            headerName: 'Product',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {

                return (
                    <>
                        <div className='tableImages'>
                            <div>
                                {params.row.images ? <img src={params.row.images} alt='' /> : <HideImageOutlinedIcon />}
                            </div>
                        </div>
                        <p className='productID'>
                            {params.row.title}
                        </p>
                    </>
                )
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 500,
            sortable: false,
            flex: 0.4
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 250,
            sortable: false,
            flex: 0.3,

        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            sortable: false,
            flex: 0.1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <div className='actionIcon' onClick={(e) => e.stopPropagation()} >
                        <img src={addTestCases} alt="" onClick={() => createTestStep1Completed(params.row.id, params.row.title, params.row.handle, params.row.images)} />
                    </div>
                )
            }
        },
    ];

    const sendBody = {
        search: `${searchProduct}`,
        hasNextPageCursor: nextPageCursor,
        hasPreviousPageCursor: prevPageCursor
    }

    const getAllProductsApi = async (sendBody) => {
        setLoading(true)
        const config = {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'shop': cookieReader('shop'),
                'Authorization': 'Bearer ' + cookieReader('token'),
            },
            body: JSON.stringify(sendBody)

        }
        await fetch(getApiUrl + `/api/get-products`, config)
            .then(async (res) => {
                const products = await res.json();

                setProductsData(products)
                console.log("res1", products);
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setOpens(true)
                setsnackbar_msg("Internal Server Error")
                setSnackbarColor('red')
            })


    }

    const nextPageFunc = () => {
        console.log("nextPageFunc");
        setNextPageCursor(productsData && productsData.endCursorFromApi)
        setPrevPageCursor(null)
    }
    const prevPageFunc = () => {
        console.log("prevPageFunc");
        setPrevPageCursor(productsData && productsData.startCursorFromApi)
        setNextPageCursor(null)
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
    useEffect(() => {
    
        getAllProductsApi(sendBody)
    }, [searchProduct, nextPageCursor, prevPageCursor])
    return (
        <>
            <Card className='createTestPage'>
                <div className='createTestPage-main'>
                    <Navbar />
                    <Card className='createTestBlock'>
                        <div>
                            <div className='createTest-Block1'>
                                <Typography variant='h5'>Create Test</Typography>
                                <Typography variant='p'>Choose a product to test</Typography>
                            </div>
                            <div className='createTest-Block2'>
                                <img src={searchIcon} alt="" />
                                <TextField id="outlined-basic" placeholder="search" variant="outlined" value={searchProduct} onChange={(e) => setSearchProduct(e.target.value)} />
                            
                            </div>
                        </div>
                        <div className='createTestTable' style={{ height: 600, width: '100%' }}>
                        
                            {loading ? <Loader size={40} /> : (<>

                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    disableColumnMenu
                                    disableSelectionOnClick
                                    hideFooterPagination
                                    hideFooterSelectedRowCount
                                    onRowClick={(params) => createTestStep1Completed(params.row.id, params.row.title, params.row.handle, params.row.images)}
                                    className='scrollProductDisplayTable'
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
                        <div className='createTestBlock-buttons'>
                            <Button onClick={prevPageFunc} disabled={productsData && productsData.hasPreviousPageFromApi === true ? false : true}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.77905 2.38L4.97572 6.18333C4.52655 6.6325 4.52655 7.36749 4.97572 7.81666L8.77905 11.62" stroke="#536780" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </Button>
                            <Button onClick={nextPageFunc} disabled={productsData && productsData.hasNextPageFromApi === true ? false : true}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.22095 2.38L9.02428 6.18333C9.47345 6.6325 9.47345 7.36749 9.02428 7.81666L5.22095 11.62" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </Button>
                        </div>
                    </Card>
                </div>
            </Card>
            <div>{errorfunction()}</div>
        </>
    )
}

export default CreateTestPage