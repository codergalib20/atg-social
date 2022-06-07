import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
const Main = () => {
    const [showPage, setShowPage] = useState("Home")
    const token = localStorage.getItem("minisocial_token")
    const callAboutPage = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/profile", {
                headers: { Authorization: "Bearer " + token },
            });
            console.log(response);
        } catch (err) {
            console.error({ err })
        }
    }


    useEffect(() => {
        callAboutPage()
    }, []);
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
            <div></div>
        </div>
    );
};

export default Main;