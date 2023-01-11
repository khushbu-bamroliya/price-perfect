import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EcoPackablesLogo from '../assets/EcoPackablesLogo.png';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  padding: '30px',
  borderRadius: '10px',
};

const WelcomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Container maxWidth="sm">
        <Box className="container" style={{height: '576px', padding: '30px'}} >
          <img src={EcoPackablesLogo} className="logo-blue" />
          <Typography variant="h5" gutterBottom>Welcome!</Typography>
          <Typography variant="caption" gutterBottom>Please reauthenticate your account to log in to EcoPackables</Typography>
          <TextField style={{ borderRadius: '100px' }} fullWidth id="fname_input" label="First Name" variant="filled" className="input-field" />
          <TextField fullWidth id="lname_input" label="Last Name" variant="filled" className='input-field' />
          <TextField fullWidth id="email_input" label="Email" variant="filled" className='input-field' />
          <Button onClick={handleOpen} className="reauthenticate-button">Reauthenticate</Button>
        </Box>

      </Container>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="model-pop"
      >
        <Box sx={style}>
          <img src={EcoPackablesLogo} className="logo-blue" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Congratulations
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Woohoo! Please check your email to verify your account and set a new password.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default WelcomePage;