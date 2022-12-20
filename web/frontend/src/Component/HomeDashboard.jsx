import { Card, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../components/MUI/Navbar'

const HomeDashboard = () => {
  return (
    <>
      <Card className='homeDashboard'>
        <div className="nav">

          <Navbar />
        </div>
        <div className='dashboardBlock' >
          <div>
            <Typography variant='p'>
              Your Dashboard
            </Typography>
          </div>
        </div>
      </Card>

    </>
  )
}

export default HomeDashboard