import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getProgress} from "../../actions/eduActions";


class Progress extends Component {

    static propTypes = {
        getProgress: PropTypes.func.isRequired,
        progress: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getProgress();
    };

    renderProgress = () => {
        const progress = this.props.progress;
        if (progress) {
            return (
                <div className="container text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Student username</th>
                            <th scope="col">Student first name</th>
                            <th scope="col">Student last name</th>
                            <th scope="col">Student email</th>
                            <th scope="col">Done homework</th>
                            <th scope="col">Ready Homework</th>
                            <th scope="col">All Homework</th>
                        </tr>
                        </thead>
                        <tbody>
                        {progress.map(item => (
                            <tr key={item.id}>
                                <td>{item.username}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.done_homework}</td>
                                <td>{item.ready_homework}</td>
                                <td>{item.all_homework}</td>
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
                <h1 className="m-4">Progress</h1>
                <hr/>
                {this.renderProgress()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        progress: state.edu.progress
    }
};

export default connect(mapStateToProps, { getProgress } )(Progress);