const ROOT_URL = "http://localhost:8000/";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}rest-auth/login/`,
    SIGNUP: `${ROOT_URL}rest-auth/registration/`,
    CHANGE_PASSWORD: `${ROOT_URL}rest-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}rest-auth/password/reset/confirm/`,
    USER_ACTIVATION: `${ROOT_URL}rest-auth/registration/verify-email/`,
    USER_PROFILE: `${ROOT_URL}rest-auth/user/`,
    IS_TEACHER: `${ROOT_URL}users/is-teacher/`,
};

export const EduUrls = {
    COURSES: `${ROOT_URL}training/courses/`,
    USER_COURSES: `${ROOT_URL}training/my-courses/`,
    ADD_COURSE: `${ROOT_URL}training/add-course-user/`,
    REMOVE_COURSE: `${ROOT_URL}training/remove-course-user/`,
    COURSE_LESSONS: `${ROOT_URL}training/lessons/course/`,
    COURSE_TEACHERS: `${ROOT_URL}users/teachers/course/`,
    COURSE_HOMEWORK: `${ROOT_URL}training/my-homework/course/`,
    STUDENT_HOMEWORK: `${ROOT_URL}training/homework/student/`,
    HOMEWORK: `${ROOT_URL}training/my-homework/`,
    PROGRESS: `${ROOT_URL}users/progress/`,
    SET_DONE_HOMEWORK: `${ROOT_URL}training/set-done-homework/`,
};