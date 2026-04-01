import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";
import theme from "./theme";
import MainLayout from "./components/layout/main-layout";
import AdminLayout from "./components/layout/admin/admin-layout";
import Home from "./pages/user/home";
import BuildPC from "./pages/user/build-pc";
import "./App.css";
import { SnackbarProvider } from "notistack";
import ProductDetail from "./pages/admin/products/product-detail";
import CategoryDetail from "./pages/admin/categories/category-detail";
import UserLogin from "./pages/user/login";
import AdminLogin from "./pages/admin/login";
import UserProductDetail from "./pages/user/product-detail";
import UserRegister from "./pages/user/register";

// Lazy load admin pages for better initial bundle size
const AdminDashboard = lazy(() => import("./pages/admin/dashboard"));
const ProductsManagement = lazy(() => import("./pages/admin/products"));
const CategoriesManagement = lazy(() => import("./pages/admin/categories"));
const UsersManagement = lazy(() => import("./pages/admin/users"));
const OrdersManagement = lazy(() => import("./pages/admin/orders"));

const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
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
              <Route path="login" element={<UserLogin />} />
              <Route path="register" element={<UserRegister />} />
              <Route path="products/:id" element={<UserProductDetail />} />

              <Route path="build-pc" element={<BuildPC />} />

              <Route path="*" element={<div>Page Not Found</div>} />
            </Route>

            {/* Admin Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLogin />} />

              <Route index element={<AdminDashboard />} />

              <Route path="products" element={<ProductsManagement />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="categories/:id" element={<CategoryDetail />} />

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
