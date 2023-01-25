import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// import "./style.css";
// import '../App.css';
import google from "../Component/Images/google (1).png";
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser, handleGoogleSignIn } from "../controller/handleGoogleSignIn";
import Loader from "./Loader";
import getApiUrl from "../controller/utils.js";


export default function WelcomePage({ shop }) {
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
}
const [userData, setUserData] = useState(initialValues);

console.log("userData", userData);
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
        ...userData,
        [name]: value,
    });
};
  const [loader, setLoader] = useState(false);
  const handleManualSignIn = () => {
    fetch(getApiUrl + `/api/signin?${new URLSearchParams({email: userData.email, password:userData.password})}`, {
      method: 'GET',

    })
      .then(async (response) => {
        // console.log("response", await response.json())
      return response.json()
        // console.log("res", res);
        // navigate('/homeDashboard');
      }).then((res) => {
        if (res.success == true) {
          navigate('/homeDashboard');
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <div className="welcomePage">
        <Card className="welcomeBlock1 min-w">
          <img src={logo} className="logo" alt="" />
          <Card>
            <CardContent className="welcomeBlock1Content" sx={{ padding: 0 }}>
              <img src={card1Img} alt="" />
            </CardContent>
          </Card>
        </Card>
        <Card className="welcomeBlock2 min-wi">
          <Card className="wrappers">
            <CardContent className='welcomeContent' sx={{ padding: 0 }}>
              <div className='welcome-wrappers mb-34'>
                <Typography variant='h4'>Welcome to PricePerfect</Typography>
                <Typography className='span' variant='p'> Please enter your details</Typography>
                <div>
                  <div className='welcomeInputs'>
                    <Typography variant='p'>Email</Typography>
                    <TextField fullWidth id="fullWidth" placeholder='Enter your mail' name='email' value={userData.email} onChange={handleInputChange} />
                  </div>
                  <div className='welcomeInputs'>
                    <Typography variant='p'>Password</Typography>
                    <TextField fullWidth id="fullWidth" placeholder='Enter your Password' name='password' value={userData.password} onChange={handleInputChange} />
                  </div>
                  <div className="forgetPass">
                    <FormControlLabel className='RememberMe label-remember' control={<Checkbox defaultChecked />} label="Remember for 30 days " />
                    <NavLink to="/forgot-password" className="forgotPass">Forgot Password?</NavLink>
                  </div>
                </div>
              </div>
              <span className="mb-34">
                <Stack spacing={2} direction="column" className='btnStack'>
                  <Button variant="contained" className='SignInBtn' onClick={() => handleManualSignIn()}>Sign in</Button>
                  <Button variant="outlined" className='googleSignInBtn' onClick={() => handleGoogleSignIn(setLoader, shop, navigate)}> {loader === true ? <Loader /> : (<><img src={google} alt="" /> <Typography variant='p'>Sign in with Google</Typography></>)} </Button>
                </Stack>
              </span>
              <div className="noAccount sign-up">
                <span className="dont-account">Don’t have an account?</span>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            </CardContent>
          </Card>
        </Card>
      </div>
    </>
  );
}
