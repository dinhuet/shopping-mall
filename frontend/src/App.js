// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Support from './pages/Support';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MenuPanel from './pages/MenuPanel'; // 👉 Đã có
import EmployeeManagement from './pages/EmployeeManagement'; // 👉 Thêm dòng này
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CustomerManagement from './pages/CustomerManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="app-container">
            <Navbar />
            <main className="app-content">
              <Routes>
                {/* Các route thông thường */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route path="/support" element={<Support />} />

                {/* Route cho Admin */}
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route
                  path="/admin-dashboard"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/menu"
                  element={
                    <AdminProtectedRoute>
                      <MenuPanel />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                  path="/admin/employees" // 👉 Thêm route mới này
                  element={
                    <AdminProtectedRoute>
                      <EmployeeManagement />
                    </AdminProtectedRoute>
                  }
                />
                <Route
                path="/admin/customers"
                element={
                  <AdminProtectedRoute>
                    <CustomerManagement />
                  </AdminProtectedRoute>
                }
              />
                {/* Route cho các trang lỗi */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
