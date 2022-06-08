import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../App';
import { getAllPosts } from '../redux/actions/postsAction';
import Post from './view/Post';
const PostPage = () => {
    const { error, posts, isLoading } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, [])
    const value = useContext(AuthContext);
    const myposts = posts.filter(post => post?.username === value?.username);
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
                    {myposts.map((post, index) => <Post post={post} key={index} />)}
                </div>
            }
            {error && <div className='min-h-[400px] w-full flex items-center justify-center text-center text-red-500 font-medium'>
                {error}
            </div>}
        </div>
    );
};

export default PostPage;