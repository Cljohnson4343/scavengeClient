import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntsList from "../HuntsList";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import HuntsTabBar from "../HuntsTabBar";
import { Hunts, User } from "../../models";
import { getHuntsFromResponse } from "../../models";

const styles = theme => ({
  list: {
    marginTop: theme.spacing(1)
  },
  page: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2)
  }
});

function Home(props) {
  const { classes, navigate, user } = props;

  if (!Boolean(user)) {
    navigate("/signup");
  }

  const userID = user ? user.userID : 0;

  const [hunts, setHunts] = useState(new Hunts([]));
  const [value, setValue] = useState("upcoming");

  const filteredHunts = {
    upcoming: new Hunts(
      hunts.array.filter(hunt => {
        if (hunt.endsIn >= 0) {
          return true;
        }
        return false;
      })
    ),
    finished: new Hunts(
      hunts.array.filter(hunt => {
        if (hunt.endsIn < 0) {
          return true;
        }
        return false;
      })
    )
  };

  useEffect(() => {
    if (user) {
      new Hunts().apiRetrieveHunts({ userID: user.userID }).then(response => {
        let hunts = getHuntsFromResponse(response.data);
        setHunts(hunts);
      });
    }
  }, [userID]);

  return (
    <div className={classes.page}>
      <HuntsTabBar
        numFinished={filteredHunts["finished"].length}
        numUpcoming={filteredHunts["upcoming"].length}
        setValue={setValue}
        value={value}
      />
      <HuntsList
        className={classes.list}
        hunts={filteredHunts[value]}
        tab={value}
      />
      <Fab icon={<AddIcon />} onClick={e => navigate("/hunts/create")} />
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.instanceOf(User)
};

export default withStyles(styles)(Home);
