import React from 'react'
import Paper from '@mui/material/Paper';
import { Button, Card, CardContent, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from '@mui/material';
// import "../../Styles/MUI_CSS/Welcome.css"
import google from "../../src/Component/Images/google (1).png";
import card1Img from "../../src/Component/Images/Group-45.png";
import logo from "../../src/Component/Images/Group 48.png";

const WelcomeBack = () => {
    return (
        <>
            <Card className='WelcomeBack'>
                <img src={logo} alt="" className='WelcomeBackLogo' />
                <Card className='WelcomeBackBlock1'>

                    <CardContent className='welcomeContent'>
                        <Typography variant='h4'>Welcome Back</Typography>
                        <Typography variant='p'>  Welcome back! Please enter your details </Typography>
                        <div>

                            <label className='welcomeInputs'>
                                <Typography variant='p'> Email</Typography>
                                <TextField fullWidth id="fullWidth" placeholder='Enter your mail' />
                            </label>
                            <label className='welcomeInputs'>
                                <Typography variant='p'>Password</Typography>
                                <TextField fullWidth id="fullWidth" placeholder='Enter your Password' />
                            </label>
                            <FormControlLabel className='RememberMe' control={<Checkbox defaultChecked />} label="Remember for 30 days " />
                        </div>


                        <span>

                            <Stack spacing={2} direction="column" className='btnStack'>
                                <Button variant="contained" className='SignInBtn'>Sign in</Button>
                                <Button variant="outlined" className='googleSignInBtn'><img src={google} alt="" /> <Typography variant='p'>Sign in with Google</Typography></Button>
                            </Stack>
                        </span>

                        <div className="noAccount">
                            <Typography variant='p'>Don’t have an account?</Typography>
                            <Link href="#" underline="always">
                                {'Sign In'}
                            </Link>
                        </div>
                    </CardContent>
                    <div className="copyRight">
                        <Typography variant='p'>©  </Typography>
                        <Typography variant='p'>PricePerfect 2022 </Typography>
                    </div>
                </Card>
            </Card>
        </>
    )
}

export default WelcomeBack