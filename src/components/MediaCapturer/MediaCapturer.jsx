/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// This component uses code from https://github.com/rico345100/react-multimedia-capture/blob/master/src/index.js
if (location.protocol !== "https:" && location.hostname !== "localhost") {
  console.warn(
    "getUserMedia() must be run from a secure origin: https or localhost."
  );
}
if (!navigator.mediaDevices && !!navigator.getUserMedia) {
  console.warn(
    "Media capture isn't supported for your browser. Upgrade your browser or try a different browser."
  );
}

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

// stop hack
// from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
var MediaStream = window.MediaStream || window.webkitMediaStream;

if (typeof MediaStream !== "undefined" && !("stop" in MediaStream.prototype)) {
  MediaStream.prototype.stop = function() {
    this.getAudioTracks().forEach(function(track) {
      track.stop();
    });

    this.getVideoTracks().forEach(function(track) {
      track.stop();
    });
  };
}

function MediaCapturer(props) {
  const {
    className,
    constraints,
    height,
    mimeType,
    onDenied,
    onError,
    onGranted,
    onInitStream,
    onPause,
    onRequestPermission,
    onResume,
    onStart,
    onStop,
    onStreamClosed,
    render,
    timeSlice,
    width
  } = props;

  const [asked, setAsked] = useState(false);
  const [permission, setPermission] = useState(false);
  const [available, setAvailable] = useState(false);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  const stream = useRef(null);
  const mediaRecorder = useRef(null);
  const mediaChunks = useRef([]);

  useEffect(() => {
    getStream();

    return () => {
      mediaChunks.current = [];
      mediaRecorder.current = null;

      if (stream.current && "stopStream" in stream.current) {
        stream.current.stopStream();
      }
    };
  }, []);

  function getStream() {
    console.log("getStream");
    const handleSuccess = st => {
      stream.current = st;
      mediaChunks.current = [];

      setPermission(true);
      setAsked(true);
      setRecording(false);

      onGranted(stream.current);

      initMediaRecorder();
    };

    const handleFailed = err => {
      setAsked(false);
      onDenied(err);
    };

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleFailed);
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(constraints, handleSuccess, handleFailed);
    } else {
      let errMessage = `Your Browser doesn't support UserMedia API. Please try with another browser.`;
      console.warn(errMessage);

      onError(new Error(errMessage));
    }
  }
  function initMediaRecorder() {
    console.log("init");
    try {
      let options = {};
      let types = ["video/webm;codecs=vp8", "video/webm", ""];

      if (mimeType) types.unshift(mimeType);

      for (let i = 0; i < types.length; i++) {
        let type = types[i];

        if (MediaRecorder.isTypeSupported(type)) {
          options.mimeType = type;
          break;
        }

        console.warn(`${type} is not supported on your browser.`);
      }

      mediaRecorder.current = new MediaRecorder(stream.current, options);

      mediaRecorder.current.ondataavailable = ev => {
        if (ev.data && ev.data.size > 0) {
          mediaChunks.current.push(ev.data);
        }
      };

      onInitStream(stream.current);

      setAvailable(true);
    } catch (err) {
      console.log(err);
      console.error("Failed to initialize MediaRecorder.", err);

      setAvailable(false);
    }
  }

  function start() {
    console.log("start");
    if (!available) return;
    if (!permission) {
      const error = new Error("You have to get permission to start recording.");
      return onError(error);
    }
    if (recording) {
      const error = new Error("MediaRecorder currently on active.");
      return onError(error);
    }

    mediaChunks.current = [];
    mediaRecorder.current.start(timeSlice);

    setRecording(true);

    onStart(stream.current);
  }
  function pause() {
    console.log("pause");
    if (!recording) return;
    if (!permission) {
      const error = new Error("You have to get permission to start recording.");
      return onError(error);
    }

    mediaRecorder.current.stop();

    setPaused(true);

    onPause();
  }
  function resume() {
    console.log("resume");
    if (!recording) return;
    if (!permission) {
      const error = new Error("You have to get permission to start recording.");
      return onError(error);
    }

    initMediaRecorder();
    mediaRecorder.current.start(timeSlice);

    setPaused(false);

    onResume(stream.current);
  }
  function stop(stopSt) {
    console.log("stop");
    if (!available) return;
    if (!permission) {
      const permissionError = new Error("You already stopped recording.");
      return onError(permissionError);
    }

    mediaRecorder.current.stop();

    setRecording(false);

    let blob = new Blob(mediaChunks.current, { type: "video/webm" });
    onStop(blob);

    if (stopSt) {
      stopStream();
    }
  }
  function stopStream() {
    stream.current.stop();
    stream.current.getTracks().forEach(track => track.stop());
    stream.current = null;

    onStreamClosed();

    setPermission(false);
  }
  function requestPermission() {
    onRequestPermission();
    getStream();
  }

  return (
    <div className={className}>
      {render({
        request: requestPermission,
        start: start,
        stop: stop,
        pause: pause,
        resume: resume
      })}
    </div>
  );
}

MediaCapturer.propTypes = {
  className: PropTypes.string,
  constraints: PropTypes.object,
  height: PropTypes.number,
  mimeType: PropTypes.string,
  onDenied: PropTypes.func,
  onError: PropTypes.func,
  onGranted: PropTypes.func,
  onInitStream: PropTypes.func,
  onPause: PropTypes.func,
  onRequestPermission: PropTypes.func,
  onResume: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onStreamClosed: PropTypes.func,
  render: PropTypes.func,
  timeSlice: PropTypes.number,
  width: PropTypes.number
};

MediaCapturer.defaultProps = {
  className: "",
  constraints: {
    audio: true,
    video: true
  },
  height: 720,
  mimeType: "",
  onDenied: function() {},
  onError: function() {},
  onGranted: function() {},
  onInitStream: function() {},
  onPause: function() {},
  onRequestPermission: function() {},
  onResume: function() {},
  onStart: function() {},
  onStop: function() {},
  onStreamClosed: function() {},
  render: function() {},
  timeSlice: 0,
  width: 1280
};

export default MediaCapturer;
