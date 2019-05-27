import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntTabBar from "../HuntTabBar";
import { Hunts } from "../../models";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import PlayerTable from "./PlayerTable";

const styles = theme => ({});

function Hunt(props) {
  const { classes, huntName, username } = props;

  const [value, setValue] = useState("items");
  const [hunt, setHunt] = useState(null);

  useEffect(() => {
    new Hunts()
      .apiRetrieveHunts()
      .then(response => {
        setHunt(new Hunt(response.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HuntTabBar value={value} setValue={setValue} />
      <PlayerTable />
    </div>
  );
}

Hunt.propTypes = {
  classes: PropTypes.object.isRequired,
  huntName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default withStyles(styles)(Hunt);
