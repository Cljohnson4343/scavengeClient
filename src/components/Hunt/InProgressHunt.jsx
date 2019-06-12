import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemsContainer from "../Items";
import { Hunt, Team } from "../../models";
import TimerIcon from "@material-ui/icons/Timer";
import Countdown from "../Countdown";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  msg: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(4)
  }
});

function InProgressHunt(props) {
  const { classes, hunt, team } = props;
  const items = hunt.items;

  if (!Boolean(team)) {
    return (
      <span className={classes.container}>
        <h3 className={classes.msg}>You are not part of this hunt!</h3>
      </span>
    );
  }
  return (
    <div>
      <Countdown icon={TimerIcon} time={hunt.ends} title="Time Left" />
      <ItemsContainer items={items} team={team} />
    </div>
  );
}

InProgressHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired,
  team: PropTypes.instanceOf(Team)
};

export default withStyles(styles)(InProgressHunt);
