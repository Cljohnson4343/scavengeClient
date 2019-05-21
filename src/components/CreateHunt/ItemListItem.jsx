import React from "react";
import PropTypes from "prop-types";
import { withStyles, Typography } from "@material-ui/core";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core";
import EditableHeading from "./EditableHeading";
import DeleteItemButton from "./DeleteItemButton";
import * as action from "./actions";
import { Item } from "../../models";

const styles = theme => ({
  font: {
    fontWeight: theme.typography.fontWeightLight
  },
  name: {
    marginLeft: theme.spacing(2)
  },
  pointsField: {
    maxWidth: "40px"
  },
  secondary: {
    right: theme.spacing(1)
  },
  select: {
    width: `100px`,
    marginRight: theme.spacing(3)
  }
});

function ItemListItem(props) {
  const { classes, dispatch, item, validateName, validatePoints } = props;

  return (
    <ListItem button disableGutters key={props.key}>
      <ListItemText
        className={classes.name}
        primary={
          <EditableHeading
            createAction={action.changeItemName.bind(null, item)}
            dispatch={dispatch}
            name={item.name}
            validate={validateName}
          />
        }
      />
      <Typography className={classes.font}>Points: </Typography>
      <ListItemText
        className={classes.points}
        primary={
          <EditableHeading
            classes={{ input: classes.pointsField }}
            createAction={action.changeItemPoints.bind(null, item)}
            dispatch={dispatch}
            name={String(item.points)}
            type="number"
            validate={validatePoints}
          />
        }
      />
      <ListItemSecondaryAction className={classes.secondary}>
        <DeleteItemButton
          handleDelete={e => dispatch(action.removeItem(item))}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

ItemListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.instanceOf(Item).isRequired,
  validateName: PropTypes.func.isRequired,
  validatePoints: PropTypes.func.isRequired
};

export default withStyles(styles)(ItemListItem);
