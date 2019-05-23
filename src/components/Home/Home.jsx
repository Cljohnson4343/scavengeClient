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

const filterMap = {
  upcoming: function(hunt) {
    if (hunt.startsIn < 0) {
      return true;
    }
  },
  finished: function(hunt) {
    if (hunt.endsIn < 0) {
      return true;
    }
  }
};

function Home(props) {
  const { classes, navigate, user } = props;

  const [hunts, setHunts] = useState(new Hunts([]));
  const [value, setValue] = useState("upcoming");

  useEffect(() => {
    if (user) {
      new Hunts()
        .apiRetrieveHunts({ params: { userID: user.userID } })
        .then(response => {
          let hunts = getHuntsFromResponse(response.data);
          setHunts(hunts);
        });
    }
  }, []);

  return (
    <div className={classes.page}>
      <HuntsTabBar setValue={setValue} value={value} />
      <HuntsList
        className={classes.list}
        hunts={hunts}
        filterFn={filterMap[value]}
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
