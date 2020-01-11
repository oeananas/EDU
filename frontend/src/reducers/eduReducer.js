import { EduTypes } from "../constants/actionTypes";


const eduReducer = (state = {}, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case EduTypes.COURSES:
            return { ...state, authenticated: true, courses: action.payload};
        case EduTypes.USER_COURSES:
            return { ...state, authenticated: true, user_courses: action.payload};
        case EduTypes.COURSE_LESSONS:
            return { ...state, authenticated: true, course_lessons: action.payload};
        case EduTypes.COURSE_TEACHERS:
            return { ...state, authenticated: true, course_teachers: action.payload};
        case EduTypes.COURSE_HOMEWORK:
            return { ...state, authenticated: true, course_homework: action.payload};
        case EduTypes.STUDENT_HOMEWORK:
            return { ...state, authenticated: true, student_homework: action.payload};
        case EduTypes.HOMEWORK:
            return { ...state, authenticated: true, homework: action.payload};
        case EduTypes.PROGRESS:
            return { ...state, authenticated: true, progress: action.payload};
    }
    return state;
};

export default eduReducer