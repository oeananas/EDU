import axios from "axios";
import { SubmissionError } from 'redux-form';
import history from "../utils/historyUtils";

import { AuthTypes } from "../constants/actionTypes";
import { AuthUrls } from "../constants/urls";
import store from "../store";
import { getUserToken } from "../utils/authUtils";


export const authLogin = (token) => {
    return {
        type: AuthTypes.LOGIN,
        payload: token
    };
};


export const loginUser = (formValues, dispatch) => {
    const loginUrl = AuthUrls.LOGIN;

    return axios.post(loginUrl, formValues).then((response) => {
        // If request is good...
        // Update state to indicate user is authenticated
        const token = response.data.token;
        dispatch(authLogin(token));

        localStorage.setItem("token", token);

        // redirect to the route '/'
        history.push("/");
    }).catch(error => {
        const processedError = processServerError(error.response.data);
        throw new SubmissionError(processedError);
    });
};


export const logoutUser = () => {
    localStorage.removeItem("token");
    return {
        type: AuthTypes.LOGOUT
    };
};


export const signupUser = (formValues) => {
    const signupUrl = AuthUrls.SIGNUP;

    return axios.post(signupUrl, formValues)
        .then(() => {
            history.push("/signup_done");
        })
        .catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
};


const setUserProfile = (payload) => {
    return {
        type: AuthTypes.USER_PROFILE,
        payload: payload
    };
};


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
            }).catch((error) => {
                console.log(error);
                // TODO: send notification and redirect
            });
        }
    };
};


export const changePassword = (formValues) => {
    const changePasswordUrl = AuthUrls.CHANGE_PASSWORD;
    const token = getUserToken(store.getState());

    if (token) {
        return axios.post(changePasswordUrl, formValues, {
            headers: {
                Authorization: 'JWT ' + token
            }
        })
            .then(() => {
                history.push("/profile");
            })
            .catch((error) => {
                // If request is bad...
                // Show an error to the user
                const processedError = processServerError(error.response.data);
                throw new SubmissionError(processedError);
            });
    }
};


export const resetPassword = (formValues) => {
    const resetPasswordUrl = AuthUrls.RESET_PASSWORD;

    return axios.post(resetPasswordUrl, formValues)
        .then(() => {
            // redirect to reset done page
            history.push("/reset_password_done");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
};


export const confirmPasswordChange = (formValues, dispatch, props) => {
    const { uid, token } = props.match.params;
    const resetPasswordConfirmUrl = AuthUrls.RESET_PASSWORD_CONFIRM;
    const data = Object.assign(formValues, { uid, token });

    return axios.post(resetPasswordConfirmUrl, data)
        .then(() => {
            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
};


export const activateUserAccount = (formValues, dispatch, props) => {
    const { key } = props.match.params;
    const activateUserUrl = AuthUrls.USER_ACTIVATION;
    const data = Object.assign(formValues, { key });

    return axios.post(activateUserUrl, data)
        .then(() => {
            history.push("/login");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
};


export const updateUserProfile = (formValues) => {
    const token = getUserToken(store.getState());

    return axios.patch(AuthUrls.USER_PROFILE, formValues, {
        headers: {
            Authorization: 'JWT ' + token
        }
    })
        .then(() => {
            history.push("/profile");
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            const processedError = processServerError(error.response.data);
            throw new SubmissionError(processedError);
        });
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