import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage";
import InputName from "./components/InputName";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={InputName} />
          <Route path="/session" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
