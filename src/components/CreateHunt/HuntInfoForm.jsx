import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as action from "../../actions";
import { toDateTimeLocal } from "../../utils";
import { HuntInfoError } from "./error";
import PlaceAutoComplete from "../PlaceAutoComplete";
import InputField from "../InputField";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  field: {
    marginLeft: theme.spacing(1),
    marginTop: `0px`,
    paddingBottom: theme.spacing(1),
    marginRight: theme.spacing(2)
  }
});

function HuntInfoForm(props) {
  const {
    classes,
    className,
    dispatch,
    endDate,
    huntName,
    infoFormError,
    locationName,
    latitude,
    longitude,
    maxTeams,
    startDate
  } = props;

  return (
    <form className={classNames(classes.container, className)}>
      <InputField
        id="hunt_name"
        label="Hunt Name"
        error={infoFormError.huntName}
        onChange={e => dispatch(action.updateHuntName(e.currentTarget.value))}
        value={huntName}
        required={true}
      />
      <InputField
        id="max_teams"
        label="Max Teams"
        type="number"
        error={infoFormError.maxTeams}
        onChange={e =>
          dispatch(action.updateMaxTeams(Number(e.currentTarget.value)))
        }
        value={maxTeams}
        required={true}
      />
      <InputField
        id="start_time"
        label="Start Time"
        type="datetime-local"
        error={infoFormError.startDate}
        onChange={e => {
          dispatch(action.updateStart(new Date(e.currentTarget.value)));
        }}
        value={toDateTimeLocal(startDate)}
        required={true}
      />
      <InputField
        id="end_time"
        label="End Time"
        type="datetime-local"
        error={infoFormError.endDate}
        onChange={e =>
          dispatch(action.updateEnd(new Date(e.currentTarget.value)))
        }
        value={toDateTimeLocal(endDate)}
        required={true}
      />
      <PlaceAutoComplete
        className={classes.field}
        label="Start Location"
        locationName={locationName}
        latitude={latitude}
        longitude={longitude}
        onChange={(name, lat, lng) => {
          dispatch(action.setStartLocation(name, lat, lng));
        }}
      />
    </form>
  );
}

HuntInfoForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  endDate: PropTypes.instanceOf(Date),
  huntName: PropTypes.string,
  infoFormError: PropTypes.instanceOf(HuntInfoError).isRequired,
  locationName: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  maxTeams: PropTypes.number,
  startDate: PropTypes.instanceOf(Date)
};

export default withStyles(styles)(HuntInfoForm);
