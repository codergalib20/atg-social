import { Navigate, useNavigate } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import axios from 'axios';
import Unsecure from './pages/Unsecure';

export const AuthContext = createContext();
export const MainContext = createContext();
const App = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("minisocial_token");
  const [newData, setNewData] = useState({});
  const [success, setSucces] = useState("");
  const [loading, setLoading] = useState(true);
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
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  })

  const navigate = useNavigate();
  return (
    <AuthContext.Provider value={user}>
      <MainContext.Provider value={{ comments, setComments, users, newData, setNewData, success, setSucces }}>
        <Routes>
          {loading && (
            <Route path="/" element={<div className="min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium">
              <div className="lds-hourglass"></div>
            </div>} />
          )}
          {!loading && user && <Route path="main/*" element={<Main />} />}
          {!loading && !user && <Route path="main/*" element={<Main />} />}
          {!loading && user && <Route path="login" element={<Login />} />}
          {!loading && user && <Route path="/register" element={<Register />} />}
          {!loading && !user && <Route path="login" element={<Login />} />}
          {!loading && !user && <Route path="register" element={<Register />} />}
          {/* {!loading && !user && navigate("/login")}  */}
          {!loading && <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />}
        </Routes>
      </MainContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;