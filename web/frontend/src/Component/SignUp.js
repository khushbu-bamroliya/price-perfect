import loginImage from './Images/Group-45.png'
import { Button, TextField } from '@mui/material';
import googleImages from './Images/google (1).png'
import priceperfectimg from './Images/priceperfectimg.png';
import { NavLink } from "react-router-dom"
// import Revenue from './Revenue';
import ResultRevenueLogo from './Images/ResultRevenueLogo.png'


export default function SignUp() {
    
    function hideSignUpTime() {
        document.querySelectorAll(".hide_signup_div")[0].style.display = "none"
    }
    const hideSignUpComponent = () => setTimeout(hideSignUpTime, 1000);

    
    const hideRevenueTime = () => {
        document.querySelectorAll(".hide_revenue_div")[0].style.display = "none"
    }
    const hideRevenueComponent = () => setTimeout(hideRevenueTime, 1000);

    return (
        <>

            {/* SignUp Page */}
            <div className='alldetails hide_signup_div'>

                <div className="signupimages">
                    <div className='priceperfactimg'>
                        <img src={priceperfectimg} width='100%' alt=""/>
                        <h3 className=''>PricePerfect</h3>
                    </div>
                    <img
                        src={loginImage}
                        width='100%'
                        alt=""
                    />
                </div>

                <div className='signupdetails'>

                    <div className=''>


                        <h3 className='signText'>Sign Up</h3>
                    </div>

                    <div>

                        <p className='accountText'>Please enter your details to create an account</p>
                    </div>

                    <div className='userdetailsmaindiv'>
                        <div className='firstnamediv'>
                            <label>First Name</label>
                            <TextField id="outlined-basic" label="" variant="outlined" placeholder='Enter your first name' />
                        </div>
                        <div className='firstnamediv'>
                            <label>Last Name</label>
                            <TextField id="outlined-basic" label="" variant="outlined" placeholder='Enter your last name' />
                        </div>
                    </div>

                    <div className='firstnamediv w-100 mb-12'>
                        <label>Email</label>
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder='Enter your mail' />
                    </div>

                    <div className='firstnamediv w-100 mb-12'>
                        <label>Password</label>
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder='Enter your password' />
                    </div>

                    <div className='firstnamediv w-100 mb-29'>
                        <label>Confirm Password</label>
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder='Enter your password' />
                    </div>


                    <Button variant="contained" className='createaccountdiv'>Create Account</Button>

                    <Button variant="outlined" className='createaccountwithgooglediv'>
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
                        <img src={priceperfectimg} width='100%' alt=""/>
                        <h3>PricePerfect</h3>
                    </div>
                    <img src={loginImage} width='100%' alt=""/>
                </div>

                <div className='signupdetails'>
                    <div className='mb-28 flex'>
                        <h3 className='signText mb-12'>Revenue Increase Estimator</h3>
                        <p className='accountText'>Calculate your expected revenue increase below!</p>
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily revenue</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. $5000' />
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily Traffic</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. 15,000 visitors' />
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Average order value</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. $45.60' />
                    </div>
                    <div className='firstnamediv w-100 mb-34'>
                        <label>Conversion rate</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. 2.7%' />
                    </div>

                    <a href='#scrollresult'>
                    <Button variant="contained" className='createaccountdiv text-trans' onClick={hideRevenueComponent}>Calculate!</Button></a>
                </div>
            </div>

            {/* Results Page */}
            <div className='alldetails hide_revenue_div' id='scrollresult'>
                <div className="signupimages">
                    <div className='priceperfactimg'>
                        <img src={priceperfectimg} width='100%' alt=""/>
                        <h3 className=''>PricePerfect</h3>
                    </div>
                    <img src={loginImage} width='100%' alt=""/>
                </div>

                <div className='signupdetails'>
                    <div className='mb-49 flex'>
                        <h3 className='signText mb-12'>Give them the results  here.</h3>
                        <p className='accountText'>Calculate your expected revenue increase below!</p>
                    </div>
                    <div className='result-wrapper'>
                        <div className='wrapper'>
                            <img src={ResultRevenueLogo} alt=""/>
                            <span>Your revenue is expected to increase by ×% to Sxxx per day</span>
                        </div>
                        <div className='wrapper'>
                            <img src={ResultRevenueLogo} alt=""/>
                            <span>That is Sxxx per month in additional revenue and Sxxx per year!</span>
                        </div>
                    </div>
                    <div className='mb-41'>
                        <div className='daily-wrapper'>
                            <span>Daily Revenue</span>
                            <div>XXXX</div>
                        </div>
                        <div className='daily-wrapper'>
                            <span>Daily Traffic</span>
                            <div>XXXX</div>
                        </div>
                        <div className='daily-wrapper'>
                            <span>Avg order value</span>
                            <div>XXXX</div>
                        </div>
                        <div className='daily-wrapper'>
                            <span>Conversion rate</span>
                            <div>XXXX</div>
                        </div>
                    </div>
                    <NavLink to="/homeDashboard"><Button variant='contained' className='createaccountdiv text-trans'>Get Started Now!</Button></NavLink>
                </div>
            </div>
        </>
    )

}
