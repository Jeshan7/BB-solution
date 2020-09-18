import React, { useEffect, useRef, useState, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";
import "../assets/css/Verification.css";
import recorderIcon from "../assets/images/recording.gif";
import refreshIcon from "../assets/images/refresh.png";

function Verification(props) {
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [modal, showmodal] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null);
  const [camWidth, setCamWidth] = useState(null);
  const [camHeight, setCamHeight] = useState(null);

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    showmodal(true);
    setCamResolution();
    generateNumber();
  }, []);

  useEffect(() => {
    if (transcript && capturing) {
      console.log("as", transcript);
    } else {
      resetTranscript();
      console.log("aaaas", transcript);
      if (randomNumber == transcript) {
        props.handleVerification();
      }
    }
  }, [transcript, capturing]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    props.handleMessage("Recording Started");
  }

  const setCamResolution = () => {
    if (isMobile) {
      setCamWidth(200);
      setCamHeight(150);
    } else {
      setCamWidth(400);
      setCamHeight(400);
    }
  };

  const generateNumber = () => {
    let random_number = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(random_number);
    resetTranscript();
  };

  const handleStartCaptureClick = () => {
    setCapturing(true);
    SpeechRecognition.startListening({ continuous: true });
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    props.handleMessage("Recording Started");
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    SpeechRecognition.stopListening();
    props.handleMessage("Wrong input");
  };

  const handleModal = () => {
    showmodal(false);
    props.handleMessage("Click to start recording");
  };

  // const handleDownload = () => {
  //   if (recordedChunks.length) {
  //     console.log(recordedChunks);
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     document.body.appendChild(a);
  //     a.style = "display: none";
  //     a.href = url;
  //     a.download = "react-webcam-stream-capture.webm";
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     setRecordedChunks([]);
  //   }
  // };

  return (
    <div className="Verification">
      {modal ? (
        <div className="modal-container">
          <div className="modal-message">
            <span className="modal-text">
              <img src={recorderIcon} />
              You have been idle for 15 seconds
              <br />
              Please verify 
            </span>
            <button className="modal-btn" onClick={handleModal}>
              Ok
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="container-1">
            <div className="btn-container">
              {capturing ? (
                <button
                  className="btn-recording"
                  onClick={handleStopCaptureClick}
                >
                  Stop
                </button>
              ) : (
                <button
                  className="btn-recording"
                  onClick={handleStartCaptureClick}
                >
                  Start
                </button>
              )}
            </div>
            <div className="random-number">
              <span className="number">{randomNumber}</span>
              <div className="refresh-btn">
                <img
                  src={refreshIcon}
                  width="40"
                  height="40"
                  onClick={generateNumber}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
          <div className="container-2">
            <div className="cam-container">
              <Webcam
                audio={false}
                width={camWidth}
                height={camHeight}
                ref={webcamRef}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Verification;
