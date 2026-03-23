import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const ProductsManagement = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700, color: 'neutral.900' }}>
        Quản Lý Sản Phẩm
      </Typography>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 8, 
          textAlign: 'center', 
          borderRadius: 2, 
          border: '1px dashed', 
          borderColor: 'neutral.300',
          bgcolor: 'neutral.50'
        }}
      >
        <Typography variant="h5" color="neutral.500">
          Chức năng quản lý sản phẩm sẽ sớm ra mắt.
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProductsManagement;
