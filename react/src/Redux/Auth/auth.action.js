import axios from "axios"
import { api, API_BASE_URL } from "../../config/api"
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, 
    GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE, 
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, 
    SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, SEARCH_USER_FAILURE, 
    LOGOUT_SUCCESS, LOGOUT_REQUEST, LOGOUT_FALTURE} from "./auth.actionType"

const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({type:LOGIN_REQUEST})
    try {
        console.log("Sending login data:", loginData)
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`, loginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(data.token) {
            localStorage.setItem("jwt", data.token)
        }
        console.log("login success ", data)
        dispatch({type:LOGIN_SUCCESS, payload: data.token})
        dispatch(getProfileAction(data.token))
    } catch (error) {
        console.log("Login error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        })
        dispatch({type:LOGIN_FAILURE, payload: error})
    }
}

const registerUserAction = (registerData) => async (dispatch) => {

    dispatch({type:REGISTER_REQUEST})
    try {
        console.log("Sending register data:", registerData)
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({type:REGISTER_SUCCESS})
        console.log("register success ", data)
        
    } catch (error) {
        console.log("Register error details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url,
            sentData: registerData
        })
        dispatch({type:REGISTER_FAILURE, payload: error})
    }
}

const getProfileAction = (jwt) => async (dispatch) => {
    dispatch({type:GET_PROFILE_REQUEST})
    try {
        
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })

        console.log("get profile success ", data)
        dispatch({type:GET_PROFILE_SUCCESS, payload: data})
    } catch (error) {
        console.log("Get profile error details:", error)
        dispatch({type:GET_PROFILE_FAILURE, payload: error})
    }
}

const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try {
        
        const {data} = await api.put(`${API_BASE_URL}/api/users`, reqData)

        console.log("update profile success ", data)
        dispatch({type:UPDATE_PROFILE_SUCCESS, payload: data})
    } catch (error) {
        console.log("Update profile error details:", error)
        dispatch({type:UPDATE_PROFILE_FAILURE, payload: error})
    }
}

const searchUser = (query) => async (dispatch) => {
    dispatch({type:SEARCH_USER_REQUEST})
    try {
        
        const {data} = await api.get(
            `${API_BASE_URL}/api/users/search?query=${query}`);

        console.log("search user -----", data)
        dispatch({type:SEARCH_USER_SUCCESS, payload: data})
    } catch (error) {
        console.log("sear user error------", error)
        dispatch({type:SEARCH_USER_FAILURE, payload: error})
    }
}

const logoutUserAction = () => async (dispatch) => {
    dispatch({type:LOGOUT_REQUEST})
    try {
        
        dispatch({type:LOGOUT_SUCCESS})
        console.log("Logout success")
    } catch (error) {
        console.log("Logout error details:", error)
        dispatch({type:LOGOUT_FALTURE, payload: error})
    }
}


export {loginUserAction, registerUserAction, getProfileAction, updateProfileAction, searchUser, logoutUserAction}

