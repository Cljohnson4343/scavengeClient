import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import FormExpansion from "./FormExpansion";
import classNames from "classnames";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  dateField: {
    fontWeight: theme.typography.fontWeightLight,
    marginTop: theme.spacing(1),
    width: 200
  },
  numberField: {
    width: 150
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: `0px`
  },
  textField: {
    width: 220
  }
});

function HuntInfoForm(props) {
  const {
    classes,
    endTime,
    huntName,
    maxTeams,
    setEndTime,
    setHuntName,
    setMaxTeams,
    setStartTime,
    startTime
  } = props;

  return (
    <FormExpansion label="Hunt Info">
      <form classes={classes.container}>
        <div className={classes.container}>
          <TextField
            id="hunt_name"
            label="Hunt Name"
            type="text"
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setHuntName(e.currentTarget.value)}
            value={huntName}
            required={true}
          />
          <TextField
            id="max_teams"
            label="Max Teams"
            type="number"
            className={classNames(classes.numberField, classes.root)}
            margin="normal"
            onChange={e => setMaxTeams(Number(e.currentTarget.value))}
            defaultValue={maxTeams}
            required={true}
          />
          <TextField
            id="start_time"
            label="Start Time"
            type="datetime-local"
            className={classNames(classes.dateField, classes.root)}
            margin="normal"
            onChange={e => setStartTime(e.currentTarget.value)}
            value={startTime}
            required={true}
          />
          <TextField
            id="end_time"
            label="End Time"
            type="datetime-local"
            className={classNames(classes.dateField, classes.root)}
            margin="normal"
            onChange={e => setEndTime(e.currentTarget.value)}
            value={endTime}
            required={true}
          />
        </div>
      </form>
    </FormExpansion>
  );
}

HuntInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  endTime: PropTypes.instanceOf(Date),
  huntName: PropTypes.string,
  maxTeams: PropTypes.number,
  setEndTime: PropTypes.func.isRequired,
  setHuntName: PropTypes.func.isRequired,
  setMaxTeams: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  startTime: PropTypes.instanceOf(Date)
};

export default withStyles(styles)(HuntInfoForm);
