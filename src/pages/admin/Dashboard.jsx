import React from 'react';
import { Box, Typography, Container, Grid, Paper, Card, CardContent } from '@mui/material';
import { Inventory, Category, People, ShoppingCart } from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%', borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'neutral.200' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${color}.50`, color: `${color}.main` }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ color: 'neutral.500', fontWeight: 600, textTransform: 'uppercase' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {value}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, color: 'neutral.900' }}>
        Tổng Quan Hệ Thống
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Sản phẩm" value="124" icon={<Inventory />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Danh mục" value="12" icon={<Category />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Người dùng" value="1,240" icon={<People />} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Đơn hàng" value="45" icon={<ShoppingCart />} color="warning" />
        </Grid>
      </Grid>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 8, 
          textAlign: 'center', 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'neutral.200',
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'neutral.900', mb: 1 }}>
          Chào mừng trở lại, Admin!
        </Typography>
        <Typography variant="body1" color="neutral.500">
          Chọn một mục từ thanh điều hướng để bắt đầu quản lý hệ thống.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
