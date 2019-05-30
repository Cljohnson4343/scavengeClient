import React from "react";
import PropTypes from "prop-types";
import { Button, Divider, IconButton, withStyles } from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import { navigate } from "@reach/router";
import { User } from "../../models";

const styles = theme => ({
  border: {
    border: `1px solid ${theme.palette.primary.contrastText}`
  },
  button: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize * 0.85,
    margin: `${theme.spacing(1.5)}px ${theme.spacing(0.4)}px`,
    minWidth: "42px",
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`
  },
  container: {
    display: "flex",
    justifyContent: "space-between"
  },
  footer: {
    marginTop: theme.spacing(2)
  },
  homeIconColor: {
    color: theme.palette.primary.main
  },
  homeIcon: {
    padding: theme.spacing(2)
  },
  signButtonContainer: {
    display: "flex",
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px`
  }
});

function Footer(props) {
  const { classes, user, setUser } = props;

  let renderProps;

  if (Boolean(user)) {
    renderProps = (
      <div className={classes.signButtonContainer}>
        <Button
          key="sign-out"
          onClick={e => {
            user
              .apiLogout()
              .then(response => {
                setUser(null);
                navigate("/signin");
              })
              .catch(e => console.log(e));
          }}
        >
          Sign Out
        </Button>
      </div>
    );
  } else {
    renderProps = (
      <div className={classes.signButtonContainer}>
        <Button key="sign-up" onClick={e => navigate("/signup")}>
          Sign Up
        </Button>
        <Button key="sign-in" onClick={e => navigate("/signin")}>
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.footer}>
      <Divider variant="middle" />
      <div className={classes.container}>
        <IconButton
          aria-label="Home"
          classes={{ colorPrimary: classes.homeIconColor }}
          className={classes.homeIcon}
          color="primary"
          onClick={e => navigate("/")}
        >
          <ExploreIcon fontSize="large" />
        </IconButton>
        {renderProps}
      </div>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.instanceOf(User),
  setUser: PropTypes.func.isRequired
};

export default withStyles(styles)(Footer);
