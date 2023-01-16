import { useState } from 'react';
import { Button, Card, TextField, Typography, CardContent } from '@mui/material';
import googleImages from './Images/google (1).png';
import { NavLink, useNavigate } from "react-router-dom";
import ResultRevenueLogo from './Images/ResultRevenueLogo.png';
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import closeIcon from "../Component/Images/close-circle.png"
export default function SignUp() {
const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [togglescrollresult, setToggleScrollresult] = useState(false);

    return (
        <>

            {/* SignUp Page */}
            <div className='welcomePage height'>

            <Card className="welcomeBlock1 min-w">
                <img src={logo} className="logo" alt="" />
                <Card>
                    <CardContent className="welcomeBlock1Content" sx={{padding:0}}>
                    <img src={card1Img} alt="" />
                    </CardContent>
                </Card>
            </Card>
            <Card className='welcomeBlock2 min-wi padding'>
                <Card className='wrappers'>
                    <CardContent className='welcomeContent' sx={{padding:0}}>
                    <div className='close-icon'>
                                        <img onClick={() => navigate('/')} src={closeIcon} alt="" />
                                    </div>
                    <div className='welcome-wrappers' id='scroll-up'>
                        <Typography variant='h4'>Forgot Password</Typography>
                        <Typography className='span' variant='p'>Enter your email, we will send you confirmation code</Typography>
                    <div className='welcomeInputs'>
                        <Typography variant='p'>Email</Typography>
                        <TextField className='please-width' id="outlined-basic" label="" variant="outlined" placeholder='Enter your mail' />
                    </div>
                        <Button variant="contained" className='createaccountdiv'>Reset Password</Button>
                    </div>
                    </CardContent>
                </Card>
            </Card>
            </div>
        </>
    )
}