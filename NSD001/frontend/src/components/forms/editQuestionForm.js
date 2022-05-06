import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { withStore } from "@spyna/react-store";

import Alert from "../../components/alert";
import { Button } from "../../components/button";
import Loader from "../../components/loader";

class EditQuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      questionId: Number(this.props.userId),
      question_text: "",
      errorMessage: null,
      successMessage: null,
      isLoading: false,
      url: `/api/questions/${this.props.questionId}`,
    };

    this.state = Object.assign({}, this.initialState);
  }

  componentDidMount() {
    const { url } = this.state;
    this.setState({ isLoading: true });
    axios({
      method: "get",
      url,
    })
      .then((response) => {
        if (response.status === 200) {
          const { question_text } = response.data;
          this.setState({ question_text, isLoading: false });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          successMessage: null,
          isLoading: false,
        });
      });
  }

  resetState() {
    this.setState(this.initialState);
  }


  clearForm() {
    this.form.reset();
  }

  handleQuestionUpdation(e) {
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
      method: "patch",
      data: {
        question_text,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          const { question_text } = response.data;
          this.setState({
            question_text,
            isLoading: false,
            isSubmitting: false,
            successMessage: "Question has been updated",
            errorMessage: null,
          });
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          successMessage: null,
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
    const {
      username,
      isSubmitting,
      errorMessage,
      successMessage,
      isLoading,
      role,
    } = this.state;
    return (
      <div className="container h-75 text-center">
        <div className="row h-100 justify-content-center align-items-center">
          <form
            className="col-6"
            name="edit_question"
            ref={(el) => (this.form = el)}
          >
            {isLoading ? <Loader /> : null}
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
            {!isLoading ? (
              <div>
                <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="question_text"
                    placeholder="Question Text"
                    value={question_text}
                    autoFocus={true}
                    required={true}
                    disabled={true}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <Button
                      size="lg"
                      type="primary"
                      disabled={isSubmitting ? true : false}
                      onClick={(e) => this.handleQuestionUpdation(e)}
                      isSubmitting={isSubmitting}
                      text="Update"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    );
  }
}

export default withStore(withRouter(EditQuestionForm));
