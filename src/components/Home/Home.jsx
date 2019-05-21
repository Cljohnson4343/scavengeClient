import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Hunts from "../Hunts";
import hunts from "../../HuntInfoData";
import Fab from "../Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - 51px - 56px - 32px)`,
    boxSizing: "border-box"
  }
};

function Home(props) {
  const { classes, navigate } = props;

  return (
    <div className={classes.page}>
      <Hunts hunts={hunts} />
      <Fab icon={<AddIcon />} onClick={e => navigate("/hunts/create")} />
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
