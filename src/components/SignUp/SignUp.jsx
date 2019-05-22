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
  const { classes, setUser, user } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearInputs = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setUsernameInput("");
    setEmailInput("");
  };

  const isLoggedIn = Boolean(user);

  if (isLoggedIn) {
    return (
      <Button color="primary" size="small" variant="text">
        Sign Out
      </Button>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
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
            onChange={e => setFirstNameInput(e.currentTarget.value)}
            value={firstNameInput}
            required
          />
          <ScavengeInput
            id="last_name"
            label="Last Name"
            onChange={e => setLastNameInput(e.currentTarget.value)}
            value={lastNameInput}
            required
          />
        </div>
        <div className={classes.duoContainer}>
          <ScavengeInput
            id="username"
            label="Username"
            onChange={e => setUsernameInput(e.currentTarget.value)}
            value={usernameInput}
            required
          />
          <ScavengeInput
            id="email"
            label="Email"
            type="email"
            onChange={e => setEmailInput(e.currentTarget.value)}
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
              setIsLoading(false);
              clearInputs();
              setUser(new User(response.data));
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
  setUser: PropTypes.func,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(SignUp);
