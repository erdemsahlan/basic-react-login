import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthProvider, { useAuth } from './auth/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Products from './pages/Products';
import CustomerDetail from './pages/CustomerDetail';
import logo from './logo.svg';
import './App.css';

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/customers" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Customers />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/customers/:id" 
              element={
                <PrivateRoute>
                  <Layout>
                    <CustomerDetail />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/products" 
              element={
                <PrivateRoute>
                  <Layout>
                    <Products />
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Layout>
                    <div style={{ padding: '20px' }}>
                      <h1>Profil</h1>
                      <p>Profil sayfası içeriği burada olacak.</p>
                    </div>
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PrivateRoute>
                  <Layout>
                    <div style={{ padding: '20px' }}>
                      <h1>Ayarlar</h1>
                      <p>Ayarlar sayfası içeriği burada olacak.</p>
                    </div>
                  </Layout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <PrivateRoute>
                  <Layout>
                    <div style={{ padding: '20px' }}>
                      <h1>Raporlar</h1>
                      <p>Raporlar sayfası içeriği burada olacak.</p>
                    </div>
                  </Layout>
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
