import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import cookieReader from "../controller/cookieReader";

import google from "../Component/Images/google (1).png";
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getUser, handleGoogleSignIn } from "../controller/handleGoogleSignIn";
import Loader from "./Loader";
import getApiUrl from "../controller/utils.js";


export default function WelcomePage({ shop }) {
  const navigate = useNavigate()
  const location = useLocation();
  const [loading, setLoading] = useState({
    manual:false,
    google:false,
  });
  const [opens, setOpens] = useState(false);
  const [snackbar_msg, setsnackbar_msg] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("#325240");

  //Error message state
  const [emailErrorMess, setEmailErrorMess] = useState(false);
  const [passErrorMess, setPassErrorMess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
  
    if (!userData.email) {
      setEmailErrorMess(true)
    }
    if (!userData.password) {
      setPassErrorMess(true)
    }

    if (!userData.email || !userData.password) {
      setOpens(true)
      setSnackbarColor('red')
      setsnackbar_msg(`All fields are required`)
      setLoading({manual : false})
    } else {

      if (isValidEmail(userData.email)) {
        console.log('The email is valid');
        setLoading({manual : true})
        fetch(getApiUrl + `/api/signin?${new URLSearchParams({ email: userData.email, password: userData.password, 'rememberMe': rememberMe })}`, {
          method: 'GET',
          headers: {
            'shop': cookieReader('shop')
          }
        })
          .then(async (response) => {
            return response.json()
          }).then((res) => {
            if (res.success == true) {
              setOpens(true)
              setsnackbar_msg(`${res.message}`)
              setSnackbarColor('#325240')
              setLoading({manual : false})
              navigate('/homeDashboard', { state: { message: `${res.message}` } });
            }
            if (res.success == false) {
              setOpens(true)
              setSnackbarColor('red')
              setsnackbar_msg(`${res.message}`)
              setLoading({manual : false})
            }
          })
          .catch(err => {
            setOpens(true)
            setsnackbar_msg(`Invalid User`)
            setSnackbarColor('#325240')
            setLoading({manual : false})
            console.log(err)
          })
    } else {
        setOpens(true)
        setsnackbar_msg("Invalid email")
        setSnackbarColor('red')
        console.log('The email is invalid');
      }
    }
  }

  const handleRememberMe = (e) => {

    if (rememberMe === true) {
      setRememberMe(false)
    }
    if (rememberMe === false) {
      setRememberMe(true)
    }
  }


  // Show error message 
  const handleClose = () => {
    setOpens(false);
  };




  const errorfunction = () => {
    return (<div>
      <Snackbar
        open={opens}
        sx={{ width: "50%" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          sx={{ width: "50%", bgcolor: snackbarColor }}
        >
          {snackbar_msg}
        </Alert>
      </Snackbar>
    </div>)

  };

  function isValidEmail(email) {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
  }
  useEffect(() => {
    if (location?.state?.message) {
      setOpens(true)
      setsnackbar_msg(location?.state?.message)
    } else {
      setOpens(false)
    }
  }, [])
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
                    <TextField
                      fullWidth
                      id="fullWidth"
                      placeholder='Enter your mail'
                      name='email'
                      helperText={
                        emailErrorMess 
                          ? "Please insert your email"
                          : null
                      }
                      error={emailErrorMess}
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='welcomeInputs'>
                    <Typography variant='p'>Password</Typography>
                    <TextField
                      fullWidth
                      id="fullWidth"
                      placeholder='Enter your Password'
                      name='password'
                      helperText={
                        passErrorMess && userData?.password === ""
                          ? "Please insert your password"
                          : null
                      }
                      error={passErrorMess && userData?.password === ""}
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="forgetPass">
                    <FormControlLabel className='RememberMe label-remember' control={<Checkbox defaultChecked={false} value={rememberMe} onChange={(e) => handleRememberMe(e)} />} label="Remember for 30 days " />
                    <NavLink to="/forgot-password" className="forgotPass">Forgot Password?</NavLink>
                  </div>
                </div>
              </div>
              <span className="mb-34">
                <Stack spacing={2} direction="column" className='btnStack'>
                  <Button variant="contained" className='SignInBtn' onClick={() => handleManualSignIn()}>{loading.manual? <Loader size={20}/> : "Sign in"}</Button>
                  <Button variant="outlined" className='googleSignInBtn' onClick={() => handleGoogleSignIn(setLoading, shop, navigate)}> {loading.google ? <Loader size={40} /> : (<><img src={google} alt="" /> <Typography variant='p'>Sign in with Google</Typography></>)} </Button>

                </Stack>
              </span>
              <div className="noAccount sign-up">
                <span className="dont-account">Don’t have an account?</span>
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </CardContent>
          </Card>
        </Card>
        <div>{errorfunction()}</div>
      </div>
    </>
  );
}
