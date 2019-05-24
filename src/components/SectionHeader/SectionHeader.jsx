import React from "react";
import PropTypes from "prop-types";
import { Divider, Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  header: {
    margin: `0 ${theme.spacing(1)}px`
  },
  icon: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`
  }
});

function SectionHeader(props) {
  const { classes, className, Icon } = props;

  return (
    <div className={className}>
      <div className={classes.container}>
        <Icon className={classes.icon} color="primary" fontSize="small" />
        <Typography className={classes.header} color="primary">
          {props.children}
        </Typography>
      </div>
      <Divider variant="middle" />
    </div>
  );
}

SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.func
};

export default withStyles(styles)(SectionHeader);
