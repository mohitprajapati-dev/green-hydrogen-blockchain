import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Avatar, Divider, Button } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import UserProfileDrawer from './UserProfileDrawer';
import DarkModeToggle from './DarkModeToggle';
import NotificationSnackbar from './NotificationSnackbar';

export default function RegulatorDashboard() {
  // State
  const [transactions] = useState([
    { id: 1, type: 'Production', actor: 'HydroGenX', amount: 100, status: 'Certified' },
    { id: 2, type: 'Purchase', actor: 'SteelCo', amount: 100, status: 'Purchased' },
    { id: 3, type: 'Production', actor: 'EcoH2', amount: 50, status: 'Certified' },
    { id: 4, type: 'Purchase', actor: 'AmmoniaInc', amount: 50, status: 'Purchased' },
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'info' });
  // Demo user
  const user = {
    name: 'GovRegulator',
    role: 'Regulator',
    wallet: '0xREGULATOR123456789',
    email: 'audit@regulator.gov',
    verified: true,
  };

  return (
    <>
      <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
      <Button
        variant="contained"
        color="secondary"
        sx={{ position: 'fixed', top: 32, right: 32, zIndex: 1200, borderRadius: '50%', minWidth: 0, width: 56, height: 56, boxShadow: 6 }}
        onClick={() => setProfileOpen(true)}
      >
        <PersonIcon sx={{ fontSize: 32 }} />
      </Button>
      <UserProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} user={user} />
      <NotificationSnackbar open={notif.open} onClose={() => setNotif({ ...notif, open: false })} message={notif.message} severity={notif.severity} />
      <Box sx={{
        minHeight: '100vh',
        background: darkMode ? 'linear-gradient(135deg, #232931 0%, #0984e3 100%)' : 'linear-gradient(135deg, #e3fafc 0%, #0984e3 100%)',
        color: darkMode ? '#fff' : 'inherit',
        py: 6,
        px: { xs: 1, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#0984e3', width: 56, height: 56, mr: 2 }}>
            <AccountBalanceIcon sx={{ fontSize: 36, color: 'white' }} />
          </Avatar>
          <Typography variant="h3" fontWeight={700} color="#00b894" letterSpacing={1}>
            Regulator & Auditor Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" color={darkMode ? '#b2bec3' : '#636e72'} mb={4}>
          Monitor, verify, and audit all green hydrogen credit transactions.
        </Typography>
        <Paper elevation={6} sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 700,
          background: darkMode ? 'linear-gradient(120deg, #232931 60%, #0984e3 100%)' : 'linear-gradient(120deg, #ffffff 60%, #d0f8ef 100%)',
          boxShadow: '0 8px 32px 0 rgba(9,132,227,0.15)',
        }}>
          <Box display="flex" alignItems="center" mb={2}>
            <VisibilityIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>All Transactions</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {transactions.length === 0 && (
              <ListItem>
                <ListItemText primary={<span style={{ color: darkMode ? '#b2bec3' : '#636e72' }}>No transactions found.</span>} />
              </ListItem>
            )}
            {transactions.map(t => (
              <ListItem key={t.id} divider sx={{ borderRadius: 2, background: t.type === 'Production' ? (darkMode ? '#232931' : '#e0f7fa') : (darkMode ? '#232931' : '#fffde7'), mb: 1 }}>
                <ListItemText
                  primary={<span style={{ color: t.type === 'Production' ? '#00b894' : '#0984e3', fontWeight: 600 }}>{`${t.type} by ${t.actor}: ${t.amount} kg`}</span>}
                  secondary={<span style={{ color: t.status === 'Certified' ? '#00b894' : '#fdcb6e', fontWeight: 500 }}>{t.status}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
