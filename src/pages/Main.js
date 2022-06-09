import React, { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import { motion } from 'framer-motion';
import { RiLogoutCircleRLine } from 'react-icons/ri';
const Main = () => {
    const [postsModal, setPostsModal] = useState(false);
    const [showPage, setShowPage] = useState("Home")
    const navigate = useNavigate();
    const menues = [
        {
            name: "Home",
            link: "/main",
            icon: <BiHomeAlt />
        },
        {
            name: "Profile",
            link: "/main/profile",
            icon: <CgProfile />
        },

    ]
    const handleLogout = () => {
        localStorage.removeItem("minisocial_token");
        console.log("logout");
        navigate("/login")
    }
    return (
        <div>
            <div className='bg-white shadow-md fixed top-0 left-0 w-full z-40'>
                <div className="w-full max-w-[750px] mx-auto px-4 relative">
                    <div className='relative'>
                        <div className='w-full items-center max-w-[250px] mx-auto grid grid-cols-8 gap-4'>
                            {menues.map((menu, index) => (
                                <Link className='col-span-4' onClick={() => setShowPage(menu.name)} key={index} to={menu?.link}>
                                    <div
                                        key={index} className={`flex items-center justify-center text-3xl py-3 rounded-b-md hover:bg-cyan-300 text-cyan-900 hover:text-cyan-50  ${menu.name === showPage && "bg-cyan-300 text-cyan-50"}`}>
                                        <motion.div
                                            whileTap={{
                                                scale: 0.8,
                                                transition: {
                                                    duration: 0.2
                                                }
                                            }}
                                        >
                                            {menu?.icon}
                                        </motion.div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className='absolute right-4 top-2/4 -translate-y-2/4'>
                            <span onClick={handleLogout} className='text-2xl cursor-pointer font-medium text-cyan-900'>
                                <RiLogoutCircleRLine />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' mt-[56px]'>
                <Routes>
                    <Route path="/" element={<Home
                        postsModal={postsModal}
                        setPostsModal={setPostsModal}

                    />} />
                    <Route path="profile" element={<Profile
                        postsModal={postsModal}
                        setPostsModal={setPostsModal}
                    />} />
                </Routes>
            </div>
        </div>
    );
};

export default Main;