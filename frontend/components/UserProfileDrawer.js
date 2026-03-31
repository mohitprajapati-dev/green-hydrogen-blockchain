import React from 'react';
import { Drawer, Box, Typography, Avatar, Divider, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function UserProfileDrawer({ open, onClose, user }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 3, background: 'linear-gradient(135deg, #e0f7fa 0%, #00b894 100%)', height: '100%' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: '#0984e3', width: 56, height: 56, mr: 2 }}>
              <AccountCircleIcon sx={{ fontSize: 36, color: 'white' }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>{user?.name || 'User Name'}</Typography>
              <Chip label={user?.role || 'Role'} color="primary" size="small" sx={{ mt: 0.5 }} />
            </Box>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" color="#636e72" mb={1}>Wallet Address</Typography>
        <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>
          {user?.wallet || '0x1234...abcd'}
        </Typography>
        <Typography variant="subtitle1" color="#636e72" mb={1}>Email</Typography>
        <Typography variant="body2" mb={2}>{user?.email || 'user@email.com'}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2" color="#636e72" mb={1}>Digital Identity Status</Typography>
        <Chip label={user?.verified ? 'Verified' : 'Unverified'} color={user?.verified ? 'success' : 'warning'} />
      </Box>
    </Drawer>
  );
}
