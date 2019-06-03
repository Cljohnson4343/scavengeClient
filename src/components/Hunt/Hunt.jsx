import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import HuntTabBar from "../HuntTabBar";
import {
  getInvitesFromResponse,
  Hunt as HuntModel,
  Hunts,
  Invites
} from "../../models";
import PlayerTable from "../PlayerTable";
import TeamTable from "../TeamTable";
import InviteTable from "../InviteTable";
import ItemTable from "../ItemTable";

const styles = theme => ({});

function Hunt(props) {
  const { huntName, username } = props;

  const [value, setValue] = useState("teams");
  const [hunt, setHunt] = useState({});
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
    teams: (
      <div>
        <TeamTable
          huntID={hunt.huntID}
          teams={hunt.teams}
          setTeams={teams => {
            setHunt(hunt.setTeams(teams));
          }}
        />
        <PlayerTable
          huntID={hunt.huntID}
          players={hunt.players}
          setPlayers={players => {
            setHunt(hunt.setPlayers(players));
          }}
          teams={hunt.teams}
        />
        <InviteTable
          huntID={hunt.huntID}
          invites={hunt.invites}
          setInvites={invites => {
            setHunt(hunt.setInvites(invites));
          }}
        />
      </div>
    )
  };
  useEffect(() => {
    setIsLoading(true);
    new Hunts()
      .apiRetrieveHunts({ name: huntName, creator: username })
      .then(response => {
        let newHunt = new HuntModel(response.data);
        new Invites([], newHunt.huntID).apiRetrieve().then(response => {
          setHunt(
            newHunt.setInvites(
              getInvitesFromResponse(response.data),
              newHunt.huntID
            )
          );
          setIsLoading(false);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [huntName, username]);

  let renderProps;
  if (isLoading || !(hunt instanceof HuntModel)) {
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
