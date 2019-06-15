import React from "react";
import PropTypes from "prop-types";
import { Divider, Typography, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  header: {
    flexGrow: 1,
    margin: `0 ${theme.spacing(1)}px`
  },
  icon: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`
  }
});

function SectionHeader(props) {
  const { classes, className, withDivider = true, Icon } = props;

  return (
    <div className={className}>
      <div className={classes.container}>
        <Icon className={classes.icon} color="primary" fontSize="small" />
        <Typography className={classes.header} color="primary" variant="h6">
          {props.children}
        </Typography>
      </div>
      {withDivider && <Divider variant="middle" />}
    </div>
  );
}

SectionHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.object
};

export default withStyles(styles)(SectionHeader);
