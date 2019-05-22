import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntsList from "../HuntsList";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";
import HuntsTabBar from "../HuntsTabBar";
import { Hunts } from "../../models";
import { getHuntsFromResponse } from "../../models";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - 51px - 56px - 32px)`,
    boxSizing: "border-box"
  }
};

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
  const { classes, navigate } = props;

  const [hunts, setHunts] = useState(new Hunts([]));
  const [value, setValue] = useState("upcoming");

  useEffect(() => {
    new Hunts().apiRetrieveHunts().then(response => {
      let hunts = getHuntsFromResponse(response.data);
      setHunts(hunts);
    });
  }, []);

  return (
    <div className={classes.page}>
      <HuntsTabBar setValue={setValue} value={value} />
      <HuntsList hunts={hunts} filterFn={filterMap[value]} />
      <Fab icon={<AddIcon />} onClick={e => navigate("/hunts/create")} />
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
