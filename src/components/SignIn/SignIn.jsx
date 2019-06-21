import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  withStyles
} from "@material-ui/core";
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
  const [serverMsg, setServerMsg] = useState(null);

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div>
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
              new User({ username: usernameInput })
                .apiLogin()
                .then(response => {
                  setUsernameInput("");
                  setUser(new User(response.data));
                  navigate("/");
                })
                .catch(err => {
                  setServerMsg(
                    err.response
                      ? err.response.data[0].detail.split(":")[1]
                      : "error signing in: refresh the page and try again..."
                  );
                });
            }}
            variant="text"
          >
            Sign In
          </Button>
        </div>
      </FormContainer>
      <Dialog
        aria-labelledby="server-message"
        open={Boolean(serverMsg)}
        onClose={() => setServerMsg(null)}
      >
        <DialogContent>
          <Typography>{serverMsg}</Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setUser: PropTypes.func.isRequired
};

export default withStyles(styles)(SignIn);
