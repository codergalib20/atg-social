import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../redux/actions/postsAction";
import { MainContext } from "../App";
import Post from './view/Post';
const AllPost = () => {
    const { setNewData, newData, success, setSucces } = useContext(MainContext);
    let { error, posts, isLoading } = useSelector(state => state);
    const dispatch = useDispatch();
    const [allPosts, setAllPosts] = useState([]);
    console.log(posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch])
    useEffect(() => {
        setAllPosts(posts);
        if (success === "success") {
            setAllPosts([...posts, newData]);
            console.log("Log")
            setSucces("")
        }
    }, [newData, posts, setSucces, success]);
    
    return (
        <div>
            {
                isLoading && (
                    <div className='min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium'>
                        <div className="lds-hourglass"></div>
                    </div>
                )
            }
            {posts && !isLoading && 
                <div className='px-4 pb-20'>
                    {allPosts?.map((post, index) => <Post post={post} key={index} />)}
                </div>
            }
            {error && <div className='min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium'>
                {error}
            </div>}
        </div>
    );
};

export default AllPost;