import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { AuthContext, MainContext } from '../../App';
import Comment from './Comment';
const Post = ({ post }) => {
    const [showtext, setShowText] = useState(false)
    const [comment, setComment] = useState("");
    const show = post?.description?.slice(0, 60)
    const showAll = post?.description;
    const value = useContext(AuthContext);
    const { comments, setComments } = useContext(MainContext);
    // https://sheltered-meadow-26881.herokuapp.com/api/comments/single/
    const handleSubmitComment = async (e) => {
        try {
            let body = {
                comment: comment,
                postId: e,
                username: value?.username,
                userImage: value?.avatar,
            }
            if (!comment) {
                alert("Please add something!")
            } else {
                const response = await axios.post('https://sheltered-meadow-26881.herokuapp.com/api/comments', body)
                setComment("")
                setComments([...comments, response?.data?.comment])
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDeletePost = async (id) => {
        await fetch(`https://sheltered-meadow-26881.herokuapp.com/api/posts/del/post/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        }).then(response => {
            if (response?.statusText === "OK") {
                // const newPosts = value.posts.filter(post => post._id !== id)
                // value.setPosts(newPosts)
                alert("Post deleted!")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const [edit, setEdit] = useState(null);
    const [editText, setEditText] = useState({ title: "", description: "" })
    const handleChangeEdit = (e) => {
        const value = e.target.value;
        const field = e.target.name;
        setEditText({ ...editText, [field]: value })
    }
    const handleSubmitForm = (e) => {
        if (!editText.title || !editText.description) {
            alert("Please Change something!")
        } else {
            axios.patch(`http://localhost:5000/api/posts//update/post/${post._id}`, {
                title: editText?.title,
                description: editText.description
            }).then(response => {
                if (response?.statusText === "OK") {
                    alert("Post updated!")
                    setEdit(null)
                }
            }
            ).catch(err => {
                console.log(err)
            }
            )
        }
    }
    const filterComments = comments.filter(comment => comment.postId === post._id)
    return (
        <div>
            <div className='shadow-md px-4 my-6 border-t-4 border-cyan-600 rounded-lg'>
                {(!edit && (<div> {post?.username === value?.username && <div className='py-2 flex items-center justify-end gap-4 border-b-2 border-gray-400 mb-3'>
                    <motion.div
                        onClick={() => handleDeletePost(post._id)}
                        whileTap={{
                            scale: 1.3,
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut"
                            }
                        }}
                        className='text-2xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-150 ease-linear'>
                        <AiTwotoneDelete />
                    </motion.div>
                    <motion.div
                        onClick={() => setEdit(post)}
                        whileTap={{
                            scale: 1.3,
                            transition: {
                                duration: 0.1,
                                ease: "easeInOut"
                            }
                        }}
                        className='text-2xl cursor-pointer w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-150 ease-linear'>
                        <FaEdit />
                    </motion.div>
                </div>}
                    <div>
                        <div className='pt-4'>
                            <h2 className='text-2xl font-medium text-gray-800'>{post?.title}</h2>

                            {post?.description?.length > 60 ? (
                                <p className='gap-3 py-3 text-gray-500'>{!showtext ? show + " " : showAll + " "}
                                    {!showtext ? <div className='inline'> ... <button className='text-gray-900' onClick={() => setShowText(!showtext)}>see more.</button></div>
                                        :
                                        <div className='inline'><button className='text-gray-900' onClick={() => setShowText(!showtext)}>...show less <span className='inline'><BiHide className='inline' /></span></button></div>}
                                </p>
                            ) : <p>{showAll}</p>}
                            <img src={post?.image} alt={post.title} />
                        </div>
                        <div className='flex items-center justify-end gap-4 py-2'>
                            <motion.div whileTap={{
                                scale: 1.3,
                                transition: {
                                    duration: 0.1,
                                    ease: "easeInOut"
                                }
                            }} className='text-3xl text-gray-600 hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full overflow-hidden cursor-pointer'><MdOutlineFavoriteBorder /></motion.div>
                            <motion.div
                                whileTap={{
                                    scale: 1.3,
                                    transition: {
                                        duration: 0.1,
                                        ease: "easeInOut"
                                    }
                                }}
                                className='text-3xl text-red-600 hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full overflow-hidden cursor-pointer'><MdFavorite /></motion.div>
                        </div>
                        {/* Here show comment box */}
                        <div className='pb-3'>
                            <div >
                                <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label htmlFor="comment" className="sr-only">Your comment</label>
                                        <textarea value={comment} onChange={e => setComment(e.target.value)} id="comment" rows="4" className="p-2 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required=""></textarea>
                                    </div>
                                    <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                                        <button
                                            onClick={() => handleSubmitComment(post._id)}
                                            type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-cyan-900 hover:bg-cyan-800">
                                            Post comment
                                        </button>
                                        <div className="flex pl-0 space-x-1 sm:pl-2">
                                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd"></path></svg>
                                            </button>
                                            <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                            </button>
                                            <button
                                                type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='py-2 px-2'>
                                <div>
                                    {
                                        filterComments.map((comment, index) => (
                                            <div key={index}>
                                                <Comment comment={comment} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {/* <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p> */}
                        </div>
                    </div>
                </div>))}
                {
                    edit && (
                        <div>
                            <div className='py-2 flex items-center justify-end'>
                                <span className=" w-10 h-10 text-2xl text-gray-800 rounded-full overflow-hidden flex items-center justify-center hover:bg-cyan-200 cursor-pointer" onClick={() => setEdit(null)}>
                                    <AiOutlineClose />
                                </span>
                            </div>
                            <img src={edit?.image} alt="" />
                            <div>
                                <div class="relative z-0 w-full mb-6 group">
                                    <input onChange={handleChangeEdit} defaultValue={edit?.title} type="text" name="title" id="title" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder="Title" required />
                                    {/* description */}
                                    <div>
                                        <textarea
                                            onChange={handleChangeEdit}
                                            defaultValue={edit?.description} cols="30" rows="5"
                                            name="description" id="description" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer" placeholder="Description" required
                                        ></textarea>
                                    </div>
                                </div>
                                <button onClick={() => handleSubmitForm(edit?._id)} type="submit" class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Save change</button>
                            </div>
                        </div>
                    )
                }
            </div >

        </div >
    );
};

export default Post;



