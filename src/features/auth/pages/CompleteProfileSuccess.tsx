import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

const CompleteProfileSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 80, mb: 3 }}
        />
        
        <Typography component="h1" variant="h4" gutterBottom>
          Profile Successfully Completed!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" paragraph>
          Thank you for completing your profile with MyBank.
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, mt: 3, width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            What happens next?
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Box sx={{ color: 'success.main' }}>1</Box>
              </ListItemIcon>
              <ListItemText
                primary="Profile Review"
                secondary="Our team will review your profile details. This usually takes 1-2 business days."
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <Box sx={{ color: 'success.main' }}>2</Box>
              </ListItemIcon>
              <ListItemText
                primary="Account Activation"
                secondary="Once approved, your account will be activated and you'll receive a confirmation email."
              />
            </ListItem>
            
            <Divider variant="inset" component="li" />
            
            <ListItem>
              <ListItemIcon>
                <Box sx={{ color: 'success.main' }}>3</Box>
              </ListItemIcon>
              <ListItemText
                primary="Get Started"
                secondary="You can then log in to access your account and start using our services."
              />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              size="large"
              sx={{ minWidth: 180 }}
            >
              Go to Login
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleBackToHome}
              startIcon={<HomeIcon />}
              size="large"
              sx={{ minWidth: 180 }}
            >
              Back to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CompleteProfileSuccess;
