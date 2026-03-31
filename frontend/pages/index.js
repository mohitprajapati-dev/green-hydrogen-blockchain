import React from 'react';
import { Box, Typography, Button, Grid, Paper, Card, CardContent, CardActions, Avatar } from '@mui/material';
import HydrogenIcon from '@mui/icons-material/WaterDrop';
import VerifiedIcon from '@mui/icons-material/VerifiedUser';
import FactoryIcon from '@mui/icons-material/Factory';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  // Animated counters for stats
  const [produced, setProduced] = useState(0);
  const [certified, setCertified] = useState(0);
  const [traded, setTraded] = useState(0);
  const [retired, setRetired] = useState(0);
  useEffect(() => {
    // Demo: animate up to some values
    let prod = 0, cert = 0, trade = 0, retire = 0;
    const interval = setInterval(() => {
      if (prod < 1200) prod += 24;
      if (cert < 1100) cert += 22;
      if (trade < 800) trade += 16;
      if (retire < 500) retire += 10;
      setProduced(Math.min(prod, 1200));
      setCertified(Math.min(cert, 1100));
      setTraded(Math.min(trade, 800));
      setRetired(Math.min(retire, 500));
      if (prod >= 1200 && cert >= 1100 && trade >= 800 && retire >= 500) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #00b894 0%, #0984e3 100%)', p: 0 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', py: 8, px: 2 }}>
        <Typography variant="h2" fontWeight={700} color="white" gutterBottom>
          Blockchain-Based Green Hydrogen Credit System
        </Typography>
        <Typography variant="h5" color="white" mb={4}>
          Trust. Transparency. Traceability. Empowering the green hydrogen revolution.
        </Typography>
        {/* Stats/Analytics Card */}
        <Grid container spacing={3} mb={6}>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: 8, background: 'linear-gradient(120deg, #e0f7fa 60%, #00b894 100%)', color: '#0984e3' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: '#00b894', mr: 2 }}><TrendingUpIcon sx={{ color: 'white' }} /></Avatar>
                  <Typography variant="h5" fontWeight={700}>{produced.toLocaleString()}</Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>Total Produced (kg)</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: 8, background: 'linear-gradient(120deg, #e3fafc 60%, #0984e3 100%)', color: '#00b894' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: '#0984e3', mr: 2 }}><DoneAllIcon sx={{ color: 'white' }} /></Avatar>
                  <Typography variant="h5" fontWeight={700}>{certified.toLocaleString()}</Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>Total Certified (kg)</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: 8, background: 'linear-gradient(120deg, #e0f7fa 60%, #00b894 100%)', color: '#0984e3' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: '#00b894', mr: 2 }}><SwapHorizIcon sx={{ color: 'white' }} /></Avatar>
                  <Typography variant="h5" fontWeight={700}>{traded.toLocaleString()}</Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>Total Traded (kg)</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, boxShadow: 8, background: 'linear-gradient(120deg, #e3fafc 60%, #0984e3 100%)', color: '#00b894' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar sx={{ bgcolor: '#0984e3', mr: 2 }}><HighlightOffIcon sx={{ color: 'white' }} /></Avatar>
                  <Typography variant="h5" fontWeight={700}>{retired.toLocaleString()}</Typography>
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>Total Retired (kg)</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <HydrogenIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Producers</Typography>
                </Box>
                <Typography>
                  Register green hydrogen production, receive blockchain-certified credits, and track your impact.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/producer" passHref legacyBehavior>
                  <Button variant="contained" color="primary">Producer Portal</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <VerifiedIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Certification Bodies</Typography>
                </Box>
                <Typography>
                  Certify green hydrogen production, issue credits, and ensure compliance with global standards.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/certifier" passHref legacyBehavior>
                  <Button variant="contained" color="secondary">Certifier Portal</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FactoryIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Industry Buyers</Typography>
                </Box>
                <Typography>
                  Purchase, transfer, and retire green hydrogen credits to prove compliance and sustainability.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/buyer" passHref legacyBehavior>
                  <Button variant="outlined" color="primary">Buyer Portal</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccountBalanceIcon color="secondary" sx={{ fontSize: 40, mr: 2 }} />
                  <Typography variant="h6">Regulators & Auditors</Typography>
                </Box>
                <Typography>
                  Monitor, verify, and audit all transactions for transparency and fraud prevention.
                </Typography>
              </CardContent>
              <CardActions>
                <Link href="/regulator" passHref legacyBehavior>
                  <Button variant="outlined" color="secondary">Regulator Portal</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Box mt={8} textAlign="center">
          <Typography variant="body2" color="white">
            &copy; {new Date().getFullYear()} Green Hydrogen Credit System. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
