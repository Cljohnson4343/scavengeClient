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
import CrosshairIcon from "@material-ui/icons/GpsFixed";
import SectionHeader from "../SectionHeader";

const styles = theme => ({
  card: {
    flex: "0 0 auto",
    height: "68px",
    margin: theme.spacing(1)
  },
  constainer: {
    display: "flex",
    flexDirection: "column"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column"
  },
  linkFont: {
    color: theme.palette.link,
    fontWeight: theme.typography.fontWeightRegular
  }
});

function HuntsList(props) {
  const { classes, className, hunts, tab } = props;

  let cards = [];

  if (hunts.length > 0) {
    cards = hunts.array.map(hunt => {
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
    <div className={classes.container}>
      <SectionHeader Icon={CrosshairIcon}>Hunts</SectionHeader>
      <div className={classNames(classes.listContainer, className)}>
        {cards}
      </div>
    </div>
  );
}

HuntsList.propTypes = {
  classes: PropTypes.object.isRequired,
  hunts: PropTypes.instanceOf(Hunts).isRequired,
  tab: PropTypes.string
};

export default withStyles(styles)(HuntsList);
