import { Autocomplete, Card, CardContent, Chip, TextField, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
// import "../../Styles/MUI_CSS/CreateTest.css"
import avatar from "../../src/Component/Images/image.png"
import search from "../../src/Component/Images/search-normal.png"
import trashIcon from "../../src/Component/Images/trash.png"
import linkIcon from "../../src/Component/Images/link-2.png"
import eyeIcon from "../../src/Component/Images/eye.png"
import { DataGrid } from '@mui/x-data-grid';


const YourTest = () => {
    const top100Films = [
        { label: 'Active', year: 1994 },
        { label: 'Upcoming', year: 1972 },
        { label: 'Ended', year: 1974 },
        { label: 'Paused', year: 2008 },

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
                                <img src={avatar} alt="" />
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
            width: 250,
            sortable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 250,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        <Chip color="primary" className='chipStatusActive ' label={params.row.status} />
                        {/* <Chip color="primary" className='chipStatusEnded ' label={params.row.status} /> */}
                        {/* <Chip color="primary" className='chipStatusUpcoming' label={params.row.status} /> */}
                        {/* <Chip color="primary" className='chipStatusPaused' label={params.row.status} /> */}

                    </>
                )
            }
        },
        {
            field: 'duration',
            headerName: 'Duration',
            type: 'number',
            width: 50,
            sortable: false,
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
                return (
                    <>
                        <div className='actionIcons'>
                            <img src={eyeIcon} alt="" />
                            <img src={linkIcon} alt="" />
                            <img src={trashIcon} alt="" />

                        </div>

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
        //     valueGetter: (params) => console.log("params", params)
        //         // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];


    const rows = [
        { id: 1, images: "#897456",duration:"2500 USD", Description: 'Snow', Product: 'Jon',  status: "Active" },
        { id: 2, images: "#897456",duration:"2500 USD", Description: 'Lannister', Product: 'Cersei',  status: "Ended" },
        { id: 3, images: "#897456",duration:"2500 USD", Description: 'Lannister', Product: 'Jaime',  status: "Active" },
        { id: 4, images: "#897456",duration:"2500 USD", Description: 'Stark', Product: 'Arya',  status: "Active" },
        { id: 5, images: "#897456",duration:"2500 USD", Description: 'Targaryen', Product: 'Daenerys',  status: "Active" },
        { id: 6, images: "#897456",duration:"2500 USD", Description: 'Melisandre', Product: null,  status: "Active" },
        { id: 7, images: "#897456",duration:"2500 USD", Description: 'Clifford', Product: 'Ferrara',  status: "Active" },
        { id: 8, images: "#897456",duration:"2500 USD", Description: 'Frances', Product: 'Rossini',  status: "Active" },
        { id: 9, images: "#897456",duration:"2500 USD", Description: 'Roxie', Product: 'Harvey',  status: "Active" },
        { id: 10, images: "#897456",duration:"2500 USD", Description: 'Roxie', Product: 'Harvey',  status: "Active" },
        { id: 11, images: "#897456",duration:"2500 USD", Description: 'Roxie', Product: 'Harvey',  status: "Active" },
        { id: 12, images: "#897456",duration:"2500 USD", Description: 'Roxie', Product: 'Harvey',  status: "Active" },
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
                                <Typography variant='h5' className='createTestTitle'>Your Test</Typography>
                                <Typography variant='p' className='chooseProd'> Manage your current and past tests </Typography>
                            </CardContent>
                        </div>
                        <div className='createTestBlock2'>
                            <img src={search} alt="" />
                            <TextField fullWidth id="fullWidth" placeholder="Search " />
                            <div className='autocompleteYourTest'>

                                <Autocomplete
                                    className='autocompleteYourTest'
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Filters" />}
                                />
                            </div>
                            {/* <Button variant="outlined"><span>Next</span></Button> */}
                        </div>
                    </div>
                    <div style={{ height: 655, width: '100%' }} className="dataTable">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableColumnMenu
                        />
                    </div>

                </Card>
            </Card>
        </>
    )
}

export default YourTest