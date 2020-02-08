import React, { Component } from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CourseAddButton from "./CourseAddButton"
import { getCourses, getUserCourses } from "../../actions/eduActions";


class Landing extends Component {

    static propTypes = {
        authenticated: PropTypes.bool,
        getUserCourses: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        courses: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getUserCourses();
        this.props.getCourses();
    };

    renderCourses = () => {
        const courses = this.props.courses;
        return (
            courses ?
            <div className="container">
                    {courses.map(item => (
                        <div className="card-transparent m-4" key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title"><strong>{item.title}</strong> ({item.price} $)</h5>
                                <p>{item.description}</p>
                                <CourseAddButton item={item}/>
                            </div>
                        </div>
                    ))}
            </div>
            : null
        );
    };

    renderLanding = () => {
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
                    <div>
                        <h1>Welcome to the main page!</h1>
                        <p>please, logout and sign in again</p>
                    </div>

                );
            }
        } else {
            return (
                <h1>You need to Log In or Sign Up</h1>
            );
        }
    };

    render = () => {
        return (
            <div className="text-center">
                {this.renderLanding()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        courses: state.edu.courses,
    }
};

export default connect(mapStateToProps, { getUserCourses, getCourses } )(Landing);