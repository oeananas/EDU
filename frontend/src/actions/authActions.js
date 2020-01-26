import axios from "axios";
import { SubmissionError } from 'redux-form';
import history from "../utils/historyUtils";

import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";


export const authLogin = (token) => ({type: AuthTypes.LOGIN, payload: token});

export const authTeacher = (isTeacher) => ({type: AuthTypes.IS_TEACHER, payload: isTeacher})

export const loginUser = async (formValues, dispatch) => {
    const loginUrl = AuthUrls.LOGIN;
    const isTeacherUrl = AuthUrls.IS_TEACHER;

    try {
        const response = await axios.post(loginUrl, formValues);
        // If request is good...
        // Update state to indicate user is authenticated
        const token = response.data.token;
        dispatch(authLogin(token));
        localStorage.setItem("token", token);
        const response_1 = await axios.post(isTeacherUrl, formValues);
        const isTeacher = response_1.data.is_teacher;
        localStorage.setItem('is_teacher', isTeacher);
        dispatch(authTeacher(isTeacher));
        // redirect to the route '/'
        history.push("/");
        window.location.reload();
    }
    catch (error) {
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_teacher");
    return {
        type: AuthTypes.LOGOUT
    };
};


export const signupUser = async (formValues) => {
    const signupUrl = AuthUrls.SIGNUP;

    try {
        await axios.post(signupUrl, formValues);
        history.push("/signup_done");
    }
    catch (error) {
        // If request is bad...
        // Show an error to the user
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


const setUserProfile = (payload) => ({type: AuthTypes.USER_PROFILE, payload: payload});

export const getUserProfile = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(AuthUrls.USER_PROFILE, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then((response) => {
                const user = response.data;
                dispatch(setUserProfile(user));
            }).catch(error => console.log(error));
        }
    };
};


export const changePassword = async (formValues) => {
    const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;
    const token = getUserToken(store.getState());

    if (token) {
        try {
            await axios.post(changePasswordUrl, formValues, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            });
            history.push("/profile");
        }
        catch (error) {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        }
    }
};


export const resetPassword = async (formValues) => {
    const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

    try {
        await axios.post(resetPasswordUrl, formValues);
        // redirect to reset done page
        history.push("/reset_password_done");
    }
    catch (error) {
        // If request is bad...
        // Show an error to the user
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


export const confirmPasswordChange = async (formValues, dispatch, props) => {
    const { uid, token } = props.match.params;
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const data = Object.assign(formValues, { uid, token });

    try {
        await axios.post(resetPasswordConfirmUrl, data);
        history.push("/login");
    }
    catch (error) {
        // If request is bad...
        // Show an error to the user
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


export const activateUserAccount = async (formValues, dispatch, props) => {
    const { key } = props.match.params;
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const data = Object.assign(formValues, { key });

    try {
        await axios.post(activateUserUrl, data);
        history.push("/login");
    }
    catch (error) {
        // If request is bad...
        // Show an error to the user
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


export const updateUserProfile = async (formValues) => {
    const token = getUserToken(store.getState());

    try {
        await axios.patch(AuthUrls.USER_PROFILE, formValues, {
            headers: {
                Authorization: 'JWT ' + token
            }
        });
        history.push("/profile");
    }
    catch (error) {
        // If request is bad...
        // Show an error to the user
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    }
};


// util functions
const processServerError = (error) => {
    return  Object.keys(error).reduce((newDict, key) => {
        if (key === "non_field_errors") {
            newDict["_error"].push(error[key]);
        } else if (key === "token") {
            // token sent with request is invalid
            newDict["_error"].push("The link is not valid any more.");
        } else {
            newDict[key] = error[key];
        }

        return newDict
    }, {"_error": []});
};