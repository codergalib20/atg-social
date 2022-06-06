import axios from "axios";
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from "../constants/postsConstants";
export const getAllPosts = async (dispatch) => {
    try {
        dispatch({ type: GET_POSTS_REQUEST });
        const response = await axios.get("http://localhost:3000/posts");
        dispatch({ type: GET_POSTS_SUCCESS, payload: response.data });
    }
    catch (error) {
        dispatch({ type: GET_POSTS_FAILURE, payload: error.message });
    }

}