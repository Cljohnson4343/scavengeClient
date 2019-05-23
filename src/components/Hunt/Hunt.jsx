import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntTabBar from "../HuntTabBar";

const styles = theme => ({});

function Hunt(props) {
  const { classes } = props;

  const [value, setValue] = useState("items");

  return (
    <div>
      <HuntTabBar value={value} setValue={setValue} />
    </div>
  );
}

Hunt.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Hunt);
