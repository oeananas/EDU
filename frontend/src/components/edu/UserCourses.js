import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {getUserCourses, removeUserCourse} from "../../actions/eduActions";


class UserCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pk: null,
        };
    }


    static propTypes = {
        getUserCourses: PropTypes.func.isRequired,
        user_courses: PropTypes.array,
        removeUserCourse: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getUserCourses();
    }

    renderCourses() {
        const courses = this.props.user_courses;
        if (courses) {
            return (
                <div className="container text-center">
                    {courses.map(item => (
                        <div className="m-4" key={item.id}>
                            <div className="row">
                                <div className="col-3">
                                    <h5><strong>{item.title}</strong></h5>
                                </div>
                                <div className="col-5">
                                    <Link onClick={() => localStorage.setItem("course", item.id)} className="btn btn-outline-primary mr-2" to='/course-lessons'>Lessons</Link>
                                    <Link onClick={() => localStorage.setItem("course", item.id)} className="btn btn-outline-success mr-2" to="/course-teachers">Teachers</Link>
                                    <Link onClick={() => localStorage.setItem("course", item.id)} className="btn btn-outline-warning mr-2" to="/my-homework">My homework</Link>
                                </div>
                                <div className="col-4">
                                    <button onClick={this.props.removeUserCourse.bind(this, item.id)} className="btn btn-outline-danger mr-2">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <h1 className="m-4">My courses</h1>
                <hr/>
                {this.renderCourses()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_courses: state.edu.user_courses
    }
}

export default connect(mapStateToProps, { getUserCourses, removeUserCourse } )(UserCourses);