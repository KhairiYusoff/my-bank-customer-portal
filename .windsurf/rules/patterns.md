# Engineering Bible (MyBank Customer Portal)

Purpose: Single source of truth for coding patterns in this repo.

## Non-Negotiables

- Read existing implementation pattern before coding.
- Keep modules self-contained and maintainable.
- Prefer existing utilities/hooks/services over creating new ones.
- Avoid broad rewrites for small feature/fix requests.

## Architecture Rules

- Pages: Composition focused, avoid heavy business logic.
- Components: Own UI behavior/state where appropriate.
- Hooks/Services: Centralize side effects and integrations.
- Redux/State Flow: Follow existing slice/action/selectors style used in adjacent files.

## Project Structure

```
src/
  app/
    store/           # Redux store configuration
    hooks/           # Global hooks
  components/        # Shared components
    forms/           # Form components
  features/
    [feature]/       # Feature-based organization
      components/    # Feature components
      pages/         # Feature pages
      hooks/         # Feature-specific hooks
      store/         # Feature Redux state
        *Api.ts      # RTK Query API slices
      validations/   # Form validation schemas
      services/      # Feature services
  layouts/          # Layout components
  providers/        # Context providers
  theme.ts          # Material-UI theme
  types/            # TypeScript types
  utils/            # Utility functions
```

## Component Patterns

**React Component Structure:**

```typescript
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import DashboardLayout from "@/layouts/DashboardLayout";

const Component: React.FC = () => {
  // State management with useState
  const [loading, setLoading] = useState(false);

  // Event handlers
  const handleClick = () => {
    // Handle event
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Component Title</Typography>
          {/* Component content */}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Component;
```

## Page Patterns

**Page Structure:**

- Use `DashboardLayout` wrapper for authenticated pages
- Handle loading and error states gracefully
- Use `Container` for responsive layout
- Implement proper empty states

**Loading/Error States:**

```typescript
// Loading state
if (isLoading) {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Paper sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
              Loading...
            </Typography>
          </Paper>
        </Box>
      </Container>
    </DashboardLayout>
  );
}

// Error state
if (error) {
  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{message}</Alert>
        </Box>
      </Container>
    </DashboardLayout>
  );
}
```

## Form Patterns

**Custom Hook Approach:**

```typescript
// hooks/useDepositForm.ts
export const useDepositForm = () => {
  const { data: accountsResponse, isLoading: isLoadingAccounts } =
    useGetAccountsQuery();
  const [deposit, { isLoading, isSuccess, isError, error }] =
    useDepositMutation();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<IDepositForm>({
    resolver: yupResolver(depositSchema),
    mode: "onChange",
    defaultValues: { accountNumber: "", amount: 0, description: "" },
  });

  const onSubmit = (data: IDepositForm) => {
    deposit(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    isLoadingAccounts,
    accountsResponse,
    onSubmit,
  };
};
```

**Form Component:**

```typescript
const DepositPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isLoading,
    onSubmit,
  } = useDepositForm();

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Account"
                error={!!errors.accountNumber}
                helperText={errors.accountNumber?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty || !isValid || isLoading}
          >
            Submit
          </Button>
        </form>
      </Container>
    </DashboardLayout>
  );
};
```

## Validation Patterns

**Yup Schemas:**

```typescript
// validations/accountValidation.ts
export const depositSchema = yup.object().shape({
  accountNumber: yup.string().required("Account is required"),
  amount: yup
    .number()
    .min(0.01, "Amount must be at least 0.01")
    .required("Amount is required"),
  description: yup.string().optional(),
});

export type IDepositForm = yup.InferType<typeof depositSchema>;
```

## Redux/RTK Query Patterns

**API Slice Structure:**

```typescript
// store/accountsApi.ts
export const accountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<AccountsResponse, void>({
      query: () => "/accounts",
      providesTags: ["Account"],
    }),
    deposit: builder.mutation<DepositResponse, DepositRequest>({
      query: (data) => ({
        url: "/accounts/deposit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

export const { useGetAccountsQuery, useDepositMutation } = accountsApi;
```

## Material-UI Patterns

**Styling Approach:**

- Use `sx` prop for component-specific styles
- Use styled components for complex layouts
- Maintain consistent spacing and typography
- Use Material-UI theme colors

**Component Styling:**

```typescript
<Box sx={{
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 3,
}}>
```

**Styled Components:**

```typescript
// components/styles.ts
export const DepositFormCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  overflow: "hidden",
}));
```

## Hook Patterns

**Custom Hook Structure:**

- Extract form logic into custom hooks
- Handle API calls and state management
- Return form controls and state
- Handle success/error side effects

**Hook Example:**

```typescript
export const useCustomHook = () => {
  const [state, setState] = useState();
  const apiCall = useApiCall();
  const toast = useToast();

  useEffect(() => {
    // Handle side effects
  }, [dependencies]);

  const handleAction = useCallback(() => {
    // Handle action
  }, [dependencies]);

  return {
    state,
    handleAction,
    // Other returned values
  };
};
```

## Toast/Notification Patterns

**Toast Usage:**

```typescript
import { useToast } from "@/utils/snackbarUtils";

const toast = useToast();

// Success
toast.success("Operation successful!");

// Error
toast.error("Operation failed!");

// Info
toast.info("Information message");
```

## Empty State Patterns

**Empty State Component:**

```typescript
<EmptyState
  icon={<AccountBalanceIcon />}
  title="No Accounts Available"
  description="You need at least one account to perform this action."
/>
```

## TypeScript Patterns

**Type Definitions:**

- Define interfaces for props and data
- Use `yup.InferType` for form data types
- Export types from feature directories
- Use proper typing for API responses

**Import Patterns:**

```typescript
import React from "react";
import { useAppSelector } from "@/app/hooks";
import { Component } from "@/features/[feature]/components/Component";
```

## Service Patterns

**Service Layer:**

```typescript
// services/notificationService.ts
export const notificationService = {
  createTransactionNotification: async (data) => {
    // Handle notification creation
  },
};
```

## Styling Rules

**Material-UI Theme:**

- Use theme colors and spacing
- Maintain consistent design patterns
- Use responsive breakpoints
- Follow accessibility guidelines

**CSS-in-JS:**

- Use `sx` prop for simple styles
- Use styled components for complex layouts
- Keep styles co-located with components

## Refactor Rules

- Preserve external behavior by default.
- Improve readability first, then abstraction.
- Break large refactors into safe, reviewable steps.

## Validation Rules

- Run relevant lint/tests for touched code before completion.
- Mention any unrun checks explicitly in final notes.

## PR/Change Quality

- Keep diffs focused.
- Add brief comments only where logic is not obvious.
- Include risks/assumptions when uncertainty exists.

## Living Document

Update this file when a new pattern becomes team standard.
