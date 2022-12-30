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


    // const rows = [
    //     { id: 1, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Jon', action: 35, price: "56 USD" },
    //     { id: 2, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Cersei', action: 42, price: "56 USD" },
    //     { id: 3, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Jaime', action: 45, price: "56 USD" },
    //     { id: 4, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Arya', action: 16, price: "56 USD" },
    //     { id: 5, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Daenerys', action: null, price: "56 USD" },
    //     { id: 6, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: null, action: 150, price: "56 USD" },
    //     { id: 7, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Ferrara', action: 44, price: "56 USD" },
    //     { id: 8, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Rossini', action: 36, price: "56 USD" },
    //     { id: 9, images: "#987546", Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', Product: 'Harvey', action: 65, price: "56 USD" },
    // ];
    const rows = []
    productsData &&
        productsData.products.forEach((item) => {
            rows.push({
                id: item.id,
                images: item.image,
                title: item.title,
                description: item.description && item.description,
                price: item.price,
            });
        });

    const createTestStep1Completed = (id) => {
        const productId = id.split('/').pop();
        console.log("productId: " + productId);
        navigate(`/createtest2/${productId}`)
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
                        <img src={addTestCases} alt="" onClick={() => createTestStep1Completed(params.row.id)} />
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
    const getAllProductsApi = async () => {
        const sendBody = {
            search: `${searchProduct}`
        }
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
    console.log("All products", productsData && productsData.products)

    useEffect(() => {


        getAllProductsApi()
    }, [searchProduct])
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
                        {/* <Pagination count={1} variant="outlined"  /> */}
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default CreateTestPage