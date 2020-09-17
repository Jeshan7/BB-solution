import React, { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";

function App() {
  const [name, setName] = useState(null);
  const nam = (e) => {
    localStorage.setItem("name", name);
  };
  return (
    <div className="App">
      {" "}
      {name ? (
        <form onSubmit={nam}>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </form>
      ) : (
        <Homepage />
      )}
    </div>
  );
}

export default App;
