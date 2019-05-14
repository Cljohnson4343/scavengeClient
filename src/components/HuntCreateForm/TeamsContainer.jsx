import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import TeamListItem from "./TeamListItem";
import { avatarColors, Error, uniqueLabel } from "../../utils";
import * as action from "./actions";
import { TeamsError } from "./error";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  font: {
    fontWeight: theme.typography.fontWeightLight
  },
  list: {
    width: `100%`,
    paddingTop: `0px`,
    maxWidth: `400px`
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textField: {
    marginTop: `0px`,
    paddingTop: `0px`,
    paddingBottom: `0px`,
    width: 220
  }
});

function TeamsContainer(props) {
  const {
    classes,
    containerError,
    dispatch,
    huntName,
    maxTeams,
    teams
  } = props;
  const teamNames = teams.map(team => team.name);
  const numTeams = teams ? teams.length : 0;

  const [inputName, setInputName] = useState("");

  function validateTeamName(name) {
    if (!name) {
      return new Error();
    }

    if (teams.length >= maxTeams) {
      return new Error(`Max number of teams is set to ${maxTeams}`);
    }

    const tns = teamNames.map(n => n.toLowerCase());
    const inputNameLower = inputName.toLowerCase();

    if (tns.includes(inputNameLower)) {
      return new Error(`${inputName} is already used.`);
    }
    return new Error();
  }

  const teamErr = validateTeamName(inputName);

  const colors = avatarColors(huntName, teams ? teams.length : 0);

  console.log(`teamErr: ${teamErr} containerError: ${containerError.msg}`);
  return (
    <FormExpansion
      inError={teamErr.inError || containerError.inError}
      label={`Teams (${numTeams}/${maxTeams})`}
    >
      <List dense={true} className={classes.list}>
        {teams.map((team, index) => (
          <TeamListItem
            avatarColor={colors[index]}
            name={team.name}
            key={team.name}
            label={uniqueLabel(teamNames, team.name)}
            dispatch={dispatch}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="team_name"
            error={teamErr.inError ? true : null}
            label="Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            FormHelperTextProps={teamErr.inError ? { error: true } : null}
            helperText={teamErr.msg}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(action.addTeam(inputName));
              setInputName("");
            }}
            disabled={!inputName || teamErr.inError ? true : false}
          >
            Add
          </Button>
        </div>
      </List>
    </FormExpansion>
  );
}

TeamsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  containerError: PropTypes.instanceOf(TeamsError).isRequired,
  dispatch: PropTypes.func.isRequired,
  huntName: PropTypes.string.isRequired,
  maxTeams: PropTypes.number,
  teams: PropTypes.array
};

export default withStyles(styles)(TeamsContainer);
