import React from "react";
import { Box, CardContent, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import { SectionCard, SectionDataBox, SectionIconAvatar } from "./styles";
import type { ProfileColorScheme } from "./styles";

interface ProfileSectionCardProps {
  title: string;
  IconComponent: SvgIconComponent;
  colorScheme: ProfileColorScheme;
  viewData: Record<string, string | undefined>;
}

const ProfileSectionCard: React.FC<ProfileSectionCardProps> = ({
  title,
  IconComponent,
  colorScheme,
  viewData,
}) => {
  return (
    <SectionCard>
      <CardContent sx={{ p: 3 }}>
        {/* Section Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <SectionIconAvatar $colorScheme={colorScheme}>
            <Box sx={{ color: `${colorScheme}.main` }}>
              <IconComponent />
            </Box>
          </SectionIconAvatar>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: `${colorScheme}.main` }}>
            {title}
          </Typography>
        </Box>

        {/* Section Fields */}
        <Stack spacing={2}>
          {Object.entries(viewData).map(([key, value]) =>
            value ? (
              <SectionDataBox key={key} $colorScheme={colorScheme}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                  }}
                >
                  {key}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                  {value}
                </Typography>
              </SectionDataBox>
            ) : null
          )}
        </Stack>
      </CardContent>
    </SectionCard>
  );
};

export default ProfileSectionCard;
