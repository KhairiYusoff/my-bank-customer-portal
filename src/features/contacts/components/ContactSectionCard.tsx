import React from "react";
import { Box, CardContent, Typography, Stack, Chip } from "@mui/material";
import {
  ContactCard,
  ContactSectionIconAvatar,
  ContactItemBox,
} from "./styles";
import type { contactSections } from "../constants/contactSections";

type ContactSection = (typeof contactSections)[number];

interface ContactSectionCardProps {
  section: ContactSection;
}

const ContactSectionCard: React.FC<ContactSectionCardProps> = ({ section }) => {
  return (
    <ContactCard>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ContactSectionIconAvatar $colorScheme={section.colorScheme}>
            <Box sx={{ color: `${section.colorScheme}.main` }}>
              <section.IconComponent />
            </Box>
          </ContactSectionIconAvatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: `${section.colorScheme}.main` }}
            >
              {section.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {section.description}
            </Typography>
          </Box>
        </Box>

        <Stack spacing={2}>
          {section.contacts.map((contact, index) => (
            <ContactItemBox key={index}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Box
                  sx={{
                    color: `${section.colorScheme}.main`,
                    fontSize: "1rem",
                    mr: 1,
                    display: "flex",
                  }}
                >
                  <contact.IconComponent fontSize="small" />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {contact.type}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                sx={{ fontFamily: "monospace", mb: 0.5 }}
              >
                {contact.value}
              </Typography>
              <Chip
                label={contact.available}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontSize: "0.7rem" }}
              />
            </ContactItemBox>
          ))}
        </Stack>
      </CardContent>
    </ContactCard>
  );
};

export default ContactSectionCard;
