import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useIdleTimer } from "react-idle-timer";
import Webcam from "react-webcam";
import "../assets/css/Homepage.css";
import Verification from "./Verification";
import checkIcon from "../assets/images/check.gif";
import logoutIcon from "../assets/images/exit.png";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Homepage(props) {
  const [session, setSession] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [verify, setVerify] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [camWidth, setCamWidth] = useState(null);
  const [camHeight, setCamHeight] = useState(null);
  const [message, setMessage] = useState(null);

  const webcamRef = useRef(null);

  useEffect(() => {
    setCamResolution();
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

  const setCamResolution = () => {
    setMessage("Click to start the session");
    if (isMobile) {
      setCamWidth(250);
      setCamHeight(120);
    } else {
      setCamWidth(350);
      setCamHeight(350);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const handleSession = () => {
    setSession(!session);
    if (session) {
      setMessage("Session stopped");
    } else {
      setMessage("Session started");
    }
  };

  const handleOnIdle = (event) => {
    if (session) {
      setIsIdle(true);
      setVerify(true);
      setSession(false);
      setMessage("");
    }
  };

  const handleVerification = () => {
    setIsIdle(false);
    setVerify(false);
    handleMessage("Verified");
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 5000,
    onIdle: handleOnIdle,
    debounce: 500,
  });

  const handleMessage = (msg) => {
    setMessage(msg);
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    props.history.push("/");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 Homepage">
          <div className="header-container">
            <span className="header-name">{localStorage.getItem("name")}</span>
            <div className="btn-logout">
              <img
                src={logoutIcon}
                onClick={handleLogout}
                width="50"
                height="50"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="main-container">
            <div className="message-box">
              <span>
                {message ? (
                  message === "Verified" ? (
                    <img src={checkIcon} width="50" height="50" />
                  ) : (
                    message
                  )
                ) : null}
              </span>
            </div>
            {isIdle && verify ? (
              <Verification
                handleMessage={handleMessage}
                handleVerification={handleVerification}
              />
            ) : (
              <div className="homepage-container">
                <div className="camera-container">
                  <div className="camera">
                    <Webcam
                      audio={false}
                      height={camHeight}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={camWidth}
                      videoConstraints={videoConstraints}
                    />
                  </div>

                  <div className="screenshot-container">
                    <span>Screenshots</span>
                    <div className="screenshot">
                      {imgSrc ? (
                        <img src={imgSrc} width="200" height="140" />
                      ) : (
                        "No Screenshots"
                      )}
                    </div>
                  </div>
                </div>
                <div className="session-btn-grp">
                  {!session ? (
                    <button className="session-btn" onClick={handleSession}>
                      Start
                    </button>
                  ) : (
                    <button className="session-btn" onClick={handleSession}>
                      Stop
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
