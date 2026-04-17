import React from "react";
import { Box, Chip, Container, Grid, Stack } from "@mui/material";
import {
  ContactSupport as ContactIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/layouts/DashboardLayout";
import { PageHeader } from "@/components";
import { contactSections } from "../constants/contactSections";
import { ContactSectionCard, ContactForm, AboutSection } from "../components";

const ContactUsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {/* Page Header */}
          <PageHeader
            title="Contact Us"
            subtitle="We're here to help you 24/7 with all your banking needs"
            icon={<ContactIcon fontSize="large" />}
            colorScheme="primary"
          />

          {/* Header Chips */}
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Chip
              icon={<TimeIcon />}
              label="24/7 Available"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<LocationIcon />}
              label="Multi-channel Support"
              color="primary"
              variant="outlined"
            />
          </Stack>

          {/* Contact Sections + Form */}
          <Grid container spacing={4}>
            {/* Contact Sections Grid */}
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {contactSections.map((section, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <ContactSectionCard section={section} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Send Message Form */}
            <Grid item xs={12} lg={4}>
              <ContactForm />
            </Grid>
          </Grid>

          {/* About Section */}
          <AboutSection />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ContactUsPage;
