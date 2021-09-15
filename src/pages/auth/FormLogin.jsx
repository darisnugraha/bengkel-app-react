import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { ReanderField } from "../../components/helpers/field";
import ValidasiLogin from "../../12/ValidasiLogin";
class FormLogin extends Component {
  state = {};
  render() {
    return (
      <form
        className="margin-bottom-0"
        onSubmit={this.props.handleSubmit}
        autoComplete="off"
      >
        <div className="form-group m-b-15">
          {/* <input type="text" className="form-control form-control-lg" placeholder="Email Address" required /> */}
          <Field
            name="user_id"
            component={ReanderField}
            type="text"
            label="Username"
            placeholder="Masukan Username"
          />
        </div>
        <div className="form-group m-b-15">
          <Field
            name="password"
            component={ReanderField}
            type="password"
            label="Password"
            placeholder="Masukan Password"
          />
          {/* <input type="password" className="form-control form-control-lg" placeholder="Password" required /> */}
        </div>

        <div className="login-buttons">
          <button type="submit" className="btn btn-success btn-block btn-lg">
            {this.props.isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> &nbsp; Sedang Login
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>

        <hr />
        <p className="text-center text-grey-darker">
          &copy; Bengkel App All Right Reserved {new Date().getFullYear()}
        </p>
      </form>
    );
  }
}

// export default FormLogin;
FormLogin = reduxForm({
  form: "FormLogin",
  enableReinitialize: true,
  validate: ValidasiLogin,
})(FormLogin);
export default connect()(FormLogin);
