import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Loader from "../components/loader";
import { useReactMediaRecorder } from "react-media-recorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const Record = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });
  const [sendRecording, setSendRecording] = useState(false);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [questions, setQuestions] = useState({
    question: "What is your Name?",
  });
  const [questionCounter, setQuestionCounter] = useState(0);

  const statusColor = { idle: "yellow", recording: "red", stopped: "green" };

  useEffect(() => {
    setIsQuestionLoading(true);
    axios({
      method: "get",
      url: "/api/questions",
    })
      .then((res) => {
        setIsQuestionLoading(false);
        setQuestions(res.data);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.response.data.message,
          isUserProfileLoading: false,
        });
      });
  }, []);

  const onPrevHandler = () => {
  if (mediaBlobUrl == null) return;
    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((res) => {
        let data = new FormData();
        data.append("file", res);
        data.append("question_id", questions[questionCounter].id);
        let config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };

        if (sendRecording) {
          axios
            .post("/api/uploads", data, config)
            .then((response) => {
              if (questionCounter !== 0) {
                setSendRecording(false);
                setQuestionCounter(questionCounter - 1);
              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      });
    };

  const onNextHandler = () => {
    if (mediaBlobUrl == null) return;
    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((res) => {
        let data = new FormData();
        data.append("file", res);
        data.append("question_id", questions[questionCounter].id);
        let config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };

        if (sendRecording) {
          axios
            .post("/api/uploads", data, config)
            .then((response) => {
              if (questionCounter !== questions.length - 1) {
                setSendRecording(false);
                setQuestionCounter(questionCounter + 1);
              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      });
    };

  const onFinalSubmitHandler = () => {
    if (mediaBlobUrl == null) return;
    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((res) => {
        let data = new FormData();
        data.append("file", res);
        data.append("question_id", questions[questionCounter].id);
        let config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };

        if (sendRecording) {
          axios
            .post("/api/uploads", data, config)
            .then((response) => {
              if (questionCounter !== questions.length - 1) {
                setSendRecording(false);
                setQuestionCounter(questionCounter + 1);
              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Record</title>
      </Helmet>
      <div className="container h-100">
        <div className="h-100 mt-5">
          <div className="row border-bottom my-3">
            <div className="col float-left">
              <h1>Record Audio</h1>
            </div>
            <hr />
            {!isQuestionLoading && questions.length ? (
              <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                  <div className="col-md-12 border px-5">
                    <div className="p-3 py-5">
                      <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-12">
                          <h1>
                            {questions[questionCounter].id +
                              ": " +
                              questions[questionCounter].question_text}
                          </h1>
                        </div>
                        <div className="col-md-1">
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{ color: statusColor[status] }}
                          />
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn-primary profile-button"
                            type="button"
                            onClick={onPrevHandler}
                            disabled={questionCounter === 0}
                          >
                            Previous
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn-primary profile-button"
                            type="button"
                            onClick={startRecording}
                          >
                            Start Recording
                          </button>
                        </div>
                        <div className="col-md-2">
                          <button
                            className="btn btn-primary profile-button"
                            type="button"
                            onClick={() => {
                              stopRecording();
                              setSendRecording(true);
                            }}
                          >
                            Stop Recording
                          </button>
                        </div>
                        <div className="col-md-3">
                          <audio
                            style={{ width: "100%" }}
                            src={mediaBlobUrl}
                            controls
                          />
                        </div>
                        <div className="col-md-1">
                          <button
                            className="btn btn-primary profile-button"
                            type="button"
                            onClick={onNextHandler}
                            disabled={questionCounter === questions.length-1}
                          >
                            Next
                          </button>
                        </div>
                        <div className="col-md-1">
                          <button
                            className="btn btn-primary profile-button"
                            type="button"
                            onClick={onFinalSubmitHandler}
                            disabled={questionCounter !== questions.length-1}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="row my-4 justify-content-center align-items-center">
            {isQuestionLoading ? <Loader /> : null}
            {!isQuestionLoading && questions.length === 0 ? (
              <div className="font-weight-bold">
                No questions exists! To proceed, please create one in admin
                panel.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
