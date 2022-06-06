import React, { useState } from 'react';
import Posts from '../component/Posts';
import Profiles from '../component/Profile';
import image from '../assets/bg.jpg';
import { IoMdAdd } from 'react-icons/io';
const Profile = () => {
    const menus = [
        {
            name: 'Profile',
            link: 'profile'
        },
        {
            name: 'Posts',
            link: 'posts'
        }
    ]
    const stylesbackground = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }
    const [show, setShow] = useState("profile")
    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='w-full mx-auto max-w-[650px]'>
                    <div style={stylesbackground} className='h-60 w-full rounded-2xl rounded-bl-full relative'>
                        <div className='rounded-full w-36  shadow-xl shadow-[#d6d4f9] overflow-hidden absolute bottom-0 left-0 h-36'>
                            <img className='min-h-full min-w-full' src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="" />
                        </div>
                        <div className='text-center flex items-center justify-center flex-col h-full'>
                            <h2 className="text-2xl font-medium text-gray-900">
                                Asadullah Hil Galib
                            </h2>
                            <p className='text-md font-medium text-gray-800'>
                                Asadullah Hil Galib is a web developer.
                            </p>
                        </div>
                        <div className='absolute bottom-3 right-3'>
                            <button className='rounded-full shadow-xl px-4 py-2 flex items-center gap-3 text-xl text-gray-50 bg-cyan-600 select-none'>
                                <span className='text-gray-50 text-2xl'><IoMdAdd /></span>
                                Add New Post
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mt-6 shadow-lg">
                        {menus.map((menu, index) => (
                            <div onClick={() => setShow(menu.link)} key={index} className={` px-2 py-2 ${show === menu.link ? "shadow-xl border-b-2 border-gray-900 text-gray-900" : "text-gray-500 cursor-pointer"} select-none`}>
                                {menu.name}
                            </div>
                        ))}
                    </div>
                    <div className='mt-4'>
                        {show === "profile" && <Profiles />}
                        {show === "posts" && <Posts />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;