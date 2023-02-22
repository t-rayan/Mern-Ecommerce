import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/DashboardPage/Dashboard";
import Home from "./pages/Home";
import Restricted from "./utils/Restricted";
import AdminRoute from "./utils/AdminRoute";
import MainLayout from "./layouts/MainLayout";
import Categories from "./pages/Admin/CategoryPage/Categories";
import Products from "./pages/Admin/ProductPage/Products";
import Orders from "./pages/Admin/OrderPage/Orders";
import Settings from "./pages/Admin/SettingsPage/Settings";
import Customers from "./pages/Admin/CustomerPage/Customers";
import AddCategory from "./pages/Admin/CategoryPage/AddCategory";
import InnerLayout from "./layouts/InnerLayout";
import AddProduct from "./pages/Admin/ProductPage/AddProduct";
import { Box } from "@chakra-ui/react";
import AdminLayout from "./layouts/AdminLayout";
import CatAndProducts from "./pages/CatAndProducts";
import ProductView from "./pages/ProductDetails";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import User from "./pages/User";
import Protected from "./utils/Protected";
import OrderDetails from "./components/OrderDetails";
import { useEffect } from "react";
import useMedia from "./hooks/useMedia";
import { useDispatch } from "react-redux";
import { setCurrentDevice } from "./features/ui/uiSlice";
import EditProduct from "./pages/Admin/ProductPage/EditProduct";

function App() {
  const { isMobile, isLargeDevice, isTablet } = useMedia();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      dispatch(setCurrentDevice("mobile"));
    }
    if (isTablet) {
      dispatch(setCurrentDevice("tablet"));
    }
    if (isLargeDevice) {
      dispatch(setCurrentDevice("large"));
    }
  }, [dispatch, isMobile, isLargeDevice, isTablet]);

  return (
    <Box minH="100vh">
      <ToastContainer />
      <Routes>
        {/* shop routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="category/:name" element={<CatAndProducts />} />
          <Route path="products/:productId" element={<ProductView />} />

          <Route path="products/search" element={<SearchResults />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path=":orderId/checkout-success"
            element={<CheckoutSuccess />}
          />
        </Route>

        {/* user routes */}
        <Route path="/user/:id" element={<MainLayout />}>
          <Route
            index
            element={
              <Protected>
                <User />
              </Protected>
            }
          />
        </Route>
        {/* auth routes */}
        <Route
          path="/register"
          element={
            <Restricted>
              <Register />
            </Restricted>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="categories" element={<InnerLayout />}>
            <Route index element={<Categories />} />
            <Route path="add" element={<AddCategory />} />
            <Route path=":id" element={<AddCategory />} />
          </Route>
          <Route path="products" element={<InnerLayout />}>
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path=":id" element={<EditProduct />} />
          </Route>
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="orders" element={<InnerLayout />}>
            <Route index element={<Orders />} />
            <Route path=":id" element={<OrderDetails />} />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Outlet />
    </Box>
  );
}

export default App;
