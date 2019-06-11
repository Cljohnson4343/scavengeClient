import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ItemsContainer from "../Items";
import { Items } from "../../models";

const styles = theme => ({});

function InProgressHunt(props) {
  const { classes, items } = props;

  return <ItemsContainer items={items} />;
}

InProgressHunt.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.instanceOf(Items).isRequired
};

export default withStyles(styles)(InProgressHunt);
