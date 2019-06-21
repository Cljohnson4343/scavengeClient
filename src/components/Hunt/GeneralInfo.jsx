import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import { Hunt } from "../../models";
import SubmitButton from "../SubmitButton";
import SectionHeader from "../SectionHeader";
import InfoIcon from "@material-ui/icons/Info";
import HuntInfoForm from "../CreateHunt/HuntInfoForm";
import reducer, { getInitialState } from "./reducer";
import { HuntInfoError } from "../CreateHunt/error";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1)
  },
  root: {
    margin: `${theme.spacing(2)}px 0`
  },
  submitBtn: {
    alignSelf: "flex-end",
    margin: `${theme.spacing(3)}px ${theme.spacing(2)}px`
  }
});

const beenEdited = (hunt, state) => {
  if (hunt.name !== state.huntName) return true;
  if (hunt.maxTeams !== state.maxTeams) return true;
  if (hunt.starts.getTime() !== state.startDate.getTime()) return true;
  if (hunt.ends.getTime() !== state.endDate.getTime()) return true;
  if (hunt.locationName !== state.locationName) return true;
  if (hunt.latitude !== state.latitude) return true;
  if (hunt.longitude !== state.longitude) return true;
  return false;
};

function GeneralInfo(props) {
  const { classes, hunt, setHunt } = props;

  const [state, dispatch] = useReducer(reducer, getInitialState(hunt));

  const infoFormError = new HuntInfoError(state, hunt.teams);

  const isEnabled = beenEdited(hunt, state) && !infoFormError.inError;

  return (
    <div>
      <SectionHeader Icon={InfoIcon}>Hunt Info</SectionHeader>
      <Paper className={classes.root}>
        <div className={classes.container}>
          <HuntInfoForm
            dispatch={dispatch}
            endDate={state.endDate}
            huntName={state.huntName}
            locationName={state.locationName}
            latitude={state.latitude}
            longitude={state.longitude}
            maxTeams={state.maxTeams}
            startDate={state.startDate}
            infoFormError={infoFormError}
          />
          <SubmitButton
            className={classes.submitBtn}
            disabled={!isEnabled}
            handleSubmit={() => {
              let newHunt = new Hunt({
                ...hunt.data,
                ...state,
                ...{
                  startTime: state.startDate.toISOString(),
                  endTime: state.endDate.toISOString()
                }
              });
              newHunt.apiUpdateHunt().then(response => {
                setHunt(newHunt);
              });
            }}
          />
        </div>
      </Paper>
    </div>
  );
}

GeneralInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired,
  setHunt: PropTypes.func.isRequired
};

export default withStyles(styles)(GeneralInfo);
