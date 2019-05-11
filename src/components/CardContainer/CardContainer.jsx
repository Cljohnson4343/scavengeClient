import React from "react";
import PropTypes from "prop-types";
import { withStyles, Paper } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(1) * 2,
    margin: `0 ${theme.spacing(1)}px`,
    height: "100%",
    boxSizing: "border-box"
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    overflow: "scroll",
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    borderWidth: "thin",
    borderRadius: theme.shape.borderRadius
  },
  itemsHeaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: "0 0 auto",
    paddingLeft: theme.spacing(1)
  },
  headerFirstLine: {
    display: "flex",
    justifyContent: "space-between"
  },
  filtersContainer: {
    display: "flex",
    marginBottom: theme.spacing(1)
  }
});

function CardContainer(props) {
  const { children, classes, filters, sort, title } = props;

  return (
    <div className={classes.container}>
      <Paper
        className={classes.itemsHeaderContainer}
        elevation={0}
        square={true}
      >
        <div className={classes.headerFirstLine}>
          <strong>{title}</strong>
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

CardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(CardContainer);
