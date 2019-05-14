import { combineReducers } from "../../utils";
import { Player } from "../../models";

export const initialState = {
  teams: [],
  players: [],
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

export function teams(state = [], action) {
  switch (action.type) {
    case "remove_team":
      return state.filter(team => !team.equals(action.payload));
    case "add_team":
      return [...state, action.payload];
    case "change_players_team":
      return state.map(team => {
        if (team.equals(action.payload.team)) {
          return team.addPlayer(action.payload.player);
        } else {
          return team.removePlayer(action.payload.player);
        }
      });
    default:
      return state;
  }
}

export function players(state = [], action) {
  switch (action.type) {
    case "remove_player":
      return state.filter(player => !player.equals(action.payload));
    case "add_player":
      return [...state, action.payload];
    case "change_players_team":
      return state.map(player => {
        if (player.equals(action.payload.player)) {
          return new Player(player.email, action.payload.team);
        }
        return new Player(player.email, player.team);
      });
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
