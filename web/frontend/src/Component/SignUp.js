import { useState } from 'react';
import { Button, Card, TextField, Typography, CardContent, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import googleImages from './Images/google (1).png';
import { NavLink } from "react-router-dom";
import ResultRevenueLogo from './Images/ResultRevenueLogo.png';
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import closeIcon from "../Component/Images/close-circle.png"
import { handleGoogleSignIn } from "../controller/handleGoogleSignIn";
import getApiUrl from "../controller/utils.js";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export default function SignUp() {

    const [toggle, setToggle] = useState(false);
    const [togglescrollresult, setToggleScrollresult] = useState(false);

    // Revenue Increase Estimator state

    const [dailyrevenue, setDailyrevenue] = useState("");
    const [dailytraffic, setDailyTraffic] = useState("");
    const [orderValue, setOrderValue] = useState("");
    const [conversionRate, setConversionRate] = useState("");

    const [RevenueResult, setRevenueResult] = useState([{
        dailyRevenueResult: "",
        dailytRafficResult: "",
        orderValueResult: "",
        ConversionRateResult: ""
    }])

    // Sign up page state

    let [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const inputEvent = (e) => {
        const { name, value } = e.target
        setInput((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const createAccount = async () => {
        let data = {
            "first_name": input.firstName,
            "last_name": input.lastName,
            "email": input.email,
            "password": input.password,
            "confirmPassword": input.confirmPassword
        }

        if (input.password !== input.confirmPassword) {
            console.log("If")
            alert("Please check the password..!")
        } else {
            console.log("Else")
            await fetch('/api/signupdetails', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(async (res) =>  console.log(await res.json()))
                .catch((error) => console.log("Error", error))
        }
    }

    const hideRevenueComponent = async () => {
        // setTimeout(hideRevenueTime, 1000)
        console.log("dailyrevenue", RevenueResult)
        let newArray = [...RevenueResult]
        newArray[0].dailyRevenueResult = dailyrevenue;
        newArray[0].dailytRafficResult = dailytraffic;
        newArray[0].orderValueResult = orderValue;
        newArray[0].ConversionRateResult = conversionRate;
        setToggleScrollresult(newArray)
    };


    //check Password

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>

            {/* SignUp Page */}
            <div className='welcomePage height'>

                <Card className="welcomeBlock1 min-w">
                    <img src={logo} className="logo" alt="" />
                    <Card>
                        <CardContent className="welcomeBlock1Content" sx={{ padding: 0 }}>
                            <img src={card1Img} alt="" />
                        </CardContent>
                    </Card>
                </Card>
                <Card className='welcomeBlock2 min-wi padding'>
                    <Card className='wrappers'>
                        <CardContent className='welcomeContent' sx={{ padding: 0 }}>
                            {!toggle && !togglescrollresult && <div className='welcome-wrappers' id='scroll-up'>
                                <Typography variant='h4'>Sign Up</Typography>
                                <Typography className='span' variant='p'>
                                    Please enter your details to create an account
                                </Typography>
                                <div className='userdetailsmaindiv'>
                                    <div className='welcomeInputs mr-4'>
                                        <Typography variant='p'>First Name</Typography>
                                        <TextField
                                            className='please-width'
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            name="firstName"
                                            placeholder='Enter your first name'
                                            value={input.firstName}
                                            onChange={inputEvent}
                                        />

                                    </div>
                                    <div className='welcomeInputs mr-4'>
                                        <Typography variant='p'>Last Name</Typography>
                                        <TextField
                                            className='please-width'
                                            id="outlined-basic"
                                            label=""
                                            variant="outlined"
                                            name="lastName"
                                            placeholder='Enter your last name'
                                            value={input.lastName}
                                            onChange={inputEvent}
                                        />
                                    </div>

                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Email</Typography>
                                    <TextField
                                        className='please-width'
                                        id="outlined-basic"
                                        label=""
                                        variant="outlined"
                                        name="email"
                                        placeholder='Enter your mail'
                                        value={input.email}
                                        onChange={inputEvent}
                                    />
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Password</Typography>

                                    <OutlinedInput
                                        className='please-width'
                                        id="outlined-adornment-password"
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        name="password"
                                        value={input.password}
                                        onChange={inputEvent}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Confirm Password</Typography>

                                    <OutlinedInput
                                        className='please-width'
                                        id="outlined-adornment-password"
                                        variant="outlined"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        name="confirmPassword"
                                        value={input.confirmPassword}
                                        onChange={inputEvent}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    onMouseDown={handleMouseDownConfirmPassword}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    className='createaccountdiv'
                                    onClick={createAccount}
                                >
                                    Create Account
                                </Button>
                                <Button
                                    variant="outlined"
                                    className='createaccountwithgooglediv'
                                    onClick={() => handleGoogleSignIn()}>
                                    <img src={googleImages} alt=""></img>
                                    Create Account with Google
                                </Button>
                                <div className='logmaindiv'>
                                    <div className='checkaccountdiv'>Already have an account?</div>
                                    <NavLink to='/' className='logintextdiv'>Log In</NavLink>
                                </div>
                                <div className='trynowtext'>Interested to know your potential revenue increase?</div>
                                <div className='trynowextratext'>Try our revenue estimator tool by clicking below</div>
                                <div className='btn-wrapper'>
                                    <a className='scroll-revenue' href='#scrollrevenue' onClick={() => setToggle(true)}>
                                        <Button variant="text" className='trynowbtn'><span>Try Now!</span></Button>
                                    </a>
                                </div>
                            </div>}


                            {toggle && !togglescrollresult && <div id='scrollrevenue'>
                                <div className='welcome-wrappers'>
                                    <div className='close-icon'>
                                        <img src={closeIcon} alt="" />
                                    </div>
                                    <Typography variant='h4'>Revenue Increase Estimator</Typography>
                                    <Typography className='span' variant='p'>Calculate your expected revenue increase below!</Typography>
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Daily revenue</Typography>
                                    <TextField
                                        className='please-width'
                                        id=""
                                        label=""
                                        variant="outlined"
                                        placeholder='e.g. $5000'
                                        value={dailyrevenue}
                                        onChange={(e) => setDailyrevenue(e.target.value)}
                                    />
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Daily Traffic</Typography>
                                    <TextField
                                        className='please-width'
                                        id=""
                                        label=""
                                        variant="outlined"
                                        placeholder='e.g. 15,000 visitors'
                                        value={dailytraffic}
                                        onChange={(e) => setDailyTraffic(e.target.value)}
                                    />
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Average order value</Typography>
                                    <TextField
                                        className='please-width'
                                        id="" l
                                        abel=""
                                        variant="outlined"
                                        placeholder='e.g. $45.60'
                                        value={orderValue}
                                        onChange={(e) => setOrderValue(e.target.value)}
                                    />
                                </div>
                                <div className='welcomeInputs' style={{marginBottom: "20px"}}>
                                    <Typography variant='p'>Conversion rate</Typography>
                                    <TextField
                                        className='please-width'
                                        id=""
                                        label=""
                                        variant="outlined"
                                        placeholder='e.g. 2.7%'
                                        value={conversionRate}
                                        onChange={(e) => setConversionRate(e.target.value)}
                                    />
                                </div>
                                <a href='#scrollresult' style={{ textDecoration: "none" }} onClick={hideRevenueComponent}>
                                    <Button variant="contained" className='createaccountdiv text-trans'>Calculate!</Button>
                                </a>
                            </div>}



                            {togglescrollresult &&
                                <div id='scrollresult'>
                                    <div className='welcome-wrappers'>
                                        <div className='close-icon'>
                                            <img src={closeIcon} alt="" />
                                        </div>
                                        <Typography variant='h4'>Give them the results  here.</Typography>
                                        <Typography className='span' variant='p'>Calculate your expected revenue increase below!</Typography>
                                    </div>
                                    <div className='result-wrapper'>
                                        <div className='wrapper'>
                                            <img src={ResultRevenueLogo} alt="" />
                                            <span>Your revenue is expected to increase by ×% to Sxxx per day</span>
                                        </div>
                                        <div className='wrapper'>
                                            <img src={ResultRevenueLogo} alt="" />
                                            <span>That is Sxxx per month in additional revenue and Sxxx per year!</span>
                                        </div>
                                    </div>
                                    <div className='mb-41 div_margin'>
                                        <div className='daily-wrapper'>
                                            <span>Daily Revenue</span>
                                            <div>{RevenueResult[0].dailyRevenueResult ? RevenueResult[0].dailyRevenueResult : "XXXX"}</div>
                                        </div>
                                        <div className='daily-wrapper'>
                                            <span>Daily Traffic</span>
                                            <div>{RevenueResult[0].dailytRafficResult ? RevenueResult[0].dailytRafficResult : "XXXX"}</div>
                                        </div>
                                        <div className='daily-wrapper'>
                                            <span>Avg order value</span>
                                            <div>{RevenueResult[0].orderValueResult ? RevenueResult[0].orderValueResult : "XXXX"}</div>
                                        </div>
                                        <div className='daily-wrapper'>
                                            <span>Conversion rate</span>
                                            <div>{RevenueResult[0].ConversionRateResult ? RevenueResult[0].ConversionRateResult : "XXXX"}</div>
                                        </div>
                                    </div>
                                    <NavLink to="/" style={{ textDecoration: "none" }}>
                                        <Button variant='contained' className='createaccountdiv text-trans'>Get Started Now!</Button>
                                    </NavLink>
                                </div>}
                        </CardContent>
                    </Card>
                </Card>
            </div>
        </>
    )

}
