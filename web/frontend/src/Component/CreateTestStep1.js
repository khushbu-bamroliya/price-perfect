import { Button, Card, Pagination, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar';
import searchIcon from './Images/search-normal.png';
import { DataGrid } from '@mui/x-data-grid';
import avatar from "./Images/image.png"
import addTestCases from "./Images/add-square.png"
import { NavLink, useNavigate } from 'react-router-dom';

const CreateTestPage = () => {
    const navigate = useNavigate();


    // let products = {};
    const [productsData, setProductsData] = useState();
    const [searchProduct, setSearchProduct] = useState("");

    //Pagination

    const [nextPageCursor, setNextPageCursor] = useState(null);
    const [prevPageCursor, setPrevPageCursor] = useState(null);

    const rows = []
    productsData &&
        productsData.products.forEach((item) => {
            rows.push({
                id: item.id,
                images: item.image,
                title: item.title,
                description: item.description && item.description,
                price: item.price,
                handle:item.handle
            });
        });

        const createTestStep1Completed = (id, title, handle) => {
            const productId = id.split('/').pop();
            console.log("title link", title);
            const productHandle = handle.split('/').pop();
            console.log("title link", handle);
            const productTitle = title.split('/').pop();
            console.log("productId: " + productId);
            navigate(`/createtest2/${productHandle}/${productId}/${productTitle}`)
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
                                <img src={params.row.images} alt='' />
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
            renderCell: (params) => {
                return (
                    <div className='actionIcon'>
                         <img src={addTestCases} alt="" onClick={() => createTestStep1Completed(params.row.id, params.row.title,  params.row.handle)} />
                    </div>
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
        //     valueGetter: (params) => console.log("params", params)
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];

    const sendBody = {
        search: `${searchProduct}`,
        hasNextPageCursor: nextPageCursor,
        hasPreviousPageCursor:prevPageCursor
    
    }

    const getAllProductsApi = async (sendBody) => {
    
        const config = {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)

        }
        // const data =    await fetch(`https://691b-2405-201-200c-6246-c0db-a72d-57f9-f6ea.in.ngrok.io/api/get-products`, config).then(async (res) => console.log("All products",await res.json())).catch((err) => console.log("Product error", err))
        await fetch(`/api/get-products`, config)
            .then(async (res) => {
                const products = await res.json();

                setProductsData(products)
                console.log("res1", products);
                // useCallback(() => {setAllProducts(products)},[products])
            })
            .catch(err => console.log(err))


    }
    // setAllProducts(products);
    
    const nextPageFunc = () => {
        console.log("nextPageFunc");
        setNextPageCursor(productsData && productsData.endCursorFromApi)
        setPrevPageCursor(null)
        // getAllProductsApi(sendBody);
    }
    const prevPageFunc = () => {
        console.log("prevPageFunc");
        setPrevPageCursor(productsData && productsData.startCursorFromApi)
        setNextPageCursor(null)
    }
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
                                <Button variant="outlined">
                                    <NavLink to="/createtest2">
                                        Next
                                    </NavLink>
                                </Button>
                            </div>
                        </div>

                        <div className='createTestTable' style={{ height: 600, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                // pageSize={5}
                                // rowsPerPageOptions={[5]}

                                disableColumnMenu
                                disableSelectionOnClick
                                hideFooterPagination
                                hideFooterSelectedRowCount
                                className='scrollProductDisplayTable'
                            />
                        </div>
                        <Button onClick={prevPageFunc} disabled={productsData && productsData.hasPreviousPageFromApi === true? false : true}>&lt;</Button>
                        <Button onClick={nextPageFunc} disabled={productsData && productsData.hasNextPageFromApi === true? false : true}>&gt;</Button>
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default CreateTestPage