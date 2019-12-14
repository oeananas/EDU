import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { getCourses, getUserCourses, addUserCourse } from "../actions/eduActions";

class Landing extends Component {

    static propTypes = {
        authenticated: PropTypes.bool,
        getUserCourses: PropTypes.func.isRequired,
        user_courses: PropTypes.array,
        getCourses: PropTypes.func.isRequired,
        courses: PropTypes.array,
        addUserCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getUserCourses();
        this.props.getCourses();
    }


    renderAddButton(item) {
        const user_courses = this.props.user_courses;
        if (user_courses) {
            if (!user_courses.some(element => element.id === item.id)) {
                return (
                    <button onClick={this.props.addUserCourse.bind(this, item.id)} className="btn btn-outline-success mr-2">Add to my courses</button>
                )
            } else {
                return (
                    <Link to="#" className="disabled btn btn-outline-warning mr-2">Already in my courses</Link>
                )
            }
        }
    }

    renderCourses() {
        const courses = this.props.courses;
        if (courses) {
            return (
                <div className="container">
                        {courses.map(item => (
                            <div className="card m-4" key={item.id}>
                                <div className="card-body">
                                    <h5 className="card-title"><strong>{item.title}</strong> ({item.price} $)</h5>
                                    <p>{item.description}</p>
                                    {this.renderAddButton(item)}
                                </div>
                            </div>
                        ))}
                </div>
            );
        }
        return null;
    }

    renderLanding() {
        if (this.props.authenticated) {
            if (this.props.courses) {
                return (
                    <div>
                        <h1>Welcome to the main page!</h1>
                        {this.renderCourses()}
                    </div>
                );
            } else {
                return (
                    <h1>Welcome to the main page!</h1>
                );
            }


        } else {
            return (
                <h1>You need to Log In or Sign Up</h1>
            );
        }
    }

    render() {
        return (
            <div className="text-center">
                {this.renderLanding()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        user_courses: state.edu.user_courses,
        courses: state.edu.courses,
    }
}

export default connect(mapStateToProps, { getUserCourses, getCourses, addUserCourse } )(Landing);