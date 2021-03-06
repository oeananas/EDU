import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getHomework, sendHomework} from "../../actions/eduActions";
import {Link} from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {renderError, renderTextAreaField } from "../../utils/renderUtils";


class Solution extends Component {

    static propTypes = {
        getHomework: PropTypes.func.isRequired,
        homework: PropTypes.object,
    };

    componentDidMount = () => {
        this.props.getHomework();
    };

    getHomework = () => {
        const { handleSubmit, error } = this.props;
        const homework = this.props.homework;
        if (homework) {
            return (
                <div className="container text-center">
                    <h3>{homework.description}</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="form-group">
                            <Field placeholder="Your solution here..." name="solution" label="" component={renderTextAreaField}
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            { renderError(error) }
                            <Link className='m-2 btn btn-outline-secondary' to='/course-my-homework'>Back</Link>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </fieldset>
                    </form>
                </div>
            );
        }
        return null;
    };

    render = () => {
        return (
            <div>
                <h1 className="m-4">Solution</h1>
                <hr/>
                {this.getHomework()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        homework: state.edu.homework,
        initialValues: {'solution': localStorage.getItem('solution')}
    }
};

export default connect(mapStateToProps, { getHomework } )(reduxForm({
    form: "update_homework",
    onSubmit: sendHomework,
})(Solution));