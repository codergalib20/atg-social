import React, { createContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import 'react-notifications/lib/notifications.css';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import axios from 'axios';

export const AuthContext = createContext();
const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("minisocial_token")
  const callAboutPage = async () => {
    try {
      const response = await axios.get("https://sheltered-meadow-26881.herokuapp.com/api/auth/profile", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(response?.data?.userData);
    } catch (err) {
      console.error({ err })
    }
  }
  useEffect(() => {
    callAboutPage()
  }, []);
  return (
    <AuthContext.Provider value={user}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {
          user ? (
            <Route path="/*" element={<Main />} />
          ) : (
            <Route path="/" element={<Login />} />
          )
        }
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;