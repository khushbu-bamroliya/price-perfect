import { Button, Card, Modal, Slider, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import Navbar from './Navbar'
import closeIcon from "./Images/close-circle.png"
import { DataGrid } from '@mui/x-data-grid';
import avatar from "./Images/image.png"
import EyeIcon from "./Images/eye.png"
import LinkIcon from "./Images/link-2.png"
import TrashIcon from "./Images/trash.png"
import { useNavigate } from 'react-router-dom';
const CreateTestStep2 = () => {
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

    const [value, setValue] = React.useState(30);
    const [hideShowBtns, setHideShowBtns] = React.useState("none")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // configs of configure test 
    const [openConfigureTest1, setOpenConfigureTest1] = React.useState(false);
    const handleOpenConfigureTest1 = () => setOpenConfigureTest1(true);
    const handleCloseConfigureTest1 = () => setOpenConfigureTest1(false);

    // configs of clicking manual btn
    const [openManualModal, setOpenManualModal] = React.useState(false);
    const handleOpenManualModal = () => { setOpenManualModal(true); setOpenConfigureTest1(false) };
    const handleCloseManualModal = () => setOpenManualModal(false);

    // configs of clicking auto btn
    const [openByPercentageModal, setOpenByPercentageModal] = React.useState(false);
    const handleOpenByPercentageModal = () => { setOpenByPercentageModal(true); setOpenConfigureTest1(false) };
    const handleCloseByPercentageModal = () => setOpenByPercentageModal(false);


    // configs of edit test button
    const [openEditTest, setOpenEditTest] = React.useState(false);
    const handleOpenEditTest = () => { setOpenEditTest(true); setOpenConfigureTest1(false) };
    const handleCloseEditTest = () => setOpenEditTest(false);


    // configs of edit test button
    const [openControlSettings, setOpenControlSettings] = React.useState(false);
    const handleOpenControlSettings = () => { setOpenControlSettings(true); setOpenConfigureTest1(false) };
    const handleCloseControlSettings = () => setOpenControlSettings(false);


    const onConfirm = () => {
        setHideShowBtns("flex")
        handleCloseManualModal() || handleCloseByPercentageModal()
    }
    const onConfirmEdit = () => {
    
        handleCloseEditTest() || handleCloseControlSettings()
        navigate("/reviewtest")
    }
    // const onConfirmControlSettings = () => {
    //     setHideShowBtns("flex")
    //     handleCloseControlSettings()
    // }
    function btns() {
        return (<div className='afterConfirmBtns' style={{ display: hideShowBtns }}>
            <Button onClick={handleOpenControlSettings} className='afterConfirmControlBtn'>Control</Button>
            <div  className='afterConfirmTesteditBtn'>
                <p>Test edit</p>
                <Button onClick={handleOpenEditTest}>Test edit</Button>
            </div>
        </div>)
    }

    const rows = [
        { id: 1, price: '$5600 ', title: 'Jon', compareAtPrice: "$4000" },
        { id: 2, price: '$5600 ', title: 'Cersei', compareAtPrice: "$4000" },
        { id: 3, price: '$5600 ', title: 'Jaime', compareAtPrice: "$4000" },
        { id: 4, price: '$5600 ', title: 'Arya', compareAtPrice: "$4000" },
        { id: 5, price: '$5600 ', title: 'Daenerys', compareAtPrice: "$4000" },
        { id: 6, price: '$5600 ', title: "null", compareAtPrice: "$4000" },
        { id: 7, price: '$5600 ', title: 'Ferrara', compareAtPrice: "$4000" },
        { id: 8, price: '$5600 ', title: 'Rossini', compareAtPrice: "$4000" },
        { id: 9, price: '$5600 ', title: 'Harvey', compareAtPrice: "$4000" },
    ];
    const columns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        <p className='productID'>
                            {params.row.title}
                        </p>
                    </>
                )
            }
        },


        {
            field: 'price',
            headerName: 'Price',
            width: 500,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        <TextField />
                    </>
                )
            }
        },
        {
            field: 'compareAtPrice',
            headerName: 'Compare at price',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        <TextField />
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
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];
    const controlcolumns = [
        {
            field: 'title',
            headerName: 'Title',
            width: 250,
            sortable: false,
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <>
                        <p className='productID'>
                            {params.row.title}
                        </p>
                    </>
                )
            }
        },


        {
            field: 'price',
            headerName: 'Price',
            width: 500,
            sortable: false,
            flex: 0.2,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.price}
                    </>
                )
            }
        },
        {
            field: 'compareAtPrice',
            headerName: 'Compare at price',
            width: 250,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <>
                        {params.row.compareAtPrice}
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
        //        // `${params.row.Product || ''} ${params.row.Description || ''}`,
        // },
    ];
    return (
        <>
            <Card className='createTestStep2'>
                <div className='createTestStep2-main'>
                    <Navbar />
                    <Card className='createTestStep2Block'>
                        <Typography variant='h4'>Create Test</Typography>
                        <Typography variant='p'>1. Select your prices to test</Typography><br />
                        {/* <><ol><li> Select your prices to test</li></ol></> */}

                        <Typography variant='p'> 2. Set your traffic split </Typography>
                        <Slider className="trafficSlider" aria-label="Volume" value={value} onChange={handleChange} />
                        <Typography variant='p' className='trafficSplitInfo'>10% of visiting traffic will be split evenly between your 3 tests. The remaining 90% will be sent to the control.</Typography>
                        <div>
                            {btns()}
                            <Button onClick={handleOpenConfigureTest1} style={{ display: hideShowBtns === "flex" && "none" }} className='step2completed'>Review & Launch</Button>
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
                    {/* <div className='setManuallyBlock'>
                        <Typography variant='p'>Gif here showing setting prices manually</Typography>
                        <Button>Set Prices Manually</Button>
                    </div>
                    <div className='setAutoBlock'>
                        <Typography variant='p'>Gif here showing setting prices by percentage</Typography>

                        <div className='btn_adjust'>

                            <p>Adjust by Percentage</p>
                            <Button></Button>
                        </div>

                    </div> */}

                    <Card className='manualModalTable'>
                        <div style={{ height: '100%', width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
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
                            <Button>Decrease Price </Button>
                            <div className='increasePriceBtn'>

                                <p>Increase Price</p>
                                <Button>Increase Price</Button>
                            </div>
                        </div>
                        <span>

                            <Typography variant='h5'>By how much? </Typography>
                        </span>
                        <div className='percentageBtnGroup'>
                            <div>
                                <p>2%</p>
                                <Button>2%</Button>
                            </div>
                            <div>
                                <p>3%</p>
                                <Button>3%</Button>
                            </div>
                            <div>
                                <p>5%</p>
                                <Button>5%</Button>
                            </div>
                            <div>
                                <p>10%</p>
                                <Button>10%</Button>
                            </div>
                            <div>
                                <p>Other Amount</p>
                                <Button>Other Amount</Button>
                            </div>
                            {/* <Button>3&</Button>
                            <Button>5%</Button>
                            <Button>10%</Button>
                            <Button>Other Amount</Button> */}
                        </div>
                    </div>

                    <div className='confirmBtn'>
                        <Button onClick={onConfirm}>Confirm</Button>
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
                        <div style={{ height: '100%',  }}>
                            <DataGrid
                                rows={rows}
                                columns={controlcolumns}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
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
                    <div className='controlTable'>
                        <div style={{ height: '100%',  }}>
                            <DataGrid
                                rows={rows}
                                columns={controlcolumns}
                                pageSize={6}
                                rowsPerPageOptions={[6]}
                                disableColumnMenu
                            />
                        </div>
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