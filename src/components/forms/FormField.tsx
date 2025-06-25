import React from 'react';
import { Controller, type Control, FieldValues, Path } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  autoComplete?: string;
  startIcon?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  helperText?: string | undefined;
} & Omit<TextFieldProps, 'name' | 'control'>;

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  autoComplete,
  startIcon,
  disabled = false,
  error = false,
  helperText,
  ...textFieldProps
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error: fieldError } }) => (
      <TextField
        {...field}
        margin="normal"
        required
        fullWidth
        id={name.toString()}
        label={label}
        type={type}
        autoComplete={autoComplete}
        error={!!fieldError || error}
        helperText={fieldError?.message || helperText}
        disabled={disabled}
        InputProps={{
          startAdornment: startIcon && (
            <InputAdornment position="start">
              {startIcon}
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      />
    )}
  />
);

export default FormField;
