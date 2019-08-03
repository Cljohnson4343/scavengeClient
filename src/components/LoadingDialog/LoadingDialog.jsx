import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Loading from "../Loading";

const styles = {
  root: {
    backgroundColor: "inherit",
    boxShadow: "unset"
  }
};

function LoadingDialog(props) {
  const { classes, onClose, open } = props;

  return (
    <Dialog
      PaperProps={{ className: classes.root }}
      open={open}
      onClose={onClose}
    >
      <Loading />
    </Dialog>
  );
}

LoadingDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(LoadingDialog);
