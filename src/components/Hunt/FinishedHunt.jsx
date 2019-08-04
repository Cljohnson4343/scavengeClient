import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import PointsIcon from "@material-ui/icons/ExposurePlus2";
import { Hunt } from "../../models";
import TeamResultsCard from "../TeamResultsCard";
import Cards from "../Cards";
import TeamsSortMenu from "../TeamsSortMenu";

const styles = theme => ({
  itemsContainer: {
    marginTop: theme.spacing(0)
  },
  sortFont: {
    color: theme.palette.primary.main,
    fontSize: "0.9em",
    fontWeight: theme.typography.fontWeightRegular
  }
});

function FinishedHunt(props) {
  const { classes, hunt, setHunt } = props;

  const defaultSort = (a, b) => b.points - a.points;
  const [sortFunction, setSortFunction] = useState(() => defaultSort);

  const teams = hunt.teams.array.sort(sortFunction);

  return (
    <Cards
      classes={{ itemsContainer: classes.itemsContainer }}
      icon={PointsIcon}
      sort={
        <TeamsSortMenu
          classes={{ sortMenuFont: classes.sortFont }}
          handleChangeSort={setSortFunction}
        />
      }
      title="Scores"
      withDivider={false}
    >
      {teams.map(t => (
        <TeamResultsCard
          key={t.teamName}
          replaceTeam={t => {
            setHunt(hunt.setTeams(hunt.teams.replace(t.teamID, t)));
          }}
          team={t}
        />
      ))}
    </Cards>
  );
}

FinishedHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  hunt: PropTypes.instanceOf(Hunt).isRequired,
  setHunt: PropTypes.func.isRequired
};

export default withStyles(styles)(FinishedHunt);
