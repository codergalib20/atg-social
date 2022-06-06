import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import image from '../assets/login.gif';
const Register = () => {
    const [error, setErrors] = useState({});
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        try {
            console.log(data);
            let generator = data.name
            let result = generator.replaceAll(" ", "");
            let result2 = result.replaceAll('"', "");
            let result3 = result2.replaceAll("'", "");
            let result4 = result3.replaceAll(".", "");
            let result5 = result4.replaceAll("/", "");
            let result6 = result5.replaceAll("\\", "");
            let result7 = result6.replaceAll("!", "");
            let result8 = result7.replaceAll("@", "");
            let result9 = result8.replaceAll("#", "");
            let result10 = result9.replaceAll("$", "");
            let result11 = result10.replaceAll("%", "");
            let result12 = result11.replaceAll("^", "");
            let result13 = result12.replaceAll("&", "");
            let result14 = result13.replaceAll("*", "");
            let result15 = result14.replaceAll("(", "");
            let result16 = result15.replaceAll(")", "");
            let result17 = result16.replaceAll("_", "");
            let result18 = result17.replaceAll("+", "");
            let result19 = result18.replaceAll("=", "");
            let result20 = result19.replaceAll("{", "");
            let result21 = result20.replaceAll("}", "");
            let result22 = result21.replaceAll("[", "");
            let result23 = result22.replaceAll("]", "");
            let result24 = result23.replaceAll("|", "");
            let result25 = result24.replaceAll(";", "");
            let result26 = result25.replaceAll(":", "");
            let result27 = result26.replaceAll("<", "");
            let result28 = result27.replaceAll(">", "");
            let result29 = result28.replaceAll("?", "");
            let result30 = result29.replaceAll("~", "");
            let result31 = result30.replaceAll("`", "").toLowerCase();
            const number = Math.floor(Math.random(1000) * 2000);
            let username = result31 + number;
            console.log(username);
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                username: username,
                password: data.password,
                name: data.name,
                email: data.email,
                avatar: "https://i.pravatar.cc/300"
            })
            console.log(response);
        } catch (err) {
            setErrors(err.response.data.error);
        }
    };
    return (
        <div>
            <div className="container mx-auto px-4 min-h-screen">
                <div className="items-center gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <img src={image} alt="Login Page images" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file"
                                        accept='.jpg, .jpeg, .png'
                                        {...register("image", { required: true })}
                                    />
                                    <label className="block text-gray-700 text-md font-bold mb-1 mt-3" htmlFor="name">
                                        Full Name
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Full Name"
                                        {...register("name", { required: true })}
                                    />
                                    <label className="block text-gray-700 text-md font-bold mt-3" htmlFor="email">
                                        Email
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1" id="email" type="email" placeholder="E-mail"
                                        {...register("email", { required: true })}
                                    />
                                    <label className="block text-gray-700 text-md font-bold mt-3" htmlFor="password">
                                        Password
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-1" id="password" type="password" placeholder="Password"
                                        name="password"
                                        {...register("password", { required: true })}
                                    />
                                    <button onClick={handleSubmit} className="bg-[#407bff] py-2 px-5 border-2 border-white shadow-lg mt-4 text-white" >Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;