import React, { useState, useRef } from "react";
import "../assets/css/Inputname.css";
import "../assets/css/Homepage.css";
import { Redirect } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { isMobile } from "react-device-detect";
import clearIcon from "../assets/images/close.png";
import nextIcon from "../assets/images/next.png";

import Homepage from "./Homepage";

function InputName(props) {
  const [name, setName] = useState(null);
  const signRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [camWidth, setCamWidth] = useState(null);
  const [camHeight, setCamHeight] = useState(null);
  const [b, setb] = useState(false);

  const nam = (e) => {
    e.preventDefault();
    if (name && name !== null) {
      localStorage.setItem("name", name);
    }
  };

  const setPadResolution = () => {
    // setMessage("Please provide your signature to proceed");
    if (isMobile) {
      setWidth(250);
      setHeight(400);
      setCamWidth(250);
      setCamHeight(120);
    } else {
      setWidth(700);
      setHeight(360);
      setCamWidth(350);
      setCamHeight(350);
    }
  };

  const handleClear = () => {
    signRef.current.clear();
  };

  const next = () => {
    if (!signRef.current.isEmpty()) {
      if (localStorage.getItem("name")) {
        props.history.push("/session");
      }
      //   setb(true);
      //   setMessage("Click to start the session ");
    } else {
      //   setMessage("No signature found");
    }
  };

  return (
    <div className="Input">
      {/* <div className="input-container"> */}
      {name !== null && localStorage.getItem("name") ? (
        <div className="pad-container">
          <div className="sign-pad">
            <SignatureCanvas
              penColor="#acdbdf"
              ref={signRef}
              canvasProps={{
                width: width,
                height: height,
                className: "sigCanvas",
              }}
            />
          </div>
          <div className="sign-btn-grp">
            <img
              src={clearIcon}
              width="40"
              height="40"
              onClick={handleClear}
              style={{ cursor: "pointer" }}
            />
            <img
              src={nextIcon}
              width="40"
              height="40"
              onClick={next}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ) : (
        <form className="form-container" onSubmit={nam}>
          <span className="text-name">Enter your Name</span>
          <div className="input-box">
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
        </form>
      )}

      {/* </div> */}
    </div>
  );
}

export default InputName;
