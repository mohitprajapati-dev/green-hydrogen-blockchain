import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Avatar, Divider, Fade, Chip } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreditTransferModal from './CreditTransferModal';
import UserProfileDrawer from './UserProfileDrawer';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeToggle from './DarkModeToggle';
import NotificationSnackbar from './NotificationSnackbar';

export default function BuyerDashboard() {
  // Placeholder data
  const [available, setAvailable] = useState([
    { id: 1, producer: 'HydroGenX', amount: 100, status: 'Certified' },
    { id: 2, producer: 'EcoH2', amount: 50, status: 'Certified' },
  ]);
  const [purchased, setPurchased] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // Notification state
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'info' });
  // Demo user
  const user = {
    name: 'SteelCo Ltd.',
    role: 'Buyer',
    wallet: '0xA1B2C3D4E5F6G7H8I9J0',
    email: 'contact@steelco.com',
    verified: true,
  };
  // ...existing code...

  const handleBuy = (id) => {
    const credit = available.find(a => a.id === id);
    setPurchased([...purchased, { ...credit, status: 'Purchased' }]);
    setAvailable(available.filter(a => a.id !== id));
    setShowSuccess(true);
    setNotif({ open: true, message: `Purchased ${credit.amount} kg from ${credit.producer}`, severity: 'success' });
    setTimeout(() => setShowSuccess(false), 1200);
  };

  const handleOpenModal = (credit) => {
    setSelectedCredit(credit);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCredit(null);
  };
  const handleTransfer = (recipient) => {
    setPurchased(purchased.map(c => c.id === selectedCredit.id ? { ...c, status: 'Transferred', recipient } : c));
    setNotif({ open: true, message: `Credit transferred to ${recipient}`, severity: 'info' });
  };
  const handleRetire = () => {
    setPurchased(purchased.map(c => c.id === selectedCredit.id ? { ...c, status: 'Retired' } : c));
    setNotif({ open: true, message: 'Credit retired for compliance!', severity: 'success' });
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
        background: darkMode ? 'linear-gradient(135deg, #232931 0%, #00b894 100%)' : 'linear-gradient(135deg, #e3fafc 0%, #00b894 100%)',
        color: darkMode ? '#fff' : 'inherit',
        py: 6,
        px: { xs: 1, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: '#00b894', width: 56, height: 56, mr: 2 }}>
          <FactoryIcon sx={{ fontSize: 36, color: 'white' }} />
        </Avatar>
        <Typography variant="h3" fontWeight={700} color="#0984e3" letterSpacing={1}>
          Buyer Dashboard
        </Typography>
      </Box>
      <Typography variant="h6" color="#636e72" mb={4}>
        Purchase, transfer, and retire certified green hydrogen credits for compliance.
      </Typography>
      <Paper elevation={6} sx={{
        p: 4,
        mb: 4,
        borderRadius: 4,
        width: '100%',
        maxWidth: 500,
        background: 'linear-gradient(120deg, #ffffff 60%, #d0f8ef 100%)',
        boxShadow: '0 8px 32px 0 rgba(0,184,148,0.15)',
        position: 'relative',
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <ShoppingCartIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h6" fontWeight={600}>Available Certified Credits</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {available.length === 0 && (
            <ListItem>
              <ListItemText primary={<span style={{ color: '#636e72' }}>No credits available for purchase.</span>} />
            </ListItem>
          )}
          {available.map(a => (
            <ListItem key={a.id} divider sx={{ borderRadius: 2, background: '#e0f7fa', mb: 1 }}>
              <ListItemText
                primary={<span style={{ color: '#0984e3', fontWeight: 600 }}>{`${a.producer}: ${a.amount} kg`}</span>}
                secondary={<span style={{ color: '#00b894', fontWeight: 500 }}>{a.status}</span>}
              />
              <Button variant="contained" color="primary" onClick={() => handleBuy(a.id)}>
                Buy
              </Button>
            </ListItem>
          ))}
        </List>
        <Fade in={showSuccess}>
          <Box sx={{ position: 'absolute', top: 10, right: 20, display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
            <Typography color="success.main">Credit Purchased!</Typography>
          </Box>
        </Fade>
      </Paper>
      <Paper elevation={4} sx={{
        p: 4,
        borderRadius: 4,
        width: '100%',
        maxWidth: 600,
        background: 'linear-gradient(120deg, #e3fafc 60%, #b2f7ef 100%)',
        boxShadow: '0 4px 24px 0 rgba(9,132,227,0.10)',
      }}>
        <Box display="flex" alignItems="center" mb={2}>
          <FactoryIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
          <Typography variant="h6" fontWeight={600}>Purchased Credits</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List>
          {purchased.length === 0 && (
            <ListItem>
              <ListItemText primary={<span style={{ color: '#636e72' }}>No credits purchased yet.</span>} />
            </ListItem>
          )}
          {purchased.map(p => (
            <ListItem key={p.id} divider sx={{ borderRadius: 2, background: p.status === 'Retired' ? '#dfe6e9' : p.status === 'Transferred' ? '#ffeaa7' : '#e0f7fa', mb: 1 }}>
              <ListItemText
                primary={<span style={{ color: '#00b894', fontWeight: 600 }}>{`${p.producer}: ${p.amount} kg`}</span>}
                secondary={<span style={{ color: '#00b894', fontWeight: 500 }}>{p.status}{p.recipient ? ` to ${p.recipient}` : ''}</span>}
              />
              <Chip label={p.status} color={p.status === 'Retired' ? 'default' : p.status === 'Transferred' ? 'warning' : 'primary'} size="small" sx={{ mr: 1 }} />
              {p.status === 'Purchased' && (
                <Button variant="outlined" color="primary" size="small" onClick={() => handleOpenModal(p)}>
                  Manage
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
      <CreditTransferModal
        open={modalOpen}
        onClose={handleCloseModal}
        onTransfer={handleTransfer}
        onRetire={handleRetire}
        credit={selectedCredit}
      />
    </Box>
    </>
  );
}
