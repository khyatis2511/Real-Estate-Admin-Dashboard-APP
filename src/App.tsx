import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/container/privateRoute';
import Unauthorized from './components/container/unauthorized';
import LayoutContextProvider from './components/contexts/layoutContext';
import GlobalProvider from './lib/redux/GlobalProvider';
import ActivityLogsController from './pages/activityLogs/activityLogs.controller';
import DashboardController from './pages/dashboard/dashboard.controller';
import ForgotPasswordController from './pages/forgotPassword/forgotPassword.controller';
import LoginController from './pages/login/login.controller';
import RegisterController from './pages/register/register.controller';
import ExistingUserController from './pages/user/existingUser.controller';
import PendingUserController from './pages/user/pendingUser.controller';

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
            <Route
              path="/new-users"
              element={
                <PrivateRoute path="/new-users" element={PendingUserController} />
              }
            />
            <Route
              path="/existing-users"
              element={
                <PrivateRoute path="/existing-users" element={ExistingUserController} />
              }
            />
            <Route
              path="/activity-logs"
              element={
                <PrivateRoute path="/activity-logs" element={ActivityLogsController} />
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
