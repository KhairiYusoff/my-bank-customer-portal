import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, Container } from "@mui/material";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetAccountBalanceQuery,
  useGetAccountsQuery,
  useGetAccountLimitsQuery,
} from "../store/accountsApi";
import { useGetAccountTransactionsQuery } from "@/features/transactions/store/transactionsApi";
import { BalanceCard, TransactionsList } from "../components";
import { ReceiptDrawer } from "@/features/transactions/components";
import { GradientTitle } from "../components/styles";
import { LoadingOverlay } from "@/components";
import { usePageLoading } from "@/hooks";
import type { TransactionHistory } from "@/features/transactions/types/transfer";
import type { Account } from "../types/account";

const AccountDetailsPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<TransactionHistory | null>(null);
  const transactionsPerPage = 10;

  const routerStateAccount = (location.state as { account?: Account } | null)
    ?.account;

  const { data: accountsData } = useGetAccountsQuery(undefined, {
    skip: !!routerStateAccount,
  });
  const account: Account | undefined =
    routerStateAccount ??
    accountsData?.data?.find((a) => a.accountNumber === accountNumber);

  const { data: limitsData } = useGetAccountLimitsQuery();
  const limits = account?.accountType
    ? (limitsData?.data?.[account.accountType.toLowerCase()] ?? null)
    : null;

  const {
    data: balanceData,
    error: balanceError,
    isFetching: balanceFetching,
    refetch: refetchBalance,
  } = useGetAccountBalanceQuery(accountNumber!, { skip: !accountNumber });

  const {
    data: transactionsData,
    error: transactionsError,
    isFetching: transactionsFetching,
    refetch: refetchTransactions,
  } = useGetAccountTransactionsQuery(
    { accountNumber: accountNumber!, page, limit: transactionsPerPage },
    { skip: !accountNumber },
  );

  const isLoading = usePageLoading(balanceFetching, transactionsFetching);

  const handleRefresh = () => {
    refetchBalance();
    refetchTransactions();
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <DashboardLayout>
      <LoadingOverlay loading={isLoading} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <GradientTitle variant="h4">Account Details</GradientTitle>

          <BalanceCard
            accountNumber={accountNumber!}
            balanceData={balanceData}
            balanceError={balanceError}
            onRefresh={handleRefresh}
            accountType={account?.accountType}
            overdraftLimit={account?.overdraftLimit}
            limits={limits}
          />

          <TransactionsList
            transactionsData={transactionsData}
            transactionsError={transactionsError}
            page={page}
            onPageChange={handlePageChange}
            onSelect={setSelectedTx}
          />

          <ReceiptDrawer
            transaction={selectedTx}
            open={!!selectedTx}
            onClose={() => setSelectedTx(null)}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;
