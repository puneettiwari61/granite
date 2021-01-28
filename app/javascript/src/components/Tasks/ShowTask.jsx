import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "../Container";
import PageLoader from "../PageLoader";
import tasksApi from "../../apis/tasks";
import Logger from "js-logger";

const ShowTask = () => {
  const { id } = useParams();
  const [taskDetails, setTaskDetails] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      setTaskDetails(response.data.task);
      setAssignedUser(response.data.assigned_user);
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
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <span>Task Title : </span> {taskDetails?.title}
      </h1>
      <h2 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-gray-800 border-b border-gray-500">
        <span className="text-gray-600">Assigned To : </span>
        {assignedUser?.name}
      </h2>
    </Container>
  );
};

export default ShowTask;
