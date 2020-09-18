import React, { useState } from "react";
// import "./App.css";
import { Redirect } from "react-router-dom";

import Homepage from "./Homepage";

function InputName() {
  const [name, setName] = useState(null);
  const nam = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    return <Redirect to="/session" />;
  };
  return (
    <div className="App">
      <form onSubmit={nam}>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </form>
    </div>
  );
}

export default InputName;
