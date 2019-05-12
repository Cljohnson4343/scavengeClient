import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles, FormHelperText } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { LoginUser } from "../../api";
import SubmitButton from "../SubmitButton";

const styles = theme => ({
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
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  }
});

function LoginPage(props) {
  const { classes } = props;

  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <h1>You are already logged in.</h1>;
  }

  function getUserData() {
    return {
      first_name: firstNameInput,
      last_name: lastNameInput,
      email: emailInput,
      username: usernameInput
    };
  }

  return (
    <form className={classes.container}>
      <div className={classes.duoContainer}>
        <TextField
          id="first_name"
          label="First Name"
          type="text"
          className={classes.textField}
          margin="normal"
          onChange={e => setFirstNameInput(e.currentTarget.value)}
          value={firstNameInput}
          required
        />
        <TextField
          id="last_name"
          label="Last Name"
          type="text"
          className={classes.textField}
          margin="normal"
          onChange={e => setLastNameInput(e.currentTarget.value)}
          value={lastNameInput}
          required
        />
      </div>
      <div className={classes.duoContainer}>
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
        <TextField
          id="email"
          label="Email"
          type="email"
          className={classes.textField}
          margin="normal"
          onChange={e => setEmailInput(e.currentTarget.value)}
          value={emailInput}
          required
        />
      </div>
      <SubmitButton handleSubmit={e => LoginUser(getUserData(e))} />
    </form>
  );
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
