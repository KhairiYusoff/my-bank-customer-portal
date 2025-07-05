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
import type { UpdateProfileRequest } from "@features/dashboard/types/profile";

interface PersonalInfoFormProps {
  control: Control<UpdateProfileRequest>;
  editMode: boolean;
}

const maritalStatusOptions = [
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
];

const educationLevelOptions = [
  { value: "none", label: "None" },
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "diploma", label: "Diploma" },
  { value: "degree", label: "Degree" },
  { value: "postgraduate", label: "Postgraduate" },
];

const residencyStatusOptions = [
  { value: "citizen", label: "Citizen" },
  { value: "permanent resident", label: "Permanent Resident" },
  { value: "foreigner", label: "Foreigner" },
];

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  control,
  editMode,
}) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="identityNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Identity Number"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Age"
            type="number"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="nationality"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nationality"
            fullWidth
            disabled={!editMode}
          />
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="maritalStatus"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="marital-status-label">Marital Status</InputLabel>
            <Select
              {...field}
              labelId="marital-status-label"
              label="Marital Status"
              disabled={!editMode}
            >
              {maritalStatusOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="educationLevel"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="education-level-label">Education Level</InputLabel>
            <Select
              {...field}
              labelId="education-level-label"
              label="Education Level"
              disabled={!editMode}
            >
              {educationLevelOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Controller
        name="residencyStatus"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="residency-status-label">
              Residency Status
            </InputLabel>
            <Select
              {...field}
              labelId="residency-status-label"
              label="Residency Status"
              disabled={!editMode}
            >
              {residencyStatusOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
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

export default PersonalInfoForm;
