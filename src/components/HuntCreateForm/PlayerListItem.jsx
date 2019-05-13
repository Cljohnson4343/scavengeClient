import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select
} from "@material-ui/core";
import DeleteItemButton from "./DeleteItemButton";

const styles = theme => ({
  secondary: {
    right: theme.spacing(1)
  }
});

function PlayerListItem(props) {
  const { classes, email, handleDeleteItem, setTeam, team, teams } = props;

  return (
    <ListItem button disableGutters>
      <ListItemText primary={email} />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="team-helper">Team</InputLabel>
        <Select
          value={team}
          onChange={e => setTeam(e.target.value)}
          input={<Input name="team" id="team-helper" />}
        >
          <MenuItem value="" />
          {teams && teams.map(t => <MenuItem value={t}>{t}</MenuItem>)}
        </Select>
        <FormHelperText>Select the team for this player</FormHelperText>
      </FormControl>
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton handleDelete={handleDeleteItem} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  setTeam: PropTypes.func.isRequired,
  team: PropTypes.string,
  teams: PropTypes.array
};

export default withStyles(styles)(PlayerListItem);
