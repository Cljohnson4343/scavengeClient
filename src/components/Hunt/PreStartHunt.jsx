import React, { useState } from "react";
import PropTypes from "prop-types";
import HuntTabBar from "../HuntTabBar";
import { Hunt as HuntModel } from "../../models";
import PlayerTable from "../PlayerTable";
import TeamTable from "../TeamTable";
import InviteTable from "../InviteTable";
import ItemTable from "../ItemTable";
import GeneralInfo from "./GeneralInfo";

function PreStartHunt(props) {
  const { hunt, setHunt, username } = props;

  const [value, setValue] = useState("general");
  const currentUser = hunt.players
    ? hunt.players.array.find(p => p.username === username)
    : null;
  const currentUserTeam = currentUser ? currentUser.teamID : 0;

  const table = {
    general: <GeneralInfo hunt={hunt} setHunt={setHunt} />,
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
          currentUserTeam={currentUserTeam}
          deleteTeam={team => setHunt(hunt.deleteTeam(team))}
          huntID={hunt.huntID}
          maxTeams={hunt.maxTeams}
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

  return (
    <div>
      <HuntTabBar value={value} setValue={setValue} />
      {table[value]}
    </div>
  );
}

PreStartHunt.propTypes = {
  hunt: PropTypes.instanceOf(HuntModel).isRequired,
  setHunt: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

export default PreStartHunt;
