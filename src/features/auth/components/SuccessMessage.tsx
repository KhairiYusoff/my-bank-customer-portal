import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Alert,
  Button,
  Box,
  BoxProps,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HomeIcon from '@mui/icons-material/Home';

interface SuccessMessageProps {
  onNavigateHome?: () => void;
  sx?: BoxProps['sx'];
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  onNavigateHome,
  sx = {},
}) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      navigate('/');
    }
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        maxWidth: 600, 
        mx: 'auto', 
        mt: 4, 
        p: 4, 
        textAlign: 'center',
        ...sx 
      }}
    >
      <Box sx={{ position: 'relative', mb: 3 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            mx: 'auto',
            borderRadius: '50%',
            bgcolor: 'success.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <CheckCircleOutlineIcon sx={{ fontSize: 50, color: 'white' }} />
        </Box>
      </Box>
      
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
        Application Submitted Successfully!
      </Typography>
      
      <Alert 
        severity="success"
        sx={{ mb: 3, textAlign: 'left' }}
      >
        Thank you for choosing MyBank! Our team will review your application shortly.
      </Alert>
      
      <Box sx={{ 
        bgcolor: 'grey.50', 
        p: 2, 
        borderRadius: 1,
        mb: 3,
        textAlign: 'left',
      }}>
        <Typography variant="body1" paragraph>
          What's next:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mb: 0 }}>
          <li>
            <Typography variant="body2">
              We'll contact you within 1-2 business days
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Please have your ID documents ready
            </Typography>
          </li>
        </Box>
      </Box>
      
      <Button
        variant="contained"
        onClick={handleNavigateHome}
        startIcon={<HomeIcon />}
        sx={{
          borderRadius: 1,
          px: 3,
          textTransform: 'none'
        }}
      >
        Back to Home
      </Button>
    </Paper>
  );
};

export default SuccessMessage;
