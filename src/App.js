import React from "react";
import Login from "./components/Login";
import { Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Protected from "./components/Protected";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Protected path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;