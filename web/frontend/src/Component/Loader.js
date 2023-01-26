import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = (props) => {
  return (
    <div style={{ width:'100%', height:'100%', margin:0, padding:0 }}>
<Box sx={{ display: 'flex', justifyContent:"center", alignItems:"center" }}>
      <CircularProgress size={props.size} />
    </Box>
  
    </div>
  )
}

export default Loader