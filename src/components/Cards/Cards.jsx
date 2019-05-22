import React from "react";
import PropTypes from "prop-types";
import { withStyles, Paper } from "@material-ui/core";

const styles = theme => ({
  container: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: `0 ${theme.spacing(1)}px`,
    paddingTop: theme.spacing(1) * 2
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    overflow: "scroll"
  },
  itemsHeaderContainer: {
    backgroundColor: theme.palette.primary.background,
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1)
  },
  headerFirstLine: {
    display: "flex",
    justifyContent: "space-between"
  },
  filtersContainer: {
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  title: {}
});

function Cards(props) {
  const { children, classes, filters, sort, title } = props;

  return (
    <div className={classes.container}>
      <Paper
        className={classes.itemsHeaderContainer}
        elevation={0}
        square={true}
      >
        <div className={classes.headerFirstLine}>
          <strong className={classes.title}>{title}</strong>
          {Boolean(sort) && sort}
        </div>
        <div className={classes.filtersContainer}>
          {Boolean(filters) && filters}
        </div>
      </Paper>
      <div className={classes.itemsContainer}>{children}</div>
    </div>
  );
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Cards);
