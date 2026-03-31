import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Grid, TextField, List, ListItem, ListItemText, Avatar, Divider, Fade } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import UserProfileDrawer from './UserProfileDrawer';
import DarkModeToggle from './DarkModeToggle';
import NotificationSnackbar from './NotificationSnackbar';

export default function ProducerDashboard() {
  // State
  const [produced, setProduced] = useState(0);
  const [credits, setCredits] = useState([]);
  const [input, setInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'info' });
  // Demo user
  const user = {
    name: 'HydroGenX',
    role: 'Producer',
    wallet: '0xPRODUCER123456789',
    email: 'contact@hydrogenx.com',
    verified: true,
  };

  const handleProduce = () => {
    if (!input || isNaN(input)) return;
    const amount = parseInt(input);
    setProduced(produced + amount);
    setCredits([...credits, { id: credits.length + 1, amount, status: 'Pending Certification' }]);
    setInput('');
    setShowSuccess(true);
    setNotif({ open: true, message: `Registered ${amount} kg for certification!`, severity: 'success' });
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
        background: darkMode ? 'linear-gradient(135deg, #232931 0%, #00b894 100%)' : 'linear-gradient(135deg, #e0f7fa 0%, #00b894 100%)',
        color: darkMode ? '#fff' : 'inherit',
        py: 6,
        px: { xs: 1, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#00b894', width: 56, height: 56, mr: 2 }}>
            <WaterDropIcon sx={{ fontSize: 36, color: 'white' }} />
          </Avatar>
          <Typography variant="h3" fontWeight={700} color="#0984e3" letterSpacing={1}>
            Producer Dashboard
          </Typography>
        </Box>
        <Typography variant="h6" color={darkMode ? '#b2bec3' : '#636e72'} mb={4}>
          Register your green hydrogen production and track your certified credits.
        </Typography>
        <Paper elevation={6} sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500,
          background: darkMode ? 'linear-gradient(120deg, #232931 60%, #00b894 100%)' : 'linear-gradient(120deg, #ffffff 60%, #d0f8ef 100%)',
          boxShadow: '0 8px 32px 0 rgba(0,184,148,0.15)',
          position: 'relative',
        }}>
          <Box display="flex" alignItems="center" mb={2}>
            <EmojiEventsIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>Register Green Hydrogen Production</Typography>
          </Box>
          <Grid container spacing={2} alignItems="center" mt={1}>
            <Grid item xs={7}>
              <TextField label="Amount (kg)" value={input} onChange={e => setInput(e.target.value)} size="small" fullWidth />
            </Grid>
            <Grid item xs={5}>
              <Button variant="contained" color="primary" fullWidth sx={{ height: 40 }} onClick={handleProduce}>
                Register
              </Button>
            </Grid>
          </Grid>
          <Fade in={showSuccess}>
            <Box sx={{ position: 'absolute', top: 10, right: 20, display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon color="success" sx={{ mr: 1 }} />
              <Typography color="success.main">Production Registered!</Typography>
            </Box>
          </Fade>
        </Paper>
        <Paper elevation={4} sx={{
          p: 4,
          borderRadius: 4,
          width: '100%',
          maxWidth: 600,
          background: darkMode ? 'linear-gradient(120deg, #232931 60%, #00b894 100%)' : 'linear-gradient(120deg, #e3fafc 60%, #b2f7ef 100%)',
          boxShadow: '0 4px 24px 0 rgba(9,132,227,0.10)',
        }}>
          <Box display="flex" alignItems="center" mb={2}>
            <WaterDropIcon color="primary" sx={{ fontSize: 28, mr: 1 }} />
            <Typography variant="h6" fontWeight={600}>Production History & Credits</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {credits.length === 0 && (
              <ListItem>
                <ListItemText primary={<span style={{ color: darkMode ? '#b2bec3' : '#636e72' }}>No credits registered yet.</span>} />
              </ListItem>
            )}
            {credits.map(c => (
              <ListItem key={c.id} divider sx={{ borderRadius: 2, background: c.status === 'Pending Certification' ? (darkMode ? '#232931' : '#fffde7') : (darkMode ? '#232931' : '#e0f7fa'), mb: 1 }}>
                <ListItemText
                  primary={<span style={{ color: '#00b894', fontWeight: 600 }}>{`Credit #${c.id}: ${c.amount} kg`}</span>}
                  secondary={<span style={{ color: c.status === 'Pending Certification' ? '#fdcb6e' : '#00b894', fontWeight: 500 }}>{c.status}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
