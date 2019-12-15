import axios from "axios";

import {EduTypes} from "../constants/actionTypes";
import {EduUrls} from "../constants/urls";
import store from "../store";
import {getUserToken} from "../utils/authUtils";
import history from "../utils/historyUtils";

function setCourses(payload) {
    return {
        type: EduTypes.COURSES,
        payload: payload
    };
}

export function getCourses() {
    return function(dispatch) {
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
}

function setUserCourses(payload) {
    return {
        type: EduTypes.USER_COURSES,
        payload: payload
    };
}

export function getUserCourses() {
    return function(dispatch) {
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
}

export function addUserCourse(formValues, dispatch, props) {
    return function(dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            return axios.patch( `${EduUrls.ADD_COURSE}${formValues}/`, {}, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                // redirect to the route '/my-courses'
                history.push("/my-courses");
            }).catch((error) => {
                console.log(error);
            });
        }
    };
}

export function removeUserCourse(formValues, dispatch, props) {
    return function(dispatch) {
        const token = getUserToken(store.getState());
        if (token) {
            return axios.patch( `${EduUrls.REMOVE_COURSE}${formValues}/`, {}, {
                headers: {
                    Authorization: 'JWT ' + token
                }
            }).then(response => {
                // redirect to the route '/'
                history.push("/");
            }).catch((error) => {
                console.log(error);
            });
        }
    };
}

function setCourseLessons(payload) {
    return {
        type: EduTypes.COURSE_LESSONS,
        payload: payload
    };
}

export function getCourseLessons() {
    return function(dispatch) {
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
}


function setCourseTeachers(payload) {
    return {
        type: EduTypes.COURSE_TEACHERS,
        payload: payload
    };
}

export function getCourseTeachers() {
    return function(dispatch) {
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
}

function setHomeworks(payload) {
    return {
        type: EduTypes.HOMEWORKS,
        payload: payload
    };
}

export function getHomeworks() {
    return function(dispatch) {
        const token = getUserToken(store.getState());
        const course_pk = localStorage.getItem("course");
        if (token) {
            axios.get(`${EduUrls.HOMEWORKS}${course_pk}/`, {
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
}


function setHomework(payload) {
    return {
        type: EduTypes.HOMEWORK,
        payload: payload
    };
}


export function getHomework() {
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
}


export function sendHomework(formValues, dispatch, props) {
    const token = getUserToken(store.getState());
    const homework_pk = localStorage.getItem("homework");
    return axios.patch(`${EduUrls.HOMEWORK}${homework_pk}/`, formValues, {
        headers: {
            Authorization: 'JWT ' + token
        }
    })
        .then(response => {
            dispatch(setHomework(response.data));
            history.push('/my-homeworks');
        }).catch((error) => {
            // If request is bad...
            // Show an error to the user
            console.log(error);
        });
}