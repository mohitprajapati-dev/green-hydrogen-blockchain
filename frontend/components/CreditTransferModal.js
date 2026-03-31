import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box, Chip, Fade } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function CreditTransferModal({ open, onClose, onTransfer, onRetire, credit }) {
  const [recipient, setRecipient] = useState('');
  const [retireSuccess, setRetireSuccess] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleTransfer = () => {
    if (!recipient) return;
    onTransfer(recipient);
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      onClose();
    }, 1200);
  };

  const handleRetire = () => {
    onRetire();
    setRetireSuccess(true);
    setTimeout(() => {
      setRetireSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Manage Credit #{credit?.id}
        <Chip label={credit?.status} color={credit?.status === 'Purchased' ? 'primary' : 'default'} size="small" sx={{ ml: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Typography mb={2}>
          Amount: <b>{credit?.amount} kg</b>
        </Typography>
        <Box mb={2}>
          <TextField
            label="Transfer to (Wallet/User ID)"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SwapHorizIcon />}
            fullWidth
            onClick={handleTransfer}
            disabled={!recipient}
          >
            Transfer Credit
          </Button>
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<HighlightOffIcon />}
            fullWidth
            onClick={handleRetire}
          >
            Retire Credit
          </Button>
        </Box>
        <Fade in={transferSuccess}>
          <Typography color="success.main" mt={2} align="center">Credit Transferred!</Typography>
        </Fade>
        <Fade in={retireSuccess}>
          <Typography color="success.main" mt={2} align="center">Credit Retired!</Typography>
        </Fade>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
