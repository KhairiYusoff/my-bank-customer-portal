import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";
import { Controller, useWatch } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import type { ExpenseCategory } from "../../types/expense";

interface CategorySelectProps {
  control: Control<any>;
  error?: FieldError;
  subCategoryError?: FieldError;
  categories: ExpenseCategory[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  control,
  error,
  subCategoryError,
  categories,
}) => {
  const selectedCategory = useWatch({ control, name: "category" });

  const getSubcategories = () => {
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category?.subcategories || [];
  };

  return (
    <>
      {/* Category */}
      <Grid item xs={12} md={6}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Category"
              select
              fullWidth
              variant="outlined"
              error={!!error}
              helperText={error?.message}
              InputProps={{
                startAdornment: (
                  <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>

      {/* Subcategory */}
      <Grid item xs={12} md={6}>
        <Controller
          name="subCategory"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Subcategory (Optional)"
              select
              fullWidth
              variant="outlined"
              error={!!subCategoryError}
              helperText={subCategoryError?.message}
              disabled={!selectedCategory}
              InputProps={{
                startAdornment: (
                  <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            >
              <MenuItem value="">None</MenuItem>
              {getSubcategories().map((subcategory) => (
                <MenuItem key={subcategory.value} value={subcategory.value}>
                  {subcategory.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
    </>
  );
};

export default CategorySelect;
