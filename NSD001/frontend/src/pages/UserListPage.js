import React from 'react'

import '../App.css'

import axios from "axios";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import {
  faPlusSquare,
  faEdit,
  faUserPlus,
  faTags,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../components/button";
import Loader from "../components/loader";
import FormModal from "../components/modal";

class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      formType: null,
      modalShow: false,
      isUserLoading: false,
      isProjectLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isUserLoading: true, isProjectLoading: true });

    // TODO: Combine these two api calls
    axios({
      method: "get",
      url: "/api/projects",
    })
      .then((response) => {
        this.setState({
          projects: response.data.projects,
          isProjectLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          isProjectLoading: false,
        });
      });

    axios({
      method: "get",
      url: "/api/users",
    })
      .then((response) => {
        this.setState({ users: response.data.users, isUserLoading: false });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          isUserLoading: false,
        });
      });
  }

  refreshPage() {
    const { history } = this.props;
    history.replace({ pathname: "/empty" });
    setTimeout(() => {
      history.replace({ pathname: "/admin" });
    });
  }

  handleNewProject() {
    this.setModalShow(true);
    this.setState({ formType: "NEW_PROJECT", title: "Create New Project" });
  }

  handleNewUser() {
    this.setModalShow(true);
    this.setState({ formType: "NEW_USER", title: "Create New User" });
  }

  handleEditUser(e, userId) {
    this.setModalShow(true);
    this.setState({ formType: "EDIT_USER", title: "Edit User", userId });
  }

  handleAddLabelsToProject(e, projectId) {
    const { history } = this.props;
    history.push(`/projects/${projectId}/labels`);
  }

  handleAddUsersToProject(e, projectId, projectName) {
    this.setModalShow(true);
    this.setState({
      formType: "MANAGE_PROJECT_USERS",
      title: `Project ${projectName}: Manage User Access`,
      projectId,
    });
  }

  _fake_click(obj) {
    let ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    obj.dispatchEvent(ev);
  }

  _export_raw(name, data) {
    let urlObject = window.URL || window.webkitURL || window;
    let export_blob = new Blob([data]);

    if ("msSaveBlob" in navigator) {
      navigator.msSaveBlob(export_blob, name);
    } else if ("download" in HTMLAnchorElement.prototype) {
      let save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      this._fake_click(save_link);
    } else {
      throw new Error("Neither a[download] nor msSaveBlob is available");
    }
  }

  handleDownloadAnnotations(e, projectName, projectId) {
    axios({
      method: "get",
      url: `/api/projects/${projectId}/annotations`,
    })
      .then((response) => {
        const { annotations } = response.data;
        if (annotations) {
          this._export_raw(
            `${projectName}.json`,
            JSON.stringify(annotations, null, 2)
          );
        } else {
          console.log("No annotations found");
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          isUserLoading: false,
        });
      });
  }

  setModalShow(modalShow) {
    this.setState({ modalShow });
  }

  render() {
    const {
      users,
      title,
      isUserLoading,
      modalShow,
      formType,
      userId,
      projectId,
    } = this.state;

    return (
      <div>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <div className="container h-100">
          <FormModal
            onExited={() => this.refreshPage()}
            formType={formType}
            title={title}
            show={modalShow}
            userId={userId}
            projectId={projectId}
            onHide={() => this.setModalShow(false)}
          />
          <div className="h-100 mt-5">
            <div className="row mt-2">
              <div className="col float-left">
                <h1>Users</h1>
              </div>
              <div className="col float-right">
                <h1 className="text-right">
                  <IconButton
                    icon={faPlusSquare}
                    size="lg"
                    title={"Create new user"}
                    onClick={(e) => this.handleNewUser(e)}
                  />
                </h1>
              </div>
              {!isUserLoading && users.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created On</th>
                      <th scope="col">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className="align-middle">
                            {index + 1}
                          </th>
                          <td className="align-middle">
                            {user["username"]}
                          </td>
                          <td className="align-middle">{user["role"]}</td>
                          <td className="align-middle">{user["created_on"]}</td>
                          <td className="align-middle">
                            <IconButton
                              icon={faEdit}
                              size="sm"
                              title={"Edit user"}
                              onClick={(e) =>
                                this.handleEditUser(e, user["user_id"])
                              }
                            />
                            {/* <IconButton
                              icon={faTrashAlt}
                              size="sm"
                              onClick={(e) =>
                                this.handleDeleteUser(e, user["user_id"])
                              }
                            /> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : null}
            </div>
            <div className="row my-4 justify-content-center align-items-center">
              {isUserLoading ? <Loader /> : null}
              {!isUserLoading && users.length === 0 ? (
                <div className="font-weight-bold">No user exists!</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserListPage);

