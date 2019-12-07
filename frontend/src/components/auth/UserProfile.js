import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "../../actions/authActions";

class UserProfile extends Component {

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    componentDidMount() {
        this.props.getUserProfile();
    }

    renderUser() {
        const user = this.props.user;
        if (user) {
            return (
                <div className="container">
                    <h1>[{user.username}] Profile</h1>
                    <p><small className="text-muted">Name: {user.first_name} {user.last_name}</small></p>
                    <p><small className="text-muted">Email: {user.email}</small></p>
                </div>
            );
        }
        return null;
    }

    render() {
        return (
            <div className="text-center">
                {this.renderUser()}
                {" "}
                <hr />
                <Link className="btn btn-outline-primary mr-2" to="/profile_edit">Update Profile</Link>
                <Link className="btn btn-outline-warning mr-2" to="/change_password">Change Password</Link>
                <Link className="btn btn-outline-success" to="/my-courses">My courses</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { getUserProfile } )(UserProfile);