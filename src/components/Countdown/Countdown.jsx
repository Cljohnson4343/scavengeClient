import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import SectionHeader from "../SectionHeader";
import { useInterval } from "../../utils";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  soon: {
    color: theme.palette.error.main
  }
});

const secondsRemaining = time =>
  Math.floor((time.getTime() - Date.now()) / 1000);

const fill = num => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};
const hours = sec => Math.floor(sec / 3600);
const mins = sec => Math.floor(sec / 60) % 60;
const secs = sec => Math.floor(sec) % 60;
const TenMinutes = 600;

function Countdown(props) {
  const { classes, icon, time, title } = props;

  const [seconds, setSeconds] = useState(secondsRemaining(time));

  useInterval(
    () => {
      setSeconds(secondsRemaining(time));
    },
    1000,
    [time]
  );

  const hrs = fill(hours(seconds));
  const ms = fill(mins(seconds));
  const s = fill(secs(seconds));

  const color = seconds < TenMinutes ? classes.soon : null;

  return (
    <div>
      <SectionHeader classes={{ icon: color ? color : null }} Icon={icon}>
        <span className={classes.container}>
          <span className={color}>{title}</span>
          <span className={color}>{`${hrs}:${ms}:${s}`}</span>
        </span>
      </SectionHeader>
    </div>
  );
}

Countdown.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object,
  time: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(Countdown);
