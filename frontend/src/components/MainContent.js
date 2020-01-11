import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import SignupDone from "./auth/SignupDone";
import AccountActivation from "./auth/AccountActivation";
import UserProfile from "./auth/UserProfile";
import UserProfileEdit from "./auth/UserProfileEdit";
import PasswordChange from "./auth/PasswordChange";
import PasswordReset from "./auth/PasswordReset";
import PasswordResetDone from "./auth/PasswordResetDone";
import PasswordResetConfirm from "./auth/PasswordResetConfirm";
import UserCourses from "./edu/UserCourses";
import NoMatch from "./NoMatch";
import CourseLessons from "./edu/CourseLessons";
import CourseTeachers from "./edu/CourseTeachers";
import Homework from "./edu/Homework";
import Solution from "./edu/Solution";
import Progress from "./edu/Progress";


const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/account/confirm-email/:key" component={AccountActivation}/>
            <Route path="/signup_done" component={SignupDone}/>
            <Route path="/reset_password" component={PasswordReset}/>
            <Route path="/reset_password_done" component={PasswordResetDone}/>
            <Route path="/reset/:uid/:token/" component={PasswordResetConfirm}/>
            <Route path="/profile" component={RequireAuth(UserProfile)}/>
            <Route path="/profile_edit" component={RequireAuth(UserProfileEdit)}/>
            <Route path="/change_password" component={RequireAuth(PasswordChange)}/>
            <Route path="/my-courses" component={RequireAuth(UserCourses)}/>
            <Route path="/course-lessons" component={RequireAuth(CourseLessons)}/>
            <Route path="/course-teachers" component={RequireAuth(CourseTeachers)}/>
            <Route path="/course-my-homework" component={RequireAuth(Homework)}/>
            <Route path="/my-homework" component={RequireAuth(Solution)}/>
            <Route path="/progress" component={RequireAuth(Progress)}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
