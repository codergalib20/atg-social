import React from 'react';
import AllPost from '../component/AllPost';
import AddPost from '../component/home/AddPost';
import Modal from '../component/Modal';

const Home = ({ postsModal, setPostsModal}) => {
    return (
        <div className='max-w-[700px] mx-auto px-4'>
            <div className='py-4 px-6 bg-white shadow-lg mt-4 rounded-lg'>
                <AddPost
                    postsModal={postsModal}
                    setPostsModal={setPostsModal}
                />
            </div>
            {postsModal && <Modal
                postsModal={postsModal}
                setPostsModal={setPostsModal}
            />}
            <AllPost />
        </div>
    );
};

export default Home;