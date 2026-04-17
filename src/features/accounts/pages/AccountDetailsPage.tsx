import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountBalanceQuery } from '../store/accountsApi';
import { useGetAccountTransactionsQuery } from '@/features/transactions/store/transactionsApi';
import { BalanceCard, TransactionsList } from '../components';
import { GradientTitle } from '../components/styles';

const AccountDetailsPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const [page, setPage] = useState(1);
  const transactionsPerPage = 10;

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceLoading,
    refetch: refetchBalance,
  } = useGetAccountBalanceQuery(accountNumber!, { skip: !accountNumber });

  const {
    data: transactionsData,
    error: transactionsError,
    isLoading: transactionsLoading,
    refetch: refetchTransactions,
  } = useGetAccountTransactionsQuery(
    { accountNumber: accountNumber!, page, limit: transactionsPerPage },
    { skip: !accountNumber }
  );

  const handleRefresh = () => {
    refetchBalance();
    refetchTransactions();
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <GradientTitle variant="h4">
            Account Details
          </GradientTitle>

          <BalanceCard
            accountNumber={accountNumber!}
            balanceData={balanceData}
            balanceError={balanceError}
            balanceLoading={balanceLoading}
            onRefresh={handleRefresh}
          />

          <TransactionsList
            transactionsData={transactionsData}
            transactionsError={transactionsError}
            transactionsLoading={transactionsLoading}
            page={page}
            onPageChange={handlePageChange}
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;