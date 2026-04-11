import React from "react";
import { TextField, MenuItem, Grid } from "@mui/material";
import { Category as CategoryIcon } from "@mui/icons-material";
import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import type { ExpenseCategory } from "../../types/expense";

interface CategorySelectProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  error?: any;
  categories: ExpenseCategory[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({ 
  register, 
  watch, 
  error, 
  categories 
}) => {
  const selectedCategory = watch("category");

  // Get subcategories for selected category
  const getSubcategories = () => {
    const category = categories.find((cat) => cat.value === selectedCategory);
    return category?.subcategories || [];
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          {...register("category")}
          label="Category"
          select
          fullWidth
          variant="outlined"
          error={!!error}
          helperText={error?.message}
          InputProps={{
            startAdornment: <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Subcategory */}
      <Grid item xs={12} md={6}>
        <TextField
          {...register("subCategory")}
          label="Subcategory (Optional)"
          select
          fullWidth
          variant="outlined"
          error={!!error?.subCategory}
          helperText={error?.subCategory?.message}
          disabled={!selectedCategory}
          InputProps={{
            startAdornment: <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        >
          <MenuItem value="">None</MenuItem>
          {getSubcategories().map((subcategory) => (
            <MenuItem key={subcategory.value} value={subcategory.value}>
              {subcategory.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
};

export default CategorySelect;
