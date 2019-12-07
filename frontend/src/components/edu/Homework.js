import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getHomework} from "../../actions/eduActions";


class Homework extends Component {

    static propTypes = {
        getHomework: PropTypes.func.isRequired,
        homework: PropTypes.array,
    };

    componentDidMount() {
        this.props.getHomework();
    }

    renderHomework() {
        const homework = this.props.homework;
        if (homework) {
            return (
                <div className="container text-center">
                    {homework.map(item => (
                        <div className="m-4" key={item.id}>
                            <h5 className="card-title m-2"><strong>lesson: {item.lesson_name}</strong> (is done: {item.is_done.toString()})</h5>
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
                <h1 className="m-4">Homework</h1>
                <hr/>
                {this.renderHomework()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        homework: state.edu.homework
    }
}

export default connect(mapStateToProps, { getHomework } )(Homework);