import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  TextField,
  Stack,
  Chip,
} from "@mui/material";
import { 
  Phone, 
  Email, 
  ContactSupport as ContactIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  Support as SupportIcon
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";

const contactSections = [
  {
    title: "Consumer Banking",
    description: "General banking services and inquiries",
    icon: <Phone />,
    color: '#00509e',
    contacts: [
      { icon: <Phone />, type: "Telephone", value: "+603 6204 7788", available: "24/7" },
      { icon: <Phone />, type: "Premier Card Hotline", value: "+603 6204 7799", available: "24/7" },
      { icon: <Email />, type: "Email Support", value: "contactus@mybank.com", available: "24-48 hours response" },
    ],
  },
  {
    title: "Preferred Banking",
    description: "Premium banking services for preferred customers",
    icon: <SupportIcon />,
    color: '#1976d2',
    contacts: [
      { icon: <Phone />, type: "Local Hotline", value: "1 300 885 300", available: "24/7" },
      { icon: <Phone />, type: "International", value: "+603 2295 6888", available: "24/7" },
      { icon: <Email />, type: "Priority Email", value: "preferred@mybank.com", available: "12-24 hours response" },
    ],
  },
];

const ContactUsPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: ''
  });

  const handleFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Header Section */}
          <Paper sx={{ 
            p: 4, 
            mb: 4, 
            background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
            color: 'white',
            borderRadius: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                mr: 2,
                width: 56,
                height: 56
              }}>
                <ContactIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  Contact Us
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                  We're here to help you 24/7 with all your banking needs
                </Typography>
              </Box>
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Chip 
                icon={<TimeIcon />} 
                label="24/7 Available" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }} 
              />
              <Chip 
                icon={<LocationIcon />} 
                label="Multi-channel Support" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  '& .MuiChip-icon': { color: 'white' }
                }} 
              />
            </Stack>
          </Paper>

          <Grid container spacing={4}>
            {/* Contact Sections */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {contactSections.map((section, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Card sx={{ 
                      height: '100%',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0, 80, 158, 0.15)'
                      }
                    }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Avatar sx={{ 
                            backgroundColor: `${section.color}15`,
                            mr: 2,
                            width: 48,
                            height: 48
                          }}>
                            <Box sx={{ color: section.color }}>
                              {section.icon}
                            </Box>
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: section.color }}>
                              {section.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {section.description}
                            </Typography>
                          </Box>
                        </Box>

                        <Stack spacing={2}>
                          {section.contacts.map((contact, contactIndex) => (
                            <Box 
                              key={contactIndex}
                              sx={{ 
                                p: 2, 
                                backgroundColor: 'rgba(0, 80, 158, 0.03)',
                                borderRadius: 2,
                                border: '1px solid rgba(0, 80, 158, 0.1)'
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar sx={{ 
                                  backgroundColor: 'transparent',
                                  mr: 1,
                                  width: 24,
                                  height: 24
                                }}>
                                  <Box sx={{ color: section.color, fontSize: '1rem' }}>
                                    {contact.icon}
                                  </Box>
                                </Avatar>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                  {contact.type}
                                </Typography>
                              </Box>
                              <Typography variant="h6" sx={{ fontFamily: 'monospace', mb: 0.5 }}>
                                {contact.value}
                              </Typography>
                              <Chip 
                                label={contact.available} 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} lg={4}>
              <Card sx={{ 
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ 
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      mr: 2
                    }}>
                      <SendIcon sx={{ color: '#1976d2' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 600 }}>
                      Send Us a Message
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={contactForm.email}
                        onChange={(e) => handleFormChange('email', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                      
                      <TextField
                        label="Subject"
                        fullWidth
                        value={contactForm.subject}
                        onChange={(e) => handleFormChange('subject', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                      
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        fullWidth
                        value={contactForm.message}
                        onChange={(e) => handleFormChange('message', e.target.value)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                      
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<SendIcon />}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
                          fontSize: '1rem',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(135deg, #00509e 20%, #1976d2 80%)',
                          }
                        }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* About Section */}
          <Card sx={{ 
            mt: 4,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 80, 158, 0.08)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#00509e', mb: 3 }}>
                About MyBank Online Banking
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                    Welcome to the all-new MyBank Online Banking experience. We provide convenient, 
                    safe and instant banking access to your MyBank accounts through your desktop, 
                    laptop and mobile devices. 
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
                    Log in with your existing MyBank credentials to perform your desired banking 
                    transactions swiftly and securely from anywhere, anytime.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(0, 80, 158, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 80, 158, 0.1)'
                  }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      IMPORTANT NOTE
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      MyBank Online Banking is exclusively available for MyBank and 
                      MyBank Islamic Bank Malaysia account holders.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ContactUsPage;
