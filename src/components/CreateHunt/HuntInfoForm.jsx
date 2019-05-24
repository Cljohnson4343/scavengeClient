import React from "react";
import PropTypes from "prop-types";
import { TextField, withStyles } from "@material-ui/core";
import FormExpansion from "./FormExpansion";
import classNames from "classnames";
import * as action from "./actions";
import { toDateTimeLocal } from "../../utils";
import { HuntInfoError } from "./error";

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
  input: {
    backgroundColor: theme.palette.background.field
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
  const {
    classes,
    dispatch,
    endDate,
    huntName,
    infoFormError,
    maxTeams,
    startDate
  } = props;

  return (
    <FormExpansion inError={infoFormError.inError} label="Hunt Info">
      <form classes={classes.container}>
        <div className={classes.container}>
          <TextField
            id="hunt_name"
            label="Hunt Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(
              classes.textField,
              classes.root,
              classes.field
            )}
            error={infoFormError.huntName.inError ? true : false}
            FormHelperTextProps={
              infoFormError.huntName.inError ? { error: true } : null
            }
            helperText={infoFormError.huntName.msg}
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
            className={classNames(
              classes.numberField,
              classes.root,
              classes.field
            )}
            error={infoFormError.maxTeams.inError ? true : false}
            FormHelperTextProps={
              infoFormError.maxTeams.inError ? { error: true } : null
            }
            helperText={infoFormError.maxTeams.msg}
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
            className={classNames(
              classes.dateField,
              classes.root,
              classes.field
            )}
            error={infoFormError.startDate.inError ? true : false}
            FormHelperTextProps={
              infoFormError.startDate.inError ? { error: true } : null
            }
            helperText={infoFormError.startDate.msg}
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
            className={classNames(
              classes.dateField,
              classes.root,
              classes.field
            )}
            error={infoFormError.endDate.inError ? true : false}
            FormHelperTextProps={
              infoFormError.endDate.inError ? { error: true } : null
            }
            helperText={infoFormError.endDate.msg}
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
  infoFormError: PropTypes.instanceOf(HuntInfoError).isRequired,
  maxTeams: PropTypes.number,
  startDate: PropTypes.instanceOf(Date)
};

export default withStyles(styles)(HuntInfoForm);
