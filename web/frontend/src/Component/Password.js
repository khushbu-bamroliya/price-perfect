import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EcoPackablesLogo from '../assets/EcoPackablesLogo.png';
import IconButton from '@mui/material/IconButton';

import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Password() {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Container maxWidth="sm">
                <Box className="container" style={{height: '474px', padding: '30px'}} >
                    <img src={EcoPackablesLogo} className="logo-blue" />
                    <Typography variant="h5" gutterBottom>Welcome to EcoPackables!</Typography>
                    <Typography variant="caption" gutterBottom>Enter a password below to get started</Typography>
                    <FormControl  sx={{ m: 1, width: '100%' }} variant="filled"  className="input-field">
                        <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl  sx={{ m: 1, width: '100%' }} variant="filled"  className="input-field">
                        <InputLabel htmlFor="filled-adornment-password">Confirm Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* <TextField style={{ borderRadius: '100px' }} fullWidth id="new_password" label="New Password" variant="outlined" className="input-field" />
                    <TextField fullWidth id="confirm_password" label="Confirm Password" variant="outlined" className='input-field' /> */}
                    <Button className="create_password-button">Create Password</Button>
                </Box>
            </Container>
        </>
    )
}
