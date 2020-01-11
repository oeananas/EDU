import axios from "axios";

import {EduTypes} from "../constants/actionTypes";
import {EduUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import history from "../utils/historyUtils";


const setCourses = (payload) => {
    return {
        type: EduTypes.COURSES,
        payload: payload
    };
};


export const getCourses = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(EduUrls.COURSES, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setCourses(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


const setUserCourses = (payload) => {
    return {
        type: EduTypes.USER_COURSES,
        payload: payload
    };
};


export const getUserCourses = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(EduUrls.USER_COURSES, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setUserCourses(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


export const addUserCourse = (formValues) => {
    return () => {
        const token = getUserToken(store.getState());
        if (token) {
            return axios.patch( `${EduUrls.ADD_COURSE}${formValues}/`, {}, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(() => {
                // redirect to the route '/my-courses'
                history.push("/my-courses");
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


export const removeUserCourse = (formValues) => {
    return () => {
        const token = getUserToken(store.getState());
        if (token) {
            return axios.patch( `${EduUrls.REMOVE_COURSE}${formValues}/`, {}, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(() => {
                // redirect to the route '/'
                history.push("/");
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


const setCourseLessons = (payload) => {
    return {
        type: EduTypes.COURSE_LESSONS,
        payload: payload
    };
};


export const getCourseLessons = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        const course_pk = localStorage.getItem("course");
        if (token) {
            axios.get(`${EduUrls.COURSE_LESSONS}${course_pk}/`, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setCourseLessons(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


const setCourseTeachers = (payload) => {
    return {
        type: EduTypes.COURSE_TEACHERS,
        payload: payload
    };
};


export const getCourseTeachers = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        const course_pk = localStorage.getItem("course");
        if (token) {
            axios.get(`${EduUrls.COURSE_TEACHERS}${course_pk}/`, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setCourseTeachers(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


const setHomeworks = (payload) => {
    return {
        type: EduTypes.COURSE_HOMEWORK,
        payload: payload
    };
};


export const getHomeworks = () => {
    return (dispatch) => {
        const token = getUserToken(store.getState());
        const course_pk = localStorage.getItem("course");
        if (token) {
            axios.get(`${EduUrls.COURSE_HOMEWORK}${course_pk}/`, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setHomeworks(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


const setHomework = (payload) => {
    return {
        type: EduTypes.HOMEWORK,
        payload: payload
    };
};


export const getHomework = () => {
    return function(dispatch) {
        const token = getUserToken(store.getState());
        const homework_pk = localStorage.getItem("homework");
        if (token) {
            axios.get(`${EduUrls.HOMEWORK}${homework_pk}/`, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setHomework(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};


export const sendHomework = (formValues, dispatch) => {
    const token = getUserToken(store.getState());
    const homework_pk = localStorage.getItem("homework");
    return axios.patch(`${EduUrls.HOMEWORK}${homework_pk}/`, formValues, {
        headers: {
            Authorization: 'JWT ' + token
        }
    })
        .then(response => {
            dispatch(setHomework(response.data));
            history.push('/course-my-homework');
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            console.log(error);
        });
};


const setProgress = (payload) => {
    return {
        type: EduTypes.PROGRESS,
        payload: payload
    };
};


export const getProgress = () => {
    return function(dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            axios.get(`${EduUrls.PROGRESS}`, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                dispatch(setProgress(response.data));
            }).catch((error) => {
                console.log(error);
            });
        }
    };
};