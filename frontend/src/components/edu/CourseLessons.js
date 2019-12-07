import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getCourseLessons} from "../../actions/eduActions";


class CourseLessons extends Component {

    static propTypes = {
        getCourseLessons: PropTypes.func.isRequired,
        course_lessons: PropTypes.array,
    };

    componentDidMount() {
        this.props.getCourseLessons();
    }

    renderLessons() {
        const course_lessons = this.props.course_lessons;
        if (course_lessons) {
            return (
                <div className="container text-center">
                    {course_lessons.map(item => (
                        <div className="card m-4" key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title m-2"><strong>{item.title}</strong></h5>
                                <p>{item.description}</p>
                                <p>Teacher: {item.teacher_name}</p>
                                <p>Start: {item.start_dt}</p>
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
                <h1 className="m-4">Lessons</h1>
                <hr/>
                {this.renderLessons()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        course_lessons: state.edu.course_lessons
    }
}

export default connect(mapStateToProps, { getCourseLessons } )(CourseLessons);