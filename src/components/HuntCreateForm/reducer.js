import { combineReducers } from "../../utils";
import { Player, Players, Teams } from "../../models";

export const initialState = {
  teams: new Teams(),
  players: new Players(),
  huntName: "",
  maxTeams: 1,
  startDate: new Date(),
  endDate: new Date()
};

export default combineReducers({
  teams,
  players,
  huntName,
  maxTeams,
  startDate,
  endDate
});

export function teams(state = new Teams(), action) {
  switch (action.type) {
    case "remove_team":
      return state.remove(action.payload);
    case "add_team":
      return state.add(action.payload);
    case "change_team_name":
      return state.changeTeamName(
        action.payload.oldName,
        action.payload.newName
      );
    case "change_players_team":
      return state.change(action.payload.player, action.payload.team);
    default:
      return state;
  }
}

export function players(state = new Players(), action) {
  switch (action.type) {
    case "remove_player":
      return state.remove(action.payload);
    case "add_player":
      return state.add(action.payload);
    case "change_team_name":
      return state.changeTeamName(
        action.payload.oldName,
        action.payload.newName
      );
    case "change_players_team":
      return state.change(action.payload.player, action.payload.team);
    default:
      return state;
  }
}

export function huntName(state = "", action) {
  switch (action.type) {
    case "update_hunt_name":
      return action.payload;
    default:
      return state;
  }
}

export function maxTeams(state = 1, action) {
  switch (action.type) {
    case "update_max_teams":
      return action.payload;
    default:
      return state;
  }
}

export function startDate(state = new Date(), action) {
  switch (action.type) {
    case "update_start":
      return action.payload;
    default:
      return state;
  }
}

export function endDate(state = new Date(), action) {
  switch (action.type) {
    case "update_end":
      return action.payload;
    default:
      return state;
  }
}
