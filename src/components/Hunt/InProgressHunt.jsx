import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemsContainer from "../Items";
import { Hunt, Team } from "../../models";
import TimerIcon from "@material-ui/icons/Timer";
import PointsIcon from "@material-ui/icons/ExposurePlus2";
import Countdown from "../Countdown";
import SectionHeader from "../SectionHeader";
import { LocationContext } from "../Location";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  spacedContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  msg: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(4)
  }
});

function InProgressHunt(props) {
  const { classes, hunt, team } = props;
  const items = hunt.items;

  console.log("inprogresshunt");
  console.dir(team);
  const points = 43;

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
      <SectionHeader Icon={PointsIcon}>
        <span className={classes.spacedContainer}>
          <span>Points</span>
          <span>{`${points} pts`}</span>
        </span>
      </SectionHeader>
      <LocationContext.Consumer>
        {value => {
          return (
            <ItemsContainer
              items={items}
              location={value}
              teamID={team.teamID}
            />
          );
        }}
      </LocationContext.Consumer>
    </div>
  );
}

InProgressHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired,
  team: PropTypes.instanceOf(Team)
};

export default withStyles(styles)(InProgressHunt);
