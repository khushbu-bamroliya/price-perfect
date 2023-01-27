import { Alert, Button, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import dragAndDropIcon from './Images/dragAndDropIcon.png'
import getApiUrl from "../controller/utils.js";
import Loader from './Loader';
import cookieReader from '../controller/cookieReader';

const ProfileSettingsTab = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        googleId: "",
        country: "",
        picture: "no file choosen"
    }
    const [userData, setUserData] = useState(initialValues);
    const [opens, setOpens] = useState(false);
    const [snackbar_msg, setsnackbar_msg] = useState("");
    const [snackbarColor, setSnackbarColor] = useState("#325240");
    console.log("userData", userData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };
    const getUser = () => {

        var cookieArr = document.cookie.split(";");

        // Loop through the array elements
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");

            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if ("token" == cookiePair[0].trim()) {

                fetch(getApiUrl + `/api/getSingleProfile/${JSON.stringify(decodeURIComponent(cookiePair[1])).replaceAll('"', '')}`, {
                    method: 'GET',
                    headers: {
                        'shop': cookieReader('shop')
                    }
                })
                    .then(async (res) => {
                        console.log("res profile: " + JSON.stringify(res));
                        const apiRes = await res.json()
                        setUserData(apiRes.data)
                        console.log("apiRes.data", apiRes);
                        setOpens(true)
                        setSnackbarColor('#325240')
                        setsnackbar_msg("Profile updated")

                    })
                    .catch((error) => {
                        setOpens(true)
                        setSnackbarColor('red')
                        setsnackbar_msg("Profile not updated")
                        console.log("Error", error)
                    })
            }
        }
        console.log("updateUser()");


    }
    const updateUser = () => {
        var cookieArr = document.cookie.split(";");
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            if ("token" == cookiePair[0].trim()) {
                fetch(getApiUrl + `/api/update-profile/${JSON.stringify(decodeURIComponent(cookiePair[1])).replaceAll('"', '')}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                    .then(async (res) => {
                        console.log("res profile: " + JSON.stringify(res));
                        const apiRes = await res.json()
                        setUserData(apiRes.data)
                        console.log("apiRes.data", apiRes);

                    })
                    .catch((error) => console.log("Error", error))
            }
        }
        console.log("updateUser()");

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

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>

            <div className="profilesettingsTab">
                {!userData ? <Loader size={40}  /> : (<>

                    <div className='profileInputsBlock1'>

                        <label className='profileInputs'>
                            <p>First Name</p>
                            <TextField placeholder='First name' name='firstName' value={userData.firstName} onChange={handleInputChange} className='profileInputField' />
                        </label>
                        <label className='profileInputs'>
                            <p>Last Name</p>
                            <TextField placeholder='Last name' name='lastName' value={userData.lastName} onChange={handleInputChange} className='profileInputField' />
                        </label>
                    </div>
                    <div className='profileInputsBlock2'>
                        <div className='mailandcountry'>

                            <label className='profileInputs'>
                                <p>Email Address</p>
                                <TextField placeholder='Your mail' name='email' value={userData.email} onChange={handleInputChange} className='profileInputField' />
                            </label>
                            <label className='profileInputs'>
                                <p>Country</p>
                                <TextField placeholder='United States' name='country' value={userData.country} onChange={handleInputChange} className='profileInputField' />
                            </label>
                        </div>
                        <div className='dragAndDrop'>
                            <label>
                                <p>Your Photo</p>
                                <div>
                                    <input type="file"
                                        // value={userData.picture}
                                        name="picture"
                                        onChange={handleInputChange}
                                    />
                                    <img src={dragAndDropIcon} alt="" />
                                    <p>Click to upload, or drag and drop</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </>)}
            </div>
            <Button onClick={() => updateUser()}>Save</Button>
            <div>{errorfunction()}</div>
        </>
    )
}

export default ProfileSettingsTab