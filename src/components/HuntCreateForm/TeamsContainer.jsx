import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import TeamListItem from "./TeamListItem";
import { avatarColors, uniqueLabel } from "../../utils";
import * as action from "./actions";

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
  const { classes, dispatch, huntName, maxTeams, teams } = props;
  const teamNames = teams.map(team => team.name);

  const [inputName, setInputName] = useState("");

  function validateTeamName(name) {
    if (!name) {
      return "";
    }

    if (teams.length >= maxTeams) {
      return `Max number of teams is set to ${maxTeams}`;
    }

    const tns = teamNames.map(n => n.toLowerCase());
    const inputNameLower = inputName.toLowerCase();

    if (tns.includes(inputNameLower)) {
      return `${inputName} is already used.`;
    }
  }

  const errMsg = validateTeamName(inputName);
  const nameInErrState = errMsg && errMsg.length > 0;

  const colors = avatarColors(huntName, teams ? teams.length : 0);

  return (
    <FormExpansion label="Teams">
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
            error={nameInErrState ? true : null}
            label="Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            FormHelperTextProps={nameInErrState ? { error: true } : null}
            helperText={nameInErrState ? errMsg : null}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(action.addTeam(inputName));
              setInputName("");
            }}
            disabled={!inputName || nameInErrState ? true : false}
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
  dispatch: PropTypes.func.isRequired,
  huntName: PropTypes.string.isRequired,
  maxTeams: PropTypes.number,
  teams: PropTypes.array
};

export default withStyles(styles)(TeamsContainer);
