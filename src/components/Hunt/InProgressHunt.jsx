import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemsContainer from "../Items";
import { Items, Team } from "../../models";

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
  const { classes, items, team } = props;

  if (!Boolean(team)) {
    return (
      <span className={classes.container}>
        <h3 className={classes.msg}>You are not part of this hunt!</h3>
      </span>
    );
  }
  return <ItemsContainer items={items} team={team} />;
}

InProgressHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(Items).isRequired,
  team: PropTypes.instanceOf(Team)
};

export default withStyles(styles)(InProgressHunt);
