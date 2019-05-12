import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classNames from "classnames";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  dateField: {
    width: 220
  },
  details: {
    padding: `0px ${theme.spacing(2)}px`
  },
  huntHeading: {
    color: theme.palette.primary.main
  },
  numberField: {
    width: 150
  },
  panel: {
    backgroundColor: grey[100],
    margin: `${theme.spacing(2)} 0`
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  summary: {
    margin: `${theme.spacing(1)} 0`
  },
  textField: {
    marginTop: `0px`,
    width: 220
  }
});

function HuntInfoForm(props) {
  const { classes } = props;

  const [huntName, setHuntName] = useState("");
  const [maxTeams, setMaxTeams] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ExpansionPanel
      square={true}
      elevation={0}
      className={classes.panel}
      onChange={e => setIsOpen(!isOpen)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.summary}
      >
        <Typography className={isOpen ? classes.huntHeading : null}>
          Hunt Info
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <form className={classes.container}>
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
              onChange={e => setMaxTeams(e.currentTarget.value)}
              defaultValue={maxTeams}
              required={true}
            />
            <TextField
              id="start_time"
              label="Start Time"
              type="datetime-local"
              className={classNames(classes.root, classes.dateField)}
              margin="normal"
              onChange={e => setStartTime(e.currentTarget.value)}
              value={startTime}
              required={true}
            />
            <TextField
              id="end_time"
              label="End Time"
              type="datetime-local"
              className={classNames(classes.root, classes.dateField)}
              margin="normal"
              onChange={e => setEndTime(e.currentTarget.value)}
              value={endTime}
              required={true}
            />
          </div>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

HuntInfoForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntInfoForm);
