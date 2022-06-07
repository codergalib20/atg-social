import { GET_POSTS_FAILURE, GET_POSTS_REQUEST, GET_POSTS_SUCCESS } from "../constants/postsConstants"

const initialState = {
    posts: [],
    isLoading: false,
    error: null
}
export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_POSTS_SUCCESS:
            return {
                error: null,
                posts: action.payload,
                isLoading: false
            }
        case GET_POSTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}