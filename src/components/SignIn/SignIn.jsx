import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import FormContainer from "../FormContainer";
import { User } from "../../models";
import ScavengeInput from "../ScavengeInput";

const styles = theme => {
  const fieldWidth = 300;
  return {
    button: {
      backgroundColor: theme.palette.grey[300],
      border: `thin outset ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
      height: "48px",
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
    }
  };
};

function SignIn(props) {
  const { classes, navigate, setUser, isLoggedIn } = props;

  const [usernameInput, setUsernameInput] = useState("");

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <FormContainer label="Sign In">
      <div className={classes.container}>
        <ScavengeInput
          id="username"
          label="Username"
          onChange={setUsernameInput}
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
  isLoggedIn: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired
};

export default withStyles(styles)(SignIn);
