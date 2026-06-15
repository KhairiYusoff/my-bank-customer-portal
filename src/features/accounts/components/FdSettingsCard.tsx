import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Divider,
  Stack,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Autorenew as RenewIcon,
  Link as LinkIcon,
  Event as DateIcon,
} from "@mui/icons-material";
import {
  useUpdateFdInstructionsMutation,
  useGetAccountsQuery,
} from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { format } from "date-fns";

interface FdSettingsCardProps {
  accountNumber: string;
  autoRenew?: boolean;
  maturityDate?: string;
  linkedAccount?: string | { _id: string; accountNumber: string };
  lockPeriod?: number;
  interestRate?: number;
}

const FdSettingsCard: React.FC<FdSettingsCardProps> = ({
  accountNumber,
  autoRenew,
  maturityDate,
  linkedAccount,
  lockPeriod,
  interestRate,
}) => {
  const { success, error: showError } = useToast();
  const [updateInstructions, { isLoading }] = useUpdateFdInstructionsMutation();
  const { data: accountsData } = useGetAccountsQuery();

  const currentLinkedAccountNumber =
    typeof linkedAccount === "object"
      ? linkedAccount?.accountNumber
      : linkedAccount;

  const otherAccounts = React.useMemo(() => {
    return (
      accountsData?.data?.filter(
        (acc) =>
          acc.accountType !== "fixed_deposit" && acc.status === "active",
      ) || []
    );
  }, [accountsData]);

  const handleToggleAutoRenew = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      await updateInstructions({
        accountNumber,
        autoRenew: event.target.checked,
      }).unwrap();
      success(
        `Auto-renewal has been turned ${
          event.target.checked ? "ON" : "OFF"
        } successfully.`,
      );
    } catch (err: any) {
      showError(err?.data?.message || "Failed to update FD instructions");
    }
  };

  const handleLinkedAccountChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newLinkedAccount = event.target.value;
    if (newLinkedAccount === currentLinkedAccountNumber) return;

    try {
      await updateInstructions({
        accountNumber,
        autoRenew: !!autoRenew,
        linkedAccount: newLinkedAccount,
      }).unwrap();
      success("Linked settlement account updated successfully.");
    } catch (err: any) {
      showError(err?.data?.message || "Failed to update linked account");
    }
  };

  return (
    <Card sx={{ mt: 3, borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <SettingsIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Fixed Deposit Settings
          </Typography>
        </Stack>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={!!autoRenew}
                onChange={handleToggleAutoRenew}
                disabled={isLoading}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  Auto-Renewal
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {autoRenew
                    ? "Your principal will automatically roll over for another term on Day 8 of maturity."
                    : "Your principal will be automatically credited to your linked account on Day 8 of maturity."}
                </Typography>
              </Box>
            }
          />
          {isLoading && <CircularProgress size={20} sx={{ ml: 2 }} />}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <DateIcon sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Maturity Date
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {maturityDate
                  ? format(new Date(maturityDate), "dd MMM yyyy")
                  : "N/A"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RenewIcon sx={{ mr: 2, color: "text.secondary" }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Lock Period
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {lockPeriod} Months
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <LinkIcon sx={{ mr: 2, mt: 1, color: "text.secondary" }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Linked Account (Settlement Destination)
              </Typography>
              <TextField
                select
                fullWidth
                size="small"
                value={currentLinkedAccountNumber || ""}
                onChange={handleLinkedAccountChange}
                disabled={isLoading}
                variant="outlined"
                sx={{ mt: 0.5 }}
              >
                {otherAccounts.map((acc) => (
                  <MenuItem key={acc.accountNumber} value={acc.accountNumber}>
                    {acc.accountNumber} ({acc.accountType.toUpperCase()})
                  </MenuItem>
                ))}
              </TextField>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                This is where interest and principal (if auto-renew is off) will be credited.
              </Typography>
            </Box>
          </Box>

          {interestRate !== undefined && (
            <Box sx={{ bgcolor: "info.light", p: 1.5, borderRadius: 1, mt: 1 }}>
              <Typography variant="body2" color="info.contrastText">
                This FD earns <strong>{interestRate}%</strong> interest per
                annum. Interest is paid out immediately upon maturity.
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FdSettingsCard;
