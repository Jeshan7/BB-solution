import React, { useState, useRef, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import "./App.css";
import Webcam from "react-webcam";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Homepage from "./components/Homepage";
import Verification from "./components/Verification";
import SignatureCanvas from "react-signature-canvas";

function App() {
  const b64toBlob = (dataURI) => {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  return (
    <div className="App">
      <Homepage />
    </div>
  );
}

export default App;
