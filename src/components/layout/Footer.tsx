import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        color: 'text.secondary',
        py: 6,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700 }}>
              GALAXY STORE
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your one-stop destination for the latest in electronics, fashion, and home essentials. 
              Quality products, delivered to your doorstep.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="inherit"><Facebook /></IconButton>
              <IconButton size="small" color="inherit"><Twitter /></IconButton>
              <IconButton size="small" color="inherit"><Instagram /></IconButton>
              <IconButton size="small" color="inherit"><GitHub /></IconButton>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">Electronics</Link>
              <Link href="#" color="inherit" underline="hover">Fashion</Link>
              <Link href="#" color="inherit" underline="hover">Home</Link>
              <Link href="#" color="inherit" underline="hover">Deals</Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 6, sm: 2 }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">Help Center</Link>
              <Link href="#" color="inherit" underline="hover">Track Order</Link>
              <Link href="#" color="inherit" underline="hover">Returns</Link>
              <Link href="#" color="inherit" underline="hover">Shipping Info</Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Newsletter
            </Typography>
            <Typography variant="body2" gutterBottom>
              Subscribe to stay updated with our latest offers and product launches.
            </Typography>
            {/* Newsletter input placeholder */}
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                Join 50,000+ happy customers
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">
            Galaxy Store
          </Link>{' '}
          {new Date().getFullYear()}
          {'. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
