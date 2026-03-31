import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Avatar, Divider, Fade } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import UserProfileDrawer from './UserProfileDrawer';
import DarkModeToggle from './DarkModeToggle';
import NotificationSnackbar from './NotificationSnackbar';

export default function CertifierDashboard() {
  // State
  const [pending, setPending] = useState([
    { id: 1, producer: 'HydroGenX', amount: 100, status: 'Pending' },
    { id: 2, producer: 'EcoH2', amount: 50, status: 'Pending' },
  ]);
  const [certified, setCertified] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'info' });
  // Demo user
  const user = {
    name: 'CertifyOrg',
    role: 'Certifier',
    wallet: '0xCERTIFIER123456789',
    email: 'certify@org.com',
    verified: true,
  };

  const handleCertify = (id) => {
    const cert = pending.find(p => p.id === id);
    setCertified([...certified, { ...cert, status: 'Certified' }]);
    setPending(pending.filter(p => p.id !== id));
    setShowSuccess(true);
    setNotif({ open: true, message: `Certified ${cert.amount} kg for ${cert.producer}`, severity: 'success' });
    setTimeout(() => setShowSuccess(false), 1200);
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
            <VerifiedUserIcon sx={{ fontSize: 36, color: 'white' }} />
          </Avatar>
          <Typography variant="h3" fontWeight={700} color="#00b894" letterSpacing={1}>
            Certifier Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" color={darkMode ? '#b2bec3' : '#636e72'} mb={4}>
          Certify green hydrogen production and issue blockchain credits.
        </Typography>
        <Paper elevation={6} sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500,
          background: darkMode ? 'linear-gradient(120deg, #232931 60%, #0984e3 100%)' : 'linear-gradient(120deg, #ffffff 60%, #d0f8ef 100%)',
          boxShadow: '0 8px 32px 0 rgba(9,132,227,0.15)',
          position: 'relative',
        }}>
          <Box display="flex" alignItems="center" mb={2}>
            <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>Pending Certifications</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {pending.length === 0 && (
              <ListItem>
                <ListItemText primary={<span style={{ color: darkMode ? '#b2bec3' : '#636e72' }}>No pending certifications.</span>} />
              </ListItem>
            )}
            {pending.map(p => (
              <ListItem key={p.id} divider sx={{ borderRadius: 2, background: darkMode ? '#232931' : '#fffde7', mb: 1 }}>
                <ListItemText
                  primary={<span style={{ color: '#0984e3', fontWeight: 600 }}>{`${p.producer}: ${p.amount} kg`}</span>}
                  secondary={<span style={{ color: '#fdcb6e', fontWeight: 500 }}>{p.status}</span>}
                />
                <Button variant="contained" color="primary" onClick={() => handleCertify(p.id)}>
                  Certify
                </Button>
              </ListItem>
            ))}
          </List>
          <Fade in={showSuccess}>
            <Box sx={{ position: 'absolute', top: 10, right: 20, display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography color="success.main">Certification Complete!</Typography>
            </Box>
          </Fade>
        </Paper>
        <Paper elevation={4} sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 600,
          background: darkMode ? 'linear-gradient(120deg, #232931 60%, #0984e3 100%)' : 'linear-gradient(120deg, #e3fafc 60%, #b2f7ef 100%)',
          boxShadow: '0 4px 24px 0 rgba(0,184,148,0.10)',
        }}>
          <Box display="flex" alignItems="center" mb={2}>
            <VerifiedUserIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>Certified Credits</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {certified.length === 0 && (
              <ListItem>
                <ListItemText primary={<span style={{ color: darkMode ? '#b2bec3' : '#636e72' }}>No credits certified yet.</span>} />
              </ListItem>
            )}
            {certified.map(c => (
              <ListItem key={c.id} divider sx={{ borderRadius: 2, background: darkMode ? '#232931' : '#e0f7fa', mb: 1 }}>
                <ListItemText
                  primary={<span style={{ color: '#00b894', fontWeight: 600 }}>{`${c.producer}: ${c.amount} kg`}</span>}
                  secondary={<span style={{ color: '#00b894', fontWeight: 500 }}>{c.status}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
