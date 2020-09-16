import React, { useState, useRef, useEffect } from "react";
import "../assets/css/Homepage.css";
import { useIdleTimer } from "react-idle-timer";
import Webcam from "react-webcam";
import Verification from "./Verification";
import SignatureCanvas from "react-signature-canvas";

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

  const webcamRef = useRef(null);
  const signRef = useRef(null);

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
  };

  const handleOnIdle = (event) => {
    if (b) {
      setIsIdle(true);
      setVerify(true);
      setSession(false);
    }
  };

  const abc = () => {
    setIsIdle(false);
    setVerify(false);
    setb(true);
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
    timeout: 200000,
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
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12 Homepage">
          <div className="main-container">
            {isIdle && verify ? (
              <Verification abc={abc} isIdle={isIdle} verify={verify} />
            ) : (
              <>
                {" "}
                {!b ? (
                  <div className="pad-container">
                    {/* <div className="sign-pad"> */}
                    <SignatureCanvas
                      penColor="black"
                      ref={signRef}
                      canvasProps={{
                        width: 500,
                        height: 300,
                        className: "sigCanvas",
                      }}
                    />
                    {/* </div> */}
                    <div className="sign-btn-grp">
                      <button onClick={handleClear}>clear</button>
                      <button onClick={next}>next</button>
                    </div>
                  </div>
                ) : (
                  <div className="webcamera-container">
                    <div>
                      <Webcam
                        audio={false}
                        height={300}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        videoConstraints={videoConstraints}
                      />
                    </div>
                    <div>
                      {!session ? (
                        <button onClick={handleSession}>Start Session</button>
                      ) : (
                        <button onClick={handleSession}>Stop Session</button>
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
