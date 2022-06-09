import React, { useContext } from 'react';
import { AuthContext } from '../App'
const Profile = () => {
    const value = useContext(AuthContext);
    console.log(value);
    return (
        <div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Name :
                </strong>
                <span>
                   {" "}  {value?.name}
                </span>
            </div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Username :
                </strong>
                <span>
                   {" "}  {value?.username}
                </span>
            </div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Email :
                </strong>
                <span>
                   {" "}  {value?.email}
                </span>
            </div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Join At :
                </strong>
                <span>
                  {" "}   {value?.date}
                </span>
            </div>
            {/* <div className="py-2 shadow-lg px-2">
                <strong>
                    Address :
                </strong>
                <span>
                    Karachi, Pakistan
                </span>
            </div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Website :
                </strong>
                <span>
                    www.asadullah.com
                </span>
            </div>
            <div className="py-2 shadow-lg px-2">
                <strong>
                    Company :
                </strong>
                <span>
                    Asadullah
                </span>
            </div>  */}
        </div>
    );
};

export default Profile;