import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
} from "../actions/";

export default (
    state = {
        isLoading: false,
        loginError: false,
        logoutError: false,
        registerError: false,
        isAuthenticated: false,
        error: false,
        user: {}
    },
    action
) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.user
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                loginError: true
            };
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                registerError: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.user
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                logoutError: true
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isLoading: true,
                verifyingError: false
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true
            };
        default:
            return state;
    }
};