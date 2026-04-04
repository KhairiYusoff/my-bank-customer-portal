import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  CircularProgress, 
  Alert, 
  Card, 
  CardContent, 
  CardActionArea,
  Grid,
  Button,
  Stack,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  SwapHoriz as TransferIcon,
  Add as DepositIcon,
  Remove as WithdrawIcon,
  Visibility as ViewIcon,
  DashboardOutlined as DashboardIcon
} from '@mui/icons-material';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useGetAccountsQuery, useGetAccountBalanceQuery } from '@/features/accounts/store/accountsApi';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: accountsResponse, error, isLoading } = useGetAccountsQuery();

  const formatAccountType = (accountType: string) => {
    return accountType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getAccountTypeColor = (accountType: string) => {
    switch (accountType.toLowerCase()) {
      case 'savings':
        return '#2e7d32';
      case 'current':
        return '#1976d2';
      case 'fixed_deposit':
        return '#ed6c02';
      default:
        return '#00509e';
    }
  };

  // Account Card Component
  const AccountCard = ({ account }: { account: any }) => {
    return (
      <Grid item xs={12} sm={6} lg={4}>
        <Card sx={{ 
          height: '100%',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 80, 158, 0.15)'
          }
        }}>
          <CardActionArea 
            component={RouterLink} 
            to={`/accounts/${account.accountNumber}`}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
          >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ 
                  backgroundColor: getAccountTypeColor(account.accountType),
                  mr: 2,
                  width: 56,
                  height: 56
                }}>
                  <AccountBalanceIcon fontSize="large" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {formatAccountType(account.accountType)}
                  </Typography>
                  <Chip 
                    label={account.status || 'Active'} 
                    size="small" 
                    color="success" 
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
              </Box>
              
              <Box sx={{ 
                backgroundColor: '#f8f9fa',
                borderRadius: 2,
                p: 2,
                mb: 2
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Account Number
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                  {account.accountNumber}
                </Typography>
              </Box>

              <Box sx={{ 
                backgroundColor: 'rgba(0, 80, 158, 0.05)',
                borderRadius: 2,
                p: 2,
                mb: 2
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Current Balance
                </Typography>
                <Typography variant="h5" sx={{ 
                  fontWeight: 'bold',
                  color: getAccountTypeColor(account.accountType)
                }}>
                  ${account.balance?.toFixed(2) || '0.00'}
                </Typography>
              </Box>

              <Button
                variant="contained"
                endIcon={<ViewIcon />}
                fullWidth
                sx={{ 
                  mt: 'auto',
                  background: `linear-gradient(135deg, ${getAccountTypeColor(account.accountType)} 0%, #1976d2 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${getAccountTypeColor(account.accountType)} 20%, #1976d2 80%)`
                  }
                }}
              >
                View Details
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  // Quick Actions Component
  const QuickActions = () => (
    <Paper sx={{ 
      p: 3, 
      mb: 4, 
      background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)',
      color: 'white'
    }}>
      <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <DashboardIcon />
        Quick Actions
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button
          variant="contained"
          startIcon={<TransferIcon />}
          onClick={() => navigate('/transfer')}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
          }}
        >
          Transfer Money
        </Button>
        <Button
          variant="contained"
          startIcon={<DepositIcon />}
          onClick={() => navigate('/deposit')}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
          }}
        >
          Deposit
        </Button>
        <Button
          variant="contained"
          startIcon={<WithdrawIcon />}
          onClick={() => navigate('/withdraw')}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' }
          }}
        >
          Withdraw
        </Button>
      </Stack>
    </Paper>
  );

  // Loading State
  if (isLoading) {
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
              Dashboard
            </Typography>
            <Paper sx={{ textAlign: 'center', py: 6 }}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary' }}>
                Loading your accounts...
              </Typography>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  // Error State
  if (error) {
    const apiError = error as any;
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
              Dashboard
            </Typography>
            <Alert severity="error" sx={{ mb: 3 }}>
              {apiError.data?.message || 'Failed to load accounts.'}
            </Alert>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  // No Accounts State
  if (!accountsResponse?.data || accountsResponse.data.length === 0) {
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
              Dashboard
            </Typography>
            <Paper sx={{ textAlign: 'center', py: 6 }}>
              <AccountBalanceIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No accounts found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                You can open a new account by contacting our support team
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/contact')}
                sx={{ 
                  background: 'linear-gradient(135deg, #00509e 0%, #1976d2 100%)'
                }}
              >
                Contact Support
              </Button>
            </Paper>
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  // Main Dashboard
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
            Dashboard
          </Typography>
          
          <QuickActions />

          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#00509e' }}>
            Your Accounts ({accountsResponse.data.length})
          </Typography>
          
          <Grid container spacing={3}>
            {accountsResponse.data.map((account) => (
              <AccountCard key={account.accountNumber} account={account} />
            ))}
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardPage;

