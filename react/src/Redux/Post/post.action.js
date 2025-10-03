import { api } from "../../config/api"
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_SAVED_POST_FAILURE, GET_SAVED_POST_REQUEST, GET_SAVED_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, SAVE_POST_FAILURE, SAVE_POST_REQUEST, SAVE_POST_SUCCESS} from "./post.actionType"


const createPostAction = (postData) => async (dispatch) => {
    dispatch({type:CREATE_POST_REQUEST})
    try {
        const {data} = await api.post("/api/posts", postData)
        dispatch({type:CREATE_POST_SUCCESS, payload:data})
        console.log("create post", data)
    } catch (error) {
        console.log("create post error", error)
        dispatch({type:CREATE_POST_FAILURE, payload:error})
    }
}

const getAllPostAction = () => async (dispatch) => {
    dispatch({type:GET_ALL_POST_REQUEST})
    try {
        const {data} = await api.get("/api/posts")
        console.log("get all post", data)
        dispatch({type:GET_ALL_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("get all post error", error)
        dispatch({type:GET_ALL_POST_FAILURE, payload:error})
    }
}

const getUsersPostAction = (userId) => async (dispatch) => {
    dispatch({type:GET_USERS_POST_REQUEST})
    try {
        const {data} = await api.get(`/api/posts/user/${userId}`)
        dispatch({type:GET_USERS_POST_SUCCESS, payload:data})
        console.log("get user post", data)
    } catch (error) {
        dispatch({type:GET_USERS_POST_FAILURE, payload:error})
    }
}

const likePostAction = (postId) => async (dispatch) => {
    dispatch({type:LIKE_POST_REQUEST})
    try {
        const {data} = await api.put(`/api/posts/like/${postId}`)
        console.log("like post", data)
        dispatch({type:LIKE_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("like post error", error)
        dispatch({type:LIKE_POST_FAILURE, payload:error})
    }

}

const createCommentAction = (reqData) => async (dispatch) => {
    dispatch({type:CREATE_COMMENT_REQUEST})
    try {
        const {data} = await api.post(`/api/comments/post/${reqData.postId}`, reqData.data)
        dispatch({type:CREATE_COMMENT_SUCCESS, payload:data})
        console.log("create comment", data)
    } catch (error) {
        console.log("create comment error", error)
        dispatch({type:CREATE_COMMENT_FAILURE, payload:error})
    }
}

const savePostAction = (postId) => async (dispatch) => {
    dispatch({type:SAVE_POST_REQUEST})
    try {
        const {data} = await api.put(`/api/posts/save/${postId}`)
        console.log("save post", data)
        dispatch({type:SAVE_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("save post error", error)
        dispatch({type:SAVE_POST_FAILURE, payload:error})
    }
}

const getSavedPostAction = () => async (dispatch) => {
    dispatch({type:GET_SAVED_POST_REQUEST})
    try {
        const {data} = await api.get("/api/posts/saved")
        console.log("get saved post", data)
        dispatch({type:GET_SAVED_POST_SUCCESS, payload:data})
    } catch (error) {
        console.log("get saved post error", error)
        dispatch({type:GET_SAVED_POST_FAILURE, payload:error})
    }
}


export {createPostAction, getAllPostAction, getUsersPostAction, likePostAction, createCommentAction, savePostAction, getSavedPostAction}