import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, List, TextField, withStyles } from "@material-ui/core";
import classNames from "classnames";
import FormExpansion from "./FormExpansion";
import PlayerListItem from "./PlayerListItem";
import * as action from "./actions";
import { validateEmail } from "../../utils";

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

function PlayersContainer(props) {
  const { classes, dispatch, players, teams } = props;

  const [inputEmail, setInputEmail] = useState("");

  const emailError = validateEmail(inputEmail);

  return (
    <FormExpansion inError={false} label="Players">
      <List dense={true} className={classes.list}>
        {players.map(player => (
          <PlayerListItem
            dispatch={dispatch}
            email={player.email}
            key={player.email}
            teams={teams}
            teamName={player.team ? player.team.name : ""}
          />
        ))}
        <div className={classes.container}>
          <TextField
            id="email"
            label="Email"
            type="email"
            classes={{ root: classes.font }}
            className={classNames(classes.textField, classes.root)}
            error={emailError.inError && Boolean(inputEmail) ? true : null}
            margin="normal"
            onChange={e => setInputEmail(e.currentTarget.value)}
            value={inputEmail}
            FormHelperTextProps={
              emailError.inError && Boolean(inputEmail) ? { error: true } : null
            }
            helperText={emailError.msg}
            required={true}
          />
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(action.addPlayer(inputEmail));
              setInputEmail("");
            }}
            disabled={emailError.inError || !Boolean(inputEmail) ? true : false}
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
  dispatch: PropTypes.func.isRequired,
  teams: PropTypes.array
};

export default withStyles(styles)(PlayersContainer);
