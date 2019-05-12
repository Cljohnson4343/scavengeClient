import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import HuntInfoForm from "./HuntInfoForm";
import Fab from "../Fab";

const styles = theme => ({
  button: {
    alignSelf: "flex-end",
    marginRight: theme.spacing(1)
  },
  container: {
    backgroundColor: grey[200],
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2)
  }
});

function HuntCreateForm(props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <HuntInfoForm />
      <Fab />
    </div>
  );
}

HuntCreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntCreateForm);
