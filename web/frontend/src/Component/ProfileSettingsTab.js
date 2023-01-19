import { Button, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import dragAndDropIcon from './Images/dragAndDropIcon.png'
import getApiUrl from "../controller/utils.js";

const ProfileSettingsTab = () => {
    // const getUser = () => {

    //     var cookieArr = document.cookie.split(";");

    //     // Loop through the array elements
    //     for (var i = 0; i < cookieArr.length; i++) {
    //         var cookiePair = cookieArr[i].split("=");

    //         /* Removing whitespace at the beginning of the cookie name
    //         and compare it with the given string */
    //         if ("token" == cookiePair[0].trim()) {

    //         }
    //     }
    //     console.log("updateUser()");


    //     fetch(getApiUrl + `/api/getSingleProfile/${JSON.stringify(decodeURIComponent(cookiePair[1])).replaceAll('"','')}`, {
    //         method: 'GET',

    //     })
    //         .then(async (res) => {
    //             console.log("res profile: " + JSON.stringify(res));
    //             const apiRes = await res.json()
    //             console.log("apiRes.data", apiRes);

    //         })
    //         .catch((error) => console.log("Error", error))
    // }

useEffect(() => {
    // getUser()
}, [])

return (
    <>
        <div className="profilesettingsTab">
            <div className='profileInputsBlock1'>

                <label className='profileInputs'>
                    <p>First Name</p>
                    <TextField placeholder='First name' className='profileInputField' />
                </label>
                <label className='profileInputs'>
                    <p>Last Name</p>
                    <TextField placeholder='Last name' className='profileInputField' />
                </label>
            </div>
            <div className='profileInputsBlock2'>
                <div className='mailandcountry'>

                    <label className='profileInputs'>
                        <p>Email Address</p>
                        <TextField placeholder='Your mail' className='profileInputField' />
                    </label>
                    <label className='profileInputs'>
                        <p>Country</p>
                        <TextField placeholder='United States' className='profileInputField' />
                    </label>
                </div>
                <div className='dragAndDrop'>
                    <label>
                        <p>Your Photo</p>
                        <div>
                            <img src={dragAndDropIcon} alt="" />
                            <p>Click to upload, or drag and drop</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        {/* <Button onClick={() => updateUser}>Save</Button> */}
    </>
)
}

export default ProfileSettingsTab