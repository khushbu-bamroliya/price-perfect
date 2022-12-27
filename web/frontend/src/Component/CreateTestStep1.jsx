import { Button, Card, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar';
import searchIcon from './Images/search-normal.png';
import { DataGrid } from '@mui/x-data-grid';
import avatar from "./Images/image.png"
import addTestCases from "./Images/add-square.png"
import { NavLink } from 'react-router-dom';

const CreateTestPage = () => {
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
            flex: 0.6
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 250,
            sortable: false,
            flex: 0.2,

        },
        {
            field: 'action',
            headerName: 'Action',

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
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];

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
                                <TextField id="outlined-basic" placeholder="search" variant="outlined" />
                                <Button variant="outlined">
                                    <NavLink to="/createtest2">
                                        Next
                                    </NavLink>
                                </Button>
                            </div>
                        </div>
                        <div className='createTestTable' style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableColumnMenu
                            />
                        </div>
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default CreateTestPage