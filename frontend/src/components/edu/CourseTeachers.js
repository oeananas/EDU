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
                    {course_teachers.map(item => (
                        <div className="m-4" key={item.id}>
                            <div className="row">
                                <div className="col-4">
                                    <h5><strong>{item.name} ({item.age} years)</strong></h5>
                                </div>
                                <div className="col-8">
                                    <p>{item.skill_info}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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