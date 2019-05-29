import { combineReducers } from "../../utils";
import { Items, Players, Teams } from "../../models";

export const initialState = {
  teams: new Teams(),
  players: new Players(),
  items: new Items(),
  huntName: "",
  maxTeams: 1,
  startDate: new Date(),
  endDate: new Date()
};

export default combineReducers({
  teams,
  players,
  items,
  huntName,
  maxTeams,
  startDate,
  endDate
});

export function teams(state = new Teams(), action) {
  switch (action.type) {
    case "clear_state":
      return new Teams();
    case "remove_team":
      return state.remove(action.payload.team);
    case "add_team":
      return state.add(action.payload);
    case "change_team_name":
      return state.changeTeamName(
        action.payload.oldName,
        action.payload.newName
      );
    default:
      return state;
  }
}

export function players(state = new Players(), action) {
  switch (action.type) {
    case "clear_state":
      return new Players();
    case "remove_player":
      return state.remove(action.payload);
    case "add_player":
      return state.add(action.payload);
    case "change_player_email":
      return state.changePlayerEmail(
        action.payload.player,
        action.payload.email
      );
    case "change_players_team":
      return state.changePlayersTeam(
        action.payload.player,
        action.payload.team.teamID
      );
    case "remove_team":
      return state.removeTeam(action.payload.team.teamID);
    default:
      return state;
  }
}

export function items(state = new Items(), action) {
  switch (action.type) {
    case "clear_state":
      return new Items();
    case "add_item":
      return state.add(action.payload);
    case "remove_item":
      return state.remove(action.payload);
    case "change_item_name":
      return state.changeItemName(action.payload.item, action.payload.name);
    case "change_item_points":
      return state.changeItemPoints(action.payload.item, action.payload.points);
    default:
      return state;
  }
}

export function huntName(state = "", action) {
  switch (action.type) {
    case "clear_state":
      return "";
    case "update_hunt_name":
      return action.payload;
    default:
      return state;
  }
}

export function maxTeams(state = 1, action) {
  switch (action.type) {
    case "clear_state":
      return 1;
    case "update_max_teams":
      return action.payload;
    default:
      return state;
  }
}

export function startDate(state = new Date(), action) {
  switch (action.type) {
    case "clear_state":
      return new Date();
    case "update_start":
      return action.payload;
    default:
      return state;
  }
}

export function endDate(state = new Date(), action) {
  switch (action.type) {
    case "clear_state":
      return new Date();
    case "update_end":
      return action.payload;
    default:
      return state;
  }
}
