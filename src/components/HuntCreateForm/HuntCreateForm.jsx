import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import Fab from "../Fab";

const styles = theme => ({
  button: {
    alignSelf: "flex-end",
    marginRight: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexDirection: "column"
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
