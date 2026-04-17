import React, { useState } from "react";
import { Box, CardContent, Typography, TextField, Stack } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ContactFormCard, InfoFormAvatar, SendMessageButton } from "./styles";

const ContactForm: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const handleFormChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
  };

  return (
    <ContactFormCard>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <InfoFormAvatar>
            <SendIcon sx={{ color: "info.main" }} />
          </InfoFormAvatar>
          <Typography variant="h6" sx={{ color: "info.main", fontWeight: 600 }}>
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
              onChange={(e) => handleFormChange("email", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <TextField
              label="Subject"
              fullWidth
              value={contactForm.subject}
              onChange={(e) => handleFormChange("subject", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              value={contactForm.message}
              onChange={(e) => handleFormChange("message", e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
            <SendMessageButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<SendIcon />}
            >
              Send Message
            </SendMessageButton>
          </Stack>
        </form>
      </CardContent>
    </ContactFormCard>
  );
};

export default ContactForm;
