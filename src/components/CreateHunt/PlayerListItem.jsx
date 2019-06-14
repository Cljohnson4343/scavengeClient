import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import EditableHeading from "./EditableHeading";
import DeleteItemButton from "./DeleteItemButton";
import * as actions from "../../actions";
import { Player } from "../../models";

const styles = theme => ({
  font: {
    fontWeight: theme.typography.fontWeightLight
  },
  secondary: {
    right: theme.spacing(1)
  },
  select: {
    width: `100px`,
    marginRight: theme.spacing(3)
  }
});

function PlayerListItem(props) {
  const { classes, dispatch, player, validateEmail } = props;

  return (
    <ListItem button disableGutters key={props.key}>
      <ListItemText
        primary={
          <EditableHeading
            dispatch={dispatch}
            createAction={actions.changePlayerEmail.bind(null, player)}
            name={player.email}
            validate={validateEmail}
          />
        }
      />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={e => dispatch(actions.removePlayer(player.email))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

PlayerListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  player: PropTypes.instanceOf(Player).isRequired,
  validateEmail: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayerListItem);
