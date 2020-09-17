import React, { useEffect, useRef, useState } from "react";
import "../assets/css/Verification.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Webcam from "react-webcam";
// import Home from "./Home";

// var SpeechRecognition = window.SpeechRecognition;
// var SpeechGrammarList = window.SpeechGrammarList;
// var SpeechRecognitionEvent = window.SpeechRecognitionEvent;

// var recognition = new SpeechRecognition();
// var speechRecognitionList = new SpeechGrammarList();

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// recognition.continous = true;
// recognition.interimResults = true;
// recognition.lang = "en-US";

// var recognition =
//   new window.SpeechRecognition() || window.webkitSpeechRecognition;

function Verification(props) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [modal, showmodal] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();
  // var recognition = new window.SpeechRecognition();

  useEffect(() => {
    showmodal(true);
    // setInterval(() => {
    //   showmodal(false);
    // }, 2000);
    generateNumber();
  }, []);

  useEffect(() => {
    if (transcript && capturing) {
      console.log("as", transcript);
    } else {
      resetTranscript();
      console.log("aaaas", transcript);
      if (randomNumber == transcript) {
        props.abc();
        // console.log("saas", true);
      }
    }
  }, [transcript, capturing]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const generateNumber = () => {
    // console.log(Math.floor(Math.random() * 9000) + 1000);
    let random_number = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(random_number);
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
  };

  // const handleDataAvailable = React.useCallback(
  //   ({ data }) => {
  //     if (data.size > 0) {
  //       setRecordedChunks((prev) => prev.concat(data));
  //     }
  //   },
  //   [setRecordedChunks]
  // );

  const handleDataAvailable = (data) => {
    if (data.size > 0) {
      setRecordedChunks(data);
    }
  };

  const handleStopCaptureClick = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    SpeechRecognition.stopListening();
  };

  const handleModal = () => {
    showmodal(false);
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
              You have been idle for 5 minutes.Verify youself
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
              <button className="btn-generate" onClick={generateNumber}>
                {" "}
                Generate{" "}
              </button>
              {capturing ? (
                <button className="btn-stop" onClick={handleStopCaptureClick}>
                  Stop Capture
                </button>
              ) : (
                <button className="btn-start" onClick={handleStartCaptureClick}>
                  Start Capture
                </button>
              )}
            </div>
            <div className="random-number">{randomNumber}</div>
          </div>
          <div className="container-2">
            <div className="cam-container">
              <Webcam audio={false} width={400} height={400} ref={webcamRef} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Verification;
