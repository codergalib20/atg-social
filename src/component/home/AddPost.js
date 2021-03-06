import React from 'react';

const AddPost = ({ postsModal, setPostsModal }) => {
    return (
        <div>
            <div onClick={() => setPostsModal(!postsModal)} className="relative cursor-pointer">
                <input type="text" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer outline-none" autoComplete='false' placeholder="Create a New Post" required />
            </div>
        </div>
    );
};

export default AddPost;