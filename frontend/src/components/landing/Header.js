import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HeaderLinks from "./HeaderLinks"

class Header extends Component {

    static propTypes = {
        authenticated: PropTypes.bool,
        isTeacher: PropTypes.string
    };

    render = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">EDU</Link>
                <HeaderLinks />
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        isTeacher: state.auth.isTeacher
    }
};

export default connect(mapStateToProps)(Header);