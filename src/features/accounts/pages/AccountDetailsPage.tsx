import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Stack,
  IconButton,
  Pagination
} from '@mui/material';
import { 
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  SwapHoriz as TransferIcon,
  Add as DepositIcon,
  Remove as WithdrawIcon,
  Refresh as RefreshIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  CalendarToday as DateIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountBalanceQuery } from '../store/accountsApi';
import { useGetAccountTransactionsQuery } from '@/features/transactions/store/transactionsApi';

const AccountDetailsPage: React.FC = () => {
  const { accountNumber } = useParams<{ accountNumber: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const transactionsPerPage = 10;

  // Get account balance
  const { 
    data: balanceData, 
    error: balanceError, 
    isLoading: balanceLoading,
    refetch: refetchBalance 
  } = useGetAccountBalanceQuery(accountNumber!, {
    skip: !accountNumber,
  });

  // Get transaction history
  const { 
    data: transactionsData, 
    error: transactionsError, 
    isLoading: transactionsLoading,
    refetch: refetchTransactions
  } = useGetAccountTransactionsQuery({
    accountNumber: accountNumber!,
    page,
    limit: transactionsPerPage
  }, {
    skip: !accountNumber,
  });

  const handleRefresh = () => {
    refetchBalance();
    refetchTransactions();
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'transfer':
        return <TransferIcon sx={{ color: '#1976d2' }} />;
      case 'deposit':
      case 'airdrop':
        return <TrendingUpIcon sx={{ color: '#2e7d32' }} />;
      case 'withdrawal':
        return <TrendingDownIcon sx={{ color: '#d32f2f' }} />;
      default:
        return <MoneyIcon sx={{ color: '#757575' }} />;
    }
  };

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? '#2e7d32' : '#d32f2f';
  };

  const formatAmount = (amount: number) => {
    return amount >= 0 ? `+$${Math.abs(amount).toFixed(2)}` : `-$${Math.abs(amount).toFixed(2)}`;
  };

  const getTransactionTypeChip = (type: string) => {
    const configs = {
      transfer: { label: 'Transfer', color: 'primary' as const },
      deposit: { label: 'Deposit', color: 'success' as const },
      withdrawal: { label: 'Withdrawal', color: 'error' as const },
      airdrop: { label: 'Bonus', color: 'secondary' as const }
    };
    
    const config = configs[type as keyof typeof configs] || { label: type, color: 'default' as const };
    
    return (
      <Chip 
        label={config.label} 
        color={config.color} 
        size="small" 
        sx={{ textTransform: 'capitalize' }}
      />
    );
  };

  // Balance Card Component
  const BalanceCard = () => {
    if (balanceLoading) {
      return (
        <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)' }}>
          <CardContent sx={{ color: 'white', textAlign: 'center', py: 4 }}>
            <CircularProgress color="inherit" />
          </CardContent>
        </Card>
      );
    }

    if (balanceError) {
      const apiError = balanceError as any;
      return (
        <Alert severity="error" sx={{ mb: 3 }}>
          {apiError.data?.message || 'Failed to load account balance.'}
        </Alert>
      );
    }

    if (balanceData?.success && balanceData.data) {
      return (
        <Card sx={{ 
          mb: 3, 
          background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0, 80, 158, 0.15)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                  Account Balance
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  ${balanceData.data.balance.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {accountNumber}
                </Typography>
              </Box>
              <IconButton onClick={handleRefresh} sx={{ color: 'white' }}>
                <RefreshIcon />
              </IconButton>
            </Box>
            
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<TransferIcon />}
                onClick={() => navigate('/transfer')}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                Transfer
              </Button>
              <Button
                variant="contained"
                startIcon={<DepositIcon />}
                onClick={() => navigate(`/deposit`)}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                Deposit
              </Button>
              <Button
                variant="contained"
                startIcon={<WithdrawIcon />}
                onClick={() => navigate(`/withdraw`)}
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                Withdraw
              </Button>
            </Stack>
          </CardContent>
        </Card>
      );
    }

    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        Account details could not be loaded.
      </Alert>
    );
  };

  // Transaction List Component
  const TransactionsList = () => {
    if (transactionsLoading) {
      return (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Loading transactions...
            </Typography>
          </CardContent>
        </Card>
      );
    }

    if (transactionsError) {
      const apiError = transactionsError as any;
      return (
        <Alert severity="error">
          {apiError.data?.message || 'Failed to load transaction history.'}
        </Alert>
      );
    }

    if (!transactionsData?.success || !transactionsData.data?.length) {
      return (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <AccountBalanceIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No transactions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your transaction history will appear here
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, pb: 1 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountBalanceIcon />
              Transaction History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {transactionsData.meta?.total || 0} transactions
            </Typography>
          </Box>
          
          <List disablePadding>
            {transactionsData.data.map((transaction, index) => (
              <React.Fragment key={transaction._id}>
                <ListItem sx={{ px: 3, py: 2 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ backgroundColor: 'transparent' }}>
                      {getTransactionIcon(transaction.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {transaction.description}
                        </Typography>
                        {getTransactionTypeChip(transaction.type)}
                      </Box>
                    }
                    secondary={
                      <Stack spacing={0.5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <DateIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {format(new Date(transaction.date), 'MMM dd, yyyy • hh:mm a')}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            By {transaction.performedBy.name} ({transaction.performedBy.role})
                          </Typography>
                        </Box>
                      </Stack>
                    }
                  />
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: getAmountColor(transaction.amount),
                        fontWeight: 'bold'
                      }}
                    >
                      {formatAmount(transaction.amount)}
                    </Typography>
                    <Chip 
                      label={transaction.status} 
                      size="small" 
                      color={transaction.status === 'completed' ? 'success' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                </ListItem>
                {index < transactionsData.data.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>

          {transactionsData.meta && transactionsData.meta.pages > 1 && (
            <Box sx={{ p: 3, pt: 2 }}>
              <Pagination
                count={transactionsData.meta.pages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4
            }}
          >
            Account Details
          </Typography>
          
          <BalanceCard />
          <TransactionsList />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;
