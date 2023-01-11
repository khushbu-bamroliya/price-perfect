import { TextField } from '@mui/material'
import React from 'react'
import dragAndDropIcon from './Images/dragAndDropIcon.png'

const ProfileSettingsTab = () => {
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
        </>
    )
}

export default ProfileSettingsTab