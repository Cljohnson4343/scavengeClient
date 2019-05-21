import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, TextField, withStyles } from "@material-ui/core";
import FormContainer from "../FormContainer";
import { User } from "../../models";

const styles = theme => {
  const fieldWidth = 300;
  return {
    button: {
      backgroundColor: theme.palette.grey[300],
      border: `thin outset ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      margin: `${theme.spacing(2)}px 0`,
      width: fieldWidth
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "center",
      alignContent: "center",
      maxWidth: 550
    },
    textField: {
      backgroundColor: theme.palette.background.field,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: fieldWidth
    }
  };
};

function SignIn(props) {
  const { classes, navigate, setUser } = props;

  const [usernameInput, setUsernameInput] = useState("");

  return (
    <FormContainer label="Sign In">
      <div className={classes.container}>
        <TextField
          id="username"
          label="Username"
          type="text"
          className={classes.textField}
          margin="normal"
          onChange={e => setUsernameInput(e.currentTarget.value)}
          value={usernameInput}
          required
        />
        <Button
          className={classes.button}
          onClick={e => {
            new User({ username: usernameInput }).apiLogin().then(response => {
              setUsernameInput("");
              setUser(new User(response.data));
              navigate("/");
            });
          }}
          variant="text"
        >
          Sign In
        </Button>
      </div>
    </FormContainer>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(SignIn);
