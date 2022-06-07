import React from 'react';
import Login from './pages/Login';
import 'react-notifications/lib/notifications.css';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
};

export default App;