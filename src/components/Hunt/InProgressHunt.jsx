import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemsContainer from "../Items";
import { Hunt, Medias, Team } from "../../models";
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

const getPoints = (items, medias) => {
  return medias.array.reduce((acc, m) => {
    const item = items.getByItemID(m.itemID);
    return acc + (item ? item.points : 0);
  }, 0);
};

function InProgressHunt(props) {
  const { classes, hunt, team } = props;
  const items = hunt.items;

  //TODO workaround: rethink this conditional
  if (!Boolean(team)) {
    return <h3>Loading...</h3>;
  }

  const [medias, setMedias] = useState(new Medias([], team.teamID));

  useEffect(() => {
    new Medias([], team.teamID).apiRetrieveMedia().then(response => {
      console.log("inprogresshunt medias:");
      console.dir(response);
    });
  }, []);

  const points = getPoints(items, medias);

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
