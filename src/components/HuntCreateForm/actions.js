import { Player, Team } from "../../models";

export function addTeam(teamName) {
  return {
    type: "add_team",
    payload: new Team(teamName)
  };
}

export function removeTeam(teamName) {
  return {
    type: "remove_team",
    payload: new Team(teamName)
  };
}

export function updateTeam(oldName, newName) {
  return {
    type: "update_team",
    payload: {
      old: new Team(oldName),
      new: new Team(newName)
    }
  };
}

export function changePlayersTeam(email, teamName) {
  return {
    type: "change_players_team",
    payload: {
      player: new Player(email),
      team: new Team(teamName)
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
