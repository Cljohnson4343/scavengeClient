import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  getInvitesFromResponse,
  Hunt as HuntModel,
  Hunts,
  Invites
} from "../../models";
import PreStartHunt from "./PreStartHunt";
import Loading from "../Loading";

const styles = theme => ({
  loading: {
    height: "400px",
    width: "100%"
  }
});

function Hunt(props) {
  const { classes, huntName, username } = props;

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
      .apiRetrieveHunts({ name: huntName, creator: username })
      .then(response => {
        let newHunt = new HuntModel(response.data);
        new Invites([], newHunt.huntID).apiRetrieve().then(response => {
          newHunt = newHunt.setInvites(
            getInvitesFromResponse(response.data),
            newHunt.huntID
          );
          setHunt(newHunt);
          setStatus(getStatus(newHunt));
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [huntName, username]);

  if (isLoading()) {
    return <Loading classes={{ container: classes.loading }} />;
  }

  const page = {
    "after-hunt": <h1>After Game</h1>,
    "in-hunt": <h1>In game</h1>,
    "pre-hunt": (
      <PreStartHunt hunt={hunt} setHunt={setHunt} username={username} />
    )
  };
  return <div>{page[status]}</div>;
}

Hunt.propTypes = {
  classes: PropTypes.object.isRequired,
  huntName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default withStyles(styles)(Hunt);
