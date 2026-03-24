import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  CssBaseline, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import { 
  Dashboard, 
  Inventory, 
  Category, 
  People, 
  ShoppingCart, 
  Menu,
  Logout,
  AdminPanelSettings
} from '@mui/icons-material';

const drawerWidth = 280;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Sản phẩm', icon: <Inventory />, path: '/admin/products' },
    { text: 'Danh mục', icon: <Category />, path: '/admin/categories' },
    { text: 'Người dùng', icon: <People />, path: '/admin/users' },
    { text: 'Đơn hàng', icon: <ShoppingCart />, path: '/admin/orders' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3, py: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AdminPanelSettings sx={{ color: 'primary.main', fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'neutral.900', letterSpacing: -0.5 }}>
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider sx={{ mb: 2, borderColor: 'neutral.100' }} />
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'primary.50' : 'transparent',
                  color: isActive ? 'primary.main' : 'neutral.600',
                  '&:hover': {
                    bgcolor: isActive ? 'primary.100' : 'neutral.100',
                  },
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ListItemIcon sx={{ color: isActive ? 'primary.main' : 'neutral.500', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 14
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider sx={{ mt: 'auto', borderColor: 'neutral.100' }} />
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigate('/')}
            sx={{ borderRadius: 2, color: 'neutral.500', '&:hover': { color: 'primary.main', bgcolor: 'primary.50' } }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon>
            <ListItemText primary="Quay lại Store" primaryTypographyProps={{ fontWeight: 600, fontSize: 13 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid',
          borderColor: 'neutral.100',
          color: 'neutral.900',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 4 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>Administrator</Typography>
              <Typography variant="caption" sx={{ color: 'neutral.500' }}>admin@galaxy.store</Typography>
            </Box>
            <Avatar 
                sx={{ 
                    bgcolor: 'primary.main', 
                    fontWeight: 700, 
                    boxShadow: '0 0 0 4px #e5393520'
                }}
            >
                A
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '1px solid', borderColor: 'neutral.100' },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 4 }, 
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'neutral.50',
          minHeight: '100vh',
          pt: { xs: 10, sm: 12 }
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
