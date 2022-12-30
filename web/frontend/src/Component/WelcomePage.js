import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import "./style.css";
// import '../App.css';
import google from "../Component/Images/google (1).png";
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import { NavLink, useNavigate } from "react-router-dom"
import { getUser, handleGoogleSignIn } from "../controller/handleGoogleSignIn";

export default function WelcomePage() {
  const navigate = useNavigate()     

  useEffect(() => {
    getUser("token", navigate);
  },[])

  return (
    <>
      <div className="welcomePage">
        <Card className="welcomeBlock1" sx={{ minWidth: "50%" }}>
          <img src={logo} className="logo" alt="" />
          <Card>
            <CardContent className="welcomeBlock1Content">
              <img src={card1Img} alt="" />
            </CardContent>
          </Card>
        </Card>
        <Card sx={{ minWidth: "50%" }} className="welcomeBlock2 ">
          <Card>
            <CardContent className='welcomeContent'>
              <Typography variant='h4'>Welcome to PricePerfect</Typography>
              <Typography variant='p'> Please enter your details</Typography>
              <div>

                <label className='welcomeInputs'>
                  <Typography variant='p'> Email</Typography>
                  <TextField fullWidth id="fullWidth" placeholder='Enter your mail' />
                </label>
                <label className='welcomeInputs'>
                  <Typography variant='p'>Password</Typography>
                  <TextField fullWidth id="fullWidth" placeholder='Enter your Password' />
                </label>
                <div className="forgetPass">

                  <FormControlLabel className='RememberMe' control={<Checkbox defaultChecked />} label="Remember for 30 days " />
                  <NavLink>Forgot Password?</NavLink>
                </div>
              </div>


              <span>

                <Stack spacing={2} direction="column" className='btnStack'>
                  <Button variant="contained" className='SignInBtn'>Sign in</Button>
                  <Button  variant="outlined" className='googleSignInBtn'  onClick={() =>  handleGoogleSignIn()}><img src={google} alt="" /> <Typography variant='p'>Sign in with Google</Typography></Button>
                </Stack>
              </span>

              <div className="noAccount">
                <NavLink to="/signup">Don’t have an account?</NavLink>
              </div>
            </CardContent>
          </Card>
        </Card>
      </div>
    </>
  );
}
