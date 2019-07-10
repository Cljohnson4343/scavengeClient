import React, { useReducer, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  withStyles
} from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import ItemsContainer from "./ItemsContainer";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
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
  },
  huntInfo: {
    marginBottom: theme.spacing(3)
  }
});

const getSteps = () => [
  "Fill out the general hunt info",
  "Add the scavenger hunt items",
  "Add the teams for the scavenger hunt",
  "Invite players to participate in your scavenger hunt"
];

function CreateHunt(props) {
  const { classes, navigate, user } = props;

  const [state, dispatch] = useReducer(reducer, getInitialState(user));
  const formError = CreateHuntFormError(state);
  const [serverMessage, setServerMessage] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const getActiveContent = activeStep => {
    switch (activeStep) {
      case 0:
        return (
          <HuntInfoForm
            className={classes.huntInfo}
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
        );
      case 1:
        return (
          <ItemsContainer
            dispatch={dispatch}
            items={state.items}
            withDivider={true}
          />
        );
      case 2:
        return (
          <TeamsContainer
            dispatch={dispatch}
            huntName={state.huntName}
            maxTeams={state.maxTeams}
            teams={state.teams}
            withDivider={true}
          />
        );
      case 3:
        return <PlayersContainer dispatch={dispatch} players={state.players} />;
      default:
        return "unknown state";
    }
  };

  const getActiveError = () => {
    switch (activeStep) {
      case 0:
        return formError.huntInfoError.inError;
      case 1:
        return formError.itemsError.inError;
      case 2:
        return formError.teamsError.inError;
      case 3:
        return formError.playersError.inError;
      default:
        return null;
    }
  };

  const getHunt = () =>
    new Hunt({
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

  const lastStep = () => activeStep === steps.length - 1;
  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleSubmit = e => {
    let hunt = getHunt();
    hunt
      .apiCreateHunt()
      .then(response => {
        navigate(`../../hunts/${user.username}/${response.data.huntName}`);
      })
      .catch(({ response = {} }) => {
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
  };

  return (
    <div>
      <SectionHeader Icon={CrosshairIcon}>Create Hunt</SectionHeader>
      <Paper className={classes.formContainer} square={false}>
        <Stepper orientation="vertical" activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getActiveContent(index)}
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  variant="conatined"
                >
                  Back
                </Button>
                <Button
                  onClick={lastStep() ? handleSubmit : handleNext}
                  color="primary"
                  variant="contained"
                  disabled={getActiveError()}
                >
                  {lastStep() ? "Submit" : "Next"}
                </Button>
              </StepContent>
            </Step>
          ))}
        </Stepper>
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
