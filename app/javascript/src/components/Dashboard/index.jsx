import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import Container from "../Container";
import ListTasks from "../Tasks/ListTasks";
import tasksApi from "../../apis/tasks";
import PageLoader from "../PageLoader";
import Logger from "js-logger";
import Table from "../Tasks/Table";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await tasksApi.list();
      const { pending, completed } = response.data.tasks;
      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      Logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyTask = async id => {
    try {
      await tasksApi.destroy(id);
      await fetchTasks();
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleProgressToggle = async ({ id, progress }) => {
    try {
      await tasksApi.update({ id, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = id => {
    history.push(`/tasks/${id}/edit`);
  };

  const showTask = id => {
    history.push(`/tasks/${id}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          destroyTask={destroyTask}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          destroyTask={destroyTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
    </Container>
  );
};

export default Dashboard;
