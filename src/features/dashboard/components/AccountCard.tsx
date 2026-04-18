import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, CardActionArea, CardContent, Chip, Grid, Typography } from "@mui/material";
import { AccountBalance as AccountBalanceIcon, Visibility as ViewIcon } from "@mui/icons-material";
import {
  DashboardAccountCard,
  AccountTypeAvatar,
  AccountNumberBox,
  BalanceBox,
  AccountViewButton,
} from "./styles";
import { getAccountColorScheme, formatAccountType } from "../constants/accountColorMap";

interface AccountCardProps {
  account: any;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const colorScheme = getAccountColorScheme(account.accountType);

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <DashboardAccountCard>
        <CardActionArea
          component={RouterLink}
          to={`/accounts/${account.accountNumber}`}
          sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
        >
          <CardContent sx={{ flexGrow: 1, p: 3 }}>
            {/* Account Type & Status */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AccountTypeAvatar $colorScheme={colorScheme}>
                <AccountBalanceIcon fontSize="large" />
              </AccountTypeAvatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
                  {formatAccountType(account.accountType)}
                </Typography>
                <Chip label={account.status || "Active"} size="small" color="success" sx={{ fontSize: "0.75rem" }} />
              </Box>
            </Box>

            {/* Account Number */}
            <AccountNumberBox>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Account Number
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace", fontWeight: "bold" }}>
                {account.accountNumber}
              </Typography>
            </AccountNumberBox>

            {/* Balance */}
            <BalanceBox $colorScheme={colorScheme}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Current Balance
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: `${colorScheme}.main` }}>
                ${account.balance?.toFixed(2) || "0.00"}
              </Typography>
            </BalanceBox>

            {/* View Button */}
            <AccountViewButton
              $colorScheme={colorScheme}
              variant="contained"
              endIcon={<ViewIcon />}
              fullWidth
            >
              View Details
            </AccountViewButton>
          </CardContent>
        </CardActionArea>
      </DashboardAccountCard>
    </Grid>
  );
};

export default AccountCard;
