import React, { useState, useRef, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import logo from "./logo.svg";
import "./App.css";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [az, setaz] = useState(false);

  //const random number(5 digit)
  // Math.floor(Math.random()*90000) + 10000;
  useEffect(() => {
    let interval = null;
    if (az) {
      interval = setInterval(() => {
        capture();
      }, 2000);
    } else {
      console.log("hello");
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [az]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // let x = b64toBlob(imageSrc);
    // var file = new File([x], "name");
    // console.log("hello", x);

    // console.log("hello", file);
  };
  const start = () => {
    setaz(true);
  };
  const stop = () => {
    setaz(false);
  };

  const b64toBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("heloooooooooooooooo");
    console.log("last active", getLastActiveTime());
  };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (e) => {
    console.log("user did something", e);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 5000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <div className="App">
      {/* <div style={{ width: "200px", height: "200px" }}> */}
      <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
      />
      {/* </div> */}
      <button onClick={start}>Capture photo</button>
      <button onClick={stop}>stop</button>
      <img src={imgSrc} />
    </div>
  );
}

export default App;
