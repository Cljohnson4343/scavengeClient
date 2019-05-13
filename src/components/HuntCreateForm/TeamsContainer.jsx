import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import TeamListItem from "./TeamListItem";
import { uniqueLabel } from "../../utils";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  list: {
    width: `100%`,
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
  const { classes, maxTeams, teams, setTeams } = props;

  const [inputName, setInputName] = useState("");

  function validateTeamName(name) {
    if (!name) {
      return "";
    }

    if (teams.length >= maxTeams) {
      return `Max number of teams is set to ${maxTeams}`;
    }

    if (teams.includes(inputName)) {
      return `${inputName} is already used.`;
    }
  }

  const errMsg = validateTeamName(inputName);
  const inErrorState = errMsg && errMsg.length > 0;

  return (
    <FormExpansion label="Teams">
      <List dense={true} className={classes.list}>
        {teams.map(teamName => (
          <TeamListItem
            name={teamName}
            key={teamName}
            getLabel={uniqueLabel.bind(null, teams)}
            handleDeleteItem={() => {
              setTeams(teams.filter(team => team !== teamName));
            }}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="team_name"
            error={inErrorState}
            label="Name"
            type="text"
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            FormHelperTextProps={inErrorState ? { error: true } : null}
            helperText={inErrorState ? errMsg : null}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setTeams(teams.concat(inputName));
              setInputName("");
            }}
            disabled={!inputName || inErrorState ? true : false}
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
  maxTeams: PropTypes.number.isRequired,
  teams: PropTypes.array,
  setTeams: PropTypes.func.isRequired
};

export default withStyles(styles)(TeamsContainer);
