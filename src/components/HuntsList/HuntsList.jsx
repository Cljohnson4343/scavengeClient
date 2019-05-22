import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Link,
  Typography,
  withStyles
} from "@material-ui/core";
import HuntCard from "../HuntCard";
import { Hunts } from "../../models";
import classNames from "classnames";
import { navigate } from "@reach/router";

const styles = theme => ({
  card: {
    flex: "0 0 auto",
    margin: theme.spacing(1)
  },
  container: {
    display: "flex",
    flexDirection: "column"
  },
  linkFont: {
    color: theme.palette.link,
    fontWeight: theme.typography.fontWeightRegular
  },
  title: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.fontSize * 2
  }
});

function HuntsList(props) {
  const { classes, className, filterFn, hunts, tab } = props;

  const filteredHunts = hunts.array.filter(hunt => filterFn(hunt));
  let cards = [];

  if (filteredHunts.length > 0) {
    cards = filteredHunts.map(hunt => {
      return <HuntCard key={hunt.name} hunt={hunt} />;
    });
  } else {
    cards.push(
      <Card className={classes.card} key={"empty-card"}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {`You have no ${tab} hunts.`}{" "}
            <Link
              className={classes.linkFont}
              color="inherit"
              onClick={e => navigate("/hunts/create")}
            >
              Create
            </Link>{" "}
            your own hunt.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={classNames(classes.container, className)}>{cards}</div>
  );
}

HuntsList.propTypes = {
  classes: PropTypes.object.isRequired,
  filterFn: PropTypes.func.isRequired,
  hunts: PropTypes.instanceOf(Hunts).isRequired,
  tab: PropTypes.string
};

export default withStyles(styles)(HuntsList);
