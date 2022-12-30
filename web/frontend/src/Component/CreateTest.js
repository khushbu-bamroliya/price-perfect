import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
// import "../../Styles/MUI_CSS/CreateTest.css"
import avatar from "../../src/Component/Images/image.png"
import search from "../../src/Component/Images/search-normal.png"
import { DataGrid } from '@mui/x-data-grid';
import addTestCases from "../../src/Component/Images/add-square.png"

const CreateTest = () => {
    const rows = [
        { id: 1, images: "#987546", Description: 'Lorem ipsum ', Product: 'Jon', action: 35, price: "56 USD" },
        { id: 2, images: "#987546", Description: 'Lorem ipsum ', Product: 'Cersei', action: 42, price: "56 USD" },
        { id: 3, images: "#987546", Description: 'Lorem ipsum ', Product: 'Jaime', action: 45, price: "56 USD" },
        { id: 4, images: "#987546", Description: 'Lorem ipsum ', Product: 'Arya', action: 16, price: "56 USD" },
        { id: 5, images: "#987546", Description: 'Lorem ipsum ', Product: 'Daenerys', action: null, price: "56 USD" },
        { id: 6, images: "#987546", Description: 'Lorem ipsum ', Product: null, action: 150, price: "56 USD" },
        { id: 7, images: "#987546", Description: 'Lorem ipsum ', Product: 'Ferrara', action: 44, price: "56 USD" },
        { id: 8, images: "#987546", Description: 'Lorem ipsum ', Product: 'Rossini', action: 36, price: "56 USD" },
        { id: 9, images: "#987546", Description: 'Lorem ipsum ', Product: 'Harvey', action: 65, price: "56 USD" },
    ];
    const columns = [
        {
            field: 'images',
            headerName: 'Product',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                console.log("params: " + params);
                return (
                    <>

                        <div className='tableImages'>
                            <div>

                                <img src={avatar} alt='' />
                            </div>



                        </div>
                        <p className='productID'>
                            {params.row.images}
                        </p>
                    </>
                )
            }
        },


        {
            field: 'Description',
            headerName: 'Description',
            width: 500,
            sortable: false,
            flex: 0.54
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 250,
            sortable: false,
            type: 'number',
            flex: 0.2,

        },
        {
            field: 'action',
            headerName: 'Action',
            type: 'number',
            width: 150,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                console.log("params: " + params);
                return (
                    <div className='actionIcon'>
                        <img src={addTestCases} alt="" />
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
        //         // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];



    return (
        <>
            <Card className='createTestPage'>
                <div className='nav'>

                    <Navbar />
                </div>
                <Card className='createTestMain'>
                    <div className='createTestHead'>

                        <div className='createTestBlock1'>

                            <CardContent>
                                <Typography variant='h5' className='createTestTitle'>Create Test</Typography>
                                <Typography variant='p' className='chooseProd'> Choose a product to test</Typography>
                            </CardContent>
                        </div>
                        <div className='createTestBlock2'>
                            <img src={search} alt="" />
                            <TextField fullWidth id="fullWidth" placeholder="Search " />
                            <Button variant="outlined" href='https://2924-2405-201-200c-6246-941a-d49-9a5f-90db.in.ngrok.io/create-test2?shop=home-practise.myshopify.com'><span>Next</span></Button>
                        </div>
                    </div>
                    <div style={{ height: 400, width: '100%' }} className="dataTable">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[6]}
                            disableColumnMenu
                        />
                    </div>

                </Card>
            </Card>
        </>
    )
}

export default CreateTest