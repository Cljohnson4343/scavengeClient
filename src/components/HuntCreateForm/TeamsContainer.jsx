import React, { useState } from "react";
import PropTypes from "prop-types";
import { List, withStyles } from "@material-ui/core";
import FormExpansion from "./FormExpansion";
import TeamListItem from "./TeamListItem";

const styles = theme => ({
  list: {
    width: `100%`,
    maxWidth: `400px`
  }
});

function uniqueLetterAvatar(teams, name) {
  // remove name from teams
  const ts = teams.filter(team => team !== name);
}

function TeamsContainer(props) {
  const { classes } = props;

  const [teams, setTeams] = useState(["Team Name 1", "Team Name 2"]);

  return (
    <FormExpansion label="Teams">
      <List dense={true} className={classes.list}>
        {teams.map(teamName => (
          <TeamListItem
            name={teamName}
            key={teamName}
            handleDeleteItem={() => {
              setTeams(teams.filter(team => team !== teamName));
            }}
          />
        ))}
      </List>
    </FormExpansion>
  );
}

TeamsContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamsContainer);
