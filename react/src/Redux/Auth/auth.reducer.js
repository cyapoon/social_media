import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FALTURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionType"
const initialState = {
    jwt: null,
    error: null,
    loading: false,
    user: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case SEARCH_USER_REQUEST:
        case LOGOUT_REQUEST: {
            return { ...state, loading: true, error: null }
        }


        case GET_PROFILE_SUCCESS: {
            return { ...state, user: action.payload, error: null, loading: false }
        }
        case LOGIN_SUCCESS:
            {
            console.log("auth reducer login success", action.payload)
            return { ...state, jwt: action.payload, loading: false, error: null }
        }
        case REGISTER_SUCCESS: {
            return { ...state, loading: false, error: null }
        }
        case UPDATE_PROFILE_SUCCESS: {
            return { ...state, user: action.payload, loading: false, error: null }
        }
        case SEARCH_USER_SUCCESS: {
            return { ...state, searchUser: action.payload, loading: false, error: null }
        }
        case LOGOUT_SUCCESS: {
            return { ...state, jwt: null, user: null, loading: false, error: null }
        }

        case GET_PROFILE_FAILURE:
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
        case UPDATE_PROFILE_FAILURE:
        case SEARCH_USER_FAILURE:
        case LOGOUT_FALTURE:  {
            return { ...state, loading: false, error: action.payload }
        }

        default: {
            return state
        }
    }
}


export { authReducer }