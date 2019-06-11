import React from "react";
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

const styles = theme => {
  const fieldWidth = 220;
  return {
    container: {
      display: "flex",
      flexDirection: "column"
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
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    numberField: {
      width: fieldWidth
    },
    root: {
      margin: `${theme.spacing(2)}px 0`
    },
    textField: {
      width: fieldWidth
    }
  };
};

function GeneralInfo(props) {
  const { classes, hunt, setHunt } = props;

  const huntNameErr = validateHuntName(hunt.name);
  const maxTeamsErr = validateMaxTeams(hunt.maxTeams, hunt.numTeams);
  const startsErr = validateStartDate(hunt.starts);
  const endsErr = validateEndDate(hunt.starts, hunt.ends);

  return (
    <Paper className={classes.root}>
      <form classes={classes.container}>
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
            value={hunt.name}
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
            value={hunt.maxTeams}
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
            value={toDateTimeLocal(hunt.starts)}
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
            value={toDateTimeLocal(hunt.ends)}
            required={true}
          />
        </div>
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
