import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntInfoForm from "./HuntInfoForm";
import TeamsContainer from "./TeamsContainer";
import PlayersContainer from "./PlayersContainer";
import Fab from "../Fab";

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

  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  return (
    <div className={classes.container}>
      <HuntInfoForm />
      <TeamsContainer maxTeams={1} teams={teams} setTeams={setTeams} />
      <PlayersContainer players={players} setPlayers={setPlayers} />
      <Fab />
    </div>
  );
}

HuntCreateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HuntCreateForm);
