import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FullscreenDialog from "../FullscreenDialog/FullscreenDialog";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.main
  },
  vid: {
    width: "100vw"
  }
});

function MediaPreview(props) {
  const { classes, image, label, setClosed, src, video } = props;

  return (
    <FullscreenDialog label={label} setClosed={setClosed}>
      <div className={classes.container}>
        {image && <img src={src} alt={label} />}
        {video && (
          <video className={classes.vid} controls>
            <source src={src} type="video/webm" />
            <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
      </div>
    </FullscreenDialog>
  );
}

MediaPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  image: PropTypes.bool,
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  setClosed: PropTypes.func.isRequired,
  video: PropTypes.bool
};

export default withStyles(styles)(MediaPreview);
