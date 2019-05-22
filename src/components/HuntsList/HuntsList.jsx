import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntCard from "../HuntCard";
import { Hunts } from "../../models";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  title: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize * 2
  }
});

function HuntsList(props) {
  const { classes, filterFn, hunts } = props;

  return (
    <div className={classes.container}>
      {hunts.array
        .filter(hunt => filterFn(hunt))
        .map(hunt => {
          return <HuntCard key={hunt.name} hunt={hunt} />;
        })}
    </div>
  );
}

HuntsList.propTypes = {
  classes: PropTypes.object.isRequired,
  filterFn: PropTypes.func.isRequired,
  hunts: PropTypes.instanceOf(Hunts).isRequired
};

export default withStyles(styles)(HuntsList);
