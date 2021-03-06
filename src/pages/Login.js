import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../App';

import image from '../assets/login.gif';
const Login = () => {
    const navigate = useNavigate()
    const [error, setErrors] = useState({});
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(null);
    const value = useContext(AuthContext);
    console.log(value);
    const onSubmit = async data => {
        try {
            const response = await axios.post('https://sheltered-meadow-26881.herokuapp.com/api/auth/signin', data);
            localStorage.setItem("minisocial_token", response?.data?.token);
            if (response?.data?.token) {
                // location('/');
                console.log(response?.data?.token);
                setTimeout(() => {
                    navigate('/main');
                }, 6000);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logged in successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data);
        }
    };
    return (
        <div>
            <div className="container mx-auto px-4 min-h-screen">
                <div className="items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <img src={image} alt="Login Page images" />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div>
                                    <span className='text-red-500 text-md font-medium'>{error?.error}</span>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="username">
                                        Username
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"
                                        name="username"
                                        {...register("username", { required: true })}
                                    />
                                    <label className="block mt-5 text-gray-700 text-md font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"
                                        name="password"
                                        {...register("password", { required: true })}
                                    />
                                    <div className="flex items-center mt-4 gap-5">
                                        <button type='submit' className="bg-[#407bff] py-2 px-5 border-2 border-white shadow-lg text-white" >Login</button>
                                        <span onClick={() => navigate("/register")} className="text-red-600 font-medium block cursor-pointer">Are you new user?</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;