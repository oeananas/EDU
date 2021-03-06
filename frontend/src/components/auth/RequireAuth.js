import React, { Component } from "react";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";


export default (ComposedComponent) => {

    class Authentication extends Component {

        static propTypes = {
            history: PropTypes.object
        };

        componentDidMount = () => {
            this.checkAuthentication(this.props);

        };

        componentDidUpdate = (nextProps) => {
            this.checkAuthentication(nextProps);
        };

        checkAuthentication = (props) => {
            if (!props.authenticated) {
                this.props.history.push("/login");
            }
        };

        render = () => {
            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return { authenticated: state.auth.authenticated }
    };

    return withRouter(connect(mapStateToProps)(Authentication));
}