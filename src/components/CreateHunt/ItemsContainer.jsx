import React, { useState } from "react";
import PropTypes from "prop-types";
import { List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import ItemListItem from "./ItemListItem";
import TextAddButton from "./TextAddButton";
import { validateItemName, validateItemPoints } from "../../utils";
import * as action from "../../actions";
import { ItemsError } from "./error";
import { Item, Items } from "../../models";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(2)
  },
  font: {
    fontWeight: theme.typography.fontWeightLight
  },
  field: {
    marginTop: `0px`,
    paddingTop: `0px`,
    paddingBottom: `0px`
  },
  list: {
    width: `100%`,
    paddingTop: `0px`,
    maxWidth: `400px`
  },
  numberField: {
    width: 60
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  textField: {
    width: 220
  }
});

function ItemsContainer(props) {
  const { classes, containerError, dispatch, items } = props;

  const [inputName, setInputName] = useState("");
  const [inputPoints, setInputPoints] = useState(1);

  const inputNameErr = validateItemName(inputName);
  const inputPointsErr = validateItemPoints(inputPoints);
  const disableAdd =
    !inputName || inputNameErr.inError || inputPointsErr.inError ? true : false;

  return (
    <FormExpansion
      inError={containerError.inError}
      label={`Items (${items.length})`}
    >
      <List dense={true} className={classes.list}>
        {items.array.map((item, index) => (
          <ItemListItem
            dispatch={dispatch}
            key={item.name}
            item={item}
            validateName={validateItemName}
            validatePoints={validateItemPoints}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="item_name"
            label="Name"
            type="text"
            classes={{ root: classes.font }}
            className={classNames(
              classes.textField,
              classes.field,
              classes.root
            )}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            FormHelperTextProps={
              inputNameErr.inError && inputName ? { error: true } : null
            }
            error={inputNameErr.inError && inputName ? true : null}
            helperText={inputNameErr.msg}
            required={true}
          />
          <TextField
            id="item_points"
            label="Points"
            type="number"
            classes={{ root: classes.font }}
            className={classNames(
              classes.numberField,
              classes.field,
              classes.root
            )}
            margin="normal"
            onChange={e => setInputPoints(parseInt(e.currentTarget.value))}
            value={inputPoints}
            FormHelperTextProps={
              inputPointsErr.inError ? { error: true } : null
            }
            error={inputPointsErr.inError ? true : null}
            helperText={inputPointsErr.msg}
            required={true}
          />
          <TextAddButton
            handleClick={() => {
              dispatch(action.addItem(new Item(inputName, inputPoints)));
              setInputPoints(1);
              setInputName("");
            }}
            isDisabled={disableAdd ? true : false}
          />
        </div>
      </List>
    </FormExpansion>
  );
}

ItemsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  containerError: PropTypes.instanceOf(ItemsError).isRequired,
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(Items).isRequired
};

export default withStyles(styles)(ItemsContainer);
