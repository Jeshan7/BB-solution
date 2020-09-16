import React, { useState, useRef, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import "./App.css";
import Webcam from "react-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Homepage from "./components/Homepage";
import Verification from "./components/Verification";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isIdle, setIsIdle] = useState(false);

  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  //const random number(5 digit)
  // Math.floor(Math.random()*90000) + 10000;

  const { transcript, resetTranscript } = useSpeechRecognition();

  // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //   return null;
  // }

  const b64toBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  // const handleOnIdle = (event) => {
  //   setIsIdle(true);
  //   console.log("user is idle", event);
  //   console.log("last active", getLastActiveTime());
  // };

  // const handleOnActive = (event) => {
  //   console.log("user is active", event);
  //   console.log("time remaining", getRemainingTime());
  // };

  // const handleOnAction = (e) => {
  //   console.log("user did something", e);
  // };

  // const { getRemainingTime, getLastActiveTime } = useIdleTimer({
  //   timeout: 5000,
  //   onIdle: handleOnIdle,
  //   onActive: handleOnActive,
  //   onAction: handleOnAction,
  //   debounce: 500,
  // });

  // const handleStartCaptureClick = () => {
  //   console.log("ndjsndjn");
  //   setCapturing(true);
  //   mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
  //     mimeType: "video/webm",
  //   });

  //   mediaRecorderRef.current.addEventListener(
  //     "dataavailable",
  //     handleDataAvailable
  //   );

  //   mediaRecorderRef.current.start();
  //   SpeechRecognition.startListening(() => {
  //     console.log("hello");
  //   });
  // };

  // const handleStopCaptureClick = () => {
  //   console.log("n");
  //   mediaRecorderRef.current.stop();
  //   SpeechRecognition.stopListening(() => {
  //     console.log("hello", transcript);
  //   });
  //   setCapturing(false);
  // };

  // const handleDataAvailable = React.useCallback(
  //   ({ data }) => {
  //     if (data.size > 0) {
  //       console.log("as", data);
  //       setRecordedChunks((prev) => prev.concat(data));
  //     }
  //   },
  //   [setRecordedChunks]
  // );

  // const handleDownload = React.useCallback(() => {
  //   if (recordedChunks.length) {
  //     // console.log("jdn", recordedChunks);
  //     const blob = new Blob(recordedChunks, {
  //       type: "video/webm",
  //     });

  //     let fileReader = new FileReader();

  //     fileReader.readAsArrayBuffer(blob);
  //     console.log("sas", fileReader.readAsArrayBuffer(blob));

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
  // }, [recordedChunks]);

  const handle = React.useCallback(async () => {
    console.log("sas", transcript);
    if (recordedChunks.length) {
      // console.log("jdn", recordedChunks);
      // const blob = new Blob(recordedChunks, {
      //   type: "audio/mp3",
      // });

      // var buffer = await blob.arrayBuffer();
      if (transcript) {
        console.log("sas", transcript);
      }

      // let fileReader = new FileReader();

      // fileReader.readAsArrayBuffer(blob);
      // console.log("sas", fileReader.readAsArrayBuffer(blob));

      // videoElement.play();

      // run this part on loop to sample the current audio position
      // let sample = new Float32Array(analyser.frequencyBinCount);
      // analyser.getFloatFrequencyData(sample);

      // const url = URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style = "display: none";
      // a.href = url;
      // a.download = "react-webcam-stream-capture.mp3";
      // a.click();
      // window.URL.revokeObjectURL(url);
      // setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className="App">
      <Homepage />
      {/* <Webcam
        audio={false}
        height={300}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={videoConstraints}
      />
      <button onClick={start}>Capture photo</button>
      <button onClick={stop}>stop</button>
      <img src={imgSrc} /> */}

      {/* <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}

      {recordedChunks.length > 0 && (
        <button onClick={handleDownload}>Download</button>
      )}
      <button onClick={handle}>a</button> */}

      {/* <button onClick={handle}>a</button> */}
    </div>
  );
}

export default App;
