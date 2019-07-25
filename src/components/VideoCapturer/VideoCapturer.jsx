import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import MediaCapturer from "../MediaCapturer";
import FullscreenDialog from "../FullscreenDialog";

const styles = {};

function VideoCapturer(props) {
  const { classes, onClose } = props;

  const [granted, setGranted] = useState(false);
  const [rejectedReason, setRejectedReason] = useState("");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  const videoEl = useRef(null);

  function handleRequest() {
    console.log("Request Recording...");
  }
  function handleGranted() {
    setGranted(true);
    console.log("Permission Granted!");
  }
  function handleDenied(err) {
    setRejectedReason(err.name);
    console.log("Permission Denied!", err);
  }
  function handleInitStream(stream) {
    setStreamToVideo(stream);
  }
  function handleStart(stream) {
    setRecording(true);

    setStreamToVideo(stream);
    console.log("Recording Started.");
  }
  function handleStop(blob) {
    setRecording(false);

    releaseStreamFromVideo();

    console.log("Recording Stopped.");
    downloadVideo(blob);
  }
  function handlePause() {
    releaseStreamFromVideo();

    setPaused(true);
  }
  function handleResume(stream) {
    setStreamToVideo(stream);

    setPaused(false);
  }
  function handleError(err) {
    console.log(err);
  }
  function handleStreamClose() {
    setGranted(false);
  }
  function setStreamToVideo(stream) {
    let video = videoEl.current;

    if ("srcObject" in video) {
      video.srcObject = stream;
    } else {
      video.src = URL.createObjectURL(stream);
    }
  }
  function releaseStreamFromVideo() {
    videoEl.current.src = "";
  }
  function downloadVideo(blob) {
    console.log("download");
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.target = "_blank";
    document.body.appendChild(a);

    a.click();
  }

  return (
    <div>
      <MediaCapturer
        className={classes.videoCapture}
        constraints={{ audio: true, video: true }}
        timeSlice={10}
        onRequestPermission={handleRequest}
        onInitStream={handleInitStream}
        onGranted={handleGranted}
        onDenied={handleDenied}
        onStart={handleStart}
        onStop={handleStop}
        onPause={handlePause}
        onResume={handleResume}
        onError={handleError}
        onStreamClosed={handleStreamClose}
        render={({ request, start, stop, pause, resume }) => (
          <FullscreenDialog
            label={"Capturing Video"}
            setClosed={() => {
              onClose();
            }}
          >
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>

            <video ref={videoEl} autoPlay />
          </FullscreenDialog>
        )}
      />
    </div>
  );
}

VideoCapturer.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(VideoCapturer);
