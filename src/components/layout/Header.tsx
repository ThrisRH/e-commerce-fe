import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, styled, alpha, Tooltip } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Person as PersonIcon, Menu as MenuIcon, Build } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '12px',
    [theme.breakpoints.up('md')]: {
      width: '500px',
    },
  },
}));

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, display: { md: 'none' } }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 700, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          GALAXY STORE
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search products, brands and more..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="large" edge="end" color="inherit">
            <Badge badgeContent={10} color="error">
              <ShoppingCartIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <Badge badgeContent={0} color="error">
              <PersonIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          <Tooltip title="Build PC">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={() => navigate('/build-pc')}
              id="header-build-pc-btn"
            >
              <Badge badgeContent={0} color="error">
                <Build sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

