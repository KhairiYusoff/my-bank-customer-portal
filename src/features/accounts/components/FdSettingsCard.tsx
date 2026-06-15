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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Autorenew as RenewIcon,
  Link as LinkIcon,
  Event as DateIcon,
  ReportProblem as WarningIcon,
  NoEncryption as UnlockIcon,
} from "@mui/icons-material";
import {
  useUpdateFdInstructionsMutation,
  useGetAccountsQuery,
  useFdWithdrawEarlyMutation,
} from "../store/accountsApi";
import { useToast } from "@/utils/snackbarUtils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [updateInstructions, { isLoading }] = useUpdateFdInstructionsMutation();
  const [withdrawEarly, { isLoading: isWithdrawing }] = useFdWithdrawEarlyMutation();
  const { data: accountsData } = useGetAccountsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleEarlyWithdrawal = async () => {
    try {
      await withdrawEarly(accountNumber).unwrap();
      success("Early withdrawal processed. Principal returned to linked account.");
      setIsDialogOpen(false);
      navigate("/dashboard");
    } catch (err: any) {
      showError(err?.data?.message || "Failed to process early withdrawal");
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

          <Divider sx={{ my: 1 }} />

          <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle2" color="error" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
              <WarningIcon fontSize="small" sx={{ mr: 1 }} /> Emergency Actions
            </Typography>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<UnlockIcon />}
              onClick={() => setIsDialogOpen(true)}
              sx={{ mt: 1 }}
            >
              Early Withdrawal (Break Lock)
            </Button>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
              Breaking the lock will return your principal immediately but result in <strong>100% interest forfeiture</strong>.
            </Typography>
          </Box>
        </Stack>

        <Dialog open={isDialogOpen} onClose={() => !isWithdrawing && setIsDialogOpen(false)}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", color: "error.main" }}>
            <WarningIcon sx={{ mr: 1 }} /> Confirm Early Withdrawal?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to break the lock on your Fixed Deposit. 
              <br /><br />
              <strong>Warning:</strong> By proceeding, you will forfeit **100% of the interest** earned to date. Only your original principal will be returned to your linked account.
              <br /><br />
              This action is <strong>irreversible</strong>.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button 
              onClick={() => setIsDialogOpen(false)} 
              disabled={isWithdrawing}
              variant="text"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEarlyWithdrawal} 
              disabled={isWithdrawing}
              variant="contained" 
              color="error"
              startIcon={isWithdrawing ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isWithdrawing ? "Processing..." : "Proceed with Forfeiture"}
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FdSettingsCard;
