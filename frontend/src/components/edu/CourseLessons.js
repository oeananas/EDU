import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCourseLessons} from "../../actions/eduActions";


class CourseLessons extends Component {

    static propTypes = {
        getCourseLessons: PropTypes.func.isRequired,
        course_lessons: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getCourseLessons();
    };

    renderLessons = () => {
        const course_lessons = this.props.course_lessons;
        if (course_lessons) {
            return (
                <div className="container text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Lesson</th>
                            <th scope="col">Description</th>
                            <th scope="col">Teacher</th>
                            <th scope="col">Start date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {course_lessons.map(item => (
                            <tr key={item.id}>
                                <td><strong>{item.title}</strong></td>
                                <td>{item.description}</td>
                                <td>{item.teacher_first_name} {item.teacher_last_name} [{item.teacher_username}]</td>
                                <td>{item.start_dt}</td>
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
                <h1 className="m-4">Lessons</h1>
                <hr/>
                {this.renderLessons()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        course_lessons: state.edu.course_lessons
    }
};

export default connect(mapStateToProps, { getCourseLessons } )(CourseLessons);