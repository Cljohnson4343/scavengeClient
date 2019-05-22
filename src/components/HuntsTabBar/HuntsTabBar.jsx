import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    justifyContent: "space-between"
  },
  tabFont: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightRegular
  },
  tabSelected: {
    color: theme.palette.secondary.main
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
    height: "5px"
  },
  tabs: {
    backgroundColor: theme.palette.primary.main,
    height: theme.tabsHeight
  }
});

function HuntsTabBar(props) {
  const { classes, setValue, value } = props;

  return (
    <Tabs
      classes={{
        flexContainer: classes.container,
        indicator: classes.indicator
      }}
      className={classes.tabs}
      onChange={(event, newValue) => setValue(newValue)}
      value={value}
      variant="fullWidth"
      TabIndicatorProps={{ children: <div /> }}
    >
      <Tab
        classes={{ selected: classes.tabSelected }}
        className={classes.tabFont}
        label="Upcoming"
        value="upcoming"
      />
      <Tab
        classes={{ selected: classes.tabSelected }}
        className={classes.tabFont}
        label="Finished"
        value="finished"
      />
    </Tabs>
  );
}

HuntsTabBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired
};

export default withStyles(styles)(HuntsTabBar);
