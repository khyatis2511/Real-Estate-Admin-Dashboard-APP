import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/container/privateRoute';
import LayoutContextProvider from './components/contexts/layoutContext';
import LoginController from './pages/login/login.controller';
import DashboardController from './pages/dashboard/dashboard.controller';
import Unauthorized from './components/container/unauthorized';
import ForgotPasswordController from './pages/forgotPassword/forgotPassword.controller';
import RegisterController from './pages/register/register.controller';
import GlobalProvider from './lib/redux/GlobalProvider';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalProvider>
        <LayoutContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute path="/" element={DashboardController} />
              }
            />
            <Route path="/login" element={<LoginController />} />
            <Route path="/register" element={<RegisterController />} />
            <Route path="/forgot-password" element={<ForgotPasswordController />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </LayoutContextProvider>
      </GlobalProvider>
    </Router>
  )
}

export default App
