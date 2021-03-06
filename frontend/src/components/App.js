import React, {Component} from "react";
import Header from "./landing/Header";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./landing/Landing";
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
import NoMatch from "./landing/NoMatch";
import CourseLessons from "./edu/CourseLessons";
import CourseTeachers from "./edu/CourseTeachers";
import CourseHomework from "./edu/CourseHomework";
import StudentHomework from "./edu/StudentHomework";
import Solution from "./edu/Solution";
import Progress from "./edu/Progress";


export default class App extends Component {
    render = () => {
        return (
            <div>
                <Header />
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
                    <Route path="/course-my-homework" component={RequireAuth(CourseHomework)}/>
                    <Route path="/student-homework" component={RequireAuth(StudentHomework)}/>
                    <Route path="/my-homework" component={RequireAuth(Solution)}/>
                    <Route path="/progress" component={RequireAuth(Progress)}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        );
    }
}