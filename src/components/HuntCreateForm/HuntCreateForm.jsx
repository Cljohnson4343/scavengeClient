import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
import Fab from "../Fab";
import reducer, { initialState } from "./reducer";
import { CreateHuntFormError } from "./error";

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
  },
  heading: {
    color: theme.palette.primary.main,
    fontSize: `${theme.typography.fontSize * 2}px`,
    fontWeight: theme.typography.fontWeightMedium,
    margin: `${theme.spacing(1)}px`
  }
});

function HuntCreateForm(props) {
  const { classes } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const formError = CreateHuntFormError(state);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>Create Hunt</div>
      <HuntInfoForm
        infoFormError={formError.huntInfoError}
        dispatch={dispatch}
        endDate={state.endDate}
        huntName={state.huntName}
        maxTeams={state.maxTeams}
        startDate={state.startDate}
      />
      <TeamsContainer
        containerError={formError.teamsError}
        dispatch={dispatch}
        huntName={state.huntName}
        maxTeams={state.maxTeams}
        teams={state.teams}
      />
      <PlayersContainer
        dispatch={dispatch}
        players={state.players}
        teams={state.teams}
      />
      <Fab inError={formError.inError} />
    </div>
  );
}

HuntCreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntCreateForm);
