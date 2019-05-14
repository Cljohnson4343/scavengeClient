import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
import Fab from "../Fab";
import reducer, { initialState } from "./reducer";

const styles = theme => ({
  button: {
    alignSelf: "flex-end",
    marginRight: theme.spacing(1)
  },
  container: {
    backgroundColor: "inherit",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2)
  }
});

function HuntCreateForm(props) {
  const { classes } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={classes.container}>
      <HuntInfoForm
        dispatch={dispatch}
        endDate={state.endDate}
        huntName={state.huntName}
        maxTeams={state.maxTeams}
        startDate={state.startDate}
      />
      <TeamsContainer
        dispatch={dispatch}
        maxTeams={state.maxTeams}
        teams={state.teams}
      />
      <PlayersContainer
        dispatch={dispatch}
        players={state.players}
        teams={state.teams}
      />
      <Fab />
    </div>
  );
}

HuntCreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntCreateForm);
