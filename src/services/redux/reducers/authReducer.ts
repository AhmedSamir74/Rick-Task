import {
    LOGIN,
    AUTHENTICATE,
    LOGOUT,
    VERIFY_USER,
    UPDATE_USER_DATA,
    SET_USER_DATA,
} from '../../../constants';
import { IAction } from '../../../models';

const initialState = {
    token: null,
    userId: null,
    email: null,
    userData: null,
    updatedUserData: null,
};

export const authReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case LOGOUT:
            return initialState;
        case AUTHENTICATE:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
                userId: action.payload.userId,
                updatedUserData: action.payload.updatedUserData,
            };
        case UPDATE_USER_DATA:
            return {
                ...state,
                email: action.payload.email,
                updatedUserData: action.payload.data,
            };
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
            };
        case VERIFY_USER:
            return {
                ...state,
                email: action.payload.email,
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};
