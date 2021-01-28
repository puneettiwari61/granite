import React, { useState } from "react";
import Container from "../Container";
import TaskForm from "./Form/TaskForm";
import tasksApi from "../../apis/task";
import Logger from "js-logger";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await tasksApi.create({ task: { title } });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default CreateTask;
