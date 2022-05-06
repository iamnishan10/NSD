import React from "react";
import Modal from "react-bootstrap/Modal";

import CreateUserForm from "./forms/createUserForm";
import EditUserForm from "./forms/editUserForm";
import ManageUsersProjectForm from "./forms/manageUsersProjectForm";
import CreateQuestionForm from "./forms/createQuestionForm";
//import EditQuestionForm from "./forms/editQuestionForm";

const FormModal = (props) => {
  return (
    <Modal
      show={props.show}
      onExited={props.onExited}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.formType === "NEW_USER" ? <CreateUserForm /> : null}
        {props.formType === "EDIT_USER" ? (
          <EditUserForm userId={props.userId} />
        ) : null}
        {props.formType === "NEW_QUESTION" ? <CreateQuestionForm /> : null}
        {props.formType === "MANAGE_PROJECT_USERS" ? (
          <ManageUsersProjectForm projectId={props.projectId} />
        ) : null}
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
