import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";
import FormContainer from "../FormContainer";
import { User } from "../../models";
import ScavengeInput from "../ScavengeInput";
import { navigate } from "@reach/router";

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
    },
    duoContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      justifyItems: "center"
    }
  };
};

function SignUp(props) {
  const { classes, setUser, isLoggedIn } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  if (isLoggedIn) {
    navigate("/");
  }

  function getUser() {
    return new User({
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      username: usernameInput
    });
  }

  return (
    <FormContainer label="Sign Up for Scavenge">
      <form className={classes.container}>
        <div className={classes.duoContainer}>
          <ScavengeInput
            className={classes.input}
            id="first_name"
            label="First Name"
            onChange={setFirstNameInput}
            value={firstNameInput}
            required
          />
          <ScavengeInput
            id="last_name"
            label="Last Name"
            onChange={setLastNameInput}
            value={lastNameInput}
            required
          />
        </div>
        <div className={classes.duoContainer}>
          <ScavengeInput
            id="username"
            label="Username"
            onChange={setUsernameInput}
            value={usernameInput}
            required
          />
          <ScavengeInput
            id="email"
            label="Email"
            type="email"
            onChange={setEmailInput}
            value={emailInput}
            required
          />
        </div>
        <Button
          className={classes.button}
          variant="text"
          fullWidth={true}
          onClick={e => {
            let user = getUser();
            user.apiCreateUser().then(response => {
              setUser(new User(response.data));
              navigate("/");
            });
          }}
        >
          Sign Up
        </Button>
      </form>
    </FormContainer>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setUser: PropTypes.func
};

export default withStyles(styles)(SignUp);
