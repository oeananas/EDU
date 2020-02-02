import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { addUserCourse } from "../../actions/eduActions";


class CourseAddButton extends Component {

    static propTypes = {
        addUserCourse: PropTypes.func.isRequired,
        user_courses: PropTypes.array,
    };

    renderButtonForTeacher = () => <button className="disabled btn btn-outline-danger mr-2">Not available for teacher</button>
    renderInCoursesButton = () => <button className="disabled btn btn-outline-warning mr-2">Already in my courses</button>
    renderActiveButton = () => <button onClick={() => this.props.addUserCourse(this.props.item.id)} className="btn btn-outline-success mr-2">Add to my courses</button>

    renderAddButton = (item) => {
        const user_courses = this.props.user_courses;
        const isTeacher = localStorage.getItem('is_teacher');
        
        if (user_courses) {
            if (isTeacher === 'true') {
                return this.renderButtonForTeacher()
            } else {
                if (!user_courses.some(element => element.id === item.id)) {
                    return this.renderActiveButton(item)
                } else {
                    return this.renderInCoursesButton()
                }
            }
        }
    };

    render = () => {
        return (
            <div>
                {this.renderAddButton(this.props.item)}
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        user_courses: state.edu.user_courses,
    }
};

export default connect(mapStateToProps, {addUserCourse})(CourseAddButton);
