import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Homepage.css";
import { useIdleTimer } from "react-idle-timer";
import Webcam from "react-webcam";
import Verification from "./Verification";
import SignatureCanvas from "react-signature-canvas";
import { isMobile } from "react-device-detect";
import clearIcon from "../assets/images/close.png";
import nextIcon from "../assets/images/next.png";
import rn from "../assets/images/check.gif";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Homepage(props) {
  const [imgSrc, setImgSrc] = useState(null);
  const [session, setSession] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [verify, setVerify] = useState(false);
  const [aa, setaa] = useState(true);
  const [b, setb] = useState(false);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [message, setMessage] = useState(null);

  const webcamRef = useRef(null);
  const signRef = useRef(null);

  useEffect(() => {
    setPadResolution();
  }, []);

  useEffect(() => {
    let interval = null;
    if (session) {
      interval = setInterval(() => {
        capture();
        console.log("heeeee");
      }, 2000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [session]);

  const setPadResolution = () => {
    setMessage("Please provide your signature to proceed.");
    if (isMobile) {
      setWidth(250);
      setHeight(400);
    } else {
      // setWidth(250);
      // setHeight(400);
      setWidth(700);
      setHeight(360);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    // let x = b64toBlob(imageSrc);
    // var file = new File([x], "name");
    // console.log("hello", x);

    // console.log("hello", file);
  };

  const handleSession = () => {
    setSession(!session);
    if (session) {
      setMessage("session stopped.");
    } else {
      setMessage("Session started.");
    }
  };

  const handleOnIdle = (event) => {
    if (b && session) {
      setIsIdle(true);
      setVerify(true);
      setSession(false);
      setMessage("");
    }
  };

  const abc = () => {
    setIsIdle(false);
    setVerify(false);
    setb(true);
    handleMessage("Verified");
    // console.log("user did something", e);
  };

  const handleOnActive = (event) => {
    // console.log("user is active", event);
    // console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (e) => {
    // console.log("user did something", e);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 10000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  const handleClear = () => {
    signRef.current.clear();
  };

  const next = () => {
    if (!signRef.current.isEmpty()) {
      setb(true);
      setMessage("Click to start the session ");
    } else {
      setMessage("No signature found");
    }
  };

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 Homepage">
          <div className="main-container">
            <div className="message-box">
              <span>
                {message ? (
                  message === "Verified" ? (
                    <img src={rn} width="50" height="50" />
                  ) : (
                    message
                  )
                ) : null}
              </span>
            </div>
            {isIdle && verify ? (
              <Verification
                handleMessage={handleMessage}
                abc={abc}
                isIdle={isIdle}
                verify={verify}
              />
            ) : (
              <>
                {" "}
                {!b ? (
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
                      {/* <button>clear</button> */}
                      {/* <button onClick={next}>next</button> */}
                    </div>
                  </div>
                ) : (
                  <div className="webcamera-container">
                    <div className="cam">
                      <div className="camera">
                        <Webcam
                          audio={false}
                          // height={400}
                          height={200}
                          ref={webcamRef}
                          screenshotFormat="image/jpeg"
                          // width={300}
                          width={200}
                          videoConstraints={videoConstraints}
                        />
                      </div>

                      <div className="screenshot-container">
                        <span>Screenshots</span>
                        <div className="screenshot">
                          {imgSrc ? (
                            <img src={imgSrc} width="200" height="200" />
                          ) : (
                            "No Screenshots to show"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="session-btn-grp">
                      {!session ? (
                        <button className="session-btn" onClick={handleSession}>
                          Start Session
                        </button>
                      ) : (
                        <button className="session-btn" onClick={handleSession}>
                          Stop Session
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
