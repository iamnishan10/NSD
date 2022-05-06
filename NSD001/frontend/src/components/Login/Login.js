import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router";

export default function Login() {
  return(
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
  )
}