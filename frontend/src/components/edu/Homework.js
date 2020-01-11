import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getHomeworks} from "../../actions/eduActions";
import { Link } from "react-router-dom";


class Homework extends Component {

    static propTypes = {
        getHomeworks: PropTypes.func.isRequired,
        course_homework: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getHomeworks();
    };

    renderHomeworks = () => {
        const course_homework = this.props.course_homework;
        if (course_homework) {
            return (
                <div className="container text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Lesson</th>
                            <th scope="col">Is Done</th>
                            <th scope="col">Is Ready</th>
                            <th scope="col">Solution</th>
                        </tr>
                        </thead>
                        <tbody>
                        {course_homework.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.lesson_name}</th>
                                <td>{item.is_done.toString()}</td>
                                <td>{item.is_ready.toString()}</td>
                                <td><Link onClick={() => {
                                    localStorage.setItem("homework", item.id);
                                    localStorage.setItem("solution", item.solution)
                                }} className='btn btn-sm btn-outline-secondary' to='/my-homework'>Edit</Link></td>
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
                <h1 className="m-4">Homework</h1>
                {this.renderHomeworks()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        course_homework: state.edu.course_homework
    }
};

export default connect(mapStateToProps, {getHomeworks})(Homework);