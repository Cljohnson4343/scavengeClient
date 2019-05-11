import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  Input,
  InputLabel,
  TextField,
  withStyles
} from "@material-ui/core";

const styles = theme => ({
  numberField: {
    width: 150
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  }
});

function HuntCreateForm(props) {
  const { classes } = props;

  const [huntName, setHuntName] = useState("");
  const [maxTeams, setMaxTeams] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  return (
    <form>
      <TextField
        id="hunt_name"
        label="Hunt Name"
        type="text"
        className={classes.textField}
        margin="normal"
        onChange={e => setHuntName(e.currentTarget.value)}
        value={huntName}
        required={true}
      />
      <FormControl className={classes.root}>
        <InputLabel htmlFor="max_teams">Max Teams</InputLabel>
        <Input
          id="max_teams"
          label="Max Teams"
          type="number"
          className={classes.numberField}
          onChange={e => setMaxTeams(e.currentTarget.value)}
          defaultValue={maxTeams}
          required={true}
        />
      </FormControl>
      <TextField
        id="start_time"
        label="Start Time"
        type="datetime-local"
        className={classes.root}
        margin="normal"
        onChange={e => setStartTime(e.currentTarget.value)}
        value={startTime}
        required={true}
      />
      <TextField
        id="end_time"
        label="End Time"
        type="datetime-local"
        className={classes.root}
        margin="normal"
        onChange={e => setEndTime(e.currentTarget.value)}
        value={endTime}
        required={true}
      />
    </form>
  );
}

HuntCreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntCreateForm);
