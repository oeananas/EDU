import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getStudentHomeworks} from "../../actions/eduActions";
import { setDoneHomework } from "../../actions/eduActions";


class StudentHomework extends Component {

    static propTypes = {
        getStudentHomeworks: PropTypes.func.isRequired,
        setDoneHomework: PropTypes.func.isRequired,
        student_homework: PropTypes.array,
    };

    componentDidMount = () => {
        this.props.getStudentHomeworks();
    };

    renderButton = (item) => {
        if (item.is_done.toString() !== 'true') {
            return (
                <button onClick={this.props.setDoneHomework.bind(this, item.id)} className="btn btn-outline-success">Set Done</button>
            )
        } else {
            return (
                <button disabled className="btn btn-outline-warning">Done</button>
            )
        }
    }


    renderStudentHomeworks = () => {
        const student_homework = this.props.student_homework;
        if (student_homework) {
            return (
                <div className="container text-center">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Lesson</th>
                            <th scope="col">Solution</th>
                            <th scope="col">Is Done</th>
                            <th scope="col">Apply Solution</th>
                        </tr>
                        </thead>
                        <tbody>
                        {student_homework.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.lesson_name}</th>
                                <td>{item.solution}</td>
                                <td>{item.is_done.toString()}</td>
                                <td>{this.renderButton(item)}</td>
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
                {this.renderStudentHomeworks()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        student_homework: state.edu.student_homework
    }
};

export default connect(mapStateToProps, {getStudentHomeworks, setDoneHomework})(StudentHomework);