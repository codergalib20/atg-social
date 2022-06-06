import React from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import axios from 'axios';
const Modal = ({ postsModal, setPostsModal }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const formData = new FormData();
        formData.append("file", data?.image[0]);
        formData.append("upload_preset", "jsjb2bic");
        formData.append("upload_preset", "jsjb2bic");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        await axios.post(
            "https://api.cloudinary.com/v1_1/gsbsoft/image/upload",
            formData,
            config
        )
            .then((res) => {
                data.image = res.data.secure_url;
                axios.post('http://localhost:5000/api/posts/post', data)
                    .then(response => {
                        console.log(response);
                        setPostsModal(false);
                    }).catch(err => {
                        console.log(err);
                    })
            }
            )
    }
    return (
        <div className='h-screen w-screen bg-rgbawhite fixed top-0 left-0 flex items-center justify-center'>
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-[650px] bg-white shadow-2xl shadow-modal rounded-xl overflow-hidden'>
                <div className='flex items-center bg-cyan-800 justify-between py-2 px-4    border-b-2 border-cyan-800'>
                    <div className='text-2xl text-white'>Create a New post</div>
                    <div className='text-2xl text-white cursor-pointer'>
                        <span onClick={() => setPostsModal(!postsModal)}><AiOutlineClose /></span>
                    </div>
                </div>
                <div className='p-4'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-center items-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                                    <svg className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden"
                                    accept="image/jpg,image/png,image/jpeg"
                                    {...register("image", { required: true })}
                                />
                            </label>
                        </div>
                        <div>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3" placeholder="Post Title" required
                                {...register("title", { required: true })}
                            />
                            <textarea
                                {...register("description", { required: true })}
                                id="message"
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" placeholder="Post Description..."></textarea>
                        </div>
                        <div className="flex items-center justify-end py-2 border-t-2 border-cyan-800 mt-3">
                            <button type="submit" className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                Choose plan
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;