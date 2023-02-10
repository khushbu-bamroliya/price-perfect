import { useState } from 'react';
import { Button, Card, TextField, Typography, CardContent, Snackbar, Alert } from '@mui/material';
import googleImages from './Images/google (1).png';
import { NavLink, useNavigate } from "react-router-dom";
import ResultRevenueLogo from './Images/ResultRevenueLogo.png';
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import closeIcon from "../Component/Images/close-circle.png"
export default function SignUp() {
    const navigate = useNavigate();

    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [ForgotPass, setForgotPass]= useState({
        ForgotPassText: "",
    });
    const [errorMessForgot, setErrorMessForgot] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForgotPass({
            ...ForgotPass,
          [name]: value,
        });
      };

    const resetPassword = () => {
        if (isValidEmail(ForgotPass.ForgotPassText)) {
            console.log('The email is valid');
            
            setOpens(true)
            setSnackbarColor('#325240')
            setsnackbar_msg("Correct email")
        } else {
            setOpens(true)
            setErrorMessForgot(true)
            setsnackbar_msg("Invalid email")
            setSnackbarColor('red')
            console.log('The email is invalid');
          }
        console.log("End...")
    }

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
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

    return (
        <>

            {/* SignUp Page */}
            <div className='welcomePage height un-height'>

                <Card className="welcomeBlock1 min-w welcome-hei">
                    <img src={logo} className="logo" alt="" />
                    <Card>
                        <CardContent className="welcomeBlock1Content" sx={{ padding: 0 }}>
                            <img src={card1Img} alt="" />
                        </CardContent>
                    </Card>
                </Card>
                <Card className='welcomeBlock2 min-wi padding welcome-heig'>
                    <Card className='wrappers'>
                        <CardContent className='welcomeContent' sx={{ padding: 0 }}>
                            <div className='close-icon'>
                                <img onClick={() => navigate('/')} src={closeIcon} alt="" />
                            </div>
                            <div className='welcome-wrappers' id='scroll-up'>
                                <Typography variant='h4'>Forgot Password</Typography>
                                <Typography
                                    className='span'
                                    variant='p'>Enter your email, we will send you confirmation code
                                </Typography>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Email</Typography>
                                    <TextField
                                        className='please-width'
                                        id="outlined-basic" 
                                        label=""
                                        variant="outlined"
                                        placeholder='Enter your mail'
                                        name='ForgotPassText'
                                        helperText={
                                            errorMessForgot && ForgotPass.ForgotPassText === ""
                                              ? "Please insert your email name"
                                              : null
                                          }
                                          error={errorMessForgot && ForgotPass.ForgotPassText === ""}
                                        value={ForgotPass.ForgotPassText}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <Button variant="contained" className='createaccountdiv' onClick={resetPassword}>Reset Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Card>
            </div>
            <div>{errorfunction()}</div>
        </>
    )
}