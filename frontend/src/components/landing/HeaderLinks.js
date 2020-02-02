import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class HeaderLinks extends Component {

    static propTypes = {
        authenticated: PropTypes.bool,
        isTeacher: PropTypes.string
    };

    renderUserLinks = () => {
        return (
            this.props.isTeacher === 'true' ?
            [
                <li className="nav-item" key="profile">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>,
                <li className="nav-item" key="progress">
                    <Link className="nav-link" to="/progress">Progress</Link>
                </li>,
                <li className="nav-item" key="logout">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            ]
            :
            [
                <li className="nav-item" key="profile">
                    <Link className="nav-link" to="/profile">Profile</Link>
                </li>,
                <li className="nav-item" key="mycourses">
                    <Link className="nav-link" to="/my-courses">My courses</Link>
                </li>,
                <li className="nav-item" key="logout">
                    <Link className="nav-link" to="/logout">Logout</Link>
                </li>
            ]
        )
    }

    renderLinks = () => {
        return (
            this.props.authenticated ? this.renderUserLinks() :
            [
                <li className="nav-item" key="login">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>,
                <li className="nav-item" key="signup">
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ]
        );
    };

    render = () => {
        return (
            <ul className="navbar-nav">
                {this.renderLinks()}
            </ul>
        )
    }

    
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        isTeacher: state.auth.isTeacher
    }
};

export default connect(mapStateToProps)(HeaderLinks);
