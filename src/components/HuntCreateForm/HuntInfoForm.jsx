import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import FormExpansion from "./FormExpansion";
import classNames from "classnames";
import * as action from "./actions";
import {
  toDateTimeLocal,
  validateHuntDates,
  validateMaxTeams
} from "../../utils";

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
  font: {
    fontWeight: theme.typography.fontWeightLight
  },
  numberField: {
    width: 150
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: `0px`,
    paddingBottom: theme.spacing(1)
  },
  textField: {
    width: 220
  }
});

function HuntInfoForm(props) {
  const { classes, dispatch, endDate, huntName, maxTeams, startDate } = props;

  const maxTeamsErrMsg = validateMaxTeams(maxTeams);
  const maxTeamsInErrState = Boolean(maxTeamsErrMsg) ? true : false;

  const huntDateErrMsg = validateHuntDates(startDate, endDate);
  const huntDateInErrState = Boolean(huntDateErrMsg) ? true : false;

  return (
    <FormExpansion label="Hunt Info">
      <form classes={classes.container}>
        <div className={classes.container}>
          <TextField
            id="hunt_name"
            label="Hunt Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e =>
              dispatch(action.updateHuntName(e.currentTarget.value))
            }
            value={huntName}
            required={true}
          />
          <TextField
            id="max_teams"
            label="Max Teams"
            type="number"
            classes={{ root: classes.font }}
            className={classNames(classes.numberField, classes.root)}
            error={maxTeamsInErrState ? true : false}
            FormHelperTextProps={maxTeamsInErrState ? { error: true } : null}
            helperText={maxTeamsInErrState ? maxTeamsErrMsg : null}
            margin="normal"
            onChange={e =>
              dispatch(action.updateMaxTeams(Number(e.currentTarget.value)))
            }
            value={maxTeams}
            required={true}
          />
          <TextField
            id="start_time"
            label="Start Time"
            type="datetime-local"
            classes={{ root: classes.font }}
            className={classNames(classes.dateField, classes.root)}
            error={huntDateInErrState ? true : false}
            FormHelperTextProps={huntDateInErrState ? { error: true } : null}
            helperText={huntDateInErrState ? huntDateErrMsg : null}
            margin="normal"
            onChange={e => {
              dispatch(action.updateStart(new Date(e.currentTarget.value)));
            }}
            value={toDateTimeLocal(startDate)}
            required={true}
          />
          <TextField
            id="end_time"
            label="End Time"
            type="datetime-local"
            classes={{ root: classes.font }}
            className={classNames(classes.dateField, classes.root)}
            error={huntDateInErrState ? true : false}
            FormHelperTextProps={huntDateInErrState ? { error: true } : null}
            helperText={huntDateInErrState ? huntDateErrMsg : null}
            margin="normal"
            onChange={e =>
              dispatch(action.updateEnd(new Date(e.currentTarget.value)))
            }
            value={toDateTimeLocal(endDate)}
            required={true}
          />
        </div>
      </form>
    </FormExpansion>
  );
}

HuntInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date),
  huntName: PropTypes.string,
  maxTeams: PropTypes.number,
  startDate: PropTypes.instanceOf(Date)
};

export default withStyles(styles)(HuntInfoForm);
