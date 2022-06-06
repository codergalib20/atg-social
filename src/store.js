import { applyMiddleware, createStore } from "redux";
import { postsReducer } from "./redux/reducers/postsReducers";
import thunk from "redux-thunk";


const store = createStore(postsReducer, applyMiddleware(thunk));
export default store;