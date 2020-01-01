import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Logout extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    componentDidMount = () => {
        this.props.logoutUser();
    };

    render = () => {
        return (
            <h2 className="text-center">See you soon...</h2>
        );
    }
}

export default connect(null, { logoutUser })(Logout);