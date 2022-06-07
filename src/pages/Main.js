import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
const Main = () => {
    const [postsModal, setPostsModal] = useState(false);
    const [showPage, setShowPage] = useState("Home")
    
    const menues = [
        {
            name: "Home",
            link: "/",
            icon: <BiHomeAlt />
        },
        {
            name: "Profile",
            link: "/profile",
            icon: <CgProfile />
        },

    ]
    return (
        <div>
            <div className='bg-white shadow-md'>
                <div className="container max-w-[750px] mx-auto px-4">
                    <div>
                        <div className='w-full max-w-[250px] mx-auto grid grid-cols-2 gap-4'>
                            {menues.map((menu, index) => (
                                <Link onClick={() => setShowPage(menu.name)} key={index} to={menu?.link}>
                                    <div key={index} className={`flex items-center justify-center text-4xl py-5 rounded-b-md hover:bg-cyan-300 ${menu.name === showPage && "bg-cyan-300"}`}>
                                        {menu?.icon}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={<Home postsModal={postsModal} setPostsModal={setPostsModal} />} />
                    <Route path="profile" element={<Profile postsModal={postsModal} setPostsModal={setPostsModal} />} />
                </Routes>
            </div>
        </div>
    );
};

export default Main;