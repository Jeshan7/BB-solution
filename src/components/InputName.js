import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { isMobile } from "react-device-detect";
import "../assets/css/Inputname.css";
import clearIcon from "../assets/images/close.png";
import nextIcon from "../assets/images/next.png";

function InputName(props) {
  const [name, setName] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("Please provide your signature");

  const signRef = useRef(null);

  useEffect(() => {
    setPadResolution();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && name !== null) {
      setIsValid(true);
      localStorage.setItem("name", name);
    }
  };

  const setPadResolution = () => {
    if (isMobile) {
      setWidth(300);
      setHeight(300);
    } else {
      setWidth(700);
      setHeight(360);
    }
  };

  const handleClear = () => {
    signRef.current.clear();
  };

  const handleMessageCss = () => {
    if (message === "No signature found") {
      return "message-container danger";
    } else {
      return "message-container";
    }
  };

  const handleSign = () => {
    if (!signRef.current.isEmpty()) {
      if (localStorage.getItem("name")) {
        props.history.push("/session");
      }
    } else {
      setMessage("No signature found");
    }
  };

  return (
    <div className="Input">
      {isValid ? (
        <div className={handleMessageCss()}>
          <span>{message}</span>
        </div>
      ) : null}
      {isValid ? (
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
              onClick={handleSign}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default InputName;
