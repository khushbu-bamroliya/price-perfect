import react from 'react';
import loginImage from './Images/Group-45.png'
import { Link, Button, TextField } from '@mui/material';
import priceperfectimg from './Images/priceperfectimg.png';
export default function Revenue() {
    return (
        <>
            <div className='alldetails'>
                
                <div className="signupimages">
                <div className='priceperfactimg'>
                    <img src={priceperfectimg} width='100%'/>
                    <h3>PricePerfect</h3>
                </div>
                    <img src={loginImage} width='100%' />
                </div>
​
                <div className='signupdetails'>
                    <div className='mb-28 flex'>
                        <h3 className='signText mb-12'>Revenue Increase Estimator</h3>
                        <p className='accountText'>Calculate your expected revenue increase below!</p>
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily revenue</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. $5000'/>
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Daily Traffic</label>
                        <TextField id="" label="" variant="outlined"  placeholder='e.g. 15,000 visitors'/>
                    </div>
                    <div className='firstnamediv w-100 mb-12'>
                        <label>Average order value</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. $45.60'/>
                    </div>
                    <div className='firstnamediv w-100 mb-34'>
                        <label>Conversion rate</label>
                        <TextField id="" label="" variant="outlined" placeholder='e.g. 2.7%'/>
                    </div>
                        <Button variant="contained" className='createaccountdiv text-trans'>Calculate!</Button>
                </div>
            </div>
        </>
    )
}