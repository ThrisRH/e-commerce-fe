import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  Typography,
} from '@mui/material';
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as OfferIcon,
  Favorite as FavoriteIcon,
  ShoppingBag as BagIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

const drawerWidth = 240;


const Sidebar = ({ mobileOpen, onClose }) => {
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Menu
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon /> },
          { text: 'Categories', icon: <CategoryIcon /> },
          { text: 'Offers', icon: <OfferIcon /> },
          { text: 'My Orders', icon: <BagIcon /> },
          { text: 'Wishlist', icon: <FavoriteIcon /> },
          { text: 'Build PC', icon: <BuildIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: 'Settings', icon: <SettingsIcon /> },
          { text: 'Help Center', icon: <HelpIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer - hidden for now as we have Navbar, but keeping structure for flexibility */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'none' }, // Set to 'none' on md if you want only Navbar on desktop
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
