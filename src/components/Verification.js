import React, { useEffect } from "react";

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

function Verification() {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [AXX, setAXX] = React.useState(false);
  const [randomNumber, setRandomNumber] = React.useState(null);

  const { transcript, resetTranscript } = useSpeechRecognition();
  // var recognition = new window.SpeechRecognition();

  useEffect(() => {
    if (transcript && capturing) {
      console.log("as", transcript);
    } else {
      resetTranscript();
      console.log("aaaas", transcript);
      if (randomNumber == transcript) {
        console.log("saas", true);
      }
    }
  }, [transcript, capturing]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const generateNumber = () => {
    // console.log(Math.floor(Math.random() * 9000) + 1000);
    let x = Math.floor(Math.random() * 9000) + 1000;
    setRandomNumber(x);
  };

  const handleStartCaptureClick = () => {
    setCapturing(true);
    SpeechRecognition.startListening({ continuous: true });
    // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    //   mimeType: "video/webm",
    // });
    // mediaRecorderRef.current.addEventListener(
    //   "dataavailable",
    //   handleDataAvailable
    // );
    // mediaRecorderRef.current.start();
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
    // mediaRecorderRef.current.stop();
    setCapturing(false);
    SpeechRecognition.stopListening();
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

  const start = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };
  return (
    <div className="Verification">
      <div className="container-1">
        {randomNumber}
        <button onClick={generateNumber}> Generate </button>
      </div>
      <div className="container-2">
        <div className="cam-container">
          <Webcam audio={false} ref={webcamRef} />
          {capturing ? (
            <button onClick={handleStopCaptureClick}>Stop Capture</button>
          ) : (
            <button onClick={handleStartCaptureClick}>Start Capture</button>
          )}
        </div>
        <div className="record-container"></div>
      </div>
    </div>
  );
}

export default Verification;
