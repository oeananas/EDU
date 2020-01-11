import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCourseTeachers} from "../../actions/eduActions";


class CourseTeachers extends Component {

    static propTypes = {
        getCourseTeachers: PropTypes.func.isRequired,
        course_teachers: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getCourseTeachers();
    };

    renderTeachers = () => {
        const course_teachers = this.props.course_teachers;
        if (course_teachers) {
            return (
                <div className="container text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Age</th>
                            <th scope="col">Skill Info</th>
                        </tr>
                        </thead>
                        <tbody>
                        {course_teachers.map(item => (
                            <tr key={item.id}>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.age}</td>
                                <td>{item.skill_info}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    };

    render = () => {
        return (
            <div>
                <h1 className="m-4">Teachers</h1>
                <hr/>
                {this.renderTeachers()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        course_teachers: state.edu.course_teachers
    }
};

export default connect(mapStateToProps, { getCourseTeachers } )(CourseTeachers);