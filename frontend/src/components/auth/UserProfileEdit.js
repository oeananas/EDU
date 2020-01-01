import React, { Component } from "react";
import { reduxForm, Field, propTypes } from "redux-form";
import { connect } from 'react-redux'
import { required } from "redux-form-validators"
import { renderField, renderError} from "../../utils/renderUtils";
import { updateUserProfile } from "../../actions/authActions";


class Login extends Component {

    static propTypes = {
        ...propTypes
    };

    render = () => {
        const { handleSubmit, error } = this.props;

        return (
            <div className="row justify-content-center">

                <form
                    className="col col-sm-4 card mt-5 p-2"
                    onSubmit={handleSubmit}
                >
                    <h4 className="text-md-center">Edit Profile</h4>
                    <hr/>

                    <fieldset className="form-group">
                        <Field name="username" label="Username" component={renderField}
                               type="text" validate={[required({message: "This field is required."})]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="first_name" label="First Name" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="last_name" label="Last Name" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <Field name="email" label="Email" component={renderField}
                               type="text"
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        { renderError(error) }
                        <button type="submit" className="btn btn-primary">Save</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.auth.user
    }
};

export default connect(mapStateToProps)(reduxForm({
    form: "update_user_profile",
    onSubmit: updateUserProfile
})(Login));