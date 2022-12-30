import loginImage from './Images/Group-45.png'
import { Button, TextField, OutlinedInput, IconButton, InputAdornment } from '@mui/material';
import googleImages from './Images/google (1).png'
import priceperfectimg from './Images/priceperfectimg.png';
import { NavLink } from "react-router-dom"
// import Revenue from './Revenue';
import ResultRevenueLogo from './Images/ResultRevenueLogo.png'
import getApiUrl from "../controller/utils.js";
import { useState } from 'react';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { handleGoogleSignIn } from "../controller/handleGoogleSignIn";

export default function SignUp() {

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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault();
    };

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

    function hideSignUpTime() {
        document.querySelectorAll(".hide_signup_div")[0].style.display = "none"
    }
    const hideSignUpComponent = () => setTimeout(hideSignUpTime, 1000);

    const hideRevenueTime = () => {
        document.querySelectorAll(".hide_revenue_div")[0].style.display = "none"
    }
    const hideRevenueComponent = async () => {
        setTimeout(hideRevenueTime, 1000)
        console.log("dailyrevenue", RevenueResult)
        let newArray = [...RevenueResult]
        newArray[0].dailyRevenueResult = dailyrevenue;
        newArray[0].dailytRafficResult = dailytraffic;
        newArray[0].orderValueResult = orderValue;
        newArray[0].ConversionRateResult = conversionRate;
        setRevenueResult(newArray)
    };

    // create sign up data
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
            fetch(getApiUrl + '/api/signupdetails', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => console.log(res))
                .catch((error) => console.log("Error", error))
        }
    }

    return (
        <>

            {/* SignUp Page */}
            <div className='alldetails hide_signup_div'>

                <div className="signupimages">
                    <div className='priceperfactimg'>
                        <img src={priceperfectimg} width='100%' alt="" />
                        <h3 className=''>PricePerfect</h3>
                    </div>
                    <img
                        src={loginImage}
                        width='100%'
                        alt=""
                    />
                </div>

                <div className='signupdetails'>

                    <div>
                        <h3 className='signText'>Sign Up</h3>
                    </div>

                    <div>
                        <p className='accountText'>Please enter your details to create an account</p>
                    </div>

                    <div className='userdetailsmaindiv'>
                        <div className='firstnamediv'>
                            <label>First Name</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder='Enter your first name'
                                name="firstName"
                                value={input.firstName}
                                onChange={inputEvent}
                            // error={true}
                            />
                        </div>

                        <div className='firstnamediv'>
                            <label>Last Name</label>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder='Enter your last name'
                                name="lastName"
                                value={input.lastName}
                                onChange={inputEvent}
                            />
                        </div>
                    </div>

                    <div className='firstnamediv w-100 mb-12'>
                        <label>Email</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder='Enter your mail'
                            name="email"
                            value={input.email}
                            onChange={inputEvent}
                        />
                    </div>

                    <div className='firstnamediv w-100 mb-12'>
                        <label>Password</label>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
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

                    {/* <div className='firstnamediv w-100 mb-12'>
                        <label>Password</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Password"
                            placeholder='Enter your password'
                            name="password"
                            value={input.password}
                            onChange={inputEvent}
                        />
                    </div> */}

                    {/* <div className='firstnamediv w-100 mb-29'>
                        <label>Confirm Password</label>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder='Enter your password'
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={inputEvent}
                        />
                    </div> */}

                    <div className='firstnamediv w-100 mb-29'>
                        <label>Confirm Password</label>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
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

                    <Button variant="outlined" className='createaccountwithgooglediv'  onClick={() => handleGoogleSignIn()}>
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
                        <a href='#scrollrevenue'>
                            <Button variant="text" className='trynowbtn' onClick={hideSignUpComponent}><span>
                                Try Now!
                            </span></Button>
                        </a>
                    </div>

                </div>


            </div>

            {/* Revenue Increase Page */}
            <div className='alldetails hide_revenue_div' id='scrollrevenue'>

                <div className="signupimages">
                    <div className='priceperfactimg'>
                        <img src={priceperfectimg} width='100%' alt="" />
                        <h3>PricePerfect</h3>
                    </div>
                    <img src={loginImage} width='100%' alt="" />
                </div>

                <div className='signupdetails'>
                    <div className='mb-28 flex'>
                        <h3 className='signText mb-12'>Revenue Increase Estimator</h3>
                        <p className='accountText'>Calculate your expected revenue increase below!</p>
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily revenue</label>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            placeholder='e.g. $5000'
                            value={dailyrevenue}
                            onChange={(e) => setDailyrevenue(e.target.value)}
                        />
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily Traffic</label>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            placeholder='e.g. 15,000 visitors'
                            value={dailytraffic}
                            onChange={(e) => setDailyTraffic(e.target.value)}
                        />
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Average order value</label>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            placeholder='e.g. $45.60'
                            value={orderValue}
                            onChange={(e) => setOrderValue(e.target.value)}
                        />
                    </div>
                    <div className='firstnamediv w-100 mb-34'>
                        <label>Conversion rate</label>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            placeholder='e.g. 2.7%'
                            value={conversionRate}
                            onChange={(e) => setConversionRate(e.target.value)}
                        />
                    </div>

                    <a href='#scrollresult'>
                        <Button
                            variant="contained"
                            className='createaccountdiv text-trans'
                            onClick={hideRevenueComponent}
                        >
                            Calculate!
                        </Button>
                    </a>
                </div>
            </div>

            {/* Results Page */}
            <div className='alldetails hide_revenue_div' id='scrollresult'>
                <div className="signupimages">
                    <div className='priceperfactimg'>
                        <img src={priceperfectimg} width='100%' alt="" />
                        <h3 className=''>PricePerfect</h3>
                    </div>
                    <img src={loginImage} width='100%' alt="" />
                </div>

                <div className='signupdetails'>
                    <div className='mb-49 flex'>
                        <h3 className='signText mb-12'>Give them the results  here.</h3>
                        <p className='accountText'>Calculate your expected revenue increase below!</p>
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
                    <div className='mb-41'>
                        <div className='daily-wrapper'>
                            <span>Daily Revenue </span>
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
                    <NavLink to="/homeDashboard"><Button variant='contained' className='createaccountdiv text-trans'>Get Started Now!</Button></NavLink>
                </div>
            </div>
        </>
    )

}
 