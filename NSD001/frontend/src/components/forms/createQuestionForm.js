import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { withStore } from "@spyna/react-store";

import Alert from "../../components/alert";
import { Button } from "../../components/button";

class CreateQuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      name: "",
      errorMessage: "",
      successMessage: "",
      isSubmitting: false,
    };

    this.state = Object.assign({}, this.initialState);
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleQuestionTextChange(e) {
    this.setState({ q_text: e.target.value });
  }

  handleQuestionCreation(e) {
    e.preventDefault();

    this.setState({ isSubmitting: true });

    const { q_text } = this.state;

    if (!q_text || q_text === "") {
      this.setState({
        isSubmitting: false,
        errorMessage: "Please enter a valid question text!",
        successMessage: null,
      });
      return;
    }

    axios({
      method: "post",
      url: "/api/questions/create",
      data: {
        q_text,
      },
    })
      .then((response) => {
        this.resetState();
        this.form.reset();
        if (response.status === 201) {
          this.setState({ successMessage: response.data.message });
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          errorMessage: error.response.data.message,
          successMessage: "",
          isSubmitting: false,
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
    const { isSubmitting, errorMessage, successMessage } = this.state;
    return (
      <div className="container h-75 text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <form
            className="col-6"
            name="new_question"
            ref={(el) => (this.form = el)}
          >
            {errorMessage ? (
              <Alert type="danger" message={errorMessage} />
            ) : null}
            {successMessage ? (
              <Alert type="success" message={successMessage} />
            ) : null}
            <div className="form-group text-left">
              <input
                type="text"
                className="form-control"
                id="question_text"
                placeholder="Question Text"
                autoFocus={true}
                required={true}
                onChange={(e) => this.handleQuestionTextChange(e)}
              />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <Button
                  size="lg"
                  type="primary"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => this.handleQuestionCreation(e)}
                  isSubmitting={isSubmitting}
                  text="Save"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStore(withRouter(CreateQuestionForm));
