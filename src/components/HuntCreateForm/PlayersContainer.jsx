import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import PlayerListItem from "./PlayerListItem";

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

function PlayersContainer(props) {
  const { classes, players, setPlayers } = props;

  const [inputName, setInputName] = useState("");

  return (
    <FormExpansion label="Players">
      <List dense={true} className={classes.list}>
        {players.map(email => (
          <PlayerListItem
            email={email}
            key={email}
            handleDeleteItem={() => {
              setPlayers(players.filter(team => team !== email));
            }}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="email"
            label="Email"
            type="email"
            className={classNames(classes.textField, classes.root)}
            margin="normal"
            onChange={e => setInputName(e.currentTarget.value)}
            value={inputName}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setPlayers(players.concat(inputName));
              setInputName("");
            }}
            disabled={inputName.length < 1 ? true : false}
          >
            Add
          </Button>
        </div>
      </List>
    </FormExpansion>
  );
}

PlayersContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array,
  setPlayers: PropTypes.func.isRequired
};

export default withStyles(styles)(PlayersContainer);
