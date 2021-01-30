import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { either, isEmpty, isNil } from "ramda";
import Logger from "js-logger";

import { initializeLogger } from "common/logger";
import Dashboard from "./components/Dashboard";
import CreateTask from "./components/Tasks/CreateTask";
import { setAuthHeaders, registerIntercepts } from "./apis/axios";
import { ToastContainer } from "react-toastify";
import ShowTask from "./components/Tasks/ShowTask";
import EditTask from "./components/Tasks/EditTask";
import Signup from "./components/Authentication/Signup";
import { getFromLocalStorage } from "helpers/storage";
import PageLoader from "./components/PageLoader";
import PrivateRoute from "./components/Common/PrivateRoute";
import Login from "./components/Authentication/Login";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    Logger.info("Log from js-logger");
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/tasks/:id/edit" component={EditTask} />
        <Route exact path="/tasks/:id/show" component={ShowTask} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;
