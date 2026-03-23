import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import theme from './theme';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';
import Home from './pages/Home';
import BuildPC from './pages/BuildPC';
import './App.css';
import { SnackbarProvider } from 'notistack';

// Lazy load admin pages for better initial bundle size
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductsManagement = lazy(() => import('./pages/admin/Products'));
const CategoriesManagement = lazy(() => import('./pages/admin/Categories'));
const UsersManagement = lazy(() => import('./pages/admin/Users'));
const OrdersManagement = lazy(() => import('./pages/admin/Orders'));

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider />
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Main Store Layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="build-pc" element={<BuildPC />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Route>

            {/* Admin Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
