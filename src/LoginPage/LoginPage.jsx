import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles, FormHelperText } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
});

function LoginPage(props) {
  const { classes } = props;

  const [ textInput, setTextInput ] = useState("")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  async function submitUser() {
    const result = await axios.post(
      "http://localhost:4343/users/login/",
      { "first_name": "cj",
        "last_name": "johnson",
        "username": "new user",
        "email": "new_user_client@gmail.com",
      }
    )

    console.log(result)
  }

  if (isLoggedIn) {
    return <h1>You are already logged in.</h1>
  }

  return (
    <form className={classes.container}>
      <TextField 
        id="username"
        label="Username"
        type="search"
        className={classes.textField}
        margin="normal"
        onChange={(e) => setTextInput(e.currentTarget.value)}
        value={textInput}
        required
      />
      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button}
        size="small"
        onSubmit={(e) => submitUser()}
      >
        <SendIcon className={classes.rightIcon} />
      </Button>
    </form>
  );
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);