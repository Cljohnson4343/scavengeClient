import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Hunt as HuntModel, Hunts, User } from "../../models";
import PreStartHunt from "./PreStartHunt";
import InProgressHunt from "./InProgressHunt";
import Loading from "../Loading";

const styles = theme => ({
  loading: {
    height: "400px",
    width: "100%"
  }
});

function Hunt(props) {
  const { classes, creator, huntName, user } = props;

  const [hunt, setHunt] = useState({});
  const [status, setStatus] = useState("loading");
  const isLoading = () => status === "loading";
  const getStatus = hunt => {
    if (hunt.startsIn > 0) {
      return "pre-hunt";
    }
    if (hunt.inProgress) {
      return "in-hunt";
    }
    return "after-hunt";
  };

  useEffect(() => {
    new Hunts()
      .apiRetrieveHunts({ name: huntName, creator: creator })
      .then(response => {
        let newHunt = new HuntModel(response.data);
        setHunt(newHunt);
        setStatus(getStatus(newHunt));
      })
      .catch(err => {
        console.log(err);
      });
  }, [huntName, creator]);

  if (isLoading()) {
    return <Loading classes={{ container: classes.loading }} />;
  }

  const page = {
    "after-hunt": <h1>After Game</h1>,
    "in-hunt": (
      <InProgressHunt
        items={hunt.items}
        team={user ? hunt.getTeam(user.userID) : null}
      />
    ),
    "pre-hunt": (
      <PreStartHunt
        hunt={hunt}
        setHunt={setHunt}
        username={user ? user.username : null}
      />
    )
  };
  return <div>{page[status]}</div>;
}

Hunt.propTypes = {
  classes: PropTypes.object.isRequired,
  creator: PropTypes.string.isRequired,
  huntName: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(Hunt);
