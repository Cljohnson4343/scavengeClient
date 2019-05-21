import React, { useState } from "react";
import PropTypes from "prop-types";
import { List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import TeamListItem from "./TeamListItem";
import TextAddButton from "./TextAddButton";
import { avatarColors, uniqueLabel } from "../../utils";
import * as action from "./actions";
import { TeamsError } from "./error";
import { Teams } from "../../models";

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
  const teamNames = teams.array.map(team => team.teamName);

  const [inputName, setInputName] = useState("");

  const colors = avatarColors(huntName, teams ? teams.length : 0);

  const teamErr = teams.validateTeamName(maxTeams, inputName);

  return (
    <FormExpansion
      inError={containerError.inError}
      label={`Teams (${teams.length}/${maxTeams})`}
    >
      <List dense={true} className={classes.list}>
        {teams.array.map((team, index) => (
          <TeamListItem
            avatarColor={colors[index]}
            dispatch={dispatch}
            key={team.teamName}
            label={uniqueLabel(teamNames, team.teamName)}
            team={team}
            validateName={teams.validateTeamName.bind(teams, maxTeams + 1)}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="team_name"
            label="Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            FormHelperTextProps={
              teamErr.inError && inputName ? { error: true } : null
            }
            error={teamErr.inError && inputName ? true : null}
            helperText={teamErr.msg}
            required={true}
          />
          <TextAddButton
            handleClick={() => {
              dispatch(action.addTeam(inputName));
              setInputName("");
            }}
            isDisabled={!inputName || teamErr.inError ? true : false}
          />
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
  teams: PropTypes.instanceOf(Teams).isRequired
};

export default withStyles(styles)(TeamsContainer);
