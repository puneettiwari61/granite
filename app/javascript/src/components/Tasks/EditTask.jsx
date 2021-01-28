import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "../Container";
import TaskForm from "./Form/TaskForm";
import tasksApi from "../../apis/task";
import PageLoader from "../PageLoader";
import Toastr from "../Common/Toastr";
import Logger from "js-logger";

const EditTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.update({
        id,
        payload: { task: { title } },
      });
      setLoading(false);
      //   Toastr.success("Successfully updated task.");
      history.push("/dashboard");
    } catch (error) {
      setLoading(false);
      Logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      Logger.info(response, id, "response");
      setTitle(response.data.task.title);
      setUserId(response.data.task.user_id);
    } catch (error) {
      Logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <TaskForm
        type="update"
        title={title}
        userId={userId}
        setTitle={setTitle}
        setUserId={setUserId}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditTask;
