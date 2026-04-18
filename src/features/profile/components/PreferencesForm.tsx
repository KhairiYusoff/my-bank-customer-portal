import React from "react";
import { Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { Control } from "react-hook-form";
import type { UpdateProfileRequest } from "@/features/profile/types/profile";
import { themeOptions, languageOptions, notificationsOptions } from "../constants/formOptions";

interface PreferencesFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const PreferencesForm: React.FC<PreferencesFormProps> = ({
  control,
  editMode,
}) => (
  <Grid container spacing={2}>
    {/* Theme Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="preferences.theme"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="theme-label">Theme</InputLabel>
            <Select
              {...field}
              labelId="theme-label"
              label="Theme"
              disabled={!editMode}
            >
              {themeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
    {/* Language Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="preferences.language"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              {...field}
              labelId="language-label"
              label="Language"
              disabled={!editMode}
            >
              {languageOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
    {/* Notifications Field */}
    <Grid item xs={12} sm={4}>
      <Controller
        name="preferences.notifications"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="notifications-label">Notifications</InputLabel>
            <Select
              {...field}
              value={
                field.value === true
                  ? "true"
                  : field.value === false
                  ? "false"
                  : ""
              }
              onChange={(e) => field.onChange(e.target.value === "true")}
              labelId="notifications-label"
              label="Notifications"
              disabled={!editMode}
            >
              {notificationsOptions.map((opt) => (
                <MenuItem key={String(opt.value)} value={String(opt.value)}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  </Grid>
);

export default PreferencesForm;
