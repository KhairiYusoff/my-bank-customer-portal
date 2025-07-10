import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Phone, Email } from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";

const contactSections = [
  {
    title: "Consumer Call Centre",
    contacts: [
      { icon: <Phone />, type: "Telephone", value: "+603 6204 7788" },
      {
        icon: <Phone />,
        type: "Telephone (Premier Card)",
        value: "+603 6204 7799",
      },
      { icon: <Email />, type: "Email", value: "contactus@mybank.com" },
    ],
  },
  {
    title: "Preferred Call Centre",
    contacts: [
      { icon: <Phone />, type: "Telephone (Local)", value: "1 300 885 300" },
      {
        icon: <Phone />,
        type: "Telephone (Overseas)",
        value: "+603 2295 6888",
      },
      {
        icon: <Email />,
        type: "Email",
        value: "contactus@mybank.com",
      },
    ],
  },
];

const ContactUsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Call Us Anytime
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We are contactable 24/7
          </Typography>
        </Box>

        {contactSections.map((section, index) => (
          <Paper elevation={2} sx={{ mb: 4 }} key={index}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                {section.title}
              </Typography>
            </Box>
            <Divider />
            <List>
              {section.contacts.map((contact, contactIndex) => (
                <ListItem key={contactIndex}>
                  <ListItemIcon>{contact.icon}</ListItemIcon>
                  <ListItemText
                    primary={contact.type}
                    secondary={contact.value}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))}

        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the all-new MyBank Online Banking. Enjoy convenient, safe
            and instant banking access to your MyBank accounts with your
            desktop, laptop and mobile devices. Log in with your existing MyBank
            User ID and Password to perform your desired banking transactions
            swiftly.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Note: MyBank is only available for MyBank and MyBank Islamic Bank
            Malaysia account holders.
          </Typography>
        </Paper>
      </Container>
    </DashboardLayout>
  );
};

export default ContactUsPage;
