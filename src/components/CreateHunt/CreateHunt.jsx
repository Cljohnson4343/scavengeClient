import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import ItemsContainer from "./ItemsContainer";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
import Fab from "../Fab";
import SendIcon from "@material-ui/icons/Send";
import reducer, { getInitialState } from "../../reducers";
import { CreateHuntFormError } from "./error";
import { Hunt, User } from "../../models";
import SectionHeader from "../SectionHeader";
import CrosshairIcon from "@material-ui/icons/GpsFixed";

const styles = theme => ({
  button: {
    alignSelf: "flex-end",
    marginRight: theme.spacing(1)
  },
  formContainer: {
    backgroundColor: theme.palette.background.form,
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1)
  },
  heading: {
    alignSelf: "center",
    color: theme.palette.primary.contrastText,
    fontSize: `${theme.typography.fontSize * 2}px`,
    fontWeight: theme.typography.fontWeightMedium
  }
});

function CreateHunt(props) {
  const { classes, navigate, user } = props;

  const [state, dispatch] = useReducer(reducer, getInitialState(user));
  const formError = CreateHuntFormError(state);
  const [serverMessage, setServerMessage] = useState(null);

  function getHunt() {
    return new Hunt({
      huntName: state.huntName,
      maxTeams: state.maxTeams,
      startTime: state.startDate,
      endTime: state.endDate,
      locationName: state.locationName,
      latitude: state.latitude,
      longitude: state.longitude,
      items: state.items,
      teams: state.teams,
      players: state.players
    });
  }

  return (
    <div>
      <SectionHeader Icon={CrosshairIcon}>Create Hunt</SectionHeader>
      <Paper className={classes.formContainer} square={false}>
        <HuntInfoForm
          infoFormError={formError.huntInfoError}
          dispatch={dispatch}
          endDate={state.endDate}
          huntName={state.huntName}
          locationName={state.locationName}
          latitude={state.latitude}
          longitude={state.longitude}
          maxTeams={state.maxTeams}
          startDate={state.startDate}
          withDivider={true}
        />
        <ItemsContainer
          containerError={formError.itemsError}
          dispatch={dispatch}
          items={state.items}
          withDivider={true}
        />
        <TeamsContainer
          containerError={formError.teamsError}
          dispatch={dispatch}
          huntName={state.huntName}
          maxTeams={state.maxTeams}
          teams={state.teams}
          withDivider={true}
        />
        <PlayersContainer dispatch={dispatch} players={state.players} />
        <Fab
          onClick={e => {
            getHunt()
              .apiCreateHunt()
              .then(response => {
                navigate(
                  `../../hunts/${user.username}/${response.data.huntName}`
                );
              })
              .catch(({ response }) => {
                let msg;
                switch (response.status) {
                  case 400:
                    msg = response.data[0].detail.split(":")[1].trimStart();
                    break;
                  default:
                    msg = "There was an error creating your hunt.";
                    break;
                }
                setServerMessage(msg);
              });
          }}
          icon={<SendIcon />}
          inError={formError.inError}
        />
      </Paper>
      <Dialog
        aria-labelledby="server-message"
        open={Boolean(serverMessage)}
        onClose={() => setServerMessage(null)}
      >
        <DialogContent>
          <Typography>{serverMessage}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

CreateHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(CreateHunt);
