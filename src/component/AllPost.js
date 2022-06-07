import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from "../redux/actions/postsAction";
import Post from './view/Post';
const AllPost = () => {
    const { error, posts, isLoading } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, [])
    return (
        <div>
            {
                isLoading && (
                    <div className='min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium'>
                        <div className="lds-hourglass"></div>
                    </div>
                )
            }
            {posts &&
                <div className='px-4 pb-20'>
                    {posts.map((post, index) => <Post post={post} key={index} />)}
                </div>
            }
            {error && <div className='min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium'>
                {error}
            </div>}
        </div>
    );
};

export default AllPost;