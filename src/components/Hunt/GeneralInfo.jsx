import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import {
  toDateTimeLocal,
  validateHuntName,
  validateMaxTeams,
  validateStartDate,
  validateEndDate
} from "../../utils";
import { Hunt } from "../../models";
import SubmitButton from "../SubmitButton";

const styles = theme => {
  const fieldWidth = 220;
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: theme.spacing(1),
      paddingTop: theme.spacing(1)
    },
    dateField: {
      fontWeight: theme.typography.fontWeightLight,
      marginTop: theme.spacing(1),
      width: fieldWidth
    },
    font: {
      fontWeight: theme.typography.fontWeightLight
    },
    input: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    numberField: {
      width: fieldWidth
    },
    root: {
      margin: `${theme.spacing(2)}px 0`
    },
    submitBtn: {
      alignSelf: "flex-end",
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`
    },
    textField: {
      width: fieldWidth
    }
  };
};

const beenEdited = (hunt, nameInput, maxTeamsInput, startsInput, endsInput) => {
  if (hunt.name !== nameInput) return true;
  if (hunt.maxTeams !== maxTeamsInput) return true;
  if (hunt.starts.getTime() !== startsInput.getTime()) return true;
  if (hunt.ends.getTime() !== endsInput.getTime()) return true;
  return false;
};
const hasErr = (...args) =>
  Boolean(args.find(scavengeError => scavengeError.inError === true));

function GeneralInfo(props) {
  const { classes, hunt, setHunt } = props;

  const [nameInput, setNameInput] = useState(hunt.name);
  const [maxTeamsInput, setMaxTeamsInput] = useState(hunt.maxTeams);
  const [endsInput, setEndsInput] = useState(hunt.ends);
  const [startsInput, setStartsInput] = useState(hunt.starts);

  const huntNameErr = validateHuntName(nameInput);
  const maxTeamsErr = validateMaxTeams(maxTeamsInput, hunt.numTeams);
  const startsErr = validateStartDate(startsInput);
  const endsErr = validateEndDate(startsInput, endsInput);

  const isEnabled =
    beenEdited(hunt, nameInput, maxTeamsInput, startsInput, endsInput) &&
    !hasErr(huntNameErr, maxTeamsErr, startsErr, endsErr);

  return (
    <Paper className={classes.root}>
      <form className={classes.container}>
        <div className={classes.container}>
          <TextField
            id="hunt_name"
            label="Hunt Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(
              classes.textField,
              classes.input,
              classes.field
            )}
            error={huntNameErr.inError ? true : false}
            FormHelperTextProps={huntNameErr.inError ? { error: true } : null}
            helperText={huntNameErr.msg}
            margin="normal"
            onChange={e => {
              setNameInput(e.currentTarget.value);
            }}
            value={nameInput}
            required={true}
          />
          <TextField
            id="max_teams"
            label="Max Teams"
            type="number"
            classes={{ root: classes.font }}
            className={classNames(
              classes.numberField,
              classes.input,
              classes.field
            )}
            error={maxTeamsErr.inError ? true : false}
            FormHelperTextProps={maxTeamsErr.inError ? { error: true } : null}
            helperText={maxTeamsErr.msg}
            margin="normal"
            onChange={e => {
              setMaxTeamsInput(Number(e.currentTarget.value));
            }}
            value={maxTeamsInput}
            required={true}
          />
          <TextField
            id="start_time"
            label="Start Time"
            type="datetime-local"
            classes={{ root: classes.font }}
            className={classNames(
              classes.dateField,
              classes.input,
              classes.field
            )}
            error={startsErr.inError ? true : false}
            FormHelperTextProps={startsErr.inError ? { error: true } : null}
            helperText={startsErr.msg}
            margin="normal"
            onChange={e => {
              setStartsInput(new Date(e.currentTarget.value));
            }}
            value={toDateTimeLocal(startsInput)}
            required={true}
          />
          <TextField
            id="end_time"
            label="End Time"
            type="datetime-local"
            classes={{ root: classes.font }}
            className={classNames(
              classes.dateField,
              classes.input,
              classes.field
            )}
            error={endsErr.inError ? true : false}
            FormHelperTextProps={endsErr.inError ? { error: true } : null}
            helperText={endsErr.msg}
            margin="normal"
            onChange={e => {
              setEndsInput(new Date(e.currentTarget.value));
            }}
            value={toDateTimeLocal(endsInput)}
            required={true}
          />
        </div>
        <SubmitButton
          className={classes.submitBtn}
          disabled={!isEnabled}
          handleSubmit={() => {
            let newHunt = new Hunt({
              ...hunt.data,
              ...{
                huntName: nameInput,
                maxTeams: maxTeamsInput,
                startTime: startsInput.toISOString(),
                endTime: endsInput.toISOString()
              }
            });
            newHunt.apiUpdateHunt().then(response => {
              setHunt(newHunt);
            });
          }}
        />
      </form>
    </Paper>
  );
}

GeneralInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired,
  setHunt: PropTypes.func.isRequired
};

export default withStyles(styles)(GeneralInfo);
