import React from "react";
import PropTypes from "prop-types";
import { withStyles, IconButton } from "@material-ui/core";
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
  const { classes, name, upload } = props;

  return (
    <IconButton>
      <input
        className={classes.fileInput}
        type="file"
        accept="image/*,video/*"
        name={name}
        id={name}
        onChange={upload}
      />
      <label htmlFor={name}>
        <AddMediaIcon className={classes.mediaIcon} />
      </label>
    </IconButton>
  );
}

MediaUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  upload: PropTypes.func.isRequired
};

export default withStyles(styles)(MediaUploader);
