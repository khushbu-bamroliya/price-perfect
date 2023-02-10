import { useState } from 'react';
import { Button, Card, TextField, Typography, CardContent, OutlinedInput, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import googleImages from './Images/google (1).png';
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import ResultRevenueLogo from './Images/ResultRevenueLogo.png';
import card1Img from "../Component/Images/Group-45.png";
import logo from "../Component/Images/Group 48.png";
import closeIcon from "../Component/Images/close-circle.png"
import { handleGoogleSignIn } from "../controller/handleGoogleSignIn";
import getApiUrl from "../controller/utils.js";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import cookieReader from "../controller/cookieReader";
import ResultRevenueLogo2 from './Images/ResultRevenueLogo2.png';



export default function SignUp() {
    const navigate = useNavigate();
    //Show error message
    const [loading, setLoading] = useState(false);
    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorEmailName, setErrorEmailName] = useState(false);
    const [errorPassName, setErrorPassName] = useState(false);
    const [errorConfirmPassName, setErrorConfirmPassName] = useState(false);
    console.log("errorPassName", errorPassName);
    console.log("errorConfirmPassName", errorConfirmPassName);
    // Revenue Increase Error message
    const [errorDailyMess, setErrorDailyMess] = useState(false);
    const [errorTrafficMess, setErrorTrafficMess] = useState(false);
    const [errorAverageorderMess, setErrorAverageorderMess] = useState(false);
    const [errorConversionRate, setErrorConversionRate] = useState(false);


    //change the page
    const [toggle, setToggle] = useState(false);
    const [togglescrollresult, setToggleScrollresult] = useState(false);

    // Revenue Increase Estimator state

    const [dailyrevenue, setDailyrevenue] = useState("");
    const [dailytraffic, setDailyTraffic] = useState("");
    const [orderValue, setOrderValue] = useState("");
    const [conversionRate, setConversionRate] = useState("");

    console.log("dailyrevenue", dailyrevenue)
    console.log("dailytraffic", dailytraffic)
    console.log("orderValue", orderValue)
    console.log("conversionRate", conversionRate)

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
    let [revenueInput, setRevenueInput] = useState({
        dailyRevenue: "",
        dailyTraffic: "",
        averageOrderValue: "",
        conversionRate: "",
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
    const handleChange = (event) => {
        const numberRegex = /^\d+$/;
        if (event.target.value === '' || numberRegex.test(event.target.value)) {
            setDailyrevenue(event.target.value);
        }
    };
    const inputRevenueEvent = (e) => {
        const { name, value } = e.target
        const numberRegex = /^\d+$/;
        if (e.target.value === '' || numberRegex.test(e.target.value)) {

            setRevenueInput((prev) => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const createAccount = async () => {

        setErrorFirstName(true)
        setErrorLastName(true)
        setErrorEmailName(true)
        setErrorPassName(true)
        setErrorConfirmPassName(true)
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!emailRegex.test(input.email)) {
            setErrorEmailName(true)
        } else {

        }
        let data = {
            "first_name": input.firstName,
            "last_name": input.lastName,
            "email": input.email,
            "password": input.password,
            "confirmPassword": input.confirmPassword
        }
        if (!input.firstName || !input.lastName || !input.email || !input.password || !input.confirmPassword) {

            console.log("Not a valid email or password");
            setOpens(true)
            setSnackbarColor('red')
            setsnackbar_msg(`All fields are required`)
        } else {
            if (input.password !== input.confirmPassword) {
                console.log("If")
                setOpens(true)
                setSnackbarColor('red')
                setsnackbar_msg(`Passwords doesn't matched`)

            } else {
                if (isValidEmail(input.email)) {
                    console.log('The email is valid');

                    await fetch('/api/signupdetails', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                            'shop': cookieReader('shop')
                        },
                        body: JSON.stringify(data)
                    }).then(async (res) => {
                        const apiRes = await res.json()
                        if (apiRes.success === false) {
                            setSnackbarColor('red')
                        } else {
                            setSnackbarColor('#325240')

                        }
                        console.log("signup apiRes", apiRes)
                        setOpens(true)
                        setsnackbar_msg(`${apiRes.message}`)
                        if (apiRes.message === "Account created successfully") {

                            navigate('/', { state: { message: `${apiRes.message}` } })
                        }
                    })
                        .catch((error) => {
                            setOpens(true)
                            setSnackbarColor('red')
                            setsnackbar_msg(`Account not created`)
                            console.log("Error", error)
                        })
                } else {
                    setOpens(true)
                    setsnackbar_msg("Invalid email")
                    setSnackbarColor('red')
                    console.log('The email is invalid');
                }
            }
        }


    }

    const hideRevenueComponent = async () => {
        setErrorDailyMess(true)
        setErrorConversionRate(true)
        setErrorTrafficMess(true)
        setErrorAverageorderMess(true)
        console.log("errorDailyMess", errorDailyMess)
        console.log("************ dailyrevenue", typeof dailyrevenue)

        if (revenueInput.dailyTraffic === "" || revenueInput.averageOrderValue === "" || revenueInput.conversionRate === "" || revenueInput.dailyRevenue === "") {
            return false;
        }

        console.log("dailyrevenue", RevenueResult)
        let newArray = [...RevenueResult]
        newArray[0].dailyRevenueResult = revenueInput.dailyRevenue;
        newArray[0].dailytRafficResult = revenueInput.dailyTraffic;
        newArray[0].orderValueResult = revenueInput.averageOrderValue;
        newArray[0].ConversionRateResult = revenueInput.conversionRate;
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
    const redirectSignUp = () => {
        setToggle(false)
        navigate('/signup')
        console.log("toggle", toggle)
    }

    const redirectRevenuePage = () => {
        setToggle(false)

        navigate('/signup#scrollrevenue')
        console.log("toggle lalalal", toggle)
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
                className="sanckbarWrapper"
            >
                <Alert
                    variant="filled"
                    onClose={handleClose}
                    sx={{ width: "50%", bgcolor: snackbarColor }}
                    className="alertWrapper"
                >
                    {snackbar_msg}
                </Alert>
            </Snackbar>
        </div>)

    };
    function isValidEmail(email) {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    }

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
                                            variant="outlined"
                                            name="firstName"
                                            placeholder='Enter your first name'
                                            helperText={
                                                errorFirstName && input?.firstName === ""
                                                    ? "Please insert your first name"
                                                    : null
                                            }
                                            error={errorFirstName && input?.firstName === ""}
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
                                            helperText={
                                                errorLastName && input?.lastName === ""
                                                    ? "Please insert your last name"
                                                    : null
                                            }
                                            error={errorLastName && input?.lastName === ""}
                                            value={input.lastName}
                                            onChange={inputEvent}
                                        />
                                    </div>

                                </div>
                                <div className='welcomeInputs password'>
                                    <Typography variant='p'>Email</Typography>
                                    <TextField
                                        className='please-width'
                                        id="outlined-basic"
                                        label=""
                                        variant="outlined"
                                        name="email"
                                        placeholder='Enter your mail'
                                        helperText={
                                            errorEmailName && input?.email === ""
                                                ? "Please insert your email"
                                                : null
                                        }
                                        error={errorEmailName && input?.email === ""}
                                        value={input.email}
                                        onChange={inputEvent}
                                    />
                                </div>

                                <div className='welcomeInputs password'>
                                    <Typography variant='p'>Password</Typography>

                                    <TextField
                                        className='please-width'
                                        id="outlined-adornment-password"
                                        variant="outlined"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        name="password"
                                        value={input.password}
                                        InputProps={{

                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        error
                                                        helperText="lalala"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        helperText={
                                            errorPassName && input?.password === ""
                                                ? "Please insert your password"
                                                : null
                                        }
                                        error={errorPassName && input?.password === ""}
                                        onChange={inputEvent}
                                    />

                                </div>
                                <div className='welcomeInputs password'>
                                    <Typography variant='p'>Confirm Password</Typography>

                                    <TextField
                                        className='please-width'
                                        id="outlined-adornment-password"
                                        variant="outlined"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        name="confirmPassword"
                                        helperText={
                                            errorConfirmPassName && input?.confirmPassword === ""
                                                ? "Please insert your confirm Password"
                                                : null
                                        }
                                        error={errorConfirmPassName && input?.confirmPassword === ""}
                                        value={input.confirmPassword}
                                        onChange={inputEvent}
                                        InputProps={{
                                            endAdornment: (
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
                                            )
                                        }}

                                    />
                                </div>
                                <Button
                                    variant="contained"
                                    className='createaccountdiv'
                                    onClick={() => createAccount()}
                                >
                                    Create Account
                                </Button>
                                <Button
                                    variant="outlined"
                                    className='createaccountwithgooglediv'
                                    onClick={() => handleGoogleSignIn(setLoading, cookieReader('shop'))}>
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
                                        <img src={closeIcon} alt="" onClick={redirectSignUp} />
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
                                        name='dailyRevenue'
                                        variant="outlined"
                                        placeholder='e.g. $5000'
                                        helperText={
                                            errorDailyMess && revenueInput.dailyRevenue === ""
                                                ? "Please insert Daily revenue"
                                                : null
                                        }
                                        error={errorDailyMess && revenueInput.dailyRevenue === ""}
                                        value={revenueInput.dailyRevenue}
                                        onChange={inputRevenueEvent}
                                    />
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Daily Traffic</Typography>
                                    <TextField
                                        className='please-width'
                                        id=""
                                        label=""
                                        name='dailyTraffic'
                                        variant="outlined"
                                        placeholder='e.g. 15,000 visitors'
                                        helperText={
                                            errorTrafficMess && revenueInput.dailyTraffic === ""
                                                ? "Please insert Daily Traffic"
                                                : null
                                        }
                                        error={errorTrafficMess && revenueInput.dailyTraffic === ""}
                                        value={revenueInput.dailyTraffic}
                                        onChange={inputRevenueEvent}
                                    />
                                </div>
                                <div className='welcomeInputs'>
                                    <Typography variant='p'>Average order value</Typography>
                                    <TextField
                                        className='please-width'
                                        id="" l
                                        abel=""
                                        name='averageOrderValue'
                                        variant="outlined"
                                        placeholder='e.g. $45.60'
                                        helperText={
                                            errorAverageorderMess && revenueInput.averageOrderValue === ""
                                                ? "Please insert Average order value"
                                                : null
                                        }
                                        error={errorAverageorderMess && revenueInput.averageOrderValue === ""}
                                        value={revenueInput.averageOrderValue}
                                        onChange={inputRevenueEvent}
                                    />
                                </div>
                                <div className='welcomeInputs' style={{ marginBottom: "20px" }}>
                                    <Typography variant='p'>Conversion rate</Typography>
                                    <TextField
                                        className='please-width'
                                        id=""
                                        label=""
                                        name='conversionRate'
                                        variant="outlined"
                                        placeholder='e.g. 2.7%'
                                        helperText={
                                            errorConversionRate && revenueInput.conversionRate === ""
                                                ? "Please insert Conversion rate"
                                                : null
                                        }
                                        error={errorConversionRate && revenueInput.conversionRate === ""}
                                        value={revenueInput.conversionRate}
                                        onChange={inputRevenueEvent}
                                    />
                                </div>
                                <a href='#scrollresult' style={{ textDecoration: "none" }} >
                                    <Button variant="contained" className='createaccountdiv text-trans'
                                        onClick={hideRevenueComponent}
                                    >Calculate!</Button>
                                </a>
                            </div>}



                            {togglescrollresult &&
                                <div id='scrollresult'>
                                    <div className='welcome-wrappers'>
                                        <div className='close-icon'>
                                            <img src={closeIcon} alt="" onClick={redirectRevenuePage} />
                                        </div>
                                        <Typography variant='h4'>Give them the results  here.</Typography>
                                        <Typography className='span' variant='p'>Calculate your expected revenue increase below!</Typography>
                                    </div>
                                    <div className='result-wrapper'>
                                        <div className='wrapper'>
                                            <img src={ResultRevenueLogo2} alt="" />
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
            <div>{errorfunction()}</div>
        </>
    )

}
