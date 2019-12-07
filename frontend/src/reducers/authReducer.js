import { AuthTypes } from "../constants/actionTypes";

const authReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case AuthTypes.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case AuthTypes.LOGOUT:
            return { ...state, authenticated: false, token: null};
        case AuthTypes.USER_PROFILE:
            return { ...state, user: action.payload};
    }
    return state;
};

export default authReducer