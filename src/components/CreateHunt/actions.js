import { Player, Team } from "../../models";

export function addTeam(teamName) {
  return {
    type: "add_team",
    payload: new Team(teamName)
  };
}

export function removeTeam(team) {
  return {
    type: "remove_team",
    payload: {
      team: team
    }
  };
}

export function changeTeamName(oldName, newName) {
  return {
    type: "change_team_name",
    payload: {
      oldName: oldName,
      newName: newName
    }
  };
}

// TODO refactor name to be changePlayerTeam
export function changePlayersTeam(player, team) {
  return {
    type: "change_players_team",
    payload: {
      player: player,
      team: team
    }
  };
}

export function changePlayerEmail(player, email) {
  return {
    type: "change_player_email",
    payload: {
      player: player,
      email: email
    }
  };
}

export function addPlayer(email) {
  return {
    type: "add_player",
    payload: new Player(email)
  };
}

export function removePlayer(email) {
  return {
    type: "remove_player",
    payload: new Player(email)
  };
}

export function updateHuntName(name) {
  return {
    type: "update_hunt_name",
    payload: String(name)
  };
}

export function updateMaxTeams(numTeams) {
  return {
    type: "update_max_teams",
    payload: Number(numTeams)
  };
}

export function updateStart(startDate) {
  return {
    type: "update_start",
    payload: startDate
  };
}

export function updateEnd(endDate) {
  return {
    type: "update_end",
    payload: endDate
  };
}

export function addItem(item) {
  return {
    type: "add_item",
    payload: item
  };
}

export function removeItem(item) {
  return {
    type: "remove_item",
    payload: item
  };
}

export function changeItemName(item, name) {
  return {
    type: "change_item_name",
    payload: {
      item: item,
      name: name
    }
  };
}

export function changeItemPoints(item, points) {
  return {
    type: "change_item_points",
    payload: {
      item: item,
      points: points
    }
  };
}

export function clearState() {
  return { type: "clear_state" };
}
