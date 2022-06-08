import { useNavigate } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import axios from 'axios';

export const AuthContext = createContext();
export const MainContext = createContext();
const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("minisocial_token");
  const [newData, setNewData] = useState({});
  const [success, setSucces] = useState("");
  // Load Authenticate User---
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
  // Load All Comments---
  const [comments, setComments] = useState([]);
  const callComments = async () => {
    try {
      const response = await axios.get("https://sheltered-meadow-26881.herokuapp.com/api/comments", {
        headers: {
          "Content-Type": "application/json",
        }
      })
      setComments(response?.data?.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    callComments()
  }, [])
  // Load All All User---
  const [users, setUsers] = useState([]);
  const callUsers = async () => {
    try {
      const response = await axios.get("https://sheltered-meadow-26881.herokuapp.com/api/auth/users", {
        headers: {
          "Content-Type": "application/json",
        }
      })
      setUsers(response?.data?.data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    callUsers()
  }, [])
  const navigate = useNavigate();
  return (
    <AuthContext.Provider value={user}>
      <MainContext.Provider value={{ comments, setComments, users, newData, setNewData, success, setSucces }}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {
            user ? (
              <Route path="/*" element={<Main />} />
            ) : (
              navigate("/login")
            )
          }

        </Routes>
      </MainContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;