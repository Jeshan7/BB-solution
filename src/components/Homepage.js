import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Homepage.css";
import { useIdleTimer } from "react-idle-timer";
import Webcam from "react-webcam";
import Verification from "./Verification";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Homepage(props) {
  const [imgSrc, setImgSrc] = useState(null);
  const [az, setaz] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const webcamRef = useRef(null);

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

  const handleOnIdle = (event) => {
    // console.log("user is idle", event);
    setIsIdle(true);
    // console.log("last active", getLastActiveTime());
  };

  const handleOnActive = (event) => {
    // console.log("user is active", event);
    // console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (e) => {
    // console.log("user did something", e);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 5000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <>
      <div className="row">
        <div className="col-md-12 Homepage">
          <div className="q">
            {isIdle ? (
              <Verification />
            ) : (
              <>
                {" "}
                <Webcam
                  audio={false}
                  height={300}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={300}
                  videoConstraints={videoConstraints}
                />
                <button onClick={start}>Capture photo</button>
                <button onClick={stop}>stop</button>
                <img src={imgSrc} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
