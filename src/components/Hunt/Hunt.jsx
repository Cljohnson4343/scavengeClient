import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntTabBar from "../HuntTabBar";
import { Hunt as HuntModel, Hunts } from "../../models";
import PlayerTable from "./PlayerTable";
import ItemTable from "../ItemTable";

const styles = theme => ({});

function Hunt(props) {
  const { huntName, username } = props;

  const [value, setValue] = useState("items");
  const [hunt, setHunt] = useState(new HuntModel());
  const [isLoading, setIsLoading] = useState(false);

  const table = {
    items: (
      <ItemTable
        huntID={hunt.huntID}
        items={hunt.items}
        setItems={items => {
          setHunt(hunt.setItems(items));
        }}
      />
    ),
    teams: <PlayerTable />
  };
  useEffect(() => {
    setIsLoading(true);
    new Hunts()
      .apiRetrieveHunts({ name: huntName, creator: username })
      .then(response => {
        let newHunt = new HuntModel(response.data);
        setHunt(newHunt);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [huntName, username]);

  let renderProps;
  if (isLoading) {
    renderProps = <h1>Loading...</h1>;
  } else {
    renderProps = <span>{table[value]}</span>;
  }

  return (
    <div>
      <HuntTabBar value={value} setValue={setValue} />
      {renderProps}
    </div>
  );
}

Hunt.propTypes = {
  classes: PropTypes.object.isRequired,
  huntName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default withStyles(styles)(Hunt);
