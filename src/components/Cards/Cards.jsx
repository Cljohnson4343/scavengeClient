import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import ListIcon from "@material-ui/icons/List";

const styles = theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    marginTop: theme.spacing(2),
    overflow: "auto"
  }
});

function Cards(props) {
  const { children, classes, icon, sort, title, withDivider } = props;

  return (
    <div>
      <SectionHeader Icon={icon ? icon : ListIcon} withDivider={withDivider}>
        <span className={classes.container}>
          <span className={classes.headerItem}>{title}</span>
          <span className={classes.headerItem}>{Boolean(sort) && sort}</span>
        </span>
      </SectionHeader>
      <div className={classes.itemsContainer}>{children}</div>
    </div>
  );
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  withDivider: PropTypes.bool
};

export default withStyles(styles)(Cards);
