import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Logger from "js-logger";
import { initializeLogger } from "common/logger";
import Dashboard from "./components/Dashboard";
import CreateTask from "./components/Tasks/CreateTask";
import { setAuthHeaders } from "./apis/axios";
// import Dashboard from "components/Dashboard";

const App = () => {
  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    Logger.info("Log from js-logger");
    setAuthHeaders();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
