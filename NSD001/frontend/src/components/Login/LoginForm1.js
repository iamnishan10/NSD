import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { withStore } from "@spyna/react-store";

import Alert from "../../components/alert";
import { Button } from "../../components/button";

import { setAuthorizationToken } from "../../utils";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: "",
      password: "",
      isSigningIn: false,
      errorMessage: "",
      successMessage: "",
    };

    this.state = Object.assign({}, this.initialState);
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  // TODO: Make the backend not require authorization in user create
  handleRegister(e) {
    e.preventDefault();

    const { username, password } = this.state;

    if (!username || username === "") {
      this.setState({
        errorMessage: "Please enter a valid username!",
        successMessage: "",
      });
      return;
    }

    if (!password || password === "") {
      this.setState({
        errorMessage: "Please enter a valid password!",
        successMessage: "",
      });
      return;
    }

    axios({
      method: "post",
      url: "/api/users",
      data: {
        username,
        password,
        role: "2",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          this.setState({ successMessage: response.data.message });
          this.handleLoggingIn(e);
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          successMessage: "",
          isSubmitting: false,
        });
      });
  }

  handleLoggingIn(e) {
    e.preventDefault();
    this.setState({ isSigningIn: true });

    const { username, password } = this.state;
    const { history } = this.props;

    axios({
      method: "post",
      url: "/auth/login",
      data: {
        username,
        password,
      },
    })
      .then((response) => {
        this.resetState();
        this.setState({
          successMessage: "Logging you in...",
        });

        const { access_token, username, is_admin } = response.data;

        localStorage.setItem("access_token", access_token);

        setAuthorizationToken(access_token);

        this.props.store.set("username", username);
        this.props.store.set("isAdmin", is_admin);
        this.props.store.set("isUserLoggedIn", true);

        is_admin ? history.push("/question") : history.push("userprofile");
      })
      .catch((error) => {
        this.setState({
          isSigningIn: false,
          successMessage: "",
          errorMessage: error.response.data.message,
        });
      });
  }

  handleAlertDismiss(e) {
    e.preventDefault();
    this.setState({
      successMessage: "",
      errorMessage: "",
    });
  }

  render() {
    const { isSigningIn, successMessage, errorMessage } = this.state;
    return (
      <form className="col-4" name="login">
        {errorMessage ? (
          <Alert
            type="danger"
            message={errorMessage}
            onClose={(e) => this.handleAlertDismiss(e)}
          />
        ) : null}
        {successMessage ? (
          <Alert
            type="success"
            message={successMessage}
            onClose={(e) => this.handleAlertDismiss(e)}
          />
        ) : null}
        <h1 className="h3 mb-3 font-weight-normal">Sign in</h1>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            autoFocus={true}
            required={true}
            onChange={(e) => this.handleUsernameChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required={true}
            onChange={(e) => this.handlePasswordChange(e)}
          />
        </div>
        <div className="form-group">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <Button
                  size="lg"
                  type="primary"
                  disabled={isSigningIn ? true : false}
                  onClick={(e) => this.handleLoggingIn(e)}
                  isSubmitting={isSigningIn}
                  text="Login"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withStore(withRouter(LoginForm));
