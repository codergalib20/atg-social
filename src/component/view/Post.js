import React, { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
const Post = ({ post }) => {
    const [showtext, setShowText] = useState(false)
    const show = post?.description?.slice(0, 60)
    const showAll = post?.description
    return (
        <div>
            <div className='shadow-md px-4 my-6 border-t-4 border-cyan-600 rounded-lg'>
                <div className='py-2 flex items-center justify-end gap-4 border-b-2 border-gray-400 mb-3'>
                    <span className='text-3xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-150 ease-linear'>
                        <AiTwotoneDelete />
                    </span>
                    <span className='text-3xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-150 ease-linear'>
                        <FaEdit />
                    </span>
                    <span className='text-3xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-150 ease-linear'>
                        <BsThreeDots />
                    </span>
                    <span className='text-3xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-150 ease-linear'>
                        <BsThreeDots />
                    </span>
                </div>
                <div>
                    <h2 className='text-2xl font-medium text-gray-800'>{post?.title}</h2>

                    {post?.description.length > 60 ? (
                        <p className='gap-3 py-3'>{!showtext ? show + " " : showAll + " "}
                            {!showtext ? <div className='inline'> ... <button onClick={() => setShowText(!showtext)}>see more.</button></div>
                                :
                                <div className='inline'><button onClick={() => setShowText(!showtext)}>...hide more <span className='inline'><BiHide className='inline' /></span></button></div>}
                        </p>
                    ) : <p>{showAll}</p>}
                    <img src={post?.image} alt={post.title} />
                </div>
                <div className='flex items-center justify-end gap-4 py-2'>
                    <span className='text-3xl text-gray-600'><MdOutlineFavoriteBorder /></span>
                    <span className='text-3xl text-red-600'><MdFavorite /></span>
                </div>
            </div>
        </div>
    );
};

export default Post;