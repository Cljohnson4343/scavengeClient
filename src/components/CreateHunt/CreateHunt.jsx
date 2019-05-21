import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import ItemsContainer from "./ItemsContainer";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
import Fab from "../Fab";
import SendIcon from "@material-ui/icons/Send";
import reducer, { initialState } from "./reducer";
import { CreateHuntFormError } from "./error";
import { Hunt } from "../../models";
import * as actions from "./actions";

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

function CreateHunt(props) {
  const { classes } = props;

  const [state, dispatch] = useReducer(reducer, initialState);
  const formError = CreateHuntFormError(state);

  function getHunt() {
    return new Hunt({
      huntName: state.huntName,
      maxTeams: state.maxTeams,
      startTime: state.startDate,
      endTime: state.endDate,
      items: state.items,
      teams: state.teams,
      players: state.players
    });
  }

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
      <ItemsContainer
        containerError={formError.itemsError}
        dispatch={dispatch}
        items={state.items}
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
      <Fab
        onClick={e => {
          getHunt()
            .apiCreateHunt()
            .then(response => {
              dispatch(actions.clearState());
            });
        }}
        icon={<SendIcon />}
        inError={formError.inError}
      />
    </div>
  );
}

CreateHunt.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateHunt);
