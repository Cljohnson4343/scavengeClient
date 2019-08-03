import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import AddMediaIcon from "@material-ui/icons/AddAPhoto";

const styles = theme => ({
  fileInput: {
    width: `0.1px`,
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1"
  },
  mediaIcon: {
    color: theme.palette.primary.main
  }
});

function MediaUploader(props) {
  const { classes, upload } = props;

  return (
    <div>
      <input
        className={classes.fileInput}
        type="file"
        accept="image/*,video/*"
        name="file"
        id="file"
        onChange={upload}
      />
      <label htmlFor="file">
        <AddMediaIcon className={classes.mediaIcon} />
      </label>
    </div>
  );
}

MediaUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  upload: PropTypes.func.isRequired
};

export default withStyles(styles)(MediaUploader);
