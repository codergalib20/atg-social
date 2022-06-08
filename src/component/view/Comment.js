import React, { useContext } from 'react';
import { MainContext } from '../../App';
import { avatarBg, selectColor } from '../../assets/colors';
import moment from "moment";

const Comment = ({ comment }) => {
    const { users } = useContext(MainContext);
    // console.log(comment)
    const findUser = users.find(user => user?.username === comment?.username);
    const makeAvatar = findUser?.name?.charAt(0)?.toUpperCase();
    const color = selectColor(makeAvatar);
    const colo = color?.bg;
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex gap-2 mt-2">
                    {findUser?.avatar && <img className="rounded-full w-8 h-8" src={findUser?.avatar} alt="avatar" />}
                    {!findUser?.avatar && (
                        <div style={{ background: `${colo}` }} className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white shadow-lg`}>
                            <div className={`text-xl`}>{color?.l}</div>
                        </div>
                    )}
                    <div className="ml-2 bg-[#f0f2f5] py-1 px-2 rounded-lg">
                        <div className="font-medium text-sm text-cyan-900 pb-2">{findUser?.name}</div>
                        <div className="text-sm font-normal text-cyan-700">{comment?.comment}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;